/**
 * Registers all mutation handlers.
 */

import { registerCreateChecklistItemMutationHandler } from "~/routes/items/create/create-item-page";
import { registerCreateChecklistTemplateMutationHandler } from "~/routes/templates/create/create-template-page";
import { registerCreateEntryMutationHandlers } from "~/routes/entry/create/create-entry-from-template-page";

// Register mutation handlers here as routes are built.
registerCreateChecklistItemMutationHandler();
registerCreateChecklistTemplateMutationHandler();
registerCreateEntryMutationHandlers();
