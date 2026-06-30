import { Button, Checkbox } from "@sun/components";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Icon from "~/components/icon";
import { ChecklistEntryItem, ItemStatus } from "~/generated/graphql";
import styles from "./entry-item-row.module.css";

type EntryItemRowProps = {
  /**
   * The entry item to render.
   */
  item: ChecklistEntryItem;
  /**
   * Called when the status checkbox is toggled.
   */
  onToggleStatus: (itemId: string) => void;
  /**
   * Called when the remove button is clicked.
   */
  onRemove: (itemId: string) => void;
};

/**
 * A single item within an entry: status checkbox + icon + name + edit
 * (placeholder) + remove.
 */
const EntryItemRow = ({ item, onToggleStatus, onRemove }: EntryItemRowProps) => {
  const ICON_SIZE = 16;
  const checked = item.status === ItemStatus.Complete;

  return (
    <div className={styles.row}>
      <Checkbox
        checked={checked}
        onChange={() => onToggleStatus(item.itemId)}
      />
      <Icon
        name={item.icon}
        className={styles.icon}
        width={ICON_SIZE}
        height={ICON_SIZE}
      />
      <span className={styles.name}>{item.name}</span>
      <Button
        variant="secondary"
        className={styles.action}
        title="Edit"
        aria-label="Edit"
      >
        <PencilSquareIcon width={ICON_SIZE} height={ICON_SIZE} />
      </Button>
      <Button
        variant="secondary"
        className={styles.action}
        title="Remove"
        aria-label="Remove"
        onClick={() => onRemove(item.itemId)}
      >
        <XMarkIcon width={ICON_SIZE} height={ICON_SIZE} />
      </Button>
    </div>
  );
};

export default EntryItemRow;
