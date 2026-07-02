import { Card, CardBody, CardHeader, Skeleton } from "@sun/components";
import styles from "./templates-page-skeleton.module.css";

/**
 * Skeleton for the templates list page.
 */
const TemplatesPageSkeleton = () => (
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
      <CardBody>
        <Skeleton className={styles.skeleton_block} />
      </CardBody>
    </Card>
  </>
);

export default TemplatesPageSkeleton;
