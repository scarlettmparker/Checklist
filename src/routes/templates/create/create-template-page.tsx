import { Suspense, useEffect } from "react";
import { Breadcrumb, useBreadcrumbContext } from "@sun/components";
import CreateTemplateForm from "~/components/templates/create-template-form";
import { CreateTemplatePageSkeleton } from "~/components/templates/skeletons";
import styles from "./create-template-page.module.css";

const CreateTemplatePage = () => {
  const { setBreadcrumbs, setCurrent } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Templates", href: "/templates" },
      { label: "New", href: "/templates/create" },
    ]);
    setCurrent("/templates/create");
  }, [setBreadcrumbs, setCurrent]);

  return (
    <div className={styles.create_template_form}>
      <Breadcrumb />
      <Suspense fallback={<CreateTemplatePageSkeleton />}>
        <CreateTemplateForm />
      </Suspense>
    </div>
  );
};

export default CreateTemplatePage;
