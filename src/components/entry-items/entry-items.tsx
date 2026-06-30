import { getPageData } from "@sun/ssr";
import { ListChecklistEntryItemsQuery } from "~/generated/graphql";
import EntryChecklist from "~/components/entry-checklist";

type EntryItemsProps = {
  id: string;
};

/**
 * Loads the entry's items and hands them to the interactive EntryChecklist.
 */
const EntryItems = ({ id }: EntryItemsProps) => {
  const { data } = getPageData<
    ListChecklistEntryItemsQuery["checklistQueries"]["entryItems"]
  >("entryItems", "entry/:id", { id });
  const items = (data ?? []).slice().sort((a, b) => a.position - b.position);

  return <EntryChecklist entryId={id} items={items} />;
};

export default EntryItems;
