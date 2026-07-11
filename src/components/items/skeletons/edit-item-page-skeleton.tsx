import { Card, CardBody, Skeleton } from "@sun/components";
import styles from "./edit-item-page-skeleton.module.css";

/**
 * Skeleton for the edit item page: a single 24rem card with a 16rem block.
 */
const EditItemPageSkeleton = () => (
  <Card className={styles.card}>
    <CardBody className={styles.body}>
      <Skeleton className={styles.block} />
    </CardBody>
  </Card>
);

export default EditItemPageSkeleton;
