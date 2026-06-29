import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sun/components";
import Icon from "~/components/icon";
import styles from "./item-list.module.css";

type ItemListProps = {
  /** Route pattern used by getPageData. */
  pattern: string;
};

/**
 * The checklist items list card. Suspends on its own getPageData call, so it
 * must be wrapped in a Suspense boundary (with ItemListSkeleton) by the page.
 */
const ItemList = ({ pattern }: ItemListProps) => {
  const { t } = useTranslation("items");
  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", pattern);
  const items = data?.items ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("items-title")}</CardTitle>
      </CardHeader>
      <CardBody className={styles.list_body}>
        {items.length === 0 ? (
          <p className={styles.no_items}>{t("no-items-found")}</p>
        ) : (
          items.map((item) => (
            <Link
              key={item.id}
              to={`/items/${item.id}`}
              className={styles.item_link}
            >
              <Button variant="secondary" className={styles.item_button}>
                <Icon
                  name={item.icon}
                  className={styles.item_icon}
                  width={16}
                  height={16}
                />
                <span className={styles.item_name}>{item.name}</span>
              </Button>
            </Link>
          ))
        )}
      </CardBody>
      <CardFooter>
        {t("items-count", { count: items.length })}
      </CardFooter>
    </Card>
  );
};

export default ItemList;
