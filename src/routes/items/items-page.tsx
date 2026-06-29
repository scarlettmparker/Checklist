import { getPageData, pageDataRegistry } from "@sun/ssr";
import { useTranslation } from "react-i18next";
import { ListChecklistItemsQuery } from "~/generated/graphql";
import { fetchListChecklistItems } from "~/utils/api";

const ItemsPage = () => {
  const { t } = useTranslation("items");

  const { data } = getPageData<
    ListChecklistItemsQuery["checklistQueries"]["items"]
  >("checklistItems", "checklist");


  return (
    <></>
  )
};

/**
 * Server-side data fetching function for checklist items.
 */
async function getChecklistItemsData(): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchListChecklistItems();
    if (result?.data && result.success) {
      const checklistItems = (result.data as ListChecklistItemsQuery).checklistQueries
        .items;
      if (checklistItems) {
        return { checklistItems: checklistItems };
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch checklist items:", error);
    return null;
  }
}

/**
 * Register the data loader for this page.
 */
export function registerChecklistItemsDataLoader(): void {
  pageDataRegistry.registerPageDataLoader("checklist", getChecklistItemsData);
}


export default ItemsPage;