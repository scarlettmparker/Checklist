import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { invalidatePageData, makeCacheKey } from "@sun/ssr";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@sun/components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChecklistEntryItem, ItemStatus } from "~/generated/graphql";
import EntryItemRow from "~/components/entry-item-row";
import EntryAddItemsPicker, {
  type PickerItem,
} from "~/components/entry-add-items-picker";
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
 * Interactive checklist for an entry. Holds items in local state for optimistic
 * updates. The picker selects items and commits them via its own "Add selected"
 * button.
 */
const EntryChecklist = ({
  entryId,
  items: fetchedItems,
}: EntryChecklistProps) => {
  const { t } = useTranslation("entry");
  const [items, setItems] = useState<ChecklistEntryItem[]>(fetchedItems);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setItems(fetchedItems);
  }, [fetchedItems]);

  const memberIds = new Set(items.map((i) => i.itemId));
  const invalidate = () =>
    invalidatePageData([makeCacheKey("entry/:id:entryItems", { id: entryId })]);

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

  const handleAddItems = async (newItems: PickerItem[]) => {
    const added = await Promise.all(
      newItems.map(async (item) => {
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
    setShowPicker(false);
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
        <CardFooter className={styles.footer}>
          <Button
            variant="secondary"
            className={styles.add_toggle}
            onClick={() => setShowPicker((s) => !s)}
          >
            {t("add-items")}
          </Button>
        </CardFooter>
      </Card>
      {showPicker && (
        <Card>
          <CardHeader className={styles.picker_header}>
            <CardTitle>{t("add-items")}</CardTitle>
            <Button
              variant="secondary"
              className={styles.close}
              title={t("cancel")}
              aria-label={t("cancel")}
              onClick={() => setShowPicker(false)}
            >
              <XMarkIcon width={16} height={16} />
            </Button>
          </CardHeader>
          <CardBody>
            <Suspense
              fallback={<Skeleton style={{ width: "100%", height: "6rem" }} />}
            >
              <EntryAddItemsPicker
                entryId={entryId}
                memberIds={memberIds}
                onSubmit={handleAddItems}
              />
            </Suspense>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default EntryChecklist;
