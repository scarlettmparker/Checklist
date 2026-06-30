import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { Checkbox } from "@sun/components";
import Icon from "~/components/icon";
import styles from "./entry-add-items-picker.module.css";

export type PickerItem = {
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
   * Item ids staged for addition (shown as checked).
   */
  pendingIds: Set<string>;
  /**
   * Toggle an item's staged state.
   */
  onTogglePending: (item: PickerItem) => void;
};

/**
 * Lists items not yet in the entry with checkboxes to stage them.
 */
const EntryAddItemsPicker = ({
  memberIds,
  pendingIds,
  onTogglePending,
}: EntryAddItemsPickerProps) => {
  const { t } = useTranslation("entry");
  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", "checklist");
  const items = (data?.items ?? []).filter((i) => !memberIds.has(i.id));

  if (items.length === 0) {
    return <p className={styles.empty}>{t("no-items-to-add")}</p>;
  }

  return (
    <div className={styles.picker}>
      {items.map((item) => (
        <div key={item.id} className={styles.row}>
          <Checkbox
            checked={pendingIds.has(item.id)}
            onChange={() =>
              onTogglePending({
                id: item.id,
                name: item.name,
                icon: item.icon ?? "",
              })
            }
          />
          <Icon
            name={item.icon}
            className={styles.icon}
            width={16}
            height={16}
          />
          <span className={styles.name}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default EntryAddItemsPicker;
