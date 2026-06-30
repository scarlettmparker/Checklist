/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation addChecklistItem($entryId: ID!, $itemId: ID!, $position: Int) {\n  checklistMutations {\n    addItem(entryId: $entryId, itemId: $itemId, position: $position) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.AddChecklistItemDocument,
    "mutation addChecklistTemplateItem($templateId: ID!, $itemId: ID!, $position: Int) {\n  checklistMutations {\n    addTemplateItem(templateId: $templateId, itemId: $itemId, position: $position) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.AddChecklistTemplateItemDocument,
    "mutation archiveChecklist($id: ID!) {\n  checklistMutations {\n    archiveChecklist(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.ArchiveChecklistDocument,
    "mutation archiveChecklistTemplate($id: ID!) {\n  checklistMutations {\n    archiveTemplate(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.ArchiveChecklistTemplateDocument,
    "mutation attachChecklistObject($source: ID!, $target: ID!, $ownerType: RemoteObjectType) {\n  checklistMutations {\n    attachObject(source: $source, target: $target, ownerType: $ownerType) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.AttachChecklistObjectDocument,
    "mutation completeChecklist($id: ID!) {\n  checklistMutations {\n    completeChecklist(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.CompleteChecklistDocument,
    "mutation createChecklistCategory($name: String!, $description: String) {\n  checklistMutations {\n    createCategory(name: $name, description: $description) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.CreateChecklistCategoryDocument,
    "mutation createChecklistEntry($name: String) {\n  checklistMutations {\n    createChecklist(name: $name) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.CreateChecklistEntryDocument,
    "mutation createChecklistFromTemplate($templateId: ID!) {\n  checklistMutations {\n    createChecklistFromTemplate(templateId: $templateId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.CreateChecklistFromTemplateDocument,
    "mutation createChecklistItem($name: String!, $description: String, $categoryId: ID, $icon: String) {\n  checklistMutations {\n    createItem(\n      name: $name\n      description: $description\n      categoryId: $categoryId\n      icon: $icon\n    ) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.CreateChecklistItemDocument,
    "mutation createChecklistTemplate($name: String!, $description: String, $itemIds: [ID!]) {\n  checklistMutations {\n    createTemplate(name: $name, description: $description, itemIds: $itemIds) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.CreateChecklistTemplateDocument,
    "query listChecklistCategories {\n  checklistQueries {\n    listCategories {\n      id\n      name\n      description\n      createdAt\n      updatedAt\n    }\n  }\n}": typeof types.ListChecklistCategoriesDocument,
    "query listChecklistEntries {\n  checklistQueries {\n    listEntries {\n      id\n      name\n      dueAt\n      completedAt\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}": typeof types.ListChecklistEntriesDocument,
    "query listChecklistEntryItems($entryId: ID!) {\n  checklistQueries {\n    entryItems(entryId: $entryId) {\n      id\n      entryId\n      itemId\n      name\n      icon\n      status\n      position\n    }\n  }\n}": typeof types.ListChecklistEntryItemsDocument,
    "query listChecklistItems($page: Int, $size: Int, $sortBy: String, $sortDir: String) {\n  checklistQueries {\n    items(page: $page, size: $size, sortBy: $sortBy, sortDir: $sortDir) {\n      items {\n        id\n        name\n        description\n        icon\n        categoryId\n        lifecycleStatus\n        createdAt\n        updatedAt\n      }\n      totalCount\n      page\n      size\n      totalPages\n    }\n  }\n}": typeof types.ListChecklistItemsDocument,
    "query listChecklistTemplateItems($templateId: ID!) {\n  checklistQueries {\n    templateItems(templateId: $templateId) {\n      id\n      templateId\n      itemId\n      name\n      icon\n      position\n    }\n  }\n}": typeof types.ListChecklistTemplateItemsDocument,
    "query listChecklistTemplates {\n  checklistQueries {\n    listTemplates {\n      id\n      name\n      description\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}": typeof types.ListChecklistTemplatesDocument,
    "query locateChecklistEntry($id: ID!) {\n  checklistQueries {\n    entry(id: $id) {\n      id\n      name\n      dueAt\n      completedAt\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}": typeof types.LocateChecklistEntryDocument,
    "query locateChecklistEntryDetails($id: ID!) {\n  checklistQueries {\n    entryDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}": typeof types.LocateChecklistEntryDetailsDocument,
    "query locateChecklistItem($id: ID!) {\n  checklistQueries {\n    item(id: $id) {\n      id\n      name\n      description\n      icon\n      categoryId\n      lifecycleStatus\n      createdAt\n      updatedAt\n    }\n  }\n}": typeof types.LocateChecklistItemDocument,
    "query locateChecklistItemDetails($id: ID!) {\n  checklistQueries {\n    itemDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}": typeof types.LocateChecklistItemDetailsDocument,
    "query locateChecklistTemplate($id: ID!) {\n  checklistQueries {\n    template(id: $id) {\n      id\n      name\n      description\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}": typeof types.LocateChecklistTemplateDocument,
    "query locateChecklistTemplateDetails($id: ID!) {\n  checklistQueries {\n    templateDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}": typeof types.LocateChecklistTemplateDetailsDocument,
    "query locateRemoteObjects($ids: [String!]!) {\n  checklistQueries {\n    locateRemoteObjects(ids: $ids) {\n      id\n      ownerType\n      ownerId\n      description\n    }\n  }\n}": typeof types.LocateRemoteObjectsDocument,
    "mutation removeChecklistItem($entryId: ID!, $itemId: ID!) {\n  checklistMutations {\n    removeItem(entryId: $entryId, itemId: $itemId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.RemoveChecklistItemDocument,
    "mutation removeChecklistTemplateItem($templateId: ID!, $itemId: ID!) {\n  checklistMutations {\n    removeTemplateItem(templateId: $templateId, itemId: $itemId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.RemoveChecklistTemplateItemDocument,
    "mutation retireChecklistItem($id: ID!) {\n  checklistMutations {\n    retireItem(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.RetireChecklistItemDocument,
    "mutation saveChecklistCategory($input: ChecklistCategoryInput!) {\n  checklistMutations {\n    saveCategory(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.SaveChecklistCategoryDocument,
    "mutation saveChecklistEntry($input: ChecklistEntryInput!) {\n  checklistMutations {\n    saveChecklist(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.SaveChecklistEntryDocument,
    "mutation saveChecklistItem($input: ChecklistItemInput!) {\n  checklistMutations {\n    saveItem(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.SaveChecklistItemDocument,
    "mutation saveChecklistTemplate($input: ChecklistTemplateInput!) {\n  checklistMutations {\n    saveTemplate(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.SaveChecklistTemplateDocument,
    "mutation setChecklistItemStatus($entryId: ID!, $itemId: ID!, $status: ItemStatus!) {\n  checklistMutations {\n    setItemStatus(entryId: $entryId, itemId: $itemId, status: $status) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": typeof types.SetChecklistItemStatusDocument,
};
const documents: Documents = {
    "mutation addChecklistItem($entryId: ID!, $itemId: ID!, $position: Int) {\n  checklistMutations {\n    addItem(entryId: $entryId, itemId: $itemId, position: $position) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.AddChecklistItemDocument,
    "mutation addChecklistTemplateItem($templateId: ID!, $itemId: ID!, $position: Int) {\n  checklistMutations {\n    addTemplateItem(templateId: $templateId, itemId: $itemId, position: $position) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.AddChecklistTemplateItemDocument,
    "mutation archiveChecklist($id: ID!) {\n  checklistMutations {\n    archiveChecklist(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.ArchiveChecklistDocument,
    "mutation archiveChecklistTemplate($id: ID!) {\n  checklistMutations {\n    archiveTemplate(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.ArchiveChecklistTemplateDocument,
    "mutation attachChecklistObject($source: ID!, $target: ID!, $ownerType: RemoteObjectType) {\n  checklistMutations {\n    attachObject(source: $source, target: $target, ownerType: $ownerType) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.AttachChecklistObjectDocument,
    "mutation completeChecklist($id: ID!) {\n  checklistMutations {\n    completeChecklist(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.CompleteChecklistDocument,
    "mutation createChecklistCategory($name: String!, $description: String) {\n  checklistMutations {\n    createCategory(name: $name, description: $description) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.CreateChecklistCategoryDocument,
    "mutation createChecklistEntry($name: String) {\n  checklistMutations {\n    createChecklist(name: $name) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.CreateChecklistEntryDocument,
    "mutation createChecklistFromTemplate($templateId: ID!) {\n  checklistMutations {\n    createChecklistFromTemplate(templateId: $templateId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.CreateChecklistFromTemplateDocument,
    "mutation createChecklistItem($name: String!, $description: String, $categoryId: ID, $icon: String) {\n  checklistMutations {\n    createItem(\n      name: $name\n      description: $description\n      categoryId: $categoryId\n      icon: $icon\n    ) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.CreateChecklistItemDocument,
    "mutation createChecklistTemplate($name: String!, $description: String, $itemIds: [ID!]) {\n  checklistMutations {\n    createTemplate(name: $name, description: $description, itemIds: $itemIds) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.CreateChecklistTemplateDocument,
    "query listChecklistCategories {\n  checklistQueries {\n    listCategories {\n      id\n      name\n      description\n      createdAt\n      updatedAt\n    }\n  }\n}": types.ListChecklistCategoriesDocument,
    "query listChecklistEntries {\n  checklistQueries {\n    listEntries {\n      id\n      name\n      dueAt\n      completedAt\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}": types.ListChecklistEntriesDocument,
    "query listChecklistEntryItems($entryId: ID!) {\n  checklistQueries {\n    entryItems(entryId: $entryId) {\n      id\n      entryId\n      itemId\n      name\n      icon\n      status\n      position\n    }\n  }\n}": types.ListChecklistEntryItemsDocument,
    "query listChecklistItems($page: Int, $size: Int, $sortBy: String, $sortDir: String) {\n  checklistQueries {\n    items(page: $page, size: $size, sortBy: $sortBy, sortDir: $sortDir) {\n      items {\n        id\n        name\n        description\n        icon\n        categoryId\n        lifecycleStatus\n        createdAt\n        updatedAt\n      }\n      totalCount\n      page\n      size\n      totalPages\n    }\n  }\n}": types.ListChecklistItemsDocument,
    "query listChecklistTemplateItems($templateId: ID!) {\n  checklistQueries {\n    templateItems(templateId: $templateId) {\n      id\n      templateId\n      itemId\n      name\n      icon\n      position\n    }\n  }\n}": types.ListChecklistTemplateItemsDocument,
    "query listChecklistTemplates {\n  checklistQueries {\n    listTemplates {\n      id\n      name\n      description\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}": types.ListChecklistTemplatesDocument,
    "query locateChecklistEntry($id: ID!) {\n  checklistQueries {\n    entry(id: $id) {\n      id\n      name\n      dueAt\n      completedAt\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}": types.LocateChecklistEntryDocument,
    "query locateChecklistEntryDetails($id: ID!) {\n  checklistQueries {\n    entryDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}": types.LocateChecklistEntryDetailsDocument,
    "query locateChecklistItem($id: ID!) {\n  checklistQueries {\n    item(id: $id) {\n      id\n      name\n      description\n      icon\n      categoryId\n      lifecycleStatus\n      createdAt\n      updatedAt\n    }\n  }\n}": types.LocateChecklistItemDocument,
    "query locateChecklistItemDetails($id: ID!) {\n  checklistQueries {\n    itemDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}": types.LocateChecklistItemDetailsDocument,
    "query locateChecklistTemplate($id: ID!) {\n  checklistQueries {\n    template(id: $id) {\n      id\n      name\n      description\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}": types.LocateChecklistTemplateDocument,
    "query locateChecklistTemplateDetails($id: ID!) {\n  checklistQueries {\n    templateDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}": types.LocateChecklistTemplateDetailsDocument,
    "query locateRemoteObjects($ids: [String!]!) {\n  checklistQueries {\n    locateRemoteObjects(ids: $ids) {\n      id\n      ownerType\n      ownerId\n      description\n    }\n  }\n}": types.LocateRemoteObjectsDocument,
    "mutation removeChecklistItem($entryId: ID!, $itemId: ID!) {\n  checklistMutations {\n    removeItem(entryId: $entryId, itemId: $itemId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.RemoveChecklistItemDocument,
    "mutation removeChecklistTemplateItem($templateId: ID!, $itemId: ID!) {\n  checklistMutations {\n    removeTemplateItem(templateId: $templateId, itemId: $itemId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.RemoveChecklistTemplateItemDocument,
    "mutation retireChecklistItem($id: ID!) {\n  checklistMutations {\n    retireItem(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.RetireChecklistItemDocument,
    "mutation saveChecklistCategory($input: ChecklistCategoryInput!) {\n  checklistMutations {\n    saveCategory(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.SaveChecklistCategoryDocument,
    "mutation saveChecklistEntry($input: ChecklistEntryInput!) {\n  checklistMutations {\n    saveChecklist(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.SaveChecklistEntryDocument,
    "mutation saveChecklistItem($input: ChecklistItemInput!) {\n  checklistMutations {\n    saveItem(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.SaveChecklistItemDocument,
    "mutation saveChecklistTemplate($input: ChecklistTemplateInput!) {\n  checklistMutations {\n    saveTemplate(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.SaveChecklistTemplateDocument,
    "mutation setChecklistItemStatus($entryId: ID!, $itemId: ID!, $status: ItemStatus!) {\n  checklistMutations {\n    setItemStatus(entryId: $entryId, itemId: $itemId, status: $status) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}": types.SetChecklistItemStatusDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addChecklistItem($entryId: ID!, $itemId: ID!, $position: Int) {\n  checklistMutations {\n    addItem(entryId: $entryId, itemId: $itemId, position: $position) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation addChecklistItem($entryId: ID!, $itemId: ID!, $position: Int) {\n  checklistMutations {\n    addItem(entryId: $entryId, itemId: $itemId, position: $position) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addChecklistTemplateItem($templateId: ID!, $itemId: ID!, $position: Int) {\n  checklistMutations {\n    addTemplateItem(templateId: $templateId, itemId: $itemId, position: $position) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation addChecklistTemplateItem($templateId: ID!, $itemId: ID!, $position: Int) {\n  checklistMutations {\n    addTemplateItem(templateId: $templateId, itemId: $itemId, position: $position) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation archiveChecklist($id: ID!) {\n  checklistMutations {\n    archiveChecklist(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation archiveChecklist($id: ID!) {\n  checklistMutations {\n    archiveChecklist(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation archiveChecklistTemplate($id: ID!) {\n  checklistMutations {\n    archiveTemplate(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation archiveChecklistTemplate($id: ID!) {\n  checklistMutations {\n    archiveTemplate(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation attachChecklistObject($source: ID!, $target: ID!, $ownerType: RemoteObjectType) {\n  checklistMutations {\n    attachObject(source: $source, target: $target, ownerType: $ownerType) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation attachChecklistObject($source: ID!, $target: ID!, $ownerType: RemoteObjectType) {\n  checklistMutations {\n    attachObject(source: $source, target: $target, ownerType: $ownerType) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation completeChecklist($id: ID!) {\n  checklistMutations {\n    completeChecklist(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation completeChecklist($id: ID!) {\n  checklistMutations {\n    completeChecklist(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createChecklistCategory($name: String!, $description: String) {\n  checklistMutations {\n    createCategory(name: $name, description: $description) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation createChecklistCategory($name: String!, $description: String) {\n  checklistMutations {\n    createCategory(name: $name, description: $description) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createChecklistEntry($name: String) {\n  checklistMutations {\n    createChecklist(name: $name) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation createChecklistEntry($name: String) {\n  checklistMutations {\n    createChecklist(name: $name) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createChecklistFromTemplate($templateId: ID!) {\n  checklistMutations {\n    createChecklistFromTemplate(templateId: $templateId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation createChecklistFromTemplate($templateId: ID!) {\n  checklistMutations {\n    createChecklistFromTemplate(templateId: $templateId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createChecklistItem($name: String!, $description: String, $categoryId: ID, $icon: String) {\n  checklistMutations {\n    createItem(\n      name: $name\n      description: $description\n      categoryId: $categoryId\n      icon: $icon\n    ) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation createChecklistItem($name: String!, $description: String, $categoryId: ID, $icon: String) {\n  checklistMutations {\n    createItem(\n      name: $name\n      description: $description\n      categoryId: $categoryId\n      icon: $icon\n    ) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createChecklistTemplate($name: String!, $description: String, $itemIds: [ID!]) {\n  checklistMutations {\n    createTemplate(name: $name, description: $description, itemIds: $itemIds) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation createChecklistTemplate($name: String!, $description: String, $itemIds: [ID!]) {\n  checklistMutations {\n    createTemplate(name: $name, description: $description, itemIds: $itemIds) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query listChecklistCategories {\n  checklistQueries {\n    listCategories {\n      id\n      name\n      description\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query listChecklistCategories {\n  checklistQueries {\n    listCategories {\n      id\n      name\n      description\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query listChecklistEntries {\n  checklistQueries {\n    listEntries {\n      id\n      name\n      dueAt\n      completedAt\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query listChecklistEntries {\n  checklistQueries {\n    listEntries {\n      id\n      name\n      dueAt\n      completedAt\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query listChecklistEntryItems($entryId: ID!) {\n  checklistQueries {\n    entryItems(entryId: $entryId) {\n      id\n      entryId\n      itemId\n      name\n      icon\n      status\n      position\n    }\n  }\n}"): (typeof documents)["query listChecklistEntryItems($entryId: ID!) {\n  checklistQueries {\n    entryItems(entryId: $entryId) {\n      id\n      entryId\n      itemId\n      name\n      icon\n      status\n      position\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query listChecklistItems($page: Int, $size: Int, $sortBy: String, $sortDir: String) {\n  checklistQueries {\n    items(page: $page, size: $size, sortBy: $sortBy, sortDir: $sortDir) {\n      items {\n        id\n        name\n        description\n        icon\n        categoryId\n        lifecycleStatus\n        createdAt\n        updatedAt\n      }\n      totalCount\n      page\n      size\n      totalPages\n    }\n  }\n}"): (typeof documents)["query listChecklistItems($page: Int, $size: Int, $sortBy: String, $sortDir: String) {\n  checklistQueries {\n    items(page: $page, size: $size, sortBy: $sortBy, sortDir: $sortDir) {\n      items {\n        id\n        name\n        description\n        icon\n        categoryId\n        lifecycleStatus\n        createdAt\n        updatedAt\n      }\n      totalCount\n      page\n      size\n      totalPages\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query listChecklistTemplateItems($templateId: ID!) {\n  checklistQueries {\n    templateItems(templateId: $templateId) {\n      id\n      templateId\n      itemId\n      name\n      icon\n      position\n    }\n  }\n}"): (typeof documents)["query listChecklistTemplateItems($templateId: ID!) {\n  checklistQueries {\n    templateItems(templateId: $templateId) {\n      id\n      templateId\n      itemId\n      name\n      icon\n      position\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query listChecklistTemplates {\n  checklistQueries {\n    listTemplates {\n      id\n      name\n      description\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query listChecklistTemplates {\n  checklistQueries {\n    listTemplates {\n      id\n      name\n      description\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query locateChecklistEntry($id: ID!) {\n  checklistQueries {\n    entry(id: $id) {\n      id\n      name\n      dueAt\n      completedAt\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query locateChecklistEntry($id: ID!) {\n  checklistQueries {\n    entry(id: $id) {\n      id\n      name\n      dueAt\n      completedAt\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query locateChecklistEntryDetails($id: ID!) {\n  checklistQueries {\n    entryDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}"): (typeof documents)["query locateChecklistEntryDetails($id: ID!) {\n  checklistQueries {\n    entryDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query locateChecklistItem($id: ID!) {\n  checklistQueries {\n    item(id: $id) {\n      id\n      name\n      description\n      icon\n      categoryId\n      lifecycleStatus\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query locateChecklistItem($id: ID!) {\n  checklistQueries {\n    item(id: $id) {\n      id\n      name\n      description\n      icon\n      categoryId\n      lifecycleStatus\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query locateChecklistItemDetails($id: ID!) {\n  checklistQueries {\n    itemDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}"): (typeof documents)["query locateChecklistItemDetails($id: ID!) {\n  checklistQueries {\n    itemDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query locateChecklistTemplate($id: ID!) {\n  checklistQueries {\n    template(id: $id) {\n      id\n      name\n      description\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query locateChecklistTemplate($id: ID!) {\n  checklistQueries {\n    template(id: $id) {\n      id\n      name\n      description\n      status\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query locateChecklistTemplateDetails($id: ID!) {\n  checklistQueries {\n    templateDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}"): (typeof documents)["query locateChecklistTemplateDetails($id: ID!) {\n  checklistQueries {\n    templateDetails(id: $id) {\n      ownerId\n      description\n      remoteObject\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query locateRemoteObjects($ids: [String!]!) {\n  checklistQueries {\n    locateRemoteObjects(ids: $ids) {\n      id\n      ownerType\n      ownerId\n      description\n    }\n  }\n}"): (typeof documents)["query locateRemoteObjects($ids: [String!]!) {\n  checklistQueries {\n    locateRemoteObjects(ids: $ids) {\n      id\n      ownerType\n      ownerId\n      description\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation removeChecklistItem($entryId: ID!, $itemId: ID!) {\n  checklistMutations {\n    removeItem(entryId: $entryId, itemId: $itemId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation removeChecklistItem($entryId: ID!, $itemId: ID!) {\n  checklistMutations {\n    removeItem(entryId: $entryId, itemId: $itemId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation removeChecklistTemplateItem($templateId: ID!, $itemId: ID!) {\n  checklistMutations {\n    removeTemplateItem(templateId: $templateId, itemId: $itemId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation removeChecklistTemplateItem($templateId: ID!, $itemId: ID!) {\n  checklistMutations {\n    removeTemplateItem(templateId: $templateId, itemId: $itemId) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation retireChecklistItem($id: ID!) {\n  checklistMutations {\n    retireItem(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation retireChecklistItem($id: ID!) {\n  checklistMutations {\n    retireItem(id: $id) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation saveChecklistCategory($input: ChecklistCategoryInput!) {\n  checklistMutations {\n    saveCategory(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation saveChecklistCategory($input: ChecklistCategoryInput!) {\n  checklistMutations {\n    saveCategory(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation saveChecklistEntry($input: ChecklistEntryInput!) {\n  checklistMutations {\n    saveChecklist(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation saveChecklistEntry($input: ChecklistEntryInput!) {\n  checklistMutations {\n    saveChecklist(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation saveChecklistItem($input: ChecklistItemInput!) {\n  checklistMutations {\n    saveItem(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation saveChecklistItem($input: ChecklistItemInput!) {\n  checklistMutations {\n    saveItem(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation saveChecklistTemplate($input: ChecklistTemplateInput!) {\n  checklistMutations {\n    saveTemplate(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation saveChecklistTemplate($input: ChecklistTemplateInput!) {\n  checklistMutations {\n    saveTemplate(input: $input) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation setChecklistItemStatus($entryId: ID!, $itemId: ID!, $status: ItemStatus!) {\n  checklistMutations {\n    setItemStatus(entryId: $entryId, itemId: $itemId, status: $status) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"): (typeof documents)["mutation setChecklistItemStatus($entryId: ID!, $itemId: ID!, $status: ItemStatus!) {\n  checklistMutations {\n    setItemStatus(entryId: $entryId, itemId: $itemId, status: $status) {\n      ... on QuerySuccess {\n        __typename\n        message\n        id\n      }\n      ... on StandardError {\n        __typename\n        message\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;