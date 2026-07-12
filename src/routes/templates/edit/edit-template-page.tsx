import { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, useBreadcrumbContext } from "@sun/components";
import EditTemplateForm from "~/components/templates/edit-template-form";
import { EditTemplatePageSkeleton } from "~/components/templates/skeletons";
import styles from "./edit-template-page.module.css";

const PAGE = "templates/:id/edit";

/**
 * Page for editing a template's name/description and managing its items.
 */
const EditTemplatePage = () => {
  const { id } = useParams<{ id: string }>();
  const { setBreadcrumbs, setCurrent } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Templates", href: "/templates" },
      { label: "Edit", href: `/templates/${id}/edit` },
    ]);
    setCurrent(`/templates/${id}/edit`);
  }, [id, setBreadcrumbs, setCurrent]);

  if (!id) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <Breadcrumb />
      <Suspense fallback={<EditTemplatePageSkeleton />}>
        <EditTemplateForm templateId={id} pattern={PAGE} />
      </Suspense>
    </div>
  );
};

export default EditTemplatePage;
