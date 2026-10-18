import { Card, CardBody } from "@sun/components";
import { WrenchOutline } from "preact-heroicons";
import { useTranslation } from "react-i18next";
import styles from "./item-detail-placeholder.module.css";

/**
 * Placeholder shown in the detail panel when no item is selected.
 */
const ItemDetailPlaceholder = () => {
  const { t } = useTranslation("items");

  return (
    <Card>
      <CardBody className={styles.placeholder_body}>
        <WrenchOutline width={48} height={48} />
        <p>{t("select-item")}</p>
      </CardBody>
    </Card>
  );
};

export default ItemDetailPlaceholder;
