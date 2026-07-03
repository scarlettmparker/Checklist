import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sun/components";
import { ReactNode } from "react";

type ConfirmDialogProps = {
  /**
   * Whether the dialog is open.
   */
  open: boolean;
  /**
   * Called to close the dialog without confirming.
   */
  onClose: () => void;
  /**
   * Called when the action is confirmed.
   */
  onConfirm: () => void;
  /**
   * Dialog title.
   */
  title: string;
  /**
   * Dialog body content.
   */
  body: ReactNode;
  /**
   * Confirm button label.
   */
  confirmLabel: string;
  /**
   * Cancel button label.
   */
  cancelLabel: string;
};

/**
 * Generic confirmation dialog for destructive actions. Mirrors the Filestore
 * confirm-delete pattern: open state is controlled by the caller, and onConfirm
 * fires the mutation.
 */
const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  body,
  confirmLabel,
  cancelLabel,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>{body}</p>
      </DialogBody>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button type="submit" variant="destructive" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmDialog;
