import { Suspense, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Breadcrumb, useBreadcrumbContext } from "@sun/components";
import { Card, CardBody } from "@sun/components";
import EditItemForm from "~/components/items/edit-item-form";
import { EditItemPageSkeleton } from "~/components/items/skeletons";
import styles from "./edit-item-page.module.css";

const PAGE = "items/:id/edit";

/**
 * Page for editing an existing checklist item.
 */
const EditItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { setBreadcrumbs, setCurrent } = useBreadcrumbContext();

  useEffect(() => {
    const from = searchParams.get("from") || "";
    const breadcrumbs =
      from.startsWith("/entry/") && id
        ? [
            { label: "Items", href: "/items" },
            { label: "Checklist", href: from },
            { label: "Edit", href: `/items/${id}/edit` },
          ]
        : [
            { label: "Items", href: "/items" },
            { label: "Edit", href: `/items/${id}/edit` },
          ];
    setBreadcrumbs(breadcrumbs);
    setCurrent(`/items/${id}/edit`);
  }, [id, searchParams, setBreadcrumbs, setCurrent]);

  if (!id) {
    return null;
  }

  return (
    <div className={styles.edit_item_form}>
      <Breadcrumb />
      <Card>
        <CardBody>
          <Suspense fallback={<EditItemPageSkeleton />}>
            <EditItemForm itemId={id} pattern={PAGE} />
          </Suspense>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditItemPage;
