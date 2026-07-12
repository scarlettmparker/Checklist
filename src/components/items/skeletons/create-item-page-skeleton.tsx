import { Card, CardBody, Skeleton } from "@sun/components";
import styles from "./form-page-skeleton.module.css";

/**
 * Skeleton for the create item page.
 */
const CreateItemPageSkeleton = () => (
  <Card className={styles.card}>
    <CardBody className={styles.skeleton_body}>
      <Skeleton className={styles.skeleton_field} />
      <Skeleton className={styles.skeleton_field} />
      <Skeleton className={styles.skeleton_block} />
    </CardBody>
  </Card>
);

export default CreateItemPageSkeleton;
