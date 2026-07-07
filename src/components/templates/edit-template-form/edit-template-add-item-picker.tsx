import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { Button, Card, CardBody, Pagination } from "@sun/components";
import Icon from "~/components/shared/icon";
import styles from "./edit-template-form.module.css";

const ICON_SIZE = 16;
const PAGE_SIZE = 10;

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
 * Add-items picker for the edit-template form: lists checklist items not yet
 * on the template. The full list is fetched during SSR and paginated
 * client-side below the card.
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
  >("checklistItems", pattern, { id: templateId });
  const available = (data?.items ?? []).filter((i) => !memberIds.has(i.id));
  const totalPages = Math.max(1, Math.ceil(available.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const items = available.slice(start, start + PAGE_SIZE);

  return (
    <>
      <Card>
        <CardBody className={styles.items_body}>
          {available.length === 0 ? (
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
      {totalPages > 1 && (
        <Pagination page={current} totalPages={totalPages} onPageChange={setPage} />
      )}
    </>
  );
};

export default EditTemplateAddItemPicker;
