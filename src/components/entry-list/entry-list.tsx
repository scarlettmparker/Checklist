import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { Link } from "react-router-dom";
import { ListChecklistEntriesQuery } from "~/generated/graphql";
import { Button, Card, CardBody } from "@sun/components";
import Carousel from "~/components/carousel";
import EntryCard from "~/components/entry-card";
import { createEntry } from "~/server/actions/checklist-entry";
import styles from "./entry-list.module.css";
import { CardHeader, CardTitle } from "@sun/components";
import { FolderIcon } from "lucide-react";

/**
 * The entries carousel or the empty state.
 */
const EntryList = () => {
  const { t } = useTranslation("entry");
  const { data } = getPageData<
    ListChecklistEntriesQuery["checklistQueries"]["listEntries"]
  >("entry", "entry");
  const entries = data ?? [];

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("entries-title")}</CardTitle>
        </CardHeader>
        <CardBody className={styles.empty_state}>
          <FolderIcon size={48} />
          <p className={styles.empty_text}>{t("no-entries")}</p>
          <div className={styles.create_buttons}>
            <Button onClick={() => createEntry()}>
              {t("create-entry-label")}
            </Button>
            <Link to="/entry/create">
              <Button variant="secondary">{t("create-from-template")}</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className={styles.with_entries}>
      <Carousel pageSize={3}>
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </Carousel>
      <Button className={styles.create_button} onClick={() => createEntry()}>
        {t("create-entry-label")}
      </Button>
    </div>
  );
};

export default EntryList;
