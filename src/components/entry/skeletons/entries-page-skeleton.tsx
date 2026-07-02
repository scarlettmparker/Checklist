import { Card, CardBody, Skeleton } from "@sun/components";
import styles from "./entries-page-skeleton.module.css";

/**
 * Skeleton for the entries carousel page.
 */
const EntriesPageSkeleton = () => (
  <Card>
    <CardBody className={styles.skeleton_body}>
      <Skeleton className={styles.skeleton_row} />
      <Skeleton className={styles.skeleton_row} />
      <Skeleton className={styles.skeleton_row} />
    </CardBody>
  </Card>
);

export default EntriesPageSkeleton;
