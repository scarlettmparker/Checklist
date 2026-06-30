import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { Button } from "@sun/components";
import Icon from "~/components/icon";
import styles from "./entry-add-items-picker.module.css";

type PickerItem = {
  id: string;
  name: string;
  icon: string;
};

type EntryAddItemsPickerProps = {
  /**
   * Item ids already in the entry (hidden from the picker).
   */
  memberIds: Set<string>;
  /**
   * Called with the selected items when Submit is pressed.
   */
  onSubmit: (items: PickerItem[]) => void;
  /**
   * Called when the picker is cancelled.
   */
  onCancel: () => void;
};

/**
 * Lists items not yet in the entry. Rows are toggled to select (no completion
 * checkbox — items can't be completed here); Submit adds the selection to the
 * entry.
 */
const EntryAddItemsPicker = ({
  memberIds,
  onSubmit,
  onCancel,
}: EntryAddItemsPickerProps) => {
  const { t } = useTranslation("entry");
  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", "checklist");
  const items = (data?.items ?? []).filter((i) => !memberIds.has(i.id));
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
        {items.map((item) => {
          const isSelected = selected.has(item.id);
          return (
            <button
              key={item.id}
              type="button"
              className={isSelected ? styles.row_selected : styles.row}
              onClick={() => toggle(item.id)}
            >
              <Icon
                name={item.icon}
                className={styles.icon}
                width={16}
                height={16}
              />
              <span className={styles.name}>{item.name}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button
          onClick={() => onSubmit(selectedItems)}
          disabled={selected.size === 0}
        >
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default EntryAddItemsPicker;
