import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistCategoriesQuery } from "~/generated/graphql";
import { Card, CardBody, CardHeader, CardTitle, Skeleton } from "@sun/components";
import styles from "./category-list.module.css";

type CategoryListProps = {
  /**
   * Route pattern used by getPageData.
   */
  pattern: string;
};

/**
 * Lists all checklist categories.
 */
const CategoryList = ({ pattern }: CategoryListProps) => {
  const { t } = useTranslation("categories");
  const { data } = getPageData<
    ListChecklistCategoriesQuery["checklistQueries"]["listCategories"]
  >("categories", pattern);
  const categories = data ?? [];

  if (categories.length === 0) {
    return (
      <Card>
        <CardBody>
          <p className={styles.empty}>{t("no-categories")}</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
          </CardHeader>
          <CardBody>
            <p className={styles.description}>
              {category.description || t("no-description")}
            </p>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

/**
 * Loading skeleton for the category list.
 */
export const CategoryListSkeleton = () => (
  <Card>
    <CardBody>
      <Skeleton style={{ width: "100%", height: "8rem" }} />
    </CardBody>
  </Card>
);

export default CategoryList;
