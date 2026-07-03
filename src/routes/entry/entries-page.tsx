import { Suspense } from "react";
import { pageDataRegistry } from "@sun/ssr";
import { ListChecklistEntriesQuery } from "~/generated/graphql";
import { fetchListChecklistEntries } from "~/utils/api";
import EntryList from "~/components/entry/entry-list";
import { EntriesPageSkeleton } from "~/components/entry/skeletons";
import styles from "./entries-page.module.css";

const EntriesPage = () => {
  return (
    <div className={styles.entries_layout}>
      <Suspense fallback={<EntriesPageSkeleton />}>
        <EntryList />
      </Suspense>
    </div>
  );
};

/**
 * Server-side data fetching function for checklist entries.
 *
 * Always returns a non-null entry list so the page never throws
 * "No data returned for key: entry" when the backend returns null or the
 * request transiently fails (which crashed the first preview load).
 */
async function getEntriesData(): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchListChecklistEntries();
    if (result?.data && result.success) {
      const entries = (result.data as ListChecklistEntriesQuery)
        .checklistQueries.listEntries;
      return { entry: entries ?? [] };
    }
    return { entry: [] };
  } catch (error) {
    console.error("Failed to fetch checklist entries:", error);
    return { entry: [] };
  }
}

/**
 * Register the data loader for this page.
 */
export function registerChecklistEntriesDataLoader(): void {
  pageDataRegistry.registerPageDataLoader("entry", getEntriesData);
}

export default EntriesPage;
