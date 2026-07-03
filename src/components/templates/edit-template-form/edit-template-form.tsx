import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPageData, invalidatePageData, makeCacheKey } from "@sun/ssr";
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
  ListChecklistTemplateItemsQuery,
  LocateChecklistTemplateQuery,
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
 * Form for editing a template's name/description and managing its items
 * (add via picker, remove via per-row button) with optimistic updates.
 */
const EditTemplateForm = ({ templateId, pattern }: EditTemplateFormProps) => {
  const { t } = useTranslation("templates");
  const { data: template } = getPageData<
    LocateChecklistTemplateQuery["checklistQueries"]["template"]
  >("template", pattern, { id: templateId });
  const { data: templateItemsData } = getPageData<
    ListChecklistTemplateItemsQuery["checklistQueries"]["templateItems"]
  >("templateItems", pattern, { id: templateId });

  const fetchedItems = templateItemsData?.items ?? [];
  const [items, setItems] = useState<ChecklistTemplateItem[]>(fetchedItems);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(fetchedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedItems]);

  if (!template) {
    return null;
  }

  const memberIds = new Set(items.map((i) => i.itemId));
  const invalidate = () =>
    invalidatePageData([
      makeCacheKey("templates/:id:templateItems", { id: templateId }),
    ]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    await saveChecklistTemplate(templateId, name, description);
    setSaving(false);
  };

  const handleAdd = async (itemId: string, name?: string | null, icon?: string | null) => {
    const entry: ChecklistTemplateItem = {
      __typename: "ChecklistTemplateItem",
      id: itemId,
      itemId,
      templateId,
      name: name ?? null,
      icon: icon ?? null,
      position: items.length,
    };
    setItems((prev) => [...prev, entry]);
    await addTemplateItem(templateId, itemId);
    invalidate();
  };

  const handleRemove = async (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.itemId !== itemId));
    await removeTemplateItem(templateId, itemId);
    invalidate();
  };

  return (
    <div className={styles.container}>
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

      <div className={styles.items_section}>
        <CardTitle className={styles.subtitle}>{t("items-in-template")}</CardTitle>
        <Card>
          <CardBody className={styles.items_body}>
            {items.length === 0 ? (
              <p className={styles.empty}>{t("no-items")}</p>
            ) : (
              items.map((item) => (
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
      </div>

      <div className={styles.items_section}>
        <CardTitle className={styles.subtitle}>{t("add-item")}</CardTitle>
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
      </div>
    </div>
  );
};

export default EditTemplateForm;
