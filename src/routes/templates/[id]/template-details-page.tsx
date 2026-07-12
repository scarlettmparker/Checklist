import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Skeleton } from "@sun/components";
import TemplateInfo from "~/components/templates/template-info";
import TemplateItems from "~/components/templates/template-items";
import TemplateDetailsCard from "~/components/templates/template-details-card";
import { TemplateDetailsPageSkeleton } from "~/components/templates/skeletons";
import styles from "./template-details-page.module.css";

const PAGE = "templates/:id";

/**
 * Template details page.
 */
const TemplateDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className={styles.detail_layout}>
      <Suspense fallback={<TemplateDetailsPageSkeleton />}>
        <Card>
          <CardBody className={styles.overview_body}>
            <TemplateInfo id={id} pattern={PAGE} />
            <Suspense
              fallback={<Skeleton style={{ width: "100%", height: "6rem" }} />}
            >
              <TemplateItems id={id} pattern={PAGE} />
            </Suspense>
          </CardBody>
        </Card>
        <TemplateDetailsCard id={id} pattern={PAGE} />
      </Suspense>
    </div>
  );
};

export default TemplateDetailsPage;
