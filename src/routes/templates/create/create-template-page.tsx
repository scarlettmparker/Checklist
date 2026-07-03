import { Suspense, useEffect } from "react";
import {
  makeCacheKey,
  mutationRegistry,
  MutationResult,
  pageDataRegistry,
  ServerRedirectError,
} from "@sun/ssr";
import { Breadcrumb, useBreadcrumbContext } from "@sun/components";
import { ListChecklistEntryItemsQuery } from "~/generated/graphql";
import CreateTemplateForm from "~/components/templates/create-template-form";
import { CreateTemplatePageSkeleton } from "~/components/templates/skeletons";
import {
  fetchListChecklistEntryItems,
  mutateCreateChecklistTemplate,
} from "~/utils/api";
import styles from "./create-template-page.module.css";

const PAGE = "templates/create";

const CreateTemplatePage = () => {
  const { setBreadcrumbs, setCurrent } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Templates", href: "/templates" },
      { label: "New", href: "/templates/create" },
    ]);
    setCurrent("/templates/create");
  }, [setBreadcrumbs, setCurrent]);

  return (
    <div className={styles.create_template_form}>
      <Breadcrumb />
      <Suspense fallback={<CreateTemplatePageSkeleton />}>
        <CreateTemplateForm />
      </Suspense>
    </div>
  );
};

/**
 * Default used when an entry has no items or the fetch fails (non-null sentinel
 * so the create form never throws "No data returned").
 */
const EMPTY_ENTRY_ITEMS = {
  items: [],
  pageInfo: {
    page: 0,
    size: 0,
    totalPages: 0,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

/**
 * Loads the items of the entry named by `params.entryId` so the create form can
 * pre-populate the picker when seeding a template from an existing checklist.
 */
async function getEntryItemsData(
  params?: Record<string, unknown>,
): Promise<Record<string, unknown> | null> {
  const entryId = params?.entryId as string;
  if (!entryId) return null;
  try {
    const result = await fetchListChecklistEntryItems(entryId, {
      page: 0,
      size: 100,
    });
    if (result?.success && result.data) {
      const entryItems = (result.data as ListChecklistEntryItemsQuery)
        .checklistQueries.entryItems;
      return { entryItems: entryItems ?? EMPTY_ENTRY_ITEMS };
    }
    return { entryItems: EMPTY_ENTRY_ITEMS };
  } catch (error) {
    console.error("Failed to fetch entry items for template seeding:", error);
    return { entryItems: EMPTY_ENTRY_ITEMS };
  }
}

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
  pageDataRegistry.registerPageDataLoader(PAGE, getEntryItemsData);
  mutationRegistry.registerMutationHandler(
    "templates/create",
    handleCreateTemplate,
  );
}

export default CreateTemplatePage;
