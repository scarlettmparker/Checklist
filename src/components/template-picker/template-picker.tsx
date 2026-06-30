import { getPageData } from "@sun/ssr";
import { ListChecklistTemplatesQuery } from "~/generated/graphql";
import { Button } from "@sun/components";
import Icon from "~/components/icon";
import styles from "./template-picker.module.css";

type TemplatePickerProps = {
  onCreate: (templateId: string) => void;
  disabled?: boolean;
  /**
   * i18n translation function
   */
  t: (key: string, options?: Record<string, unknown>) => string;
};

/**
 * Lists templates as clickable rows.
 */
const TemplatePicker = ({ onCreate, disabled, t }: TemplatePickerProps) => {
  const { data } = getPageData<
    ListChecklistTemplatesQuery["checklistQueries"]["listTemplates"]
  >("templates", "templates");
  const templates = data ?? [];

  return (
    <div className={styles.list}>
      {templates.map((tpl) => (
        <Button
          key={tpl.id}
          variant="secondary"
          className={styles.row}
          disabled={disabled}
          onClick={() => onCreate(tpl.id)}
        >
          <Icon
            name="RectangleStackIcon"
            className={styles.icon}
            width={16}
            height={16}
          />
          <span className={styles.name}>{tpl.name}</span>
        </Button>
      ))}
      <p>{t("templates-count", { count: templates.length })}</p>
    </div>
  );
};

export default TemplatePicker;
