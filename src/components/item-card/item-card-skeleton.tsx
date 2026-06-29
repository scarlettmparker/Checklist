import { Card, CardBody, CardHeader, Skeleton } from "@sun/components";
import styles from "./item-card.module.css";

/**
 * Skeleton placeholder for ItemCard.
 */
const ItemCardSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className={styles.skeleton_title} />
    </CardHeader>
    <CardBody>
      <Skeleton className={styles.skeleton_block} />
    </CardBody>
  </Card>
);

export default ItemCardSkeleton;
