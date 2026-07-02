import { Card, CardBody, Skeleton } from "@sun/components";
import styles from "./create-entry-from-template-page-skeleton.module.css";

/**
 * Skeleton for the create-entry-from-template page.
 */
const CreateEntryFromTemplatePageSkeleton = () => (
  <Card>
    <CardBody className={styles.skeleton_body}>
      <Skeleton className={styles.skeleton_field} />
      <Skeleton className={styles.skeleton_field} />
    </CardBody>
  </Card>
);

export default CreateEntryFromTemplatePageSkeleton;
