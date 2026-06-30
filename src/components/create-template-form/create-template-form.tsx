import { useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormFooter,
  Input,
  MarkdownEditor,
  Button,
  Skeleton,
} from "@sun/components";
import { createChecklistTemplate } from "~/server/actions/checklist-template";
import ItemPicker from "./item-picker";
import styles from "./create-template-form.module.css";

const CreateTemplateForm = () => {
  const { t } = useTranslation("templates");
  const [searchParams] = useSearchParams();
  const cancelTo = searchParams.get("from") || "/templates";

  const DEFAULT_ROWS = 3;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const setItem = (id: string, value: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (value) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const itemIds = Array.from(selected);
    const result = await createChecklistTemplate(name, description, itemIds);

    if (result.__typename === "StandardError") {
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
      <FormField name="items">
        <FormLabel>{t("items-in-template")}</FormLabel>
        <Suspense
          fallback={<Skeleton style={{ width: "100%", height: "8rem" }} />}
        >
          <ItemPicker selected={selected} setItem={setItem} />
        </Suspense>
      </FormField>
      {error && <p className={styles.error}>{error}</p>}
      <FormFooter>
        <Link to={cancelTo}>
          <Button type="button" variant="secondary" title={t("cancel-title")}>
            {t("cancel-label")}
          </Button>
        </Link>
        <Button
          type="submit"
          title={loading ? t("creating-title") : t("create-title")}
          disabled={loading}
        >
          {loading ? t("creating-label") : t("create-label")}
        </Button>
      </FormFooter>
    </Form>
  );
};

export default CreateTemplateForm;
