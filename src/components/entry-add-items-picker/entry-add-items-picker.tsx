import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { Checkbox } from "@sun/components";
import Icon from "~/components/icon";
import styles from "./entry-add-items-picker.module.css";

type EntryAddItemsPickerProps = {
  /**
   * Item ids already in the entry (hidden from the picker).
   */
  memberIds: Set<string>;
  onAdd: (itemId: string, name: string, icon: string) => void;
};

/**
 * Lists items not yet in the entry; checking one adds it.
 */
const EntryAddItemsPicker = ({
  memberIds,
  onAdd,
}: EntryAddItemsPickerProps) => {
  const { t } = useTranslation("entries");
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
            checked={false}
            onChange={() => onAdd(item.id, item.name, item.icon ?? "")}
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
