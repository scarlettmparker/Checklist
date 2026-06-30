import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { Link } from "react-router-dom";
import { ListChecklistEntriesQuery } from "~/generated/graphql";
import { Button, Card, CardBody } from "@sun/components";
import Carousel from "~/components/carousel";
import EntryCard from "~/components/entry-card";
import { createEntry } from "~/server/actions/checklist-entry";
import styles from "./entry-list.module.css";

/**
 * The entries carousel or the empty state. Suspends on getPageData; wrap in a
 * Suspense boundary.
 */
const EntryList = () => {
  const { t } = useTranslation("entries");
  const { data } = getPageData<
    ListChecklistEntriesQuery["checklistQueries"]["listEntries"]
  >("entries", "entries");
  const entries = data ?? [];

  if (entries.length === 0) {
    return (
      <Card>
        <CardBody className={styles.empty_state}>
          <p className={styles.empty_text}>{t("no-entries")}</p>
          <Button onClick={() => createEntry()}>
            {t("create-entry-label")}
          </Button>
          <Link to="/entries/create" className={styles.from_template_link}>
            {t("create-from-template")}
          </Link>
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
      <Button
        className={styles.create_button}
        onClick={() => createEntry()}
      >
        {t("create-entry-label")}
      </Button>
    </div>
  );
};

export default EntryList;
