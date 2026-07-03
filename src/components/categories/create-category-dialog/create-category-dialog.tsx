import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  MarkdownEditor,
} from "@sun/components";
import { createChecklistCategory } from "~/server/actions/checklist-category";

type CreateCategoryDialogProps = {
  /**
   * Whether the dialog is open.
   */
  open: boolean;
  /**
   * Called to close the dialog.
   */
  onClose: () => void;
};

const DEFAULT_ROWS = 3;

/**
 * Dialog form for creating a new checklist category.
 */
const CreateCategoryDialog = ({ open, onClose }: CreateCategoryDialogProps) => {
  const { t } = useTranslation("categories");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const result = await createChecklistCategory(name, description);

    if (result.__typename === "QuerySuccess") {
      onClose();
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogHeader>
        <DialogTitle>{t("create-category-label")}</DialogTitle>
      </DialogHeader>
      <Form onSubmit={handleSubmit}>
        <DialogBody>
          <FormField name="name">
            <FormLabel>{t("name")}</FormLabel>
            <FormItem>
              <Input type="text" placeholder={t("name-placeholder")} required />
            </FormItem>
          </FormField>
          <FormField name="description">
            <FormLabel>{t("description")}</FormLabel>
            <FormItem>
              <MarkdownEditor
                placeholder={t("description-placeholder")}
                rows={DEFAULT_ROWS}
                aria-label={t("description")}
              />
            </FormItem>
          </FormField>
        </DialogBody>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            {t("cancel-label")}
          </Button>
          <Button
            type="submit"
            title={loading ? t("creating-title") : t("create-title")}
            disabled={loading}
          >
            {loading ? t("creating-label") : t("create-label")}
          </Button>
        </DialogFooter>
      </Form>
    </Dialog>
  );
};

export default CreateCategoryDialog;
