import { Suspense, useEffect } from "react";
import { Breadcrumb, useBreadcrumbContext } from "@sun/components";
import { Card, CardBody } from "@sun/components";
import CreateItemForm from "~/components/items/create-item-form";
import { CreateItemPageSkeleton } from "~/components/items/skeletons";
import styles from "./create-item-page.module.css";

/**
 * Page for creating a new checklist item.
 */
const CreateItemPage = () => {
  const { setBreadcrumbs, setCurrent } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Items", href: "/items" },
      { label: "New", href: "/items/create" },
    ]);
    setCurrent("/items/create");
  }, [setBreadcrumbs, setCurrent]);

  return (
    <div className={styles.create_item_form}>
      <Breadcrumb />
      <Suspense fallback={<CreateItemPageSkeleton />}>
        <Card>
          <CardBody>
            <CreateItemForm />
          </CardBody>
        </Card>
      </Suspense>
    </div>
  );
};

export default CreateItemPage;
