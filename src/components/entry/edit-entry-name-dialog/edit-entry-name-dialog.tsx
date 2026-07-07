import { useState } from "react";
import { TFunction } from "i18next";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from "@sun/components";
import { ChecklistEntry } from "~/generated/graphql";
import { saveEntry } from "~/server/actions/checklist-entry";

type EditEntryNameDialogProps = {
  /**
   * Whether the dialog is open.
   */
  open: boolean;
  /**
   * Called to close the dialog.
   */
  onClose: () => void;
  /**
   * The entry being renamed.
   */
  entry: ChecklistEntry | null;
  /**
   * i18n translation function for the entry namespace.
   */
  t: TFunction<"entry">;
};

/**
 * Dialog for renaming a checklist entry via saveChecklist.
 */
const EditEntryNameDialog = ({
  open,
  onClose,
  entry,
  t,
}: EditEntryNameDialogProps) => {
  const [loading, setLoading] = useState(false);

  if (!entry) {
    return null;
  }

  /**
   * Handle updating the entry name.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    await saveEntry(entry.id, name);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <DialogHeader>
        <DialogTitle>{t("edit-entry-title")}</DialogTitle>
      </DialogHeader>
      <Form onSubmit={handleSubmit}>
        <DialogBody>
          <FormField name="name">
            <FormLabel>{t("name")}</FormLabel>
            <FormItem>
              <Input
                type="text"
                defaultValue={entry.name ?? ""}
                placeholder={t("name-placeholder")}
                autoFocus
              />
            </FormItem>
          </FormField>
        </DialogBody>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            {t("cancel-label")}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? t("saving-label") : t("edit-entry-submit")}
          </Button>
        </DialogFooter>
      </Form>
    </Dialog>
  );
};

export default EditEntryNameDialog;
