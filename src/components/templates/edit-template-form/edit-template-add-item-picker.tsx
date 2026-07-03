import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { Button, Card, CardBody, Pagination } from "@sun/components";
import Icon from "~/components/shared/icon";
import styles from "./edit-template-form.module.css";

const ICON_SIZE = 16;

type EditTemplateAddItemPickerProps = {
  /**
   * Id of the template being edited.
   */
  templateId: string;
  /**
   * Route pattern used by getPageData.
   */
  pattern: string;
  /**
   * Item ids already on the template (hidden from the picker).
   */
  memberIds: Set<string>;
  /**
   * Called when a row's add button is pressed.
   */
  onAdd: (itemId: string, name?: string | null, icon?: string | null) => void;
};

/**
 * Add-item picker for the edit-template form: lists checklist items not yet on
 * the template, paginated below the card.
 */
const EditTemplateAddItemPicker = ({
  templateId,
  pattern,
  memberIds,
  onAdd,
}: EditTemplateAddItemPickerProps) => {
  const { t } = useTranslation("templates");
  const [page, setPage] = useState(1);
  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", pattern, { id: templateId, page: String(page) });
  const items = (data?.items ?? []).filter((i) => !memberIds.has(i.id));
  const pageInfo = data?.pageInfo;

  return (
    <>
      <Card>
        <CardBody className={styles.items_body}>
          {items.length === 0 ? (
            <p className={styles.empty}>{t("no-picker-items")}</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.item_row}>
                <Icon
                  name={item.icon}
                  className={styles.item_icon}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                />
                <span className={styles.item_name}>{item.name}</span>
                <Button
                  variant="secondary"
                  onClick={() => onAdd(item.id, item.name, item.icon)}
                >
                  {t("add-item")}
                </Button>
              </div>
            ))
          )}
        </CardBody>
      </Card>
      {pageInfo && pageInfo.totalPages > 1 && (
        <Pagination
          page={pageInfo.page + 1}
          totalPages={pageInfo.totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
};

export default EditTemplateAddItemPicker;
