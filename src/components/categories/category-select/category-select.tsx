import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistCategoriesQuery } from "~/generated/graphql";
import { Select, SelectOption, Skeleton } from "@sun/components";

type CategorySelectProps = {
  /**
   * Form field name applied to the underlying select.
   */
  name?: string;
  /**
   * Currently selected category id (for pre-populating edit forms).
   */
  defaultValue?: string | null;
};

export const CATEGORY_NONE = "__none__";

/**
 * Select listing every category, used inside item create/edit forms. Reads the
 * shared "categories" page-data key, so the categories loader must be registered.
 */
const CategorySelectInner = ({ name, defaultValue }: CategorySelectProps) => {
  const { t } = useTranslation("items");
  const { data } = getPageData<
    ListChecklistCategoriesQuery["checklistQueries"]["listCategories"]
  >("categories", "categories");
  const categories = data ?? [];
  const selected =
    defaultValue && defaultValue.length > 0 ? defaultValue : CATEGORY_NONE;

  return (
    <Select name={name} defaultValue={selected}>
      <SelectOption value={CATEGORY_NONE}>{t("none")}</SelectOption>
      {categories.map((category) => (
        <SelectOption key={category.id} value={category.id}>
          {category.name}
        </SelectOption>
      ))}
    </Select>
  );
};

/**
 * Suspense-wrapped category select.
 */
const CategorySelect = (props: CategorySelectProps) => (
  <Suspense fallback={<Skeleton style={{ width: "100%", height: "3rem" }} />}>
    <CategorySelectInner {...props} />
  </Suspense>
);

export default CategorySelect;
