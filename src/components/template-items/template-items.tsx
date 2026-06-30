import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistTemplateItemsQuery } from "~/generated/graphql";
import { CardTitle } from "@sun/components";
import Icon from "~/components/icon";
import styles from "./template-items.module.css";

type TemplateItemsProps = {
  id: string;
  pattern: string;
};

/**
 * Renders the items belonging to a template (icon + name, resolved by the
 * backend). Suspends on its own getPageData call; wrap in a Suspense boundary.
 */
const TemplateItems = ({ id, pattern }: TemplateItemsProps) => {
  const { t } = useTranslation("templates");
  const { data } = getPageData<
    ListChecklistTemplateItemsQuery["checklistQueries"]["templateItems"]
  >("templateItems", pattern, { id });
  const items = (data ?? [])
    .slice()
    .sort((a, b) => a.position - b.position);

  return (
    <div className={styles.items}>
      <CardTitle className={styles.subtitle}>{t("items-in-template")}</CardTitle>
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
    </div>
  );
};

export default TemplateItems;
