import ItemCardSkeleton from "~/components/items/item-card/item-card-skeleton";
import ItemDetailsCardSkeleton from "~/components/items/item-details-card/item-details-card-skeleton";

/**
 * Skeleton for the item details page.
 */
const ItemDetailsPageSkeleton = () => (
  <>
    <ItemCardSkeleton />
    <ItemDetailsCardSkeleton />
  </>
);

export default ItemDetailsPageSkeleton;
