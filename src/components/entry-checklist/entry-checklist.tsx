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
import { ChecklistEntryItem, ItemStatus } from "~/generated/graphql";
import EntryItemRow from "~/components/entry-item-row";
import EntryAddItemsPicker from "~/components/entry-add-items-picker";
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
 * Interactive checklist for an entry. Holds items in local state for optimistic updates.
 */
const EntryChecklist = ({
  entryId,
  items: fetchedItems,
}: EntryChecklistProps) => {
  const { t } = useTranslation("entries");
  const [items, setItems] = useState<ChecklistEntryItem[]>(fetchedItems);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setItems(fetchedItems);
  }, [fetchedItems]);

  const memberIds = new Set(items.map((i) => i.itemId));
  const invalidate = () =>
    invalidatePageData([
      makeCacheKey("entries/:id:entryItems", { id: entryId }),
    ]);

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

  const handleAdd = async (itemId: string, name: string, icon: string) => {
    const result = await addEntryItem(entryId, itemId);
    const id =
      result.__typename === "QuerySuccess" ? (result.id ?? itemId) : itemId;
    setItems((prev) => [
      ...prev,
      {
        id,
        entryId,
        itemId,
        name,
        icon,
        status: ItemStatus.NotStarted,
        position: prev.length,
      },
    ]);
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
          {items.length === 0 ? (
            <p className={styles.empty}>{t("no-items")}</p>
          ) : (
            items.map((item) => (
              <EntryItemRow
                key={item.itemId}
                item={item}
                onToggleStatus={toggleStatus}
                onRemove={handleRemove}
              />
            ))
          )}
        </CardBody>
        <CardFooter>
          <Button variant="secondary" onClick={() => setShowPicker((s) => !s)}>
            {t("add-items")}
          </Button>
        </CardFooter>
      </Card>
      {showPicker && (
        <Card>
          <CardBody>
            <EntryAddItemsPicker memberIds={memberIds} onAdd={handleAdd} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default EntryChecklist;
