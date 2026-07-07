import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePageData } from "@sun/ssr/react";
import { Link } from "react-router-dom";
import { ListChecklistEntriesQuery } from "~/generated/graphql";
import { Button, Card, CardBody } from "@sun/components";
import { CardHeader, CardTitle } from "@sun/components";
import { FolderIcon } from "lucide-react";
import Carousel from "~/components/shared/carousel";
import EntryCard from "~/components/entry/entry-card";
import CreateEntryDialog from "~/components/entry/create-entry-dialog";
import styles from "./entry-list.module.css";

/**
 * The entries carousel or the empty state.
 */
const EntryList = () => {
  const { t } = useTranslation("entry");
  const { data } = usePageData<
    ListChecklistEntriesQuery["checklistQueries"]["listEntries"]
  >("entry", "entry");
  const entries = data ?? [];
  const [createOpen, setCreateOpen] = useState(false);

  const createButtons = (
    <div className={styles.create_buttons}>
      <Button onClick={() => setCreateOpen(true)}>
        {t("create-entry-label")}
      </Button>
      <Link to="/entry/create">
        <Button variant="secondary">{t("create-from-template")}</Button>
      </Link>
    </div>
  );

  return (
    <>
      {entries.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{t("entry-title")}</CardTitle>
          </CardHeader>
          <CardBody className={styles.empty_state}>
            <FolderIcon size={48} />
            <p className={styles.empty_text}>{t("no-entries")}</p>
            {createButtons}
          </CardBody>
        </Card>
      ) : (
        <div className={styles.with_entries}>
          <Carousel pageSize={3}>
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </Carousel>
          {createButtons}
        </div>
      )}
      <CreateEntryDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        t={t}
      />
    </>
  );
};

export default EntryList;
