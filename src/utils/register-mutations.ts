/**
 * Registers all mutation handlers.
 */

import { registerCreateChecklistItemMutationHandler } from "~/routes/items/create/create-item-page";
import { registerEditItemPageHandlers } from "~/routes/items/edit";
import { registerCreateChecklistTemplateMutationHandler } from "~/routes/templates/create/create-template-page";
import { registerCreateEntryMutationHandlers } from "~/routes/entry/create/create-entry-from-template-page";

registerCreateChecklistItemMutationHandler();
registerEditItemPageHandlers();
registerCreateChecklistTemplateMutationHandler();
registerCreateEntryMutationHandlers();
