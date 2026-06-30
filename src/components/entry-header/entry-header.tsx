import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { LocateChecklistEntryQuery } from "~/generated/graphql";
import { Card, CardBody, useBreadcrumbContext } from "@sun/components";
import styles from "./entry-header.module.css";

type EntryHeaderProps = {
  id: string;
};

/**
 * Entry title + breadcrumb.
 */
const EntryHeader = ({ id }: EntryHeaderProps) => {
  const { t } = useTranslation("entries");
  const { setBreadcrumbs, setCurrent } = useBreadcrumbContext();
  const { data: entry } = getPageData<
    LocateChecklistEntryQuery["checklistQueries"]["entry"]
  >("entry", "entries/:id", { id });

  useEffect(() => {
    setBreadcrumbs([
      { label: t("entries-title"), href: "/entries" },
      { label: entry?.name || t("untitled-entry"), href: `/entries/${id}` },
    ]);
    setCurrent(`/entries/${id}`);
  }, [entry?.name, id, setBreadcrumbs, setCurrent, t]);

  if (!entry) {
    return null;
  }

  return (
    <Card>
      <CardBody>
        <h2 className={styles.title}>{entry.name || t("untitled-entry")}</h2>
      </CardBody>
    </Card>
  );
};

export default EntryHeader;
