import { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  makeCacheKey,
  MutationResult,
  mutationRegistry,
  pageDataRegistry,
  ServerRedirectError,
} from "@sun/ssr";
import { Breadcrumb, useBreadcrumbContext } from "@sun/components";
import {
  ListChecklistItemsQuery,
  ListChecklistTemplateItemsQuery,
  LocateChecklistTemplateQuery,
} from "~/generated/graphql";
import {
  fetchListChecklistItems,
  fetchListChecklistTemplateItems,
  fetchLocateChecklistTemplate,
  mutateAddChecklistTemplateItem,
  mutateRemoveChecklistTemplateItem,
  mutateSaveChecklistTemplate,
} from "~/utils/api";
import EditTemplateForm from "~/components/templates/edit-template-form";
import { EditTemplatePageSkeleton } from "~/components/templates/skeletons";
import styles from "./edit-template-page.module.css";

const PAGE = "templates/:id/edit";

/**
 * Page for editing a template's name/description and managing its items.
 */
const EditTemplatePage = () => {
  const { id } = useParams<{ id: string }>();
  const { setBreadcrumbs, setCurrent } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { label: "Templates", href: "/templates" },
      { label: "Edit", href: `/templates/${id}/edit` },
    ]);
    setCurrent(`/templates/${id}/edit`);
  }, [id, setBreadcrumbs, setCurrent]);

  if (!id) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <Breadcrumb />
      <Suspense fallback={<EditTemplatePageSkeleton />}>
        <EditTemplateForm templateId={id} pattern={PAGE} />
      </Suspense>
    </div>
  );
};

const EMPTY_TEMPLATE_ITEMS = {
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

const EMPTY_CHECKLIST_ITEMS = {
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

async function getTemplateData(
  id: string,
): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchLocateChecklistTemplate(id);
    if (result?.success && result.data) {
      const template = (result.data as LocateChecklistTemplateQuery)
        .checklistQueries.template;
      if (template) {
        return { template };
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch checklist template:", error);
    return null;
  }
}

async function getTemplateItemsData(
  id: string,
): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchListChecklistTemplateItems(id, {
      page: 0,
      size: 100,
    });
    if (result?.success && result.data) {
      const templateItems = (result.data as ListChecklistTemplateItemsQuery)
        .checklistQueries.templateItems;
      return { templateItems: templateItems ?? EMPTY_TEMPLATE_ITEMS };
    }
    return { templateItems: EMPTY_TEMPLATE_ITEMS };
  } catch (error) {
    console.error("Failed to fetch checklist template items:", error);
    return { templateItems: EMPTY_TEMPLATE_ITEMS };
  }
}

async function getChecklistItemsForPicker(): Promise<Record<
  string,
  unknown
> | null> {
  try {
    const result = await fetchListChecklistItems();
    if (result?.success && result.data) {
      const items = (result.data as ListChecklistItemsQuery).checklistQueries
        .items;
      return { checklistItems: items ?? EMPTY_CHECKLIST_ITEMS };
    }
    return { checklistItems: EMPTY_CHECKLIST_ITEMS };
  } catch (error) {
    console.error("Failed to fetch checklist items for picker:", error);
    return { checklistItems: EMPTY_CHECKLIST_ITEMS };
  }
}

/**
 * Register the edit-template loaders and item mutation handlers.
 */
export function registerEditTemplatePageHandlers(): void {
  pageDataRegistry.registerPageDataLoader(PAGE, async (params) => {
    const id = params?.id as string;
    if (!id) return null;
    return getTemplateData(id);
  });
  pageDataRegistry.registerPageDataLoader(PAGE, async (params) => {
    const id = params?.id as string;
    if (!id) return null;
    return getTemplateItemsData(id);
  });
  pageDataRegistry.registerPageDataLoader(PAGE, async (params) => {
    const id = params?.id as string;
    if (!id) return null;
    return getChecklistItemsForPicker();
  });

  mutationRegistry.registerMutationHandler("templates/save", async (body) => {
    const id = body?.id as string;
    const result = await mutateSaveChecklistTemplate({
      id,
      name: body?.name as string,
      description: body?.description as string | undefined,
    });
    const data = result.data?.checklistMutations.saveTemplate as MutationResult;

    if (
      data?.__typename === "QuerySuccess" ||
      data?.__typename === "Redirect"
    ) {
      throw new ServerRedirectError(`/templates/${id}`, [
        makeCacheKey("templates:templates", {}),
        makeCacheKey("templates/:id:template", { id }),
        makeCacheKey("templates/:id:templateItems", { id }),
      ]);
    }

    return {
      __typename: "StandardError",
      message: result.error || "Failed to save template.",
    };
  });

  mutationRegistry.registerMutationHandler(
    "templates/addItem",
    async (body) => {
      const templateId = body?.templateId as string;
      const itemId = body?.itemId as string;
      const result = await mutateAddChecklistTemplateItem(templateId, itemId);
      const data = result.data?.checklistMutations
        .addTemplateItem as MutationResult;
      return {
        ...(data ?? {
          __typename: "StandardError",
          message: result.error || "Failed to add item.",
        }),
        invalidated: [
          makeCacheKey("templates/:id:templateItems", { id: templateId }),
        ],
      };
    },
  );

  mutationRegistry.registerMutationHandler(
    "templates/removeItem",
    async (body) => {
      const templateId = body?.templateId as string;
      const itemId = body?.itemId as string;
      const result = await mutateRemoveChecklistTemplateItem(
        templateId,
        itemId,
      );
      const data = result.data?.checklistMutations
        .removeTemplateItem as MutationResult;
      return {
        ...(data ?? {
          __typename: "StandardError",
          message: result.error || "Failed to remove item.",
        }),
        invalidated: [
          makeCacheKey("templates/:id:templateItems", { id: templateId }),
        ],
      };
    },
  );
}

export default EditTemplatePage;
