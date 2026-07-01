import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";

type ChecklistItemsPrefetchProps = {
  id: string;
  pattern: string;
};

/**
 * Forces SSR to load checklistItems so the picker reads hydrated data.
 */
const ChecklistItemsPrefetch = ({ id, pattern }: ChecklistItemsPrefetchProps) => {
  getPageData<ListChecklistItemsQuery["checklistQueries"]["items"]>(
    "checklistItems",
    pattern,
    { id },
  );
  return null;
};

export default ChecklistItemsPrefetch;
