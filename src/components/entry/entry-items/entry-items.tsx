import { getPageData } from "@sun/ssr";
import {
  ListChecklistEntryItemsQuery,
  LocateChecklistEntryQuery,
} from "~/generated/graphql";
import EntryChecklist from "~/components/entry/entry-checklist";

type EntryItemsProps = {
  id: string;
};

/**
 * Loads the entry's items and completion state, then hands them to the
 * interactive EntryChecklist.
 */
const EntryItems = ({ id }: EntryItemsProps) => {
  const { data } = getPageData<
    ListChecklistEntryItemsQuery["checklistQueries"]["entryItems"]
  >("entryItems", "entry/:id", { id });
  const { data: entry } = getPageData<
    LocateChecklistEntryQuery["checklistQueries"]["entry"]
  >("entry", "entry/:id", { id });
  const items = (data?.items ?? []).slice().sort((a, b) => a.position - b.position);
  const completed = entry?.completedAt != null && entry.completedAt !== "";

  return <EntryChecklist entryId={id} items={items} completed={completed} />;
};

export default EntryItems;
