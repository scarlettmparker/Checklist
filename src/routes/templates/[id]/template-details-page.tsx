import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { pageDataRegistry } from "@sun/ssr";
import {
  ListChecklistTemplateItemsQuery,
  LocateChecklistTemplateDetailsQuery,
  LocateChecklistTemplateQuery,
} from "~/generated/graphql";
import {
  fetchListChecklistTemplateItems,
  fetchLocateChecklistTemplate,
  fetchLocateChecklistTemplateDetails,
} from "~/utils/api";
import { Card, CardBody, Skeleton } from "@sun/components";
import TemplateInfo from "~/components/templates/template-info";
import TemplateItems from "~/components/templates/template-items";
import TemplateDetailsCard, {
  TemplateDetailsCardSkeleton,
} from "~/components/templates/template-details-card";
import styles from "./template-details-page.module.css";

const PAGE = "templates/:id";

/**
 * Template details page.
 */
const TemplateDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  return (
    <div className={styles.detail_layout}>
      <Card>
        <CardBody className={styles.overview_body}>
          <Suspense fallback={<Skeleton className={styles.sk_block} />}>
            <TemplateInfo id={id} pattern={PAGE} />
          </Suspense>
          <Suspense fallback={<Skeleton className={styles.sk_block} />}>
            <TemplateItems id={id} pattern={PAGE} />
          </Suspense>
        </CardBody>
      </Card>
      <Suspense fallback={<TemplateDetailsCardSkeleton />}>
        <TemplateDetailsCard id={id} pattern={PAGE} />
      </Suspense>
    </div>
  );
};

/**
 * Server-side data fetcher for the located template.
 */
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

/**
 * Default used when a template has no items or the fetch fails (see item-details
 * for the non-null sentinel pattern).
 */
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

/**
 * Server-side data fetcher for the template's items.
 */
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

/**
 * Default used when a template has no detail attached yet (see item-details).
 */
const EMPTY_TEMPLATE_DETAILS = {
  ownerId: null,
  description: null,
  remoteObject: [] as string[],
};

/**
 * Server-side data fetcher for the template detail.
 */
async function getTemplateDetailsData(
  id: string,
): Promise<Record<string, unknown> | null> {
  try {
    const result = await fetchLocateChecklistTemplateDetails(id);
    if (result?.success && result.data) {
      const details = (result.data as LocateChecklistTemplateDetailsQuery)
        .checklistQueries.templateDetails;
      return { templateDetails: details ?? EMPTY_TEMPLATE_DETAILS };
    }
    return { templateDetails: EMPTY_TEMPLATE_DETAILS };
  } catch (error) {
    console.error("Failed to fetch checklist template details:", error);
    return { templateDetails: EMPTY_TEMPLATE_DETAILS };
  }
}

/**
 * Register the data loaders for this page.
 */
export function registerChecklistTemplateDetailsDataLoaders(): void {
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
    return getTemplateDetailsData(id);
  });
}

export default TemplateDetailsPage;
