import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { LocateChecklistTemplateQuery } from "~/generated/graphql";
import { CardTitle } from "@sun/components";
import styles from "./template-info.module.css";

type TemplateInfoProps = {
  id: string;
  pattern: string;
};

/**
 * Renders the located template's name/description/status.
 */
const TemplateInfo = ({ id, pattern }: TemplateInfoProps) => {
  const { t } = useTranslation("templates");
  const { data: template } = getPageData<
    LocateChecklistTemplateQuery["checklistQueries"]["template"]
  >("template", pattern, { id });

  if (!template) {
    return null;
  }

  return (
    <div className={styles.info}>
      <CardTitle className={styles.title}>{template.name}</CardTitle>
      {template.description && (
        <p className={styles.description}>{template.description}</p>
      )}
      <span className={styles.status}>
        {t("status")}: {template.status}
      </span>
    </div>
  );
};

export default TemplateInfo;
