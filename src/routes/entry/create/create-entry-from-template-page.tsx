import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
  useBreadcrumbContext,
} from "@sun/components";
import ComposeFromTemplates from "~/components/entry/compose-from-templates";
import { CreateEntryFromTemplatePageSkeleton } from "~/components/entry/skeletons";
import styles from "./create-entry-from-template-page.module.css";

const PAGE = "entry/create";

/**
 * "Create from templates": multi-select templates to compose a checklist from,
 * with a live preview of the merged items.
 */
const CreateEntryFromTemplatePage = () => {
  const { t } = useTranslation("entry");
  const { setBreadcrumbs, setCurrent } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { label: t("entry-title"), href: "/" },
      { label: t("compose-title"), href: "/entry/create" },
    ]);
    setCurrent("/entry/create");
  }, [setBreadcrumbs, setCurrent, t]);

  return (
    <div className={styles.layout}>
      <Breadcrumb />
      <Card>
        <CardHeader>
          <CardTitle>{t("compose-title")}</CardTitle>
          <CardDescription className={styles.description}>
            {t("compose-description")}
          </CardDescription>
        </CardHeader>
        <CardBody>
          <Suspense fallback={<CreateEntryFromTemplatePageSkeleton />}>
            <ComposeFromTemplates pattern={PAGE} />
          </Suspense>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateEntryFromTemplatePage;
