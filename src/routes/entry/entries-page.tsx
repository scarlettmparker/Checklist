import { Suspense } from "react";
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

export default EntriesPage;
