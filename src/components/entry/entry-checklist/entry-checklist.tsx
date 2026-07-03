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
  Pagination,
  Skeleton,
} from "@sun/components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChecklistEntryItem, ItemStatus, PageInfo } from "~/generated/graphql";
import EntryItemRow from "~/components/entry/entry-item-row";
import EntryAddItemsPicker, {
  type PickerItem,
} from "~/components/entry/entry-add-items-picker";
import {
  addEntryItem,
  completeChecklistEntry,
  removeEntryItem,
  setEntryItemStatus,
} from "~/server/actions/checklist-entry";
import styles from "./entry-checklist.module.css";

const PAGE_SIZE = 10;

type EntryChecklistProps = {
  /**
   * The entry id.
   */
  entryId: string;
  /**
   * Items fetched for the entry.
   */
  items: ChecklistEntryItem[];
  /**
   * Whether the entry has been completed (checkboxes lock).
   */
  completed: boolean;
};

/**
 * Interactive checklist for an entry.
 */
const EntryChecklist = ({
  entryId,
  items: fetchedItems,
  completed: fetchedCompleted,
}: EntryChecklistProps) => {
  const { t } = useTranslation("entry");
  const [items, setItems] = useState<ChecklistEntryItem[]>(fetchedItems);
  const [completed, setCompleted] = useState(fetchedCompleted);
  const [showPicker, setShowPicker] = useState(false);
  const [page, setPage] = useState(1);
  const [pickerPage, setPickerPage] = useState(1);
  const [pickerPageInfo, setPickerPageInfo] = useState<PageInfo | null>(null);

  useEffect(() => {
    setItems(fetchedItems);
  }, [fetchedItems]);

  useEffect(() => {
    setCompleted(fetchedCompleted);
  }, [fetchedCompleted]);

  const memberIds = new Set(items.map((i) => i.itemId));
  const invalidate = () =>
    invalidatePageData([makeCacheKey("entry/:id:entryItems", { id: entryId })]);

  const toggleStatus = (itemId: string) => {
    if (completed) {
      return;
    }
    const current = items.find((i) => i.itemId === itemId);
    if (!current) {
      return;
    }
    const next =
      current.status === ItemStatus.Complete
        ? ItemStatus.NotStarted
        : ItemStatus.Complete;
    const updated = items.map((i) =>
      i.itemId === itemId ? { ...i, status: next } : i,
    );
    setItems(updated);
    setEntryItemStatus(entryId, itemId, next);

    if (
      next === ItemStatus.Complete &&
      updated.length > 0 &&
      updated.every((i) => i.status === ItemStatus.Complete)
    ) {
      setCompleted(true);
      completeChecklistEntry(entryId);
    }
  };

  const handleAddItems = async (newItems: PickerItem[]) => {
    const added = await Promise.all(
      newItems.map(async (item) => {
        const result = await addEntryItem(entryId, item.id);
        const id =
          result.__typename === "QuerySuccess" ? (result.id ?? item.id) : item.id;
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
    if (completed) {
      return;
    }
    await removeEntryItem(entryId, itemId);
    setItems((prev) => prev.filter((i) => i.itemId !== itemId));
    invalidate();
  };

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const visible = items.slice(start, start + PAGE_SIZE);

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader className={styles.header}>
          <CardTitle className={styles.title}>
            {t("checklist")}
            {completed && <span className={styles.badge}>{t("completed")}</span>}
          </CardTitle>
        </CardHeader>
        <CardBody className={styles.body}>
          {items.length === 0 ? (
            <p className={styles.empty}>{t("no-items")}</p>
          ) : (
            visible.map((item) => (
              <EntryItemRow
                key={item.itemId}
                item={item}
                entryId={entryId}
                disabled={completed}
                onToggleStatus={toggleStatus}
                onRemove={handleRemove}
              />
            ))
          )}
        </CardBody>
        <CardFooter className={styles.footer}>
          {!completed && (
            <Button
              variant="secondary"
              className={styles.add_toggle}
              onClick={() => setShowPicker((s) => !s)}
            >
              {t("add-items")}
            </Button>
          )}
        </CardFooter>
      </Card>
      {items.length > PAGE_SIZE && (
        <Pagination
          className={styles.pagination}
          page={current}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      {showPicker && (
        <>
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
                  page={pickerPage}
                  onPageInfoChange={setPickerPageInfo}
                  onSubmit={handleAddItems}
                />
              </Suspense>
            </CardBody>
          </Card>
          {pickerPageInfo && pickerPageInfo.totalPages > 1 && (
            <Pagination
              className={styles.pagination}
              page={pickerPageInfo.page + 1}
              totalPages={pickerPageInfo.totalPages}
              onPageChange={setPickerPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EntryChecklist;
