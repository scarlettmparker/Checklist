import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { ListChecklistTemplatesQuery } from "~/generated/graphql";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sun/components";
import Icon from "~/components/icon";
import styles from "./template-list.module.css";

type TemplateListProps = {
  /**
   * Route pattern used by getPageData.
   */
  pattern: string;
};

/**
 * The templates list card.
 */
const TemplateList = ({ pattern }: TemplateListProps) => {
  const { t } = useTranslation("templates");
  const { data } = getPageData<
    ListChecklistTemplatesQuery["checklistQueries"]["listTemplates"]
  >("templates", pattern);
  const templates = data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("templates-title")}</CardTitle>
      </CardHeader>
      <CardBody className={styles.list_body}>
        {templates.length === 0 ? (
          <p className={styles.no_templates}>{t("no-templates-found")}</p>
        ) : (
          templates.map((template) => (
            <Link
              key={template.id}
              to={`/templates/${template.id}`}
              className={styles.template_link}
            >
              <Button variant="secondary" className={styles.template_button}>
                <Icon
                  name="RectangleStackIcon"
                  className={styles.template_icon}
                  width={16}
                  height={16}
                />
                <span className={styles.template_name}>{template.name}</span>
              </Button>
            </Link>
          ))
        )}
      </CardBody>
      <CardFooter>
        {t("templates-count", { count: templates.length })}
      </CardFooter>
    </Card>
  );
};

export default TemplateList;
