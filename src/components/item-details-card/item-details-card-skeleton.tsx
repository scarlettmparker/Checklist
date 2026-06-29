import { Card, CardBody, CardHeader, Skeleton } from "@sun/components";
import styles from "./item-details-card.module.css";

/**
 * Skeleton placeholder for ItemDetailsCard.
 */
const ItemDetailsCardSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className={styles.skeleton_title} />
    </CardHeader>
    <CardBody>
      <Skeleton className={styles.skeleton_block} />
    </CardBody>
  </Card>
);

export default ItemDetailsCardSkeleton;
