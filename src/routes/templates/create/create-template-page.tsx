import {
  makeCacheKey,
  mutationRegistry,
  MutationResult,
  ServerRedirectError,
} from "@sun/ssr";
import CreateTemplateForm from "~/components/create-template-form";
import { mutateCreateChecklistTemplate } from "~/utils/api";
import styles from "./create-template-page.module.css";

const CreateTemplatePage = () => {
  return (
    <div className={styles.create_template_form}>
      <CreateTemplateForm />
    </div>
  );
};

/**
 * Handler for creating a new checklist template.
 */
async function handleCreateTemplate(
  body: Record<string, unknown>,
): Promise<MutationResult> {
  const { name, description, itemIds } = body;

  if (typeof name !== "string" || name.trim() === "") {
    return {
      __typename: "StandardError",
      message: "Name is required and must be a non-empty string.",
    };
  }

  const ids = Array.isArray(itemIds) ? (itemIds as string[]) : [];
  const result = await mutateCreateChecklistTemplate(
    name,
    description as string | undefined,
    ids,
  );
  const data = result.data?.checklistMutations.createTemplate as MutationResult;

  if (data?.__typename === "QuerySuccess" || data?.__typename === "Redirect") {
    // Must match the list's cache key exactly: makeCacheKey(`${pattern}:${key}`).
    const keyToInvalidate = makeCacheKey("templates:templates", {});
    throw new ServerRedirectError("/templates", keyToInvalidate);
  }

  return {
    __typename: "StandardError",
    message: result.error || "Failed to create template.",
  };
}

/**
 * Register the mutation handler for creating a checklist template.
 */
export function registerCreateChecklistTemplateMutationHandler(): void {
  mutationRegistry.registerMutationHandler(
    "templates/create",
    handleCreateTemplate,
  );
}

export default CreateTemplatePage;
