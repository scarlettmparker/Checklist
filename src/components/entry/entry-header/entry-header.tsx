import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { LocateChecklistEntryQuery } from "~/generated/graphql";
import { Card, CardBody, Button, useBreadcrumbContext } from "@sun/components";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import styles from "./entry-header.module.css";

type EntryHeaderProps = {
  id: string;
};

const ICON_SIZE = 16;

/**
 * Entry title + breadcrumb, with a link to seed a new template from this
 * entry's items.
 */
const EntryHeader = ({ id }: EntryHeaderProps) => {
  const { t } = useTranslation("entry");
  const { setBreadcrumbs, setCurrent } = useBreadcrumbContext();
  const { data: entry } = getPageData<
    LocateChecklistEntryQuery["checklistQueries"]["entry"]
  >("entry", "entry/:id", { id });

  useEffect(() => {
    setBreadcrumbs([
      { label: t("entry-title"), href: "/" },
      { label: entry?.name || t("untitled-entry"), href: `/entry/${id}` },
    ]);
    setCurrent(`/entry/${id}`);
  }, [entry?.name, id, setBreadcrumbs, setCurrent, t]);

  if (!entry) {
    return null;
  }

  return (
    <Card>
      <CardBody className={styles.header}>
        <h2 className={styles.title}>{entry.name || t("untitled-entry")}</h2>
        <Link
          to={`/templates/create?entryId=${id}&from=${encodeURIComponent(`/entry/${id}`)}`}
          className={styles.create_template_link}
        >
          <Button
            variant="secondary"
            title={t("create-template-from-entry")}
          >
            <DocumentDuplicateIcon
              className={styles.button_icon}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            {t("create-template-from-entry")}
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default EntryHeader;
