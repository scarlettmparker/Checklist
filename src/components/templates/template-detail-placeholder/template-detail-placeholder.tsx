import { Card, CardBody } from "@sun/components";
import { WrenchOutline } from "preact-heroicons";
import { useTranslation } from "@sun/i18n";
import styles from "./template-detail-placeholder.module.css";

/**
 * Placeholder shown in the detail panel when no template is selected.
 */
const TemplateDetailPlaceholder = () => {
  const { t } = useTranslation("templates");

  return (
    <Card>
      <CardBody className={styles.placeholder_body}>
        <WrenchOutline width={48} height={48} />
        <p>{t("select-template")}</p>
      </CardBody>
    </Card>
  );
};

export default TemplateDetailPlaceholder;
