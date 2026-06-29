import { getPageData, pageDataRegistry } from "@sun/ssr";
import { useTranslation } from "react-i18next";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { fetchListChecklistItems } from "~/utils/api";
import { Link, Outlet } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle } from "@sun/components";
import styles from "./items-page.module.css";

const ItemsPage = () => {
  const { t } = useTranslation("items");

  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", "checklist");

  if (!data) {
    return null;
  }

  return (
    <div className={styles.items_layout}>
      <Card className={styles.items_list_panel}>
        <CardHeader>
          <CardTitle>{t("items-title")}</CardTitle>
        </CardHeader>
        <CardBody className={styles.items_list_body}>
          {data.items.map((item) => (
            <Link key={item.id} to={`/items/${item.id}`} className={styles.item_link}>
              {item.name}
            </Link>
          ))}
        </CardBody>
      </Card>
      <div className={styles.items_detail_panel}>
        <Outlet />
      </div>
    </div>
  );
};

/**
 * Server-side data fetching function for checklist items.
 */
async function getChecklistItemsData(): Promise<Record<
  string,
  unknown
> | null> {
  try {
    const result = await fetchListChecklistItems();
    if (result?.data && result.success) {
      const checklistItems = (result.data as ListChecklistItemsQuery)
        .checklistQueries.items;
      if (checklistItems) {
        return { checklistItems: checklistItems };
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch checklist items:", error);
    return null;
  }
}

/**
 * Register the data loader for this page.
 */
export function registerChecklistItemsDataLoader(): void {
  pageDataRegistry.registerPageDataLoader("checklist", getChecklistItemsData);
}

export default ItemsPage;
