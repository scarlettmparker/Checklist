import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardBody, CardTitle } from "@sun/components";
import { ChecklistEntry } from "~/generated/graphql";
import styles from "./entry-card.module.css";

type EntryCardProps = {
  entry: ChecklistEntry;
};

/**
 * A carousel card representing a checklist entry; clicks into the entry.
 */
const EntryCard = ({ entry }: EntryCardProps) => {
  const { t } = useTranslation("entry");

  return (
    <Link to={`/entry/${entry.id}`} className={styles.link}>
      <Card className={styles.card}>
        <CardBody>
          <CardTitle className={styles.title}>
            {entry.name || t("untitled-entry")}
          </CardTitle>
        </CardBody>
      </Card>
    </Link>
  );
};

export default EntryCard;
