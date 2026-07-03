import { getPageData } from "@sun/ssr";
import { ListChecklistItemsQuery } from "~/generated/graphql";

type ChecklistItemsPrefetchProps = {
  id: string;
  pattern: string;
};

/**
 * Forces SSR to load the picker's first page of checklist items so the picker
 * reads hydrated data. The page param must match the picker's default page.
 */
const ChecklistItemsPrefetch = ({
  id,
  pattern,
}: ChecklistItemsPrefetchProps) => {
  getPageData<ListChecklistItemsQuery["checklistQueries"]["items"]>(
    "checklistItems",
    pattern,
    { id, page: "1" },
  );
  return null;
};

export default ChecklistItemsPrefetch;
