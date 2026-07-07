import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPageData } from "@sun/ssr";
import { LocateChecklistEntryQuery } from "~/generated/graphql";
import {
  Button,
  Card,
  CardBody,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useBreadcrumbContext,
} from "@sun/components";
import {
  ArchiveBoxIcon,
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import EditEntryNameDialog from "~/components/entry/edit-entry-name-dialog";
import ConfirmArchiveEntryDialog from "~/components/entry/confirm-archive-entry-dialog";
import ConfirmDeleteEntryDialog from "~/components/entry/confirm-delete-entry-dialog";
import styles from "./entry-header.module.css";

type EntryHeaderProps = {
  id: string;
};

const ICON_SIZE = 16;

/**
 * Entry title + breadcrumb, with a link to seed a new template from this
 * entry's items and a menu for rename / archive / delete.
 */
const EntryHeader = ({ id }: EntryHeaderProps) => {
  const { t } = useTranslation("entry");
  const navigate = useNavigate();
  const { setBreadcrumbs, setCurrent } = useBreadcrumbContext();
  const { data: entry } = getPageData<
    LocateChecklistEntryQuery["checklistQueries"]["entry"]
  >("entry", "entry/:id", { id });
  const [editOpen, setEditOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className={styles.menu_button}
              title={t("entry-title")}
              aria-label={t("entry-title")}
            >
              <EllipsisVerticalIcon width={ICON_SIZE} height={ICON_SIZE} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PencilSquareIcon className={styles.menu_icon} width={ICON_SIZE} height={ICON_SIZE} />
              {t("edit-label")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(
                  `/templates/create?entryId=${id}&from=${encodeURIComponent(`/entry/${id}`)}`,
                )
              }
            >
              <DocumentDuplicateIcon className={styles.menu_icon} width={ICON_SIZE} height={ICON_SIZE} />
              {t("create-template-from-entry")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setArchiveOpen(true)}>
              <ArchiveBoxIcon className={styles.menu_icon} width={ICON_SIZE} height={ICON_SIZE} />
              {t("archive-label")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
              <TrashIcon className={styles.menu_icon} width={ICON_SIZE} height={ICON_SIZE} />
              {t("delete-label")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardBody>
      <EditEntryNameDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        entry={entry}
        t={t}
      />
      <ConfirmArchiveEntryDialog
        open={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        entry={entry}
        t={t}
      />
      <ConfirmDeleteEntryDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        entry={entry}
        t={t}
      />
    </Card>
  );
};

export default EntryHeader;
