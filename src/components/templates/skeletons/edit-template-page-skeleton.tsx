import { Card, CardBody, Skeleton } from "@sun/components";
import styles from "./edit-template-page-skeleton.module.css";

/**
 * Skeleton for the edit template page.
 */
const EditTemplatePageSkeleton = () => (
  <div className={styles.stack}>
    <Card>
      <CardBody>
        <Skeleton className={styles.block} />
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <Skeleton className={styles.block} />
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <Skeleton className={styles.block} />
      </CardBody>
    </Card>
  </div>
);

export default EditTemplatePageSkeleton;
