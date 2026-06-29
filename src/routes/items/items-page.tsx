import { getPageData, pageDataRegistry } from "@sun/ssr";
import { useTranslation } from "react-i18next";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { fetchListChecklistItems } from "~/utils/api";
import { Link, useOutlet } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sun/components";
import Icon from "~/components/icon";
import ItemDetailPlaceholder from "~/components/item-detail-placeholder";
import styles from "./items-page.module.css";
import { PlusIcon } from "@heroicons/react/24/outline";

const ItemsPage = () => {
  const { t } = useTranslation("items");
  const outlet = useOutlet();

  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", "checklist");

  const ICON_SIZE = 16;

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
            <Link
              key={item.id}
              to={`/items/${item.id}`}
              className={styles.item_link}
            >
              <Button variant="secondary" className={styles.item_button}>
                <Icon
                  name={item.icon}
                  className={styles.item_icon}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                />
                <span className={styles.item_name}>{item.name}</span>
              </Button>
            </Link>
          ))}
        </CardBody>
        <CardFooter>
          {t("items-count", { count: data.items.length })}
        </CardFooter>
      </Card>
      <div className={styles.items_detail_panel}>
        {outlet ?? <ItemDetailPlaceholder />}
        <Link to="/items/create" className={styles.create_item_button}>
          <Button title={t("create-new-item-label")}>
            <PlusIcon
              className={styles.create_item_icon}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <p>{t("create-new-item-label")}</p>
          </Button>
        </Link>
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
