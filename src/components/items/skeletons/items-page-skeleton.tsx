import { Card, CardBody, CardHeader, Skeleton } from "@sun/components";
import styles from "./items-page-skeleton.module.css";

/**
 * Skeleton for the items list page.
 */
const ItemsPageSkeleton = () => (
  <>
    <Card>
      <CardHeader>
        <Skeleton className={styles.skeleton_title} />
      </CardHeader>
      <CardBody className={styles.skeleton_list}>
        <Skeleton className={styles.skeleton_row} />
        <Skeleton className={styles.skeleton_row} />
        <Skeleton className={styles.skeleton_row} />
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <Skeleton className={styles.skeleton_block} />
      </CardBody>
    </Card>
  </>
);

export default ItemsPageSkeleton;
