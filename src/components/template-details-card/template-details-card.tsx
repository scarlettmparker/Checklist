import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { LocateChecklistTemplateDetailsQuery } from "~/generated/graphql";
import { Card, CardBody, CardHeader, CardTitle } from "@sun/components";
import styles from "./template-details-card.module.css";

type TemplateDetailsCardProps = {
  id: string;
  pattern: string;
};

/**
 * Displays the detail/attachment fields of a template. Suspends on its own
 * getPageData call; must be wrapped in a Suspense boundary by the page.
 */
const TemplateDetailsCard = ({ id, pattern }: TemplateDetailsCardProps) => {
  const { t } = useTranslation("templates");
  const { data: details } = getPageData<
    LocateChecklistTemplateDetailsQuery["checklistQueries"]["templateDetails"]
  >("templateDetails", pattern, { id });

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
        <p className={styles.detail_value}>
          {details.description || t("no-description")}
        </p>

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

export default TemplateDetailsCard;
