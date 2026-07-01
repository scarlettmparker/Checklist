import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormFooter,
  Input,
  Button,
  Select,
  SelectOption,
  MarkdownEditor,
} from "@sun/components";
import Icon, { ICON_NAMES, FALLBACK_ICON } from "~/components/icon";
import { getPageData } from "@sun/ssr";
import { LocateChecklistItemQuery } from "~/generated/graphql";
import { saveChecklistItem } from "~/server/actions/checklist-item";
import styles from "./edit-item-form.module.css";

type EditItemFormProps = {
  /**
   * Id of the checklist item to edit.
   */
  itemId: string;
  /**
   * Route pattern used by getPageData.
   */
  pattern: string;
};

/**
 * Form for editing an existing checklist item.
 */
const EditItemForm = ({ itemId, pattern }: EditItemFormProps) => {
  const { t } = useTranslation("items");
  const [searchParams] = useSearchParams();
  const cancelTo = searchParams.get("from") || `/items/${itemId}`;

  const { data: item } = getPageData<
    LocateChecklistItemQuery["checklistQueries"]["item"]
  >("item", pattern, { id: itemId });

  const DEFAULT_ROWS = 3;
  const [loading, setLoading] = useState(false);

  if (!item) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const result = await saveChecklistItem(
      itemId,
      name,
      description,
      undefined,
      icon,
    );

    if (result.__typename === "StandardError") {
      console.error(result.message);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.row}>
        <FormField name="name" className={styles.name_field}>
          <FormLabel>{t("name")}</FormLabel>
          <FormItem>
            <Input
              type="text"
              defaultValue={item.name}
              placeholder={t("name-placeholder")}
              required
            />
          </FormItem>
        </FormField>
        <FormField name="icon" className={styles.icon_field}>
          <FormLabel>{t("icon")}</FormLabel>
          <FormItem>
            <Select defaultValue={item.icon || FALLBACK_ICON}>
              {ICON_NAMES.map((iconName) => (
                <SelectOption key={iconName} value={iconName}>
                  <div className={styles.icon_option}>
                    <Icon name={iconName} width={16} height={16} />
                    <span className={styles.icon_name}>
                      {iconName.replace(/Icon$/, "")}
                    </span>
                  </div>
                </SelectOption>
              ))}
            </Select>
          </FormItem>
        </FormField>
      </div>
      <FormField name="description">
        <FormLabel>{t("description")}</FormLabel>
        <FormItem>
          <MarkdownEditor
            defaultValue={item.description || ""}
            placeholder={t("description-placeholder")}
            rows={DEFAULT_ROWS}
            aria-label={t("description")}
          />
        </FormItem>
      </FormField>
      <FormFooter>
        <Link to={cancelTo}>
          <Button type="button" variant="secondary" title={t("cancel-title")}>
            {t("cancel-label")}
          </Button>
        </Link>
        <Button
          type="submit"
          title={loading ? t("saving-title") : t("save-title")}
          disabled={loading}
        >
          {loading ? t("saving-label") : t("save-label")}
        </Button>
      </FormFooter>
    </Form>
  );
};

export default EditItemForm;
