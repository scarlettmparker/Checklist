import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { invalidatePageData, makeCacheKey } from "@sun/ssr";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sun/components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChecklistEntryItem, ItemStatus } from "~/generated/graphql";
import EntryItemRow from "~/components/entry-item-row";
import EntryAddItemsPicker, {
  type PickerItem,
} from "~/components/entry-add-items-picker";
import Icon from "~/components/icon";
import {
  addEntryItem,
  removeEntryItem,
  setEntryItemStatus,
} from "~/server/actions/checklist-entry";
import styles from "./entry-checklist.module.css";

type EntryChecklistProps = {
  /**
   * The entry id.
   */
  entryId: string;
  /**
   * Items fetched for the entry.
   */
  items: ChecklistEntryItem[];
};

/**
 * Interactive checklist for an entry. Items picked via the picker are staged
 * (shown here without a completion checkbox) and committed to the entry by the
 * Submit button. Holds items in local state for optimistic updates.
 */
const EntryChecklist = ({ entryId, items: fetchedItems }: EntryChecklistProps) => {
  const { t } = useTranslation("entry");
  const [items, setItems] = useState<ChecklistEntryItem[]>(fetchedItems);
  const [pending, setPending] = useState<PickerItem[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setItems(fetchedItems);
  }, [fetchedItems]);

  const memberIds = new Set(items.map((i) => i.itemId));
  const pendingIds = new Set(pending.map((p) => p.id));
  const invalidate = () =>
    invalidatePageData([makeCacheKey("entries/:id:entryItems", { id: entryId })]);

  const toggleStatus = (itemId: string) => {
    const current = items.find((i) => i.itemId === itemId);
    if (!current) {
      return;
    }
    const next =
      current.status === ItemStatus.Complete
        ? ItemStatus.NotStarted
        : ItemStatus.Complete;
    setItems((prev) =>
      prev.map((i) => (i.itemId === itemId ? { ...i, status: next } : i)),
    );
    setEntryItemStatus(entryId, itemId, next);
  };

  const togglePending = (item: PickerItem) => {
    setPending((prev) =>
      prev.some((p) => p.id === item.id)
        ? prev.filter((p) => p.id !== item.id)
        : [...prev, item],
    );
  };

  const submitPending = async () => {
    const added = await Promise.all(
      pending.map(async (item) => {
        const result = await addEntryItem(entryId, item.id);
        const id =
          result.__typename === "QuerySuccess"
            ? (result.id ?? item.id)
            : item.id;
        return {
          id,
          entryId,
          itemId: item.id,
          name: item.name,
          icon: item.icon,
          status: ItemStatus.NotStarted,
        };
      }),
    );
    setItems((prev) => [
      ...prev,
      ...added.map((a, i) => ({ ...a, position: prev.length + i })),
    ]);
    setPending([]);
    invalidate();
  };

  const handleRemove = async (itemId: string) => {
    await removeEntryItem(entryId, itemId);
    setItems((prev) => prev.filter((i) => i.itemId !== itemId));
    invalidate();
  };

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader>
          <CardTitle>{t("checklist")}</CardTitle>
        </CardHeader>
        <CardBody className={styles.body}>
          {items.length === 0 && pending.length === 0 ? (
            <p className={styles.empty}>{t("no-items")}</p>
          ) : (
            <>
              {items.map((item) => (
                <EntryItemRow
                  key={item.itemId}
                  item={item}
                  onToggleStatus={toggleStatus}
                  onRemove={handleRemove}
                />
              ))}
              {pending.map((item) => (
                <div key={item.id} className={styles.pending_row}>
                  <Icon
                    name={item.icon}
                    className={styles.pending_icon}
                    width={16}
                    height={16}
                  />
                  <span className={styles.pending_name}>{item.name}</span>
                  <Button
                    variant="secondary"
                    className={styles.action}
                    title={t("cancel")}
                    aria-label={t("cancel")}
                    onClick={() => togglePending(item)}
                  >
                    <XMarkIcon width={16} height={16} />
                  </Button>
                </div>
              ))}
            </>
          )}
        </CardBody>
        <CardFooter className={styles.footer}>
          <Button variant="secondary" onClick={() => setShowPicker((s) => !s)}>
            {t("add-items")}
          </Button>
          {pending.length > 0 && (
            <Button onClick={submitPending}>{t("submit")}</Button>
          )}
        </CardFooter>
      </Card>
      {showPicker && (
        <Card>
          <CardBody>
            <EntryAddItemsPicker
              memberIds={memberIds}
              pendingIds={pendingIds}
              onTogglePending={togglePending}
            />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default EntryChecklist;
