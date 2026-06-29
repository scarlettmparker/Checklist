import { useTranslation } from "react-i18next";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormFooter,
} from "@sun/components";
import { Button } from "@sun/components";
import { useState } from "react";
import { createChecklistItem } from "~/server/actions/checklist-item";
import { Link } from "react-router-dom";
import { Input } from "@sun/components";
import { MarkdownEditor } from "@sun/components";

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
    const result = await createChecklistItem(name, description);

    if (result.__typename === "QuerySuccess") {
      setSuccess(true);
    } else if (result.__typename === "StandardError") {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField name="name">
        <FormLabel>{t("name")}</FormLabel>
        <FormItem>
          <Input type="text" placeholder={t("name-placeholder")} required />
        </FormItem>
      </FormField>
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
          <Button
            type="button"
            variant="secondary"
            title={t("cancel-title")}
          >
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
  )
}

export default CreateItemForm;