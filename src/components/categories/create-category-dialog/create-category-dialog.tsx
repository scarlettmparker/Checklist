import { useState } from "react";
import { useTranslation } from "react-i18next";
import { patchPageData } from "@sun/ssr";
import { useMutation } from "@sun/ssr/react";
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
import type {
  CreateCategoryResponse,
  ListChecklistCategoriesQuery,
} from "~/generated/graphql";
import { createChecklistCategory } from "~/server/actions/checklist-category";

type Category = NonNullable<
  ListChecklistCategoriesQuery["checklistQueries"]["listCategories"]
>[number];

type CategoryPayload = {
  /**
   * Name of the new category.
   */
  name: string;
  /**
   * Description of the new category.
   */
  description?: string;
};

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
  const [error, setError] = useState<string | null>(null);

  const [, runCreate, pending] = useMutation<
    CategoryPayload,
    CreateCategoryResponse,
    null
  >({
    base: null,
    reducer: () => null,
    action: (payload) =>
      createChecklistCategory(payload.name, payload.description),
    onSuccess: (response) => {
      patchPageData<Category[]>(
        "categories",
        "categories",
        {},
        (current) => [...(current ?? []), response.category],
      );
      setError(null);
      onClose();
    },
    onError: (mutationError) => setError(mutationError.message),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    runCreate({ name, description });
  };

  return (
    <Dialog open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <DialogHeader>
        <DialogTitle>{t("create-category-label")}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <Form id="create-category-form" onSubmit={handleSubmit}>
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
          {error && <p>{error}</p>}
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onClose}>
          {t("cancel-label")}
        </Button>
        <Button
          type="submit"
          form="create-category-form"
          title={pending ? t("creating-title") : t("create-title")}
          disabled={pending}
        >
          {pending ? t("creating-label") : t("create-label")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CreateCategoryDialog;
