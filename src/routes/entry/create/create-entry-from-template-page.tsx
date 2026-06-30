import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  makeCacheKey,
  MutationResult,
  mutationRegistry,
  ServerRedirectError,
} from "@sun/ssr";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@sun/components";
import {
  mutateCreateChecklistEntry,
  mutateCreateChecklistFromTemplate,
} from "~/utils/api";
import TemplatePicker from "~/components/template-picker";
import { createEntryFromTemplate } from "~/server/actions/checklist-entry";
import styles from "./create-entry-from-template-page.module.css";

/**
 * "Create entry from template": lists templates; selecting one creates an entry
 * seeded from it and lands in the new entry.
 */
const CreateEntryFromTemplatePage = () => {
  const { t } = useTranslation("entry");
  const [creating, setCreating] = useState(false);

  return (
    <div className={styles.layout}>
      <Card>
        <CardHeader>
          <CardTitle>{t("create-from-template")}</CardTitle>
        </CardHeader>
        <CardBody>
          <Suspense
            fallback={<Skeleton style={{ width: "100%", height: "8rem" }} />}
          >
            <TemplatePicker
              disabled={creating}
              onCreate={(templateId) => {
                setCreating(true);
                createEntryFromTemplate(templateId);
              }}
              t={t}
            />
          </Suspense>
        </CardBody>
      </Card>
    </div>
  );
};

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
      makeCacheKey("entries:entries", {}),
    );
  }

  return {
    __typename: "StandardError",
    message: result.error || "Failed to create entry.",
  };
}

/**
 * Handler for creating an entry from a template; redirects into the new
 * (pre-populated) entry and invalidates the entries list.
 */
async function handleCreateEntryFromTemplate(
  body: Record<string, unknown>,
): Promise<MutationResult> {
  const templateId = body.templateId as string;
  const result = await mutateCreateChecklistFromTemplate(templateId);
  const data = result.data?.checklistMutations
    .createChecklistFromTemplate as MutationResult;

  if (data?.__typename === "QuerySuccess" && data.id) {
    throw new ServerRedirectError(
      `/entry/${data.id}`,
      makeCacheKey("entries:entries", {}),
    );
  }

  return {
    __typename: "StandardError",
    message: result.error || "Failed to create entry from template.",
  };
}

/**
 * Register the entry-creation mutation handlers.
 */
export function registerCreateEntryMutationHandlers(): void {
  mutationRegistry.registerMutationHandler("entries/create", handleCreateEntry);
  mutationRegistry.registerMutationHandler(
    "entries/createFromTemplate",
    handleCreateEntryFromTemplate,
  );
}

export default CreateEntryFromTemplatePage;
