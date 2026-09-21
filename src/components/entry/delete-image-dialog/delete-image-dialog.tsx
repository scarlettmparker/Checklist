import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sun/components";

type DeleteImageDialogProps = {
  /**
   * Open state for the dialog.
   */
  open: boolean;
  /**
   * Setter for the open state of the dialog.
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Callback for detaching an image from the entry.
   */
  onDetach: () => void;
  /**
   * Callback for deleting an image from the filestore and detaching it from the entry.
   */
  onDeleteAndDetach: () => void;
};

/**
 * Confirmation dialog for removing an image.
 */
const DeleteImageDialog = ({
  open,
  onOpenChange,
  onDetach,
  onDeleteAndDetach,
}: DeleteImageDialogProps) => {
  const { t } = useTranslation("entry");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{t("delete-image-title")}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>{t("delete-image-body")}</p>
      </DialogBody>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">{t("cancel")}</Button>
        </DialogClose>
        <Button variant="secondary" onClick={onDetach}>
          {t("detach-only")}
        </Button>
        <Button variant="destructive" onClick={onDeleteAndDetach}>
          {t("delete-and-detach")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteImageDialog;
