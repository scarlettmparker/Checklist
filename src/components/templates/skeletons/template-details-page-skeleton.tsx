import { Card, CardBody, Skeleton } from "@sun/components";
import styles from "./templates-page-skeleton.module.css";

/**
 * Skeleton for the template details page.
 */
const TemplateDetailsPageSkeleton = () => (
  <>
    <Card>
      <CardBody className={styles.skeleton_body}>
        <Skeleton className={styles.skeleton_field} />
        <Skeleton className={styles.skeleton_block} />
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <Skeleton className={styles.skeleton_block} />
      </CardBody>
    </Card>
  </>
);

export default TemplateDetailsPageSkeleton;
