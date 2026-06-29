import { makeCacheKey, mutationRegistry, MutationResult, ServerRedirectError } from "@sun/ssr";
import CreateItemForm from "~/components/create-item-form";
import { mutateCreateChecklistItem } from "~/utils/api";
import styles from "./create-item-page.module.css";

const CreateItemPage = () => {
  return (
    <div className={styles.create_item_form}>
      <CreateItemForm />
    </div>
  );
}

/**
 * Handler for creating a new checklist item.
 */
async function handleCreateItem(
  body: Record<string, unknown>
): Promise<MutationResult> {
  const { name, description, categoryId } = body;

  if (typeof name !== "string" || name.trim() === "") {
    return {
      __typename: "StandardError",
      message: "Name is required and must be a non-empty string."
    };
  }

  const result = await mutateCreateChecklistItem(
    name,
    description as string | undefined,
    categoryId as string | undefined
  );
  const data = result.data?.checklistMutations.createItem as MutationResult;

  if (data?.__typename === "QuerySuccess" || data?.__typename === "Redirect") {
    const keyToInvalidate = makeCacheKey("checklist", {});
    throw new ServerRedirectError("/items", keyToInvalidate);
  }

  return {
    __typename: "StandardError",
    message: result.error || "Failed to create checklist item."
  }
}

/**
 * Register the mutation handler for creating a checklist item.
 */
export function registerCreateChecklistItemMutationHandler(): void {
  mutationRegistry.registerMutationHandler("checklist/createItem", handleCreateItem);
};

export default CreateItemPage;