import { Card, CardBody, CardHeader, Skeleton } from "@sun/components";
import styles from "./entry-checklist-page-skeleton.module.css";

/**
 * Skeleton for the entry checklist page.
 */
const EntryChecklistPageSkeleton = () => (
  <>
    <Card>
      <CardHeader>
        <Skeleton className={styles.skeleton_title} />
      </CardHeader>
      <CardBody className={styles.skeleton_list}>
        <Skeleton className={styles.skeleton_row} />
        <Skeleton className={styles.skeleton_row} />
      </CardBody>
    </Card>
    <Card>
      <CardHeader>
        <Skeleton className={styles.skeleton_title} />
      </CardHeader>
      <CardBody>
        <Skeleton className={styles.skeleton_block} />
      </CardBody>
    </Card>
  </>
);

export default EntryChecklistPageSkeleton;
