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
import { deleteEntry } from "~/server/actions/checklist-entry";

type ConfirmDeleteEntryDialogProps = {
  /**
   * Whether the dialog is open.
   */
  open: boolean;
  /**
   * Called to close the dialog without confirming.
   */
  onClose: () => void;
  /**
   * The entry to delete (null when closed).
   */
  entry: ChecklistEntry | null;
  /**
   * i18n translation function for the entry namespace.
   */
  t: TFunction<"entry">;
};

/**
 * Confirmation dialog for permanently deleting a checklist entry.
 */
const ConfirmDeleteEntryDialog = ({
  open,
  onClose,
  entry,
  t,
}: ConfirmDeleteEntryDialogProps) => {
  if (!entry) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <DialogHeader>
        <DialogTitle>{t("delete-entry-title")}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>{t("delete-entry-body", { name: entry.name })}</p>
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
            deleteEntry(entry.id);
          }}
        >
          {t("delete-entry-submit")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmDeleteEntryDialog;
