import { useTranslation } from "react-i18next";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormFooter,
  Select,
  SelectOption,
} from "@sun/components";
import { Button, Input, MarkdownEditor } from "@sun/components";
import { useState } from "react";
import { createChecklistItem } from "~/server/actions/checklist-item";
import { Link } from "react-router-dom";
import Icon, { ICON_NAMES, FALLBACK_ICON } from "~/components/icon";
import styles from "./create-item-form.module.css";

const CreateItemForm = () => {
  const { t } = useTranslation("items");

  const DEFAULT_ROWS = 3;

  const [loading, setLoading] = useState(false);
  const [_error, setError] = useState<string | null>(null);
  const [_success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const result = await createChecklistItem(
      name,
      description,
      undefined,
      icon,
    );

    if (result.__typename === "QuerySuccess") {
      setSuccess(true);
    } else if (result.__typename === "StandardError") {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.row}>
        <FormField name="name" className={styles.name_field}>
          <FormLabel>{t("name")}</FormLabel>
          <FormItem>
            <Input type="text" placeholder={t("name-placeholder")} required />
          </FormItem>
        </FormField>
        <FormField name="icon" className={styles.icon_field}>
          <FormLabel>{t("icon")}</FormLabel>
          <FormItem>
            <Select defaultValue={FALLBACK_ICON}>
              {ICON_NAMES.map((iconName) => (
                <SelectOption key={iconName} value={iconName}>
                  <div className={styles.icon_option}>
                    <Icon
                      className={styles.icon}
                      name={iconName}
                      width={16}
                      height={16}
                    />
                    <p className={styles.icon_name}>
                      {iconName.replace(/Icon$/, "")}
                    </p>
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
            placeholder={t("description-placeholder")}
            rows={DEFAULT_ROWS}
            aria-label={t("description")}
          />
        </FormItem>
      </FormField>
      <FormFooter>
        <Link to="/items">
          <Button type="button" variant="secondary" title={t("cancel-title")}>
            {t("cancel-label")}
          </Button>
        </Link>
        <Button
          type="submit"
          title={loading ? t("creating-title") : t("create-title")}
          disabled={loading}
          data-testid="create-blog-submit-button"
        >
          {loading ? t("creating-label") : t("create-label")}
        </Button>
      </FormFooter>
    </Form>
  );
};

export default CreateItemForm;
