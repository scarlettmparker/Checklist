import { Suspense } from "react";
import { Link, useLocation, useOutlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { pageDataRegistry } from "@sun/ssr";
import { ListChecklistTemplatesQuery } from "~/generated/graphql";
import { fetchListChecklistTemplates } from "~/utils/api";
import { Button } from "@sun/components";
import { PlusIcon } from "@heroicons/react/24/outline";
import TemplateList from "~/components/templates/template-list";
import TemplateDetailPlaceholder from "~/components/templates/template-detail-placeholder";
import {
  TemplatesPageSkeleton,
  TemplateDetailsPageSkeleton,
} from "~/components/templates/skeletons";
import styles from "./templates-page.module.css";

const TemplatesPage = () => {
  const { t } = useTranslation("templates");
  const outlet = useOutlet();
  const location = useLocation();
  const ICON_SIZE = 16;

  return (
    <Suspense fallback={<TemplatesPageSkeleton />}>
      <div className={styles.templates_layout}>
        <div className={styles.templates_list_panel}>
          <TemplateList pattern="templates" />
        </div>
        <div className={styles.templates_detail_panel}>
          <Suspense fallback={<TemplateDetailsPageSkeleton />}>
            {outlet ?? <TemplateDetailPlaceholder />}
          </Suspense>
          <Link
            to={`/templates/create?from=${encodeURIComponent(location.pathname)}`}
            className={styles.create_template_button}
          >
            <Button title={t("create-new-template-label")}>
              <PlusIcon
                className={styles.create_template_icon}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
              <p>{t("create-new-template-label")}</p>
            </Button>
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

/**
 * Server-side data fetching function for checklist templates.
 */
async function getTemplatesData(): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchListChecklistTemplates();
    if (result?.data && result.success) {
      const templates = (result.data as ListChecklistTemplatesQuery)
        .checklistQueries.listTemplates;
      if (templates) {
        return { templates: templates };
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch checklist templates:", error);
    return null;
  }
}

/**
 * Register the data loader for this page.
 */
export function registerChecklistTemplatesDataLoader(): void {
  pageDataRegistry.registerPageDataLoader("templates", getTemplatesData);
}

export default TemplatesPage;
