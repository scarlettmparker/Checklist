import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  makeCacheKey,
  MutationResult,
  mutationRegistry,
  pageDataRegistry,
} from "@sun/ssr";
import { Button } from "@sun/components";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ListChecklistCategoriesQuery } from "~/generated/graphql";
import {
  fetchListChecklistCategories,
  mutateCreateChecklistCategory,
} from "~/utils/api";
import CategoryList from "~/components/categories/category-list";
import { CategoryListSkeleton } from "~/components/categories/skeletons";
import CreateCategoryDialog from "~/components/categories/create-category-dialog";
import { Suspense } from "react";
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

/**
 * Server-side data fetcher for all categories (non-null sentinel).
 */
async function getCategoriesData(): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchListChecklistCategories();
    if (result?.data && result.success) {
      const categories = (result.data as ListChecklistCategoriesQuery)
        .checklistQueries.listCategories;
      return { categories: categories ?? [] };
    }
    return { categories: [] };
  } catch (error) {
    console.error("Failed to fetch checklist categories:", error);
    return { categories: [] };
  }
}

/**
 * Handler for creating a new category; invalidates the categories list.
 */
async function handleCreateCategory(
  body: Record<string, unknown>,
): Promise<MutationResult> {
  const { name, description } = body;
  const result = await mutateCreateChecklistCategory(
    name as string,
    description as string | undefined,
  );
  const data = result.data?.checklistMutations.createCategory as MutationResult;

  return {
    ...(data ?? {
      __typename: "StandardError",
      message: result.error || "Failed to create category.",
    }),
    invalidated: [makeCacheKey("categories:categories", {})],
  };
}

/**
 * Register the categories data loader and create mutation handler.
 */
export function registerCategoriesDataAndMutation(): void {
  pageDataRegistry.registerPageDataLoader(PAGE, getCategoriesData);
  mutationRegistry.registerMutationHandler(
    "categories/create",
    handleCreateCategory,
  );
}

export default CategoriesPage;
