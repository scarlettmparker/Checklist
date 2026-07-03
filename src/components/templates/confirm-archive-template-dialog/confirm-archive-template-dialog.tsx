import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sun/components";
import { TFunction } from "i18next";

type ConfirmArchiveTemplateDialogProps = {
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
   * Display name of the template being archived.
   */
  templateName: string;
  /**
   * i18n translation function for the templates namespace.
   */
  t: TFunction<"templates">;
};

/**
 * Confirmation dialog for archiving a checklist template. Owns its own
 * translations rather than receiving pre-rendered strings.
 */
const ConfirmArchiveTemplateDialog = ({
  open,
  onClose,
  onConfirm,
  templateName,
  t,
}: ConfirmArchiveTemplateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <DialogHeader>
        <DialogTitle>{t("archive-template-title")}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>{t("archive-template-body", { name: templateName })}</p>
      </DialogBody>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onClose}>
          {t("cancel-label")}
        </Button>
        <Button type="submit" variant="destructive" onClick={onConfirm}>
          {t("archive-label")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmArchiveTemplateDialog;
