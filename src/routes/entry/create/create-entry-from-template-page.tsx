import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  makeCacheKey,
  MutationResult,
  mutationRegistry,
  pageDataRegistry,
  ServerRedirectError,
} from "@sun/ssr";
import {
  Breadcrumb,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  useBreadcrumbContext,
} from "@sun/components";
import {
  ListChecklistTemplateItemsQuery,
  ListChecklistTemplatesQuery,
} from "~/generated/graphql";
import {
  fetchListChecklistTemplateItems,
  fetchListChecklistTemplates,
  mutateCreateChecklistEntry,
  mutateCreateChecklistFromTemplate,
  mutateCreateChecklistFromTemplates,
} from "~/utils/api";
import ComposeFromTemplates from "~/components/entry/compose-from-templates";
import { CreateEntryFromTemplatePageSkeleton } from "~/components/entry/skeletons";
import styles from "./create-entry-from-template-page.module.css";
import { CardDescription } from "@sun/components";

const PAGE = "entry/create";

/**
 * "Create from templates": multi-select templates to compose a checklist from,
 * with a live preview of the merged items.
 */
const CreateEntryFromTemplatePage = () => {
  const { t } = useTranslation("entry");
  const { setBreadcrumbs, setCurrent } = useBreadcrumbContext();

  useEffect(() => {
    setBreadcrumbs([
      { label: t("entry-title"), href: "/" },
      { label: t("compose-title"), href: "/entry/create" },
    ]);
    setCurrent("/entry/create");
  }, [setBreadcrumbs, setCurrent, t]);

  return (
    <div className={styles.layout}>
      <Breadcrumb />
      <Card>
        <CardHeader>
          <CardTitle>{t("compose-title")}</CardTitle>
          <CardDescription className={styles.description}>
            {t("compose-description")}
          </CardDescription>
        </CardHeader>
        <CardBody>
          <Suspense fallback={<CreateEntryFromTemplatePageSkeleton />}>
            <ComposeFromTemplates pattern={PAGE} />
          </Suspense>
        </CardBody>
      </Card>
    </div>
  );
};

/**
 * Loads every template and its items so the composer can preview a merged set
 * without client-side RPC.
 */
async function getComposeData(): Promise<Record<string, unknown> | null> {
  try {
    const templatesResult = await fetchListChecklistTemplates();
    const templates =
      (templatesResult?.data as ListChecklistTemplatesQuery | undefined)
        ?.checklistQueries.listTemplates ?? [];

    const templateItems: Record<string, unknown> = {};
    for (const template of templates) {
      const result = await fetchListChecklistTemplateItems(template.id, {
        page: 0,
        size: 100,
      });
      const items =
        (result?.data as ListChecklistTemplateItemsQuery | undefined)
          ?.checklistQueries.templateItems?.items ?? [];
      templateItems[template.id] = items;
    }

    return { composeData: { templates, templateItems } };
  } catch (error) {
    console.error("Failed to fetch compose data:", error);
    return { composeData: { templates: [], templateItems: {} } };
  }
}

/**
 * Handler for creating a blank entry; redirects into the new entry and
 * invalidates the entries list.
 */
async function handleCreateEntry(
  body: Record<string, unknown>,
): Promise<MutationResult> {
  const result = await mutateCreateChecklistEntry(
    body.name as string | undefined,
  );
  const data = result.data?.checklistMutations
    .createChecklist as MutationResult;

  if (data?.__typename === "QuerySuccess" && data.id) {
    throw new ServerRedirectError(
      `/entry/${data.id}`,
      makeCacheKey("entry:entry", {}),
    );
  }

  return {
    __typename: "StandardError",
    message: result.error || "Failed to create entry.",
  };
}

/**
 * Handler for creating an entry from a single template; redirects into the new
 * entry and invalidates the entries list.
 */
async function handleCreateEntryFromTemplate(
  body: Record<string, unknown>,
): Promise<MutationResult> {
  const templateId = body.templateId as string;
  const name = body.name as string | undefined;
  const result = await mutateCreateChecklistFromTemplate(templateId, name);
  const data = result.data?.checklistMutations
    .createChecklistFromTemplate as MutationResult;

  if (data?.__typename === "QuerySuccess" && data.id) {
    throw new ServerRedirectError(
      `/entry/${data.id}`,
      makeCacheKey("entry:entry", {}),
    );
  }

  return {
    __typename: "StandardError",
    message: result.error || "Failed to create entry from template.",
  };
}

/**
 * Handler for composing an entry from multiple templates; redirects into the new
 * entry and invalidates the entries list.
 */
async function handleCreateEntryFromTemplates(
  body: Record<string, unknown>,
): Promise<MutationResult> {
  const templateIds = (body.templateIds as string[]) ?? [];
  const name = body.name as string | undefined;
  const result = await mutateCreateChecklistFromTemplates(templateIds, name);
  const data = result.data?.checklistMutations
    .createChecklistFromTemplates as MutationResult;

  if (data?.__typename === "QuerySuccess" && data.id) {
    throw new ServerRedirectError(
      `/entry/${data.id}`,
      makeCacheKey("entry:entry", {}),
    );
  }

  return {
    __typename: "StandardError",
    message: result.error || "Failed to create entry from templates.",
  };
}

/**
 * Register the compose data loader and entry-creation mutation handlers.
 */
export function registerCreateEntryMutationHandlers(): void {
  pageDataRegistry.registerPageDataLoader(PAGE, getComposeData);
  mutationRegistry.registerMutationHandler("entry/create", handleCreateEntry);
  mutationRegistry.registerMutationHandler(
    "entry/createFromTemplate",
    handleCreateEntryFromTemplate,
  );
  mutationRegistry.registerMutationHandler(
    "entry/createFromTemplates",
    handleCreateEntryFromTemplates,
  );
}

export default CreateEntryFromTemplatePage;
