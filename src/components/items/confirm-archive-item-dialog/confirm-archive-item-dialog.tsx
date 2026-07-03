import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sun/components";
import { TFunction } from "i18next";

type ConfirmArchiveItemDialogProps = {
  /**
   * Whether the dialog is open.
   */
  open: boolean;
  /**
   * Callback to close the dialog without confirming.
   */
  onClose: () => void;
  /**
   * Callback to fire the archive mutation.
   */
  onConfirm: () => void;
  /**
   * Display name of the item being archived.
   */
  itemName: string;
  /**
   * i18n translation function for the items namespace.
   */
  t: TFunction<"items">;
};

/**
 * Confirmation dialog for archiving a checklist item. Owns its own
 * translations rather than receiving pre-rendered strings.
 */
const ConfirmArchiveItemDialog = ({
  open,
  onClose,
  onConfirm,
  itemName,
  t,
}: ConfirmArchiveItemDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <DialogHeader>
        <DialogTitle>{t("archive-item-title")}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>{t("archive-item-body", { name: itemName })}</p>
      </DialogBody>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onClose}>
          {t("cancel-label")}
        </Button>
        <Button type="submit" variant="destructive" onClick={onConfirm}>
          {t("confirm-label")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmArchiveItemDialog;
