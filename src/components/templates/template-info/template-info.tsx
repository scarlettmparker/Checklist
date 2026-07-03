import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { LocateChecklistTemplateQuery } from "~/generated/graphql";
import { Button, CardTitle } from "@sun/components";
import {
  ArchiveBoxIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import ConfirmArchiveTemplateDialog from "~/components/templates/confirm-archive-template-dialog";
import { archiveChecklistTemplate } from "~/server/actions/checklist-template";
import styles from "./template-info.module.css";

type TemplateInfoProps = {
  id: string;
  pattern: string;
};

/**
 * Renders the located template's name/description/status with edit + archive
 * actions.
 */
const TemplateInfo = ({ id, pattern }: TemplateInfoProps) => {
  const { t } = useTranslation("templates");
  const [confirmArchive, setConfirmArchive] = useState(false);
  const { data: template } = getPageData<
    LocateChecklistTemplateQuery["checklistQueries"]["template"]
  >("template", pattern, { id });

  if (!template) {
    return null;
  }

  return (
    <div className={styles.info}>
      <div className={styles.header}>
        <CardTitle className={styles.title}>{template.name}</CardTitle>
        <div className={styles.actions}>
          <Link to={`/templates/${id}/edit`}>
            <Button
              variant="secondary"
              title={t("edit-label")}
              aria-label={t("edit-label")}
            >
              <PencilSquareIcon width={16} height={16} />
              {t("edit-label")}
            </Button>
          </Link>
          <Button
            variant="secondary"
            title={t("archive-label")}
            aria-label={t("archive-label")}
            onClick={() => setConfirmArchive(true)}
          >
            <ArchiveBoxIcon width={16} height={16} />
            {t("archive-label")}
          </Button>
        </div>
      </div>
      {template.description && (
        <p className={styles.description}>{template.description}</p>
      )}
      <span className={styles.status}>
        {t("status")}: {template.status}
      </span>
      <ConfirmArchiveTemplateDialog
        open={confirmArchive}
        onClose={() => setConfirmArchive(false)}
        onConfirm={() => {
          setConfirmArchive(false);
          archiveChecklistTemplate(id);
        }}
        templateName={template.name}
        t={t}
      />
    </div>
  );
};

export default TemplateInfo;
