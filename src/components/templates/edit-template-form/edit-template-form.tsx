import { Suspense, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { patchPageData } from "@sun/ssr";
import { useMutation, usePageData } from "@sun/ssr/react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  Input,
  MarkdownEditor,
  Skeleton,
} from "@sun/components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChecklistTemplateItem,
  type AddTemplateItemResponse,
  type ListChecklistTemplateItemsQuery,
  type LocateChecklistTemplateQuery,
  type RemoveTemplateItemResponse,
} from "~/generated/graphql";
import Icon from "~/components/shared/icon";
import {
  addTemplateItem,
  removeTemplateItem,
  saveChecklistTemplate,
} from "~/server/actions/checklist-template";
import EditTemplateAddItemPicker from "./edit-template-add-item-picker";
import styles from "./edit-template-form.module.css";

const DEFAULT_ROWS = 3;
const ICON_SIZE = 16;

type TemplateItemPayload =
  | {
      /**
       * Item to add to the template.
       */
      kind: "add";
      itemId: string;
      name?: string | null;
      icon?: string | null;
    }
  | {
      /**
       * Item to remove from the template.
       */
      kind: "remove";
      itemId: string;
    };

type TemplateItemResponse =
  | AddTemplateItemResponse
  | RemoveTemplateItemResponse;

type TemplateItemsPage = NonNullable<
  ListChecklistTemplateItemsQuery["checklistQueries"]["templateItems"]
>;

const EMPTY_PAGE_INFO = {
  page: 0,
  size: 0,
  totalPages: 0,
  totalCount: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

type EditTemplateFormProps = {
  /**
   * Id of the template being edited.
   */
  templateId: string;
  /**
   * Route pattern used by getPageData.
   */
  pattern: string;
};

/**
 * Folds an optimistic template-item payload into the current items list.
 */
const applyTemplateItemChange = (
  templateId: string,
  current: ChecklistTemplateItem[],
  payload: TemplateItemPayload,
): ChecklistTemplateItem[] => {
  if (payload.kind === "add") {
    if (current.some((item) => item.itemId === payload.itemId)) {
      return current;
    }
    return [
      ...current,
      {
        __typename: "ChecklistTemplateItem" as const,
        id: payload.itemId,
        templateId,
        itemId: payload.itemId,
        name: payload.name ?? null,
        icon: payload.icon ?? null,
        position: current.length,
      },
    ];
  }
  return current.filter((item) => item.itemId !== payload.itemId);
};

/**
 * Form for editing a template's name/description and managing its items
 * (add via picker, remove via per-row button) with optimistic updates.
 */
const EditTemplateForm = ({ templateId, pattern }: EditTemplateFormProps) => {
  const { t } = useTranslation("templates");
  const { data: template } = usePageData<
    LocateChecklistTemplateQuery["checklistQueries"]["template"]
  >("template", pattern, { id: templateId });
  const { data: templateItemsData } = usePageData<
    ListChecklistTemplateItemsQuery["checklistQueries"]["templateItems"]
  >("templateItems", pattern, { id: templateId });

  const fetchedItems = templateItemsData?.items ?? [];
  const [saving, startSaving] = useTransition();

  const [optimisticItems, runItems] = useMutation<
    TemplateItemPayload,
    TemplateItemResponse,
    ChecklistTemplateItem[]
  >({
    base: fetchedItems,
    reducer: (current, payload) =>
      applyTemplateItemChange(templateId, current, payload),
    action: (payload) => {
      if (payload.kind === "add") {
        return addTemplateItem(templateId, payload.itemId);
      }
      return removeTemplateItem(templateId, payload.itemId);
    },
    onSuccess: (response, payload) => {
      patchPageData<TemplateItemsPage>(
        "templateItems",
        pattern,
        { id: templateId },
        (current) => {
          const base = current ?? {
            items: [],
            pageInfo: EMPTY_PAGE_INFO,
          };
          return {
            ...base,
            items: applyTemplateItemChange(templateId, base.items, payload),
          };
        },
      );
      patchPageData(
        "template",
        pattern,
        { id: templateId },
        () => response.template,
      );
    },
  });

  if (!template) {
    return null;
  }

  const memberIds = new Set(optimisticItems.map((item) => item.itemId));

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    startSaving(async () => {
      await saveChecklistTemplate(templateId, name, description);
    });
  };

  const handleAdd = (
    itemId: string,
    name?: string | null,
    icon?: string | null,
  ) => {
    runItems({ kind: "add", itemId, name, icon });
  };

  const handleRemove = (itemId: string) => {
    runItems({ kind: "remove", itemId });
  };

  return (
    <div className={styles.container}>
      <Card>
        <CardBody>
          <Form onSubmit={handleSave}>
            <FormField name="name">
              <FormLabel>{t("name")}</FormLabel>
              <FormItem>
                <Input
                  type="text"
                  defaultValue={template.name}
                  placeholder={t("name-placeholder")}
                  required
                />
              </FormItem>
            </FormField>
            <FormField name="description">
              <FormLabel>{t("description")}</FormLabel>
              <FormItem>
                <MarkdownEditor
                  value={template.description || ""}
                  placeholder={t("description-placeholder")}
                  rows={DEFAULT_ROWS}
                  aria-label={t("description")}
                />
              </FormItem>
            </FormField>
            <FormFooter>
              <Button
                type="submit"
                title={saving ? t("saving-title") : t("save-title")}
                disabled={saving}
              >
                {saving ? t("saving-label") : t("save-label")}
              </Button>
            </FormFooter>
          </Form>
        </CardBody>
      </Card>

      <section className={styles.items_section}>
        <CardTitle className={styles.subtitle}>
          {t("items-in-template")}
        </CardTitle>
        <Card>
          <CardBody className={styles.items_body}>
            {optimisticItems.length === 0 ? (
              <p className={styles.empty}>{t("no-items")}</p>
            ) : (
              optimisticItems.map((item) => (
                <div key={item.itemId} className={styles.item_row}>
                  <Icon
                    name={item.icon}
                    className={styles.item_icon}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                  />
                  <span className={styles.item_name}>{item.name}</span>
                  <Button
                    variant="secondary"
                    className={styles.remove}
                    title={t("remove-item-label")}
                    aria-label={t("remove-item-label")}
                    onClick={() => handleRemove(item.itemId)}
                  >
                    <XMarkIcon width={ICON_SIZE} height={ICON_SIZE} />
                  </Button>
                </div>
              ))
            )}
          </CardBody>
        </Card>
      </section>

      <section className={styles.items_section}>
        <CardTitle className={styles.subtitle}>{t("add-items")}</CardTitle>
        <Suspense
          fallback={<Skeleton style={{ width: "100%", height: "8rem" }} />}
        >
          <EditTemplateAddItemPicker
            templateId={templateId}
            pattern={pattern}
            memberIds={memberIds}
            onAdd={handleAdd}
          />
        </Suspense>
      </section>
    </div>
  );
};

export default EditTemplateForm;
