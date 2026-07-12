import { Suspense } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "~/components/items/item-card";
import ItemDetailsCard from "~/components/items/item-details-card";
import { ItemDetailsPageSkeleton } from "~/components/items/skeletons";
import styles from "./item-details-page.module.css";

const PAGE = "checklist/:id";

/**
 * Item details page. Renders two independently-suspended cards: the core item
 * and its detail, each in its own Suspense boundary so they stream in.
 */
const ItemDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className={styles.detail_layout}>
      <Suspense fallback={<ItemDetailsPageSkeleton />}>
        <ItemCard id={id} pattern={PAGE} />
        <ItemDetailsCard id={id} pattern={PAGE} />
      </Suspense>
    </div>
  );
};

export default ItemDetailsPage;
