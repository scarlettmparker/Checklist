/**
 * Registers all mutation handlers.
 */

import { registerCreateChecklistItemMutationHandler } from "~/routes/items/create/create-item-page";
import { registerCreateChecklistTemplateMutationHandler } from "~/routes/templates/create/create-template-page";

// Register mutation handlers here as routes are built.
registerCreateChecklistItemMutationHandler();
registerCreateChecklistTemplateMutationHandler();
