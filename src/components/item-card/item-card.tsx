import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { LocateChecklistItemQuery } from "~/generated/graphql";
import { Card, CardBody, CardHeader, CardTitle } from "@sun/components";
import Icon from "~/components/icon";
import styles from "./item-card.module.css";

type ItemCardProps = {
  /**
   * ID of the checklist item to display.
   */
  id: string;
  /**
   * Pattern of the route to use for getPageData.
   */
  pattern: string;
};

/**
 * Displays the fields of a single checklist item.
 */
const ItemCard = ({ id, pattern }: ItemCardProps) => {
  const { t } = useTranslation("items");
  const { data: item } = getPageData<
    LocateChecklistItemQuery["checklistQueries"]["item"]
  >("item", pattern, { id });

  if (!item) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={styles.title}>
          <Icon name={item.icon} width={20} height={20} />
          {item.name}
        </CardTitle>
      </CardHeader>
      <CardBody className={styles.detail_body}>
        <label>{t("description")}</label>
        <p className={styles.detail_value}>
          {item.description || t("no-description")}
        </p>

        <label>{t("lifecycle-status")}</label>
        <p className={styles.detail_value}>{item.lifecycleStatus}</p>

        <label>{t("category-id")}</label>
        <p className={styles.detail_value}>{item.categoryId || t("none")}</p>

        <label>{t("created-at")}</label>
        <p className={styles.detail_value}>
          {item.createdAt ? String(item.createdAt) : "-"}
        </p>

        <label>{t("updated-at")}</label>
        <p className={styles.detail_value}>
          {item.updatedAt ? String(item.updatedAt) : "-"}
        </p>
      </CardBody>
    </Card>
  );
};

export default ItemCard;
