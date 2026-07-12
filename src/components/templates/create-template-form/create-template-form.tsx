import { useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
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
import { getPageData } from "@sun/ssr";
import { ListChecklistEntryItemsQuery } from "~/generated/graphql";
import { createChecklistTemplate } from "~/server/actions/checklist-template";
import ItemPicker from "./item-picker";
import styles from "./create-template-form.module.css";

const PAGE = "templates/create";

const CreateTemplateForm = () => {
  const { t } = useTranslation("templates");
  const [searchParams] = useSearchParams();
  const cancelTo = searchParams.get("from") || "/templates";
  const entryId = searchParams.get("entryId");

  const DEFAULT_ROWS = 3;

  // When seeding from an existing entry, pull its items via SSR so they hydrate
  // with the page (no client RPC). Suspends until resolved; the page-level
  // skeleton shows while loading.
  const { data: entryItems } = entryId
    ? getPageData<
        ListChecklistEntryItemsQuery["checklistQueries"]["entryItems"]
      >("entryItems", PAGE, { entryId })
    : { data: null };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(() => {
    const items = entryItems?.items;
    return items?.length ? new Set(items.map((i) => i.itemId)) : new Set();
  });

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
    <div className={styles.container}>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormField name="name">
              <FormLabel>{t("name")}</FormLabel>
              <FormItem>
                <Input
                  type="text"
                  placeholder={t("name-placeholder")}
                  required
                />
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
            {error && <p className={styles.error}>{error}</p>}
            <FormFooter>
              <Link to={cancelTo}>
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
              >
                {loading ? t("creating-label") : t("create-label")}
              </Button>
            </FormFooter>
          </Form>
        </CardBody>
      </Card>

      <section className={styles.items_section}>
        <CardTitle className={styles.subtitle}>{t("add-items")}</CardTitle>
        <Suspense
          fallback={<Skeleton style={{ width: "100%", height: "8rem" }} />}
        >
          <ItemPicker selected={selected} setItem={setItem} />
        </Suspense>
      </section>
    </div>
  );
};

export default CreateTemplateForm;
