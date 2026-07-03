import { Link } from "react-router-dom";
import { Button, Checkbox } from "@sun/components";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Icon from "~/components/shared/icon";
import { ChecklistEntryItem, ItemStatus } from "~/generated/graphql";
import styles from "./entry-item-row.module.css";

type EntryItemRowProps = {
  /**
   * The entry item to render.
   */
  item: ChecklistEntryItem;
  /**
   * The entry id, used to build the edit link back-reference.
   */
  entryId: string;
  /**
   * When true (entry completed) the checkbox and remove action are disabled.
   */
  disabled?: boolean;
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
 * A single item within an entry.
 */
const EntryItemRow = ({
  item,
  entryId,
  disabled = false,
  onToggleStatus,
  onRemove,
}: EntryItemRowProps) => {
  const ICON_SIZE = 16;
  const checked = item.status === ItemStatus.Complete;
  const editTo = `/items/${item.itemId}/edit?from=${encodeURIComponent(`/entry/${entryId}`)}`;

  return (
    <div className={styles.row}>
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={() => onToggleStatus(item.itemId)}
        className={styles.label_wrapper}
        label={
          <div className={styles.label}>
            <Icon
              name={item.icon}
              className={styles.icon}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <span className={styles.name}>{item.name}</span>
          </div>
        }
      />
      <Link to={editTo}>
        <Button
          variant="secondary"
          className={styles.action}
          title="Edit"
          aria-label="Edit"
        >
          <PencilSquareIcon width={ICON_SIZE} height={ICON_SIZE} />
        </Button>
      </Link>
      <Button
        variant="secondary"
        className={styles.action}
        title="Remove"
        aria-label="Remove"
        disabled={disabled}
        onClick={() => onRemove(item.itemId)}
      >
        <XMarkIcon width={ICON_SIZE} height={ICON_SIZE} />
      </Button>
    </div>
  );
};

export default EntryItemRow;
