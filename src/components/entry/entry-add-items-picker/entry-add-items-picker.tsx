import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { Button, Checkbox, Pagination } from "@sun/components";
import Icon from "~/components/shared/icon";
import styles from "./entry-add-items-picker.module.css";

export type PickerItem = {
  id: string;
  name: string;
  icon: string;
};

type EntryAddItemsPickerProps = {
  entryId: string;
  memberIds: Set<string>;
  /**
   * Called with the selected items when "Add selected" is pressed.
   */
  onSubmit: (items: PickerItem[]) => void;
};

/**
 * Lists items not yet in the entry with checkboxes to select them, paginated
 * below the list.
 */
const EntryAddItemsPicker = ({
  entryId,
  memberIds,
  onSubmit,
}: EntryAddItemsPickerProps) => {
  const { t } = useTranslation("entry");
  const [page, setPage] = useState(1);
  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", "entry/:id", { id: entryId, page: String(page) });
  const items = (data?.items ?? []).filter((i) => !memberIds.has(i.id));
  const pageInfo = data?.pageInfo;
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (items.length === 0) {
    return <p className={styles.empty}>{t("no-items-to-add")}</p>;
  }

  const selectedItems = items
    .filter((i) => selected.has(i.id))
    .map((i) => ({ id: i.id, name: i.name, icon: i.icon ?? "" }));

  return (
    <div className={styles.container}>
      <div className={styles.picker}>
        {items.map((item) => (
          <div key={item.id} className={styles.row}>
            <Checkbox
              checked={selected.has(item.id)}
              onChange={() => toggle(item.id)}
              className={styles.label_wrapper}
              label={
                <div className={styles.label}>
                  <Icon
                    name={item.icon}
                    className={styles.icon}
                    width={16}
                    height={16}
                  />
                  <span className={styles.name}>{item.name}</span>
                </div>
              }
            />
          </div>
        ))}
      </div>
      {pageInfo && pageInfo.totalPages > 1 && (
        <Pagination
          page={pageInfo.page + 1}
          totalPages={pageInfo.totalPages}
          onPageChange={setPage}
        />
      )}
      <Button
        className={styles.submit}
        onClick={() => onSubmit(selectedItems)}
        disabled={selected.size === 0}
      >
        {t("submit")}
      </Button>
    </div>
  );
};

export default EntryAddItemsPicker;
