/**
 * Registers all mutation handlers.
 */

import { registerCreateChecklistItemMutationHandler } from "~/routes/items/create/create-item-page";
import { registerEditItemPageHandlers } from "~/routes/items/edit";
import { registerRetireChecklistItemMutationHandler } from "~/routes/items/[id]/item-details-page";
import { registerCreateChecklistTemplateMutationHandler } from "~/routes/templates/create/create-template-page";
import { registerArchiveTemplateMutationHandler } from "~/routes/templates/[id]/template-details-page";
import { registerCreateEntryMutationHandlers } from "~/routes/entry/create/create-entry-from-template-page";

registerCreateChecklistItemMutationHandler();
registerEditItemPageHandlers();
registerRetireChecklistItemMutationHandler();
registerCreateChecklistTemplateMutationHandler();
registerArchiveTemplateMutationHandler();
registerCreateEntryMutationHandlers();
