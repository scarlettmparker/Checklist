import { Suspense } from "react";
import { pageDataRegistry } from "@sun/ssr";
import { ListChecklistEntriesQuery } from "~/generated/graphql";
import { fetchListChecklistEntries } from "~/utils/api";
import { Skeleton } from "@sun/components";
import EntryList from "~/components/entry-list";
import styles from "./entries-page.module.css";

const EntriesPage = () => {
  return (
    <div className={styles.entries_layout}>
      <Suspense
        fallback={<Skeleton style={{ width: "100%", height: "10rem" }} />}
      >
        <EntryList />
      </Suspense>
    </div>
  );
};

/**
 * Server-side data fetching function for checklist entries.
 */
async function getEntriesData(): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchListChecklistEntries();
    if (result?.data && result.success) {
      const entries = (result.data as ListChecklistEntriesQuery)
        .checklistQueries.listEntries;
      if (entries) {
        return { entry: entries };
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch checklist entries:", error);
    return null;
  }
}

/**
 * Register the data loader for this page.
 */
export function registerChecklistEntriesDataLoader(): void {
  pageDataRegistry.registerPageDataLoader("entry", getEntriesData);
}

export default EntriesPage;
