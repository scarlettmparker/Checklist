import { Card, CardBody, Skeleton } from "@sun/components";

/**
 * Skeleton placeholder for ItemDetailsCard.
 */
const ItemDetailsCardSkeleton = () => (
  <Card>
    <CardBody>
      <Skeleton style={{ width: "100%", height: "12rem" }} />
    </CardBody>
  </Card>
);

export default ItemDetailsCardSkeleton;
