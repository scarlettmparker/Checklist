import { TFunction } from "i18next";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sun/components";
import { ChecklistEntry } from "~/generated/graphql";
import { archiveEntry } from "~/server/actions/checklist-entry";

type ConfirmArchiveEntryDialogProps = {
  /**
   * Whether the dialog is open.
   */
  open: boolean;
  /**
   * Called to close the dialog without confirming.
   */
  onClose: () => void;
  /**
   * The entry to archive (null when closed).
   */
  entry: ChecklistEntry | null;
  /**
   * i18n translation function for the entry namespace.
   */
  t: TFunction<"entry">;
};

/**
 * Confirmation dialog for archiving a checklist entry.
 */
const ConfirmArchiveEntryDialog = ({
  open,
  onClose,
  entry,
  t,
}: ConfirmArchiveEntryDialogProps) => {
  if (!entry) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <DialogHeader>
        <DialogTitle>{t("archive-entry-title")}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>{t("archive-entry-body", { name: entry.name })}</p>
      </DialogBody>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onClose}>
          {t("cancel-label")}
        </Button>
        <Button
          type="submit"
          variant="destructive"
          onClick={() => {
            onClose();
            archiveEntry(entry.id);
          }}
        >
          {t("archive-entry-submit")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmArchiveEntryDialog;
