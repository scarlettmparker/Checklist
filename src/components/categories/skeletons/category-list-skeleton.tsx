import { Card, CardBody, CardHeader, Skeleton } from "@sun/components";
import styles from "./category-list-skeleton.module.css";

/**
 * Loading skeleton for the category list.
 */
const CategoryListSkeleton = () => (
  <>
    <Card className={styles.card}>
      <CardHeader>
        <Skeleton className={styles.skeleton_title} />
      </CardHeader>
      <CardBody>
        <Skeleton className={styles.skeleton_desc} />
      </CardBody>
    </Card>
    <Card className={styles.card}>
      <CardHeader>
        <Skeleton className={styles.skeleton_title} />
      </CardHeader>
      <CardBody>
        <Skeleton className={styles.skeleton_desc} />
      </CardBody>
    </Card>
  </>
);

export default CategoryListSkeleton;
