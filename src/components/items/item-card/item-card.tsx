import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { LocateChecklistItemQuery } from "~/generated/graphql";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "@sun/components";
import Icon from "~/components/shared/icon";
import styles from "./item-card.module.css";
import { MarkdownViewer } from "@sun/components";
import { Link } from "react-router-dom";
import { formatDate } from "@sun/utils";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import ConfirmDialog from "~/components/confirm-dialog";
import { retireChecklistItem } from "~/server/actions/checklist-item";

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
  const [confirmArchive, setConfirmArchive] = useState(false);
  const { data: item } = getPageData<
    LocateChecklistItemQuery["checklistQueries"]["item"]
  >("item", pattern, { id });

  if (!item) {
    return null;
  }

  return (
    <Card>
      <CardHeader className={styles.header}>
        <Link to={`/items/${id}/edit`}>
          <CardTitle className={styles.title}>
            <Icon name={item.icon} width={20} height={20} />
            {item.name}
          </CardTitle>
        </Link>
        <Button
          variant="secondary"
          title={t("archive-label")}
          aria-label={t("archive-label")}
          onClick={() => setConfirmArchive(true)}
        >
          <ArchiveBoxIcon width={16} height={16} />
          {t("archive-label")}
        </Button>
      </CardHeader>
      <CardBody className={styles.detail_body}>
        <label>{t("description")}</label>
        <MarkdownViewer className={styles.detail_value}>
          {item.description || t("no-description")}
        </MarkdownViewer>

        <label>{t("lifecycle-status")}</label>
        <p className={styles.detail_value}>{item.lifecycleStatus}</p>

        <label>{t("category-id")}</label>
        <p className={styles.detail_value}>{item.categoryId || t("none")}</p>

        <label>{t("created-at")}</label>
        <p className={styles.detail_value}>{formatDate(item.createdAt)}</p>

        <label>{t("updated-at")}</label>
        <p className={styles.detail_value}>{formatDate(item.updatedAt)}</p>
      </CardBody>
      <ConfirmDialog
        open={confirmArchive}
        onClose={() => setConfirmArchive(false)}
        onConfirm={() => {
          setConfirmArchive(false);
          retireChecklistItem(id);
        }}
        title={t("archive-item-title")}
        body={t("archive-item-body", { name: item.name })}
        confirmLabel={t("confirm-label")}
        cancelLabel={t("cancel-label")}
      />
    </Card>
  );
};

export default ItemCard;
