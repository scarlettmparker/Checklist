import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";

type ChecklistItemsPrefetchProps = {
  id: string;
  pattern: string;
};

/**
 * Forces SSR to load the picker's checklist items so the picker reads hydrated
 * data instead of triggering a client RPC.
 */
const ChecklistItemsPrefetch = ({
  id,
  pattern,
}: ChecklistItemsPrefetchProps) => {
  getPageData<ListChecklistItemsQuery["checklistQueries"]["items"]>(
    "checklistItems",
    pattern,
    { id },
  );
  return null;
};

export default ChecklistItemsPrefetch;
