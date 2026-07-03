import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistTemplateItemsQuery } from "~/generated/graphql";
import { CardTitle, Pagination } from "@sun/components";
import Icon from "~/components/shared/icon";
import styles from "./template-items.module.css";

type TemplateItemsProps = {
  id: string;
  pattern: string;
};

/**
 * Renders the items belonging to a template.
 */
const TemplateItems = ({ id, pattern }: TemplateItemsProps) => {
  const { t } = useTranslation("templates");
  const [page, setPage] = useState(1);
  const { data } = getPageData<
    ListChecklistTemplateItemsQuery["checklistQueries"]["templateItems"]
  >("templateItems", pattern, { id, page: String(page) });
  const items = (data?.items ?? [])
    .slice()
    .sort((a, b) => a.position - b.position);
  const pageInfo = data?.pageInfo;

  return (
    <div className={styles.items}>
      <CardTitle className={styles.subtitle}>
        {t("items-in-template")}
      </CardTitle>
      {items.length === 0 ? (
        <p className={styles.no_items}>{t("no-items")}</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className={styles.item_row}>
            <Icon
              name={item.icon}
              className={styles.item_icon}
              width={16}
              height={16}
            />
            <span className={styles.item_name}>{item.name}</span>
          </div>
        ))
      )}
      {pageInfo && pageInfo.totalPages > 1 && (
        <Pagination
          page={pageInfo.page + 1}
          totalPages={pageInfo.totalPages}
          onPageChange={setPage}
          className={styles.pagination}
        />
      )}
    </div>
  );
};

export default TemplateItems;
