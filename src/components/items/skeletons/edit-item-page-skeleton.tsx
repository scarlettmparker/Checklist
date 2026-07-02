import { Card, CardBody, Skeleton } from "@sun/components";
import styles from "./form-page-skeleton.module.css";

/**
 * Skeleton for the edit item page.
 */
const EditItemPageSkeleton = () => (
  <Card>
    <CardBody className={styles.skeleton_body}>
      <Skeleton className={styles.skeleton_field} />
      <Skeleton className={styles.skeleton_field} />
      <Skeleton className={styles.skeleton_block} />
    </CardBody>
  </Card>
);

export default EditItemPageSkeleton;
