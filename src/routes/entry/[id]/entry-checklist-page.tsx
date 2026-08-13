import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Skeleton } from "@sun/components";
import EntryHeader from "~/components/entry/entry-header";
import EntryItems from "~/components/entry/entry-items";
import ChecklistItemsPrefetch from "~/components/entry/checklist-items-prefetch";
import EntryGallery from "~/components/entry/entry-gallery";
import { EntryChecklistPageSkeleton } from "~/components/entry/skeletons";
import styles from "./entry-checklist-page.module.css";

const PAGE = "entry/:id/picker";

const EntryChecklistPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.columns}>
        <div className={styles.left_column}>
          <Breadcrumb />
          <Suspense fallback={<EntryChecklistPageSkeleton />}>
            <EntryHeader id={id} />
            <EntryItems id={id} />
          </Suspense>
          <Suspense fallback={null}>
            <ChecklistItemsPrefetch id={id} pattern={PAGE} />
          </Suspense>
        </div>
        <div className={styles.right_column}>
          <Suspense
            fallback={<Skeleton style={{ width: "100%", height: "12rem" }} />}
          >
            <EntryGallery entryId={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default EntryChecklistPage;
