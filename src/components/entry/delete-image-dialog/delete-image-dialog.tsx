import { useTransition } from "react";
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
  onDetach: () => Promise<void>;
  /**
   * Callback for deleting an image from the filestore and detaching it from the entry.
   */
  onDeleteAndDetach: () => Promise<void>;
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
  const [isPending, startTransition] = useTransition();

  /**
   * Handle detaching an image from the entry without deleting it.
   */
  const handleDetach = () =>
    startTransition(async () => {
      await onDetach();
      onOpenChange(false);
    });

  /**
   * Handle deleting an image from the filestore and detaching it from the entry.
   */
  const handleDelete = () =>
    startTransition(async () => {
      await onDeleteAndDetach();
      onOpenChange(false);
    });

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
        <Button variant="secondary" disabled={isPending} onClick={handleDetach}>
          {t("detach-only")}
        </Button>
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={handleDelete}
        >
          {t("delete-and-detach")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteImageDialog;
