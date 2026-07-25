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
import { createEntry } from "~/server/actions/checklist-entry";

type CreateEntryDialogProps = {
  /**
   * Whether the dialog is open.
   */
  open: boolean;
  /**
   * Called to close the dialog.
   */
  onClose: () => void;
  /**
   * i18n translation function for the entry namespace.
   */
  t: TFunction<"entry">;
};

/**
 * Dialog for creating a blank checklist entry with a name.
 */
const CreateEntryDialog = ({ open, onClose, t }: CreateEntryDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    await createEntry(name || undefined);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <DialogHeader>
        <DialogTitle>{t("create-entry-title")}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <Form id="create-entry-form" onSubmit={handleSubmit}>
          <FormField name="name">
            <FormLabel>{t("name")}</FormLabel>
            <FormItem>
              <Input
                type="text"
                placeholder={t("name-placeholder")}
                autoFocus
              />
            </FormItem>
          </FormField>
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onClose}>
          {t("cancel-label")}
        </Button>
        <Button type="submit" form="create-entry-form" disabled={loading}>
          {loading ? t("creating-label") : t("create-entry-submit")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CreateEntryDialog;
