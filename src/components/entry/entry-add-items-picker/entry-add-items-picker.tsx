import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { Button, Checkbox } from "@sun/components";
import Icon from "~/components/shared/icon";
import styles from "./entry-add-items-picker.module.css";

const PAGE_SIZE = 10;

export type PickerItem = {
  id: string;
  name: string;
  icon: string;
};

type EntryAddItemsPickerProps = {
  entryId: string;
  memberIds: Set<string>;
  /**
   * Current picker page (1-based), owned by the parent so pagination can render
   * below the card.
   */
  page: number;
  /**
   * Called with the number of selectable items so the parent can render
   * pagination controls.
   */
  onCountChange: (count: number) => void;
  /**
   * Called with the selected items when "Add selected" is pressed.
   */
  onSubmit: (items: PickerItem[]) => void;
};

/**
 * Lists items not yet in the entry with checkboxes to select them. The full
 * list is fetched during SSR and paginated client-side. Pagination is rendered
 * by the parent (below the card) using the count reported here.
 */
const EntryAddItemsPicker = ({
  entryId,
  memberIds,
  page,
  onCountChange,
  onSubmit,
}: EntryAddItemsPickerProps) => {
  const { t } = useTranslation("entry");
  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", "entry/:id/picker", { id: entryId });
  const available = (data?.items ?? []).filter((i) => !memberIds.has(i.id));
  const totalPages = Math.max(1, Math.ceil(available.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const visible = available.slice(start, start + PAGE_SIZE);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    onCountChange(available.length);
  }, [available.length, onCountChange]);

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

  if (available.length === 0) {
    return <p className={styles.empty}>{t("no-items-to-add")}</p>;
  }

  const selectedItems = available
    .filter((i) => selected.has(i.id))
    .map((i) => ({ id: i.id, name: i.name, icon: i.icon ?? "" }));

  return (
    <div className={styles.container}>
      <div className={styles.picker}>
        {visible.map((item) => (
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
