import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { patchPageData } from "@sun/ssr";
import { useMutation, usePageData } from "@sun/ssr/react";
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
import {
  ChecklistEntryItem,
  ItemStatus,
  type AddItemResponse,
  type ListChecklistEntryItemsQuery,
  type LocateChecklistEntryQuery,
  type RemoveItemResponse,
  type SetItemStatusResponse,
} from "~/generated/graphql";
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

type EntryItemPayload =
  | {
      /**
       * Items to add optimistically.
       */
      kind: "add";
      items: PickerItem[];
    }
  | {
      /**
       * Item to remove.
       */
      kind: "remove";
      itemId: string;
    }
  | {
      /**
       * Item whose status changed.
       */
      kind: "status";
      itemId: string;
      status: ItemStatus;
    };

type EntryItemResponse =
  | AddItemResponse
  | RemoveItemResponse
  | SetItemStatusResponse;

type EntryItemsPage = NonNullable<
  ListChecklistEntryItemsQuery["checklistQueries"]["entryItems"]
>;

const EMPTY_PAGE_INFO = {
  page: 0,
  size: 0,
  totalPages: 0,
  totalCount: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

type EntryChecklistProps = {
  /**
   * The entry id.
   */
  entryId: string;
};

/**
 * Folds an optimistic entry-item payload into the current items list.
 */
const applyEntryItemChange = (
  entryId: string,
  current: ChecklistEntryItem[],
  payload: EntryItemPayload,
): ChecklistEntryItem[] => {
  if (payload.kind === "add") {
    const existing = new Set(current.map((item) => item.itemId));
    const added = payload.items
      .filter((item) => !existing.has(item.id))
      .map((item, index) => ({
        __typename: "ChecklistEntryItem" as const,
        id: item.id,
        entryId,
        itemId: item.id,
        name: item.name,
        icon: item.icon,
        status: ItemStatus.NotStarted,
        position: current.length + index,
      }));
    return [...current, ...added];
  }
  if (payload.kind === "remove") {
    return current.filter((item) => item.itemId !== payload.itemId);
  }
  return current.map((item) =>
    item.itemId === payload.itemId ? { ...item, status: payload.status } : item,
  );
};

/**
 * Interactive checklist for an entry.
 */
const EntryChecklist = ({ entryId }: EntryChecklistProps) => {
  const { t } = useTranslation("entry");
  const { data: itemsData } = usePageData<
    ListChecklistEntryItemsQuery["checklistQueries"]["entryItems"]
  >("entryItems", "entry/:id/items", { id: entryId });
  const { data: entry } = usePageData<
    LocateChecklistEntryQuery["checklistQueries"]["entry"]
  >("entry", "entry/:id", { id: entryId });

  const items = (itemsData?.items ?? [])
    .slice()
    .sort((a, b) => a.position - b.position);
  const completed = entry?.completedAt != null && entry.completedAt !== "";

  const [showPicker, setShowPicker] = useState(false);
  const [page, setPage] = useState(1);
  const [pickerPage, setPickerPage] = useState(1);
  const [pickerCount, setPickerCount] = useState(0);
  const PICKER_PAGE_SIZE = 10;

  const [optimisticItems, runItems, itemsPending] = useMutation<
    EntryItemPayload,
    EntryItemResponse,
    ChecklistEntryItem[]
  >({
    base: items,
    reducer: (current, payload) =>
      applyEntryItemChange(entryId, current, payload),
    action: (payload) => {
      if (payload.kind === "add") {
        return addEntryItems(entryId, payload.items);
      }
      if (payload.kind === "remove") {
        return removeEntryItem(entryId, payload.itemId);
      }
      return setEntryItemStatus(entryId, payload.itemId, payload.status);
    },
    onSuccess: (response, payload) => {
      patchPageData<EntryItemsPage>(
        "entryItems",
        "entry/:id/items",
        { id: entryId },
        (current) => {
          const base = current ?? {
            items: [],
            pageInfo: EMPTY_PAGE_INFO,
          };
          return {
            ...base,
            items: applyEntryItemChange(entryId, base.items, payload),
          };
        },
      );
      patchPageData(
        "entry",
        "entry/:id",
        { id: entryId },
        () => response.entry,
      );
      if (payload.kind === "status") {
        maybeComplete(entryId, items, payload);
      }
    },
  });

  const memberIds = new Set(optimisticItems.map((item) => item.itemId));

  const toggleStatus = (itemId: string) => {
    if (completed) {
      return;
    }
    const current = optimisticItems.find((item) => item.itemId === itemId);
    if (!current) {
      return;
    }
    const next =
      current.status === ItemStatus.Complete
        ? ItemStatus.NotStarted
        : ItemStatus.Complete;
    runItems({ kind: "status", itemId, status: next });
  };

  const handleAddItems = (newItems: PickerItem[]) => {
    runItems({ kind: "add", items: newItems });
    setShowPicker(false);
  };

  const handleRemove = (itemId: string) => {
    if (completed) {
      return;
    }
    runItems({ kind: "remove", itemId });
  };

  const totalPages = Math.max(1, Math.ceil(optimisticItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = optimisticItems.slice(start, start + PAGE_SIZE);

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader className={styles.header}>
          <CardTitle className={styles.title}>
            {t("checklist")}
            {completed && (
              <span className={styles.badge}>{t("completed")}</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardBody className={styles.body}>
          {optimisticItems.length === 0 ? (
            <p className={styles.empty}>{t("no-items")}</p>
          ) : (
            visible.map((item) => (
              <EntryItemRow
                key={item.itemId}
                item={item}
                entryId={entryId}
                disabled={completed || itemsPending}
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
      {optimisticItems.length > PAGE_SIZE && (
        <Pagination
          className={styles.pagination}
          page={currentPage}
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
                fallback={
                  <Skeleton style={{ width: "100%", height: "6rem" }} />
                }
              >
                <EntryAddItemsPicker
                  entryId={entryId}
                  memberIds={memberIds}
                  page={pickerPage}
                  onCountChange={setPickerCount}
                  onSubmit={handleAddItems}
                />
              </Suspense>
            </CardBody>
          </Card>
          {pickerCount > PICKER_PAGE_SIZE && (
            <Pagination
              className={styles.pagination}
              page={pickerPage}
              totalPages={Math.ceil(pickerCount / PICKER_PAGE_SIZE)}
              onPageChange={setPickerPage}
            />
          )}
        </>
      )}
    </div>
  );
};

/**
 * Adds several items sequentially, returning the final updated entry.
 */
async function addEntryItems(
  entryId: string,
  items: PickerItem[],
): Promise<AddItemResponse> {
  let last: AddItemResponse | null = null;
  for (const item of items) {
    last = await addEntryItem(entryId, item.id);
  }
  if (last == null) {
    throw new Error("No items to add.");
  }
  return last;
}

/**
 * Completes the entry when every item has just become complete.
 */
function maybeComplete(
  entryId: string,
  items: ChecklistEntryItem[],
  payload: Extract<EntryItemPayload, { kind: "status" }>,
): void {
  if (payload.status !== ItemStatus.Complete) {
    return;
  }
  const nextItems = applyEntryItemChange(entryId, items, payload);
  if (nextItems.length === 0 || !nextItems.every(isComplete)) {
    return;
  }
  void completeChecklistEntry(entryId)
    .then((response) => {
      patchPageData(
        "entry",
        "entry/:id",
        { id: entryId },
        () => response.entry,
      );
    })
    .catch(() => undefined);
}

/**
 * Whether an entry item has been marked complete.
 */
function isComplete(item: ChecklistEntryItem): boolean {
  return item.status === ItemStatus.Complete;
}

export default EntryChecklist;
