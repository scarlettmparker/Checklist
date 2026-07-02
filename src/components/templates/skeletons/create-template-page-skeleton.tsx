import { Card, CardBody, Skeleton } from "@sun/components";
import styles from "./templates-page-skeleton.module.css";

/**
 * Skeleton for the create template page.
 */
const CreateTemplatePageSkeleton = () => (
  <Card>
    <CardBody className={styles.skeleton_body}>
      <Skeleton className={styles.skeleton_row} />
      <Skeleton className={styles.skeleton_block} />
    </CardBody>
  </Card>
);

export default CreateTemplatePageSkeleton;
