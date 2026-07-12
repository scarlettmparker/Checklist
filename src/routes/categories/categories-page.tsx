import { useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@sun/components";
import { PlusIcon } from "@heroicons/react/24/outline";
import CategoryList from "~/components/categories/category-list";
import { CategoryListSkeleton } from "~/components/categories/skeletons";
import CreateCategoryDialog from "~/components/categories/create-category-dialog";
import styles from "./categories-page.module.css";

const PAGE = "categories";

/**
 * Categories management page: lists categories and creates new ones.
 */
const CategoriesPage = () => {
  const { t } = useTranslation("categories");
  const [showCreate, setShowCreate] = useState(false);
  const ICON_SIZE = 16;

  return (
    <div className={styles.layout}>
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList pattern={PAGE} />
      </Suspense>
      <div className={styles.header}>
        <Button
          title={t("create-category-label")}
          onClick={() => setShowCreate(true)}
        >
          <PlusIcon
            className={styles.button_icon}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
          {t("create-category-label")}
        </Button>
      </div>
      <CreateCategoryDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </div>
  );
};

export default CategoriesPage;
