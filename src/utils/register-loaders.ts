/**
 * Registers all page data loaders.
 */

import { registerChecklistItemsDataLoader } from "~/routes/items/items-page";
import { registerChecklistItemDetailsDataLoaders } from "~/routes/items/[id]/item-details-page";
import { registerChecklistTemplatesDataLoader } from "~/routes/templates/templates-page";
import { registerChecklistTemplateDetailsDataLoaders } from "~/routes/templates/[id]/template-details-page";
import { registerChecklistEntriesDataLoader } from "~/routes/entry/entries-page";
import { registerEntryDataAndMutations } from "~/routes/entry/[id]/entry-checklist-page";
import "~/utils/configure-framework";

registerChecklistItemsDataLoader();
registerChecklistItemDetailsDataLoaders();
registerChecklistTemplatesDataLoader();
registerChecklistTemplateDetailsDataLoaders();
registerChecklistEntriesDataLoader();
registerEntryDataAndMutations();
