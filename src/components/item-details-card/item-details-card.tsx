import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { LocateChecklistItemDetailsQuery } from "~/generated/graphql";
import { Card, CardBody, CardHeader, CardTitle } from "@sun/components";
import styles from "./item-details-card.module.css";
import { MarkdownViewer } from "@sun/components";

type ItemDetailsCardProps = {
  id: string;
  pattern: string;
};

/**
 * Displays the detail/attachment fields of a checklist item.
 */
const ItemDetailsCard = ({ id, pattern }: ItemDetailsCardProps) => {
  const { t } = useTranslation("items");
  const { data: details } = getPageData<
    LocateChecklistItemDetailsQuery["checklistQueries"]["itemDetails"]
  >("itemDetails", pattern, { id });

  if (!details || !details.ownerId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("details-title")}</CardTitle>
        </CardHeader>
        <CardBody>
          <p className={styles.no_details}>{t("no-details")}</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("details-title")}</CardTitle>
      </CardHeader>
      <CardBody className={styles.detail_body}>
        <label>{t("owner-id")}</label>
        <p className={styles.detail_value}>{details.ownerId}</p>

        <label>{t("description")}</label>
        <MarkdownViewer className={styles.detail_value}>
          {details.description || t("no-description")}
        </MarkdownViewer>

        <label>{t("remote-objects")}</label>
        <p className={styles.detail_value}>
          {details.remoteObject?.length
            ? details.remoteObject.join(", ")
            : t("none")}
        </p>
      </CardBody>
    </Card>
  );
};

export default ItemDetailsCard;
