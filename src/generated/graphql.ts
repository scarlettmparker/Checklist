/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A slightly refined version of RFC-3339 compliant DateTime Scalar */
  DateTime: { input: any; output: any; }
  /** A JSON scalar */
  JSON: { input: any; output: any; }
  /** A 64-bit signed integer */
  Long: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  personId: Scalars['ID']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  remoteUsers?: Maybe<Array<RemoteUser>>;
  status: AccountStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED'
}

export type AddCommentResponse = {
  __typename?: 'AddCommentResponse';
  comment: ReaderComment;
  message: Scalars['String']['output'];
};

/** Result of adding an item to a checklist entry. */
export type AddItemResponse = {
  __typename?: 'AddItemResponse';
  entry: ChecklistEntry;
  message: Scalars['String']['output'];
};

export type AddRemoteObjectResponse = {
  __typename?: 'AddRemoteObjectResponse';
  message: Scalars['String']['output'];
  post: BlogPost;
};

/** Result of adding an item to a checklist template. */
export type AddTemplateItemResponse = {
  __typename?: 'AddTemplateItemResponse';
  message: Scalars['String']['output'];
  template: ChecklistTemplate;
};

export type AddTorrentInput = {
  bucket: Scalars['String']['input'];
  magnet?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  torrentFileBase64?: InputMaybe<Scalars['String']['input']>;
};

/**  Response payload for the addTorrent mutation. */
export type AddTorrentResponse = {
  __typename?: 'AddTorrentResponse';
  job: TorrentJob;
  message: Scalars['String']['output'];
};

export type AnnotationInput = {
  body: Scalars['String']['input'];
  endOffset: Scalars['Int']['input'];
  startOffset: Scalars['Int']['input'];
  textId: Scalars['ID']['input'];
};

export type Answer = {
  __typename?: 'Answer';
  correct: Scalars['Boolean']['output'];
  correctAnswer: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  myAnswer: Scalars['String']['output'];
  questionId: Scalars['ID']['output'];
};

export type AnswerInput = {
  correct: Scalars['Boolean']['input'];
  correctAnswer: Scalars['String']['input'];
  myAnswer: Scalars['String']['input'];
};

export type ApiKey = {
  __typename?: 'ApiKey';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  keyPrefix: Scalars['String']['output'];
  lastUsedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ApplyConfigurationResponse = {
  __typename?: 'ApplyConfigurationResponse';
  configuration: Configuration;
  message: Scalars['String']['output'];
};

/** Result of archiving a checklist entry. */
export type ArchiveChecklistResponse = {
  __typename?: 'ArchiveChecklistResponse';
  entry: ChecklistEntry;
  message: Scalars['String']['output'];
};

/** Result of archiving a checklist template. */
export type ArchiveTemplateResponse = {
  __typename?: 'ArchiveTemplateResponse';
  message: Scalars['String']['output'];
  template: ChecklistTemplate;
};

export type ArchiveTextResponse = {
  __typename?: 'ArchiveTextResponse';
  message: Scalars['String']['output'];
  text: ReaderText;
};

export type ArchiveThreadResponse = {
  __typename?: 'ArchiveThreadResponse';
  message: Scalars['String']['output'];
  thread: ForumThread;
};

/** Result of attaching a remote object to a checklist detail. */
export type AttachChecklistObjectResponse = {
  __typename?: 'AttachChecklistObjectResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type AttachForumObjectResponse = {
  __typename?: 'AttachForumObjectResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type AttachReaderObjectResponse = {
  __typename?: 'AttachReaderObjectResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type AttachedText = {
  __typename?: 'AttachedText';
  id: Scalars['String']['output'];
  language: Scalars['String']['output'];
  level: Scalars['String']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type AuthResult = {
  __typename?: 'AuthResult';
  accountId: Scalars['ID']['output'];
  personId: Scalars['ID']['output'];
  token: Scalars['String']['output'];
};

export type BlogDetail = {
  __typename?: 'BlogDetail';
  attachedTexts: Array<AttachedText>;
  galleryItems: Array<BlogGalleryItem>;
  linkedPosts: Array<BlogPost>;
  post: BlogPost;
  propertySet?: Maybe<BlogPropertySet>;
};

export type BlogGalleryItem = {
  __typename?: 'BlogGalleryItem';
  id: Scalars['ID']['output'];
  imagePath?: Maybe<Scalars['String']['output']>;
  remoteObject?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type BlogMutations = {
  __typename?: 'BlogMutations';
  addRemoteObject: AddRemoteObjectResponse;
  createBlogPost: CreateBlogPostResponse;
  createBlogPostType: CreateBlogPostTypeResponse;
  createBlogWithProperties: CreateBlogWithPropertiesResponse;
  deleteBlogPost: DeleteBlogPostResponse;
  ingestBlogFromSource: IngestBlogFromSourceResponse;
  removeRemoteObject: RemoveRemoteObjectResponse;
  updateBlogPost: UpdateBlogPostResponse;
  updateBlogWithProperties: UpdateBlogWithPropertiesResponse;
};


export type BlogMutationsAddRemoteObjectArgs = {
  postId: Scalars['ID']['input'];
  target: Scalars['String']['input'];
};


export type BlogMutationsCreateBlogPostArgs = {
  input?: InputMaybe<BlogPostInput>;
  title: Scalars['String']['input'];
};


export type BlogMutationsCreateBlogPostTypeArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type BlogMutationsCreateBlogWithPropertiesArgs = {
  input: BlogWithPropertiesInput;
};


export type BlogMutationsDeleteBlogPostArgs = {
  id: Scalars['ID']['input'];
};


export type BlogMutationsIngestBlogFromSourceArgs = {
  input: IngestBlogInput;
};


export type BlogMutationsRemoveRemoteObjectArgs = {
  postId: Scalars['ID']['input'];
  target: Scalars['String']['input'];
};


export type BlogMutationsUpdateBlogPostArgs = {
  id: Scalars['ID']['input'];
  input: BlogPostInput;
};


export type BlogMutationsUpdateBlogWithPropertiesArgs = {
  id: Scalars['ID']['input'];
  input: BlogWithPropertiesInput;
};

export type BlogPost = {
  __typename?: 'BlogPost';
  attachedTexts?: Maybe<Array<AttachedText>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<BlogPost>;
  parentId?: Maybe<Scalars['ID']['output']>;
  remoteObject?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  type?: Maybe<BlogPostType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BlogPostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  remoteObject?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  typeId?: InputMaybe<Scalars['ID']['input']>;
};

export type BlogPostType = {
  __typename?: 'BlogPostType';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type BlogPropertySet = {
  __typename?: 'BlogPropertySet';
  entryName: Scalars['String']['output'];
  schema?: Maybe<BlogPropertySetSchema>;
  values?: Maybe<Scalars['JSON']['output']>;
};

export type BlogPropertySetSchema = {
  __typename?: 'BlogPropertySetSchema';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerKey?: Maybe<Scalars['String']['output']>;
  properties?: Maybe<Scalars['JSON']['output']>;
};

export type BlogQueries = {
  __typename?: 'BlogQueries';
  blogDetail: BlogDetail;
  blogPostTypes: Array<BlogPostType>;
  children: PagedBlogPosts;
  listBlogPosts: PagedBlogPosts;
  listByRemoteObjects?: Maybe<Array<Maybe<BlogPost>>>;
  locateBlogPost?: Maybe<BlogPost>;
};


export type BlogQueriesBlogDetailArgs = {
  id: Scalars['ID']['input'];
};


export type BlogQueriesChildrenArgs = {
  pagination?: InputMaybe<PaginationInput>;
  parentId: Scalars['ID']['input'];
};


export type BlogQueriesListBlogPostsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type BlogQueriesListByRemoteObjectsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type BlogQueriesLocateBlogPostArgs = {
  id: Scalars['ID']['input'];
};

export type BlogWithPropertiesInput = {
  content: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  propertySet?: InputMaybe<Scalars['JSON']['input']>;
  remoteObject?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  typeId: Scalars['ID']['input'];
};

/**  Represents a storage bucket. */
export type Bucket = {
  __typename?: 'Bucket';
  created?: Maybe<Scalars['String']['output']>;
  globalAliases?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['String']['output'];
  localAliases?: Maybe<Array<Scalars['String']['output']>>;
};

export type BucketKeyInput = {
  bucket: Scalars['String']['input'];
  key: Scalars['String']['input'];
};

export type BulkCreateQuestionsResponse = {
  __typename?: 'BulkCreateQuestionsResponse';
  message: Scalars['String']['output'];
  questions: Array<Question>;
};

/**  Response payload for the cancelTorrent mutation. */
export type CancelTorrentResponse = {
  __typename?: 'CancelTorrentResponse';
  job: TorrentJob;
  message: Scalars['String']['output'];
};

export enum CefrLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2'
}

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  message: Scalars['String']['output'];
};

/** A grouping for checklist items (e.g. chores, work, packing). */
export type ChecklistCategory = {
  __typename?: 'ChecklistCategory';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChecklistCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

/** Notes and remote-object links for an entry, template, or item. */
export type ChecklistDetail = {
  __typename?: 'ChecklistDetail';
  description?: Maybe<Scalars['String']['output']>;
  ownerId: Scalars['ID']['output'];
  remoteObject?: Maybe<Array<Scalars['String']['output']>>;
};

/** A dated checklist instance carrying a set of items with per-item status. */
export type ChecklistEntry = {
  __typename?: 'ChecklistEntry';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dueAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChecklistEntryInput = {
  dueAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** An item linked to an entry, carrying its runtime status and ordering. */
export type ChecklistEntryItem = {
  __typename?: 'ChecklistEntryItem';
  entryId: Scalars['ID']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  itemId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  status: ItemStatus;
};

/** A reusable checklist item definition, optionally grouped into a category. */
export type ChecklistItem = {
  __typename?: 'ChecklistItem';
  categoryId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lifecycleStatus: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChecklistItemInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  lifecycleStatus?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** Write operations for checklists. */
export type ChecklistMutations = {
  __typename?: 'ChecklistMutations';
  addItem: AddItemResponse;
  addTemplateItem: AddTemplateItemResponse;
  archiveChecklist: ArchiveChecklistResponse;
  archiveTemplate: ArchiveTemplateResponse;
  attachObject: AttachChecklistObjectResponse;
  completeChecklist: CompleteChecklistResponse;
  createCategory: CreateCategoryResponse;
  createChecklist: CreateChecklistResponse;
  createChecklistFromTemplate: CreateChecklistFromTemplateResponse;
  createChecklistFromTemplates: CreateChecklistFromTemplatesResponse;
  createItem: CreateItemResponse;
  createTemplate: CreateTemplateResponse;
  deleteChecklist: DeleteChecklistResponse;
  detachObject: DetachObjectResponse;
  removeItem: RemoveItemResponse;
  removeTemplateItem: RemoveTemplateItemResponse;
  retireItem: RetireItemResponse;
  saveCategory: SaveCategoryResponse;
  saveChecklist: SaveChecklistResponse;
  saveItem: SaveItemResponse;
  saveTemplate: SaveTemplateResponse;
  setItemStatus: SetItemStatusResponse;
};


/** Write operations for checklists. */
export type ChecklistMutationsAddItemArgs = {
  entryId: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
};


/** Write operations for checklists. */
export type ChecklistMutationsAddTemplateItemArgs = {
  itemId: Scalars['ID']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
  templateId: Scalars['ID']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsArchiveChecklistArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsArchiveTemplateArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsAttachObjectArgs = {
  ownerType?: InputMaybe<RemoteObjectType>;
  source: Scalars['ID']['input'];
  target: Scalars['ID']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsCompleteChecklistArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsCreateCategoryArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsCreateChecklistArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Write operations for checklists. */
export type ChecklistMutationsCreateChecklistFromTemplateArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  templateId: Scalars['ID']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsCreateChecklistFromTemplatesArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  templateIds: Array<Scalars['ID']['input']>;
};


/** Write operations for checklists. */
export type ChecklistMutationsCreateItemArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsCreateTemplateArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  itemIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name: Scalars['String']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsDeleteChecklistArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsDetachObjectArgs = {
  ownerType?: InputMaybe<RemoteObjectType>;
  source: Scalars['ID']['input'];
  target: Scalars['ID']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsRemoveItemArgs = {
  entryId: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsRemoveTemplateItemArgs = {
  itemId: Scalars['ID']['input'];
  templateId: Scalars['ID']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsRetireItemArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for checklists. */
export type ChecklistMutationsSaveCategoryArgs = {
  input: ChecklistCategoryInput;
};


/** Write operations for checklists. */
export type ChecklistMutationsSaveChecklistArgs = {
  input: ChecklistEntryInput;
};


/** Write operations for checklists. */
export type ChecklistMutationsSaveItemArgs = {
  input: ChecklistItemInput;
};


/** Write operations for checklists. */
export type ChecklistMutationsSaveTemplateArgs = {
  input: ChecklistTemplateInput;
};


/** Write operations for checklists. */
export type ChecklistMutationsSetItemStatusArgs = {
  entryId: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
  status: ItemStatus;
};

/** Read operations for checklists. */
export type ChecklistQueries = {
  __typename?: 'ChecklistQueries';
  entry?: Maybe<ChecklistEntry>;
  entryDetails?: Maybe<ChecklistDetail>;
  entryItems: PagedChecklistEntryItems;
  item?: Maybe<ChecklistItem>;
  itemDetails?: Maybe<ChecklistDetail>;
  items: PagedChecklistItems;
  listCategories?: Maybe<Array<ChecklistCategory>>;
  listEntries?: Maybe<Array<ChecklistEntry>>;
  listTemplates?: Maybe<Array<ChecklistTemplate>>;
  locateRemoteObjects: Array<RemoteObjectReference>;
  template?: Maybe<ChecklistTemplate>;
  templateDetails?: Maybe<ChecklistDetail>;
  templateItems: PagedChecklistTemplateItems;
};


/** Read operations for checklists. */
export type ChecklistQueriesEntryArgs = {
  id: Scalars['ID']['input'];
};


/** Read operations for checklists. */
export type ChecklistQueriesEntryDetailsArgs = {
  id: Scalars['ID']['input'];
};


/** Read operations for checklists. */
export type ChecklistQueriesEntryItemsArgs = {
  entryId: Scalars['ID']['input'];
  pagination?: InputMaybe<PaginationInput>;
};


/** Read operations for checklists. */
export type ChecklistQueriesItemArgs = {
  id: Scalars['ID']['input'];
};


/** Read operations for checklists. */
export type ChecklistQueriesItemDetailsArgs = {
  id: Scalars['ID']['input'];
};


/** Read operations for checklists. */
export type ChecklistQueriesItemsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Read operations for checklists. */
export type ChecklistQueriesLocateRemoteObjectsArgs = {
  ids: Array<Scalars['String']['input']>;
};


/** Read operations for checklists. */
export type ChecklistQueriesTemplateArgs = {
  id: Scalars['ID']['input'];
};


/** Read operations for checklists. */
export type ChecklistQueriesTemplateDetailsArgs = {
  id: Scalars['ID']['input'];
};


/** Read operations for checklists. */
export type ChecklistQueriesTemplateItemsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  templateId: Scalars['ID']['input'];
};

/** A reusable set of items that can seed new checklist entries. */
export type ChecklistTemplate = {
  __typename?: 'ChecklistTemplate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChecklistTemplateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
};

/** An item linked to a template, carrying only its ordering position. */
export type ChecklistTemplateItem = {
  __typename?: 'ChecklistTemplateItem';
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  itemId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  templateId: Scalars['ID']['output'];
};

export type CommentInput = {
  annotationId: Scalars['ID']['input'];
  body: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Result of completing a checklist entry. */
export type CompleteChecklistResponse = {
  __typename?: 'CompleteChecklistResponse';
  entry: ChecklistEntry;
  message: Scalars['String']['output'];
};

/** A contributing complexity factor with a direction (up/down). */
export type ComplexityFactor = {
  __typename?: 'ComplexityFactor';
  direction: Scalars['String']['output'];
  name: Scalars['String']['output'];
  value: Scalars['Float']['output'];
  weight: Scalars['Float']['output'];
};

export type Configuration = {
  __typename?: 'Configuration';
  content: Scalars['JSON']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  lastAppliedAt?: Maybe<Scalars['DateTime']['output']>;
  lastApplyError?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ConfigurationInput = {
  content: Scalars['JSON']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type ConfirmAccountReactivationResponse = {
  __typename?: 'ConfirmAccountReactivationResponse';
  message: Scalars['String']['output'];
};

export type CreateAnnotationResponse = {
  __typename?: 'CreateAnnotationResponse';
  annotation: ReaderAnnotation;
  message: Scalars['String']['output'];
};

export type CreateBlogPostResponse = {
  __typename?: 'CreateBlogPostResponse';
  message: Scalars['String']['output'];
  post: BlogPost;
};

export type CreateBlogPostTypeResponse = {
  __typename?: 'CreateBlogPostTypeResponse';
  message: Scalars['String']['output'];
  type: BlogPostType;
};

export type CreateBlogWithPropertiesResponse = {
  __typename?: 'CreateBlogWithPropertiesResponse';
  message: Scalars['String']['output'];
  post: BlogPost;
};

/** Result of creating a checklist category. */
export type CreateCategoryResponse = {
  __typename?: 'CreateCategoryResponse';
  category: ChecklistCategory;
  message: Scalars['String']['output'];
};

/** Result of creating a checklist entry from a single template. */
export type CreateChecklistFromTemplateResponse = {
  __typename?: 'CreateChecklistFromTemplateResponse';
  entry: ChecklistEntry;
  message: Scalars['String']['output'];
};

/** Result of creating a checklist entry from multiple templates. */
export type CreateChecklistFromTemplatesResponse = {
  __typename?: 'CreateChecklistFromTemplatesResponse';
  entry: ChecklistEntry;
  message: Scalars['String']['output'];
};

/** Result of creating a checklist entry. */
export type CreateChecklistResponse = {
  __typename?: 'CreateChecklistResponse';
  entry: ChecklistEntry;
  message: Scalars['String']['output'];
};

export type CreateConfigurationResponse = {
  __typename?: 'CreateConfigurationResponse';
  configuration: Configuration;
  message: Scalars['String']['output'];
};

export type CreateGalleryItemResponse = {
  __typename?: 'CreateGalleryItemResponse';
  item: GalleryItem;
  message: Scalars['String']['output'];
};

export type CreateIpWhitelistEntryResponse = {
  __typename?: 'CreateIpWhitelistEntryResponse';
  entry: IpWhitelistEntry;
  message: Scalars['String']['output'];
};

/** Result of creating a checklist item. */
export type CreateItemResponse = {
  __typename?: 'CreateItemResponse';
  item: ChecklistItem;
  message: Scalars['String']['output'];
};

export type CreatePersonResponse = {
  __typename?: 'CreatePersonResponse';
  message: Scalars['String']['output'];
  person: Person;
};

export type CreatePlaceResponse = {
  __typename?: 'CreatePlaceResponse';
  message: Scalars['String']['output'];
  place: Place;
};

export type CreatePostInput = {
  body: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  threadId: Scalars['ID']['input'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  message: Scalars['String']['output'];
  post: ForumPost;
};

export type CreatePrivateNoteResponse = {
  __typename?: 'CreatePrivateNoteResponse';
  message: Scalars['String']['output'];
  note: PrivateNote;
};

export type CreateRoleResponse = {
  __typename?: 'CreateRoleResponse';
  message: Scalars['String']['output'];
  role: Role;
};

export type CreateSourceResponse = {
  __typename?: 'CreateSourceResponse';
  message: Scalars['String']['output'];
  source: ReaderSource;
};

/** Result of creating a checklist template. */
export type CreateTemplateResponse = {
  __typename?: 'CreateTemplateResponse';
  message: Scalars['String']['output'];
  template: ChecklistTemplate;
};

export type CreateTextResponse = {
  __typename?: 'CreateTextResponse';
  message: Scalars['String']['output'];
  text: ReaderText;
};

export type CreateThreadInput = {
  remoteObject: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateThreadResponse = {
  __typename?: 'CreateThreadResponse';
  message: Scalars['String']['output'];
  thread: ForumThread;
};

export type DeactivateAccountResponse = {
  __typename?: 'DeactivateAccountResponse';
  message: Scalars['String']['output'];
};

export type DeleteAnnotationResponse = {
  __typename?: 'DeleteAnnotationResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type DeleteBlogPostResponse = {
  __typename?: 'DeleteBlogPostResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

/** Result of deleting a checklist entry. */
export type DeleteChecklistResponse = {
  __typename?: 'DeleteChecklistResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type DeleteCommentResponse = {
  __typename?: 'DeleteCommentResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type DeleteConfigurationResponse = {
  __typename?: 'DeleteConfigurationResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

/**  Response payload for the deleteFile mutation. */
export type DeleteFileResponse = {
  __typename?: 'DeleteFileResponse';
  key: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type DeleteIpWhitelistEntryResponse = {
  __typename?: 'DeleteIpWhitelistEntryResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

/**  Response payload for the deleteKey mutation. */
export type DeleteKeyResponse = {
  __typename?: 'DeleteKeyResponse';
  key: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type DeletePersonResponse = {
  __typename?: 'DeletePersonResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type DeletePlaceResponse = {
  __typename?: 'DeletePlaceResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type DeletePrivateNoteResponse = {
  __typename?: 'DeletePrivateNoteResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type DeletePropertyEntryResponse = {
  __typename?: 'DeletePropertyEntryResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type DeleteRoleResponse = {
  __typename?: 'DeleteRoleResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

/** Result of detaching a remote object from a checklist detail. */
export type DetachObjectResponse = {
  __typename?: 'DetachObjectResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export enum DeviceStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Suspended = 'SUSPENDED'
}

export type DiscordLoginResult = {
  __typename?: 'DiscordLoginResult';
  accountId: Scalars['ID']['output'];
  readerAccountId: Scalars['ID']['output'];
  requiresReactivation: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
};

export type EditAnnotationResponse = {
  __typename?: 'EditAnnotationResponse';
  annotation: ReaderAnnotation;
  message: Scalars['String']['output'];
};

export type EditCommentResponse = {
  __typename?: 'EditCommentResponse';
  comment: ReaderComment;
  message: Scalars['String']['output'];
};

export type EditPostResponse = {
  __typename?: 'EditPostResponse';
  message: Scalars['String']['output'];
  post: ForumPost;
};

export type Entry = {
  __typename?: 'Entry';
  definitions: Array<Scalars['String']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  word: Scalars['String']['output'];
};

export enum EntryStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED'
}

export enum ErrorDetail {
  /**
   * The deadline expired before the operation could complete.
   *
   * For operations that change the state of the system, this error
   * may be returned even if the operation has completed successfully.
   * For example, a successful response from a server could have been
   * delayed long enough for the deadline to expire.
   *
   * HTTP Mapping: 504 Gateway Timeout
   * Error Type: UNAVAILABLE
   */
  DeadlineExceeded = 'DEADLINE_EXCEEDED',
  /**
   * The server detected that the client is exhibiting a behavior that
   * might be generating excessive load.
   *
   * HTTP Mapping: 420 Enhance Your Calm
   * Error Type: UNAVAILABLE
   */
  EnhanceYourCalm = 'ENHANCE_YOUR_CALM',
  /**
   * The requested field is not found in the schema.
   *
   * This differs from `NOT_FOUND` in that `NOT_FOUND` should be used when a
   * query is valid, but is unable to return a result (if, for example, a
   * specific video id doesn't exist). `FIELD_NOT_FOUND` is intended to be
   * returned by the server to signify that the requested field is not known to exist.
   * This may be returned in lieu of failing the entire query.
   * See also `PERMISSION_DENIED` for cases where the
   * requested field is invalid only for the given user or class of users.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: BAD_REQUEST
   */
  FieldNotFound = 'FIELD_NOT_FOUND',
  /**
   * The client specified an invalid argument.
   *
   * Note that this differs from `FAILED_PRECONDITION`.
   * `INVALID_ARGUMENT` indicates arguments that are problematic
   * regardless of the state of the system (e.g., a malformed file name).
   *
   * HTTP Mapping: 400 Bad Request
   * Error Type: BAD_REQUEST
   */
  InvalidArgument = 'INVALID_ARGUMENT',
  /**
   * The provided cursor is not valid.
   *
   * The most common usage for this error is when a client is paginating
   * through a list that uses stateful cursors. In that case, the provided
   * cursor may be expired.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: NOT_FOUND
   */
  InvalidCursor = 'INVALID_CURSOR',
  /**
   * Unable to perform operation because a required resource is missing.
   *
   * Example: Client is attempting to refresh a list, but the specified
   * list is expired. This requires an action by the client to get a new list.
   *
   * If the user is simply trying GET a resource that is not found,
   * use the NOT_FOUND error type. FAILED_PRECONDITION.MISSING_RESOURCE
   * is to be used particularly when the user is performing an operation
   * that requires a particular resource to exist.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   * Error Type: FAILED_PRECONDITION
   */
  MissingResource = 'MISSING_RESOURCE',
  /**
   * Service Error.
   *
   * There is a problem with an upstream service.
   *
   * This may be returned if a gateway receives an unknown error from a service
   * or if a service is unreachable.
   * If a request times out which waiting on a response from a service,
   * `DEADLINE_EXCEEDED` may be returned instead.
   * If a service returns a more specific error Type, the specific error Type may
   * be returned instead.
   *
   * HTTP Mapping: 502 Bad Gateway
   * Error Type: UNAVAILABLE
   */
  ServiceError = 'SERVICE_ERROR',
  /**
   * Request failed due to network errors.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  TcpFailure = 'TCP_FAILURE',
  /**
   * Request throttled based on server concurrency limits.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  ThrottledConcurrency = 'THROTTLED_CONCURRENCY',
  /**
   * Request throttled based on server CPU limits
   *
   * HTTP Mapping: 503 Unavailable.
   * Error Type: UNAVAILABLE
   */
  ThrottledCpu = 'THROTTLED_CPU',
  /**
   * The server detected that the client is exhibiting a behavior that
   * might be generating excessive load.
   *
   * HTTP Mapping: 429 Too Many Requests
   * Error Type: UNAVAILABLE
   */
  TooManyRequests = 'TOO_MANY_REQUESTS',
  /**
   * The operation is not implemented or is not currently supported/enabled.
   *
   * HTTP Mapping: 501 Not Implemented
   * Error Type: BAD_REQUEST
   */
  Unimplemented = 'UNIMPLEMENTED',
  /**
   * Unknown error.
   *
   * This error should only be returned when no other error detail applies.
   * If a client sees an unknown errorDetail, it will be interpreted as UNKNOWN.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Unknown = 'UNKNOWN'
}

export enum ErrorType {
  /**
   * Bad Request.
   *
   * There is a problem with the request.
   * Retrying the same request is not likely to succeed.
   * An example would be a query or argument that cannot be deserialized.
   *
   * HTTP Mapping: 400 Bad Request
   */
  BadRequest = 'BAD_REQUEST',
  /**
   * The operation was rejected because the system is not in a state
   * required for the operation's execution.  For example, the directory
   * to be deleted is non-empty, an rmdir operation is applied to
   * a non-directory, etc.
   *
   * Service implementers can use the following guidelines to decide
   * between `FAILED_PRECONDITION` and `UNAVAILABLE`:
   *
   * - Use `UNAVAILABLE` if the client can retry just the failing call.
   * - Use `FAILED_PRECONDITION` if the client should not retry until
   * the system state has been explicitly fixed.  E.g., if an "rmdir"
   *      fails because the directory is non-empty, `FAILED_PRECONDITION`
   * should be returned since the client should not retry unless
   * the files are deleted from the directory.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   */
  FailedPrecondition = 'FAILED_PRECONDITION',
  /**
   * Internal error.
   *
   * An unexpected internal error was encountered. This means that some
   * invariants expected by the underlying system have been broken.
   * This error code is reserved for serious errors.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Internal = 'INTERNAL',
  /**
   * The requested entity was not found.
   *
   * This could apply to a resource that has never existed (e.g. bad resource id),
   * or a resource that no longer exists (e.g. cache expired.)
   *
   * Note to server developers: if a request is denied for an entire class
   * of users, such as gradual feature rollout or undocumented allowlist,
   * `NOT_FOUND` may be used. If a request is denied for some users within
   * a class of users, such as user-based access control, `PERMISSION_DENIED`
   * must be used.
   *
   * HTTP Mapping: 404 Not Found
   */
  NotFound = 'NOT_FOUND',
  /**
   * The caller does not have permission to execute the specified
   * operation.
   *
   * `PERMISSION_DENIED` must not be used for rejections
   * caused by exhausting some resource or quota.
   * `PERMISSION_DENIED` must not be used if the caller
   * cannot be identified (use `UNAUTHENTICATED`
   * instead for those errors).
   *
   * This error Type does not imply the
   * request is valid or the requested entity exists or satisfies
   * other pre-conditions.
   *
   * HTTP Mapping: 403 Forbidden
   */
  PermissionDenied = 'PERMISSION_DENIED',
  /**
   * The request does not have valid authentication credentials.
   *
   * This is intended to be returned only for routes that require
   * authentication.
   *
   * HTTP Mapping: 401 Unauthorized
   */
  Unauthenticated = 'UNAUTHENTICATED',
  /**
   * Currently Unavailable.
   *
   * The service is currently unavailable.  This is most likely a
   * transient condition, which can be corrected by retrying with
   * a backoff.
   *
   * HTTP Mapping: 503 Unavailable
   */
  Unavailable = 'UNAVAILABLE',
  /**
   * Unknown error.
   *
   * For example, this error may be returned when
   * an error code received from another address space belongs to
   * an error space that is not known in this address space.  Also
   * errors raised by APIs that do not return enough error information
   * may be converted to this error.
   *
   * If a client sees an unknown errorType, it will be interpreted as UNKNOWN.
   * Unknown errors MUST NOT trigger any special behavior. These MAY be treated
   * by an implementation as being equivalent to INTERNAL.
   *
   * When possible, a more specific error should be provided.
   *
   * HTTP Mapping: 520 Unknown Error
   */
  Unknown = 'UNKNOWN'
}

export type ExpireTailscaleDeviceResponse = {
  __typename?: 'ExpireTailscaleDeviceResponse';
  device: TailscaleDevice;
  message: Scalars['String']['output'];
};

export type FatesMutations = {
  __typename?: 'FatesMutations';
  createPerson: CreatePersonResponse;
  createPlace: CreatePlaceResponse;
  deletePerson: DeletePersonResponse;
  deletePlace: DeletePlaceResponse;
  savePerson: SavePersonResponse;
  savePlace: SavePlaceResponse;
};


export type FatesMutationsCreatePersonArgs = {
  input: PersonInput;
};


export type FatesMutationsCreatePlaceArgs = {
  input: PlaceInput;
};


export type FatesMutationsDeletePersonArgs = {
  id: Scalars['ID']['input'];
};


export type FatesMutationsDeletePlaceArgs = {
  id: Scalars['ID']['input'];
};


export type FatesMutationsSavePersonArgs = {
  input: PersonInput;
};


export type FatesMutationsSavePlaceArgs = {
  input: PlaceInput;
};

export type FatesQueries = {
  __typename?: 'FatesQueries';
  listPeople?: Maybe<Array<Person>>;
  listPlaces?: Maybe<Array<Place>>;
  person?: Maybe<Person>;
  place?: Maybe<Place>;
};


export type FatesQueriesPersonArgs = {
  id: Scalars['ID']['input'];
};


export type FatesQueriesPlaceArgs = {
  id: Scalars['ID']['input'];
};

/**  Represents a file object in a bucket. */
export type File = {
  __typename?: 'File';
  key: Scalars['String']['output'];
  lastModified?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
};

/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutations = {
  __typename?: 'FilestoreMutations';
  /**  Adds a torrent from a magnet link or base64-encoded .torrent file. */
  addTorrent: AddTorrentResponse;
  /**  Cancels a torrent download and clears its scratch files. */
  cancelTorrent: CancelTorrentResponse;
  /**  Delete a file. */
  deleteFile: DeleteFileResponse;
  /**  Delete a key and propagate: recursively delete the key, all sub-keys and files under it. */
  deleteKey: DeleteKeyResponse;
  /**  Returns a presigned GET URL for direct browser download. */
  getPresignedDownloadUrl: GetPresignedDownloadUrlResponse;
  /**  Returns a presigned PUT URL for direct browser-to-storage upload. */
  getPresignedUploadUrl: GetPresignedUploadUrlResponse;
  /**  Batch-presigns multiple PUT URLs for multi-file uploads. */
  getPresignedUploadUrls: GetPresignedUploadUrlsResponse;
  /**  Pauses a torrent download. */
  pauseTorrent: PauseTorrentResponse;
  /**  Create a directory key (folder). */
  putKey: PutKeyResponse;
  /**  Renames a single file or a directory prefix. Validates conflicts when merge is false. */
  renameKey: RenameKeyResponse;
  /**  Resumes a paused torrent download. */
  resumeTorrent: ResumeTorrentResponse;
};


/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutationsAddTorrentArgs = {
  input: AddTorrentInput;
};


/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutationsCancelTorrentArgs = {
  jobId: Scalars['String']['input'];
};


/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutationsDeleteFileArgs = {
  input: BucketKeyInput;
};


/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutationsDeleteKeyArgs = {
  input: BucketKeyInput;
};


/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutationsGetPresignedDownloadUrlArgs = {
  input: BucketKeyInput;
};


/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutationsGetPresignedUploadUrlArgs = {
  input: PresignInput;
};


/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutationsGetPresignedUploadUrlsArgs = {
  input: Array<PresignInput>;
};


/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutationsPauseTorrentArgs = {
  jobId: Scalars['String']['input'];
};


/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutationsPutKeyArgs = {
  input: PutKeyInput;
};


/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutationsRenameKeyArgs = {
  input: RenameKeyInput;
};


/**  Mutations for filestore operations including multipart upload support. */
export type FilestoreMutationsResumeTorrentArgs = {
  jobId: Scalars['String']['input'];
};

/**  Queries for filestore operations. */
export type FilestoreQueries = {
  __typename?: 'FilestoreQueries';
  health?: Maybe<Scalars['String']['output']>;
  listBuckets?: Maybe<Array<Bucket>>;
  /**  List all active image key details in a bucket. */
  listImages?: Maybe<Array<KeyDetail>>;
  /**  List keys under a prefix, returning objects and directory entries. */
  listKeys?: Maybe<Array<KeyEntry>>;
  /**  Locate a single key's metadata by bucket and key path. */
  locate?: Maybe<KeyDetail>;
  /**  Locate a single active image key detail by bucket and key path. */
  locateImage?: Maybe<KeyDetail>;
  /**  Searches Prowlarr for torrents matching the query. */
  searchTorrents: Array<TorrentSearchResult>;
  /**  Look up a single torrent download job by id. */
  torrentJob?: Maybe<TorrentJob>;
  /**  List torrent download jobs, optionally filtered by bucket and status. */
  torrentJobs?: Maybe<Array<TorrentJob>>;
};


/**  Queries for filestore operations. */
export type FilestoreQueriesListImagesArgs = {
  bucket: Scalars['String']['input'];
};


/**  Queries for filestore operations. */
export type FilestoreQueriesListKeysArgs = {
  bucket: Scalars['String']['input'];
  prefix?: InputMaybe<Scalars['String']['input']>;
};


/**  Queries for filestore operations. */
export type FilestoreQueriesLocateArgs = {
  bucket: Scalars['String']['input'];
  keyPath: Scalars['String']['input'];
};


/**  Queries for filestore operations. */
export type FilestoreQueriesLocateImageArgs = {
  bucket: Scalars['String']['input'];
  keyPath: Scalars['String']['input'];
};


/**  Queries for filestore operations. */
export type FilestoreQueriesSearchTorrentsArgs = {
  query: Scalars['String']['input'];
};


/**  Queries for filestore operations. */
export type FilestoreQueriesTorrentJobArgs = {
  jobId: Scalars['String']['input'];
};


/**  Queries for filestore operations. */
export type FilestoreQueriesTorrentJobsArgs = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TorrentJobStatus>;
};

/** A single filter applied to a paginated query. */
export type FilterInput = {
  field: Scalars['String']['input'];
  operator: FilterOperator;
  value: Scalars['String']['input'];
};

/** Operators for FilterInput. */
export enum FilterOperator {
  EndsWith = 'ENDS_WITH',
  Equals = 'EQUALS',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  In = 'IN',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  Matches = 'MATCHES',
  NotEquals = 'NOT_EQUALS',
  StartsWith = 'STARTS_WITH'
}

export type ForumObjectReference = {
  __typename?: 'ForumObjectReference';
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
};

/** A post in a discussion thread. */
export type ForumPost = {
  __typename?: 'ForumPost';
  author?: Maybe<RemoteUser>;
  authorProfile?: Maybe<ReaderAccount>;
  body: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  downvotes: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  myVote?: Maybe<VoteValue>;
  netScore: Scalars['Int']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  status: PostStatus;
  threadId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  upvotes: Scalars['Int']['output'];
};

/** A discussion thread attached to a remote object. */
export type ForumThread = {
  __typename?: 'ForumThread';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  remoteObject?: Maybe<Array<Scalars['String']['output']>>;
  status: ThreadStatus;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ForumVoteInput = {
  postId: Scalars['ID']['input'];
  value: VoteValue;
};

export type GaiaMutations = {
  __typename?: 'GaiaMutations';
  applyConfiguration: ApplyConfigurationResponse;
  changePassword: ChangePasswordResponse;
  confirmAccountReactivation: ConfirmAccountReactivationResponse;
  createConfiguration: CreateConfigurationResponse;
  createIpWhitelistEntry: CreateIpWhitelistEntryResponse;
  createRole: CreateRoleResponse;
  deactivateAccount: DeactivateAccountResponse;
  deleteConfiguration: DeleteConfigurationResponse;
  deleteIpWhitelistEntry: DeleteIpWhitelistEntryResponse;
  deletePropertyEntry: DeletePropertyEntryResponse;
  deleteRole: DeleteRoleResponse;
  expireTailscaleDevice: ExpireTailscaleDeviceResponse;
  issueApiKey: IssueApiKeyResponse;
  login?: Maybe<AuthResult>;
  logout: LogoutResponse;
  register?: Maybe<AuthResult>;
  registerPropertySetSchema: RegisterPropertySetSchemaResponse;
  requestAccountReactivation: RequestAccountReactivationResponse;
  requestPasswordReset: RequestPasswordResetResponse;
  resetPassword: ResetPasswordResponse;
  revokeApiKey: RevokeApiKeyResponse;
  rotateApiKey: RotateApiKeyResponse;
  saveRegistry: SaveRegistryResponse;
  setAccountPermissions: SetAccountPermissionsResponse;
  setAccountRoles: SetAccountRolesResponse;
  setProperty: SetPropertyResponse;
  setRolePermissions: SetRolePermissionsResponse;
  suspendAccount: SuspendAccountResponse;
  unsuspendAccount: UnsuspendAccountResponse;
  updateConfiguration: UpdateConfigurationResponse;
  updateIpWhitelistEntry: UpdateIpWhitelistEntryResponse;
  upsertPropertyEntry: UpsertPropertyEntryResponse;
};


export type GaiaMutationsApplyConfigurationArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaMutationsChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type GaiaMutationsConfirmAccountReactivationArgs = {
  token: Scalars['String']['input'];
};


export type GaiaMutationsCreateConfigurationArgs = {
  input: ConfigurationInput;
};


export type GaiaMutationsCreateIpWhitelistEntryArgs = {
  input: IpWhitelistEntryInput;
};


export type GaiaMutationsCreateRoleArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type GaiaMutationsDeleteConfigurationArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaMutationsDeleteIpWhitelistEntryArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaMutationsDeletePropertyEntryArgs = {
  entry: Scalars['String']['input'];
  name: Scalars['String']['input'];
  ownerKey: Scalars['String']['input'];
};


export type GaiaMutationsDeleteRoleArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaMutationsExpireTailscaleDeviceArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaMutationsIssueApiKeyArgs = {
  accountUsername: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type GaiaMutationsLoginArgs = {
  input: LoginInput;
};


export type GaiaMutationsRegisterArgs = {
  input: RegisterInput;
};


export type GaiaMutationsRegisterPropertySetSchemaArgs = {
  input: PropertySetSchemaInput;
};


export type GaiaMutationsRequestAccountReactivationArgs = {
  email: Scalars['String']['input'];
  provider: Scalars['String']['input'];
};


export type GaiaMutationsRequestPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type GaiaMutationsResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type GaiaMutationsRevokeApiKeyArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaMutationsRotateApiKeyArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaMutationsSaveRegistryArgs = {
  input: HubRegistryInput;
};


export type GaiaMutationsSetAccountPermissionsArgs = {
  accountId: Scalars['ID']['input'];
  permissions: Array<Scalars['String']['input']>;
};


export type GaiaMutationsSetAccountRolesArgs = {
  accountId: Scalars['ID']['input'];
  roleNames: Array<Scalars['String']['input']>;
};


export type GaiaMutationsSetPropertyArgs = {
  entry: Scalars['String']['input'];
  input: SetPropertyInput;
  name: Scalars['String']['input'];
  ownerKey: Scalars['String']['input'];
};


export type GaiaMutationsSetRolePermissionsArgs = {
  permissions: Array<Scalars['String']['input']>;
  roleId: Scalars['ID']['input'];
};


export type GaiaMutationsSuspendAccountArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaMutationsUnsuspendAccountArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaMutationsUpdateConfigurationArgs = {
  id: Scalars['ID']['input'];
  input: ConfigurationInput;
};


export type GaiaMutationsUpdateIpWhitelistEntryArgs = {
  id: Scalars['ID']['input'];
  input: IpWhitelistEntryInput;
};


export type GaiaMutationsUpsertPropertyEntryArgs = {
  entry: Scalars['String']['input'];
  input: UpsertPropertyEntryInput;
  name: Scalars['String']['input'];
  ownerKey: Scalars['String']['input'];
};

export type GaiaQueries = {
  __typename?: 'GaiaQueries';
  accessibleCommandIntents: Array<PropertySetEntry>;
  account?: Maybe<Account>;
  accountPermissions: Array<Scalars['String']['output']>;
  accountRoles: Array<Scalars['String']['output']>;
  accounts: PagedAccounts;
  allPermissions: Array<Scalars['String']['output']>;
  configuration?: Maybe<Configuration>;
  configurations: Array<Configuration>;
  effectivePermissions: Array<Scalars['String']['output']>;
  hubRegistry?: Maybe<HubRegistry>;
  ipWhitelistEntries: Array<IpWhitelistEntry>;
  listAccounts?: Maybe<Array<Account>>;
  me?: Maybe<Account>;
  myRoles: Array<Scalars['String']['output']>;
  propertySet?: Maybe<Scalars['JSON']['output']>;
  propertySetSchema?: Maybe<PropertySetSchema>;
  propertySetSchemas: Array<PropertySetSchema>;
  propertySets: Array<PropertySetEntry>;
  role?: Maybe<Role>;
  rolePermissions: Array<Scalars['String']['output']>;
  roles: Array<Role>;
  tailscaleDevice?: Maybe<TailscaleDevice>;
  tailscaleDevices: Array<TailscaleDevice>;
};


export type GaiaQueriesAccessibleCommandIntentsArgs = {
  ownerKey: Scalars['String']['input'];
  propertySet: Scalars['String']['input'];
  remoteUserId: Scalars['String']['input'];
  remoteUserType: RemoteUserType;
};


export type GaiaQueriesAccountArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaQueriesAccountPermissionsArgs = {
  accountId: Scalars['ID']['input'];
};


export type GaiaQueriesAccountRolesArgs = {
  accountId: Scalars['ID']['input'];
};


export type GaiaQueriesAccountsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type GaiaQueriesConfigurationArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaQueriesEffectivePermissionsArgs = {
  remoteUserId: Scalars['String']['input'];
  remoteUserType: RemoteUserType;
};


export type GaiaQueriesPropertySetArgs = {
  entry?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerKey: Scalars['String']['input'];
};


export type GaiaQueriesPropertySetSchemaArgs = {
  name: Scalars['String']['input'];
  ownerKey: Scalars['String']['input'];
};


export type GaiaQueriesPropertySetSchemasArgs = {
  ownerKey?: InputMaybe<Scalars['String']['input']>;
};


export type GaiaQueriesPropertySetsArgs = {
  name: Scalars['String']['input'];
  ownerKey: Scalars['String']['input'];
};


export type GaiaQueriesRoleArgs = {
  id: Scalars['ID']['input'];
};


export type GaiaQueriesRolePermissionsArgs = {
  roleId: Scalars['ID']['input'];
};


export type GaiaQueriesTailscaleDeviceArgs = {
  id: Scalars['ID']['input'];
};

export type GalleryItem = {
  __typename?: 'GalleryItem';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imagePath?: Maybe<Scalars['String']['output']>;
  keyDetailId?: Maybe<Scalars['ID']['output']>;
  remoteObject?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GalleryItemInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imagePath?: InputMaybe<Scalars['String']['input']>;
  keyDetailId?: InputMaybe<Scalars['ID']['input']>;
  remoteObject?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type GalleryMutations = {
  __typename?: 'GalleryMutations';
  create: CreateGalleryItemResponse;
};


export type GalleryMutationsCreateArgs = {
  input?: InputMaybe<GalleryItemInput>;
};

export type GalleryQueries = {
  __typename?: 'GalleryQueries';
  list?: Maybe<Array<Maybe<GalleryItem>>>;
  listByRemoteObjects?: Maybe<Array<Maybe<GalleryItem>>>;
  locate?: Maybe<GalleryItem>;
  locateGalleryItems?: Maybe<Array<Maybe<GalleryItem>>>;
};


export type GalleryQueriesListByRemoteObjectsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type GalleryQueriesLocateArgs = {
  id: Scalars['ID']['input'];
};


export type GalleryQueriesLocateGalleryItemsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

/**  Response payload for the getPresignedDownloadUrl mutation. */
export type GetPresignedDownloadUrlResponse = {
  __typename?: 'GetPresignedDownloadUrlResponse';
  message: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

/**  Response payload for the getPresignedUploadUrl mutation. */
export type GetPresignedUploadUrlResponse = {
  __typename?: 'GetPresignedUploadUrlResponse';
  message: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

/**  Response payload for the getPresignedUploadUrls mutation. */
export type GetPresignedUploadUrlsResponse = {
  __typename?: 'GetPresignedUploadUrlsResponse';
  message: Scalars['String']['output'];
  urls: Array<Scalars['String']['output']>;
};

/** Write operations for the reader. */
export type HadesMutations = {
  __typename?: 'HadesMutations';
  addComment: AddCommentResponse;
  archiveText: ArchiveTextResponse;
  attachObject: AttachReaderObjectResponse;
  createAnnotation: CreateAnnotationResponse;
  createPrivateNote: CreatePrivateNoteResponse;
  createSource: CreateSourceResponse;
  createText: CreateTextResponse;
  deleteAnnotation: DeleteAnnotationResponse;
  deleteComment: DeleteCommentResponse;
  deletePrivateNote: DeletePrivateNoteResponse;
  discordLogin?: Maybe<DiscordLoginResult>;
  editAnnotation: EditAnnotationResponse;
  editComment: EditCommentResponse;
  markViewed: MarkViewedResponse;
  removeVote: VoteReaderResponse;
  shareNotes: ShareNotesResponse;
  vote: VoteReaderResponse;
};


/** Write operations for the reader. */
export type HadesMutationsAddCommentArgs = {
  input: CommentInput;
};


/** Write operations for the reader. */
export type HadesMutationsArchiveTextArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for the reader. */
export type HadesMutationsAttachObjectArgs = {
  source: Scalars['ID']['input'];
  target: Scalars['String']['input'];
};


/** Write operations for the reader. */
export type HadesMutationsCreateAnnotationArgs = {
  input: AnnotationInput;
};


/** Write operations for the reader. */
export type HadesMutationsCreatePrivateNoteArgs = {
  input: PrivateNoteInput;
};


/** Write operations for the reader. */
export type HadesMutationsCreateSourceArgs = {
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


/** Write operations for the reader. */
export type HadesMutationsCreateTextArgs = {
  input: ReaderTextInput;
};


/** Write operations for the reader. */
export type HadesMutationsDeleteAnnotationArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for the reader. */
export type HadesMutationsDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for the reader. */
export type HadesMutationsDeletePrivateNoteArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for the reader. */
export type HadesMutationsDiscordLoginArgs = {
  code: Scalars['String']['input'];
  state: Scalars['String']['input'];
};


/** Write operations for the reader. */
export type HadesMutationsEditAnnotationArgs = {
  body: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


/** Write operations for the reader. */
export type HadesMutationsEditCommentArgs = {
  body: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


/** Write operations for the reader. */
export type HadesMutationsMarkViewedArgs = {
  textId: Scalars['ID']['input'];
};


/** Write operations for the reader. */
export type HadesMutationsRemoveVoteArgs = {
  targetId: Scalars['ID']['input'];
  targetType: ReaderVoteTarget;
};


/** Write operations for the reader. */
export type HadesMutationsShareNotesArgs = {
  input: ShareNotesInput;
};


/** Write operations for the reader. */
export type HadesMutationsVoteArgs = {
  input: VoteInput;
};

/** Read operations for the reader. */
export type HadesQueries = {
  __typename?: 'HadesQueries';
  annotation?: Maybe<ReaderAnnotation>;
  annotations: PagedReaderAnnotations;
  classifyTextLevel?: Maybe<TextLevelAssessment>;
  comments: PagedReaderComments;
  defineWord?: Maybe<Word>;
  locateReaderTexts: Array<ReaderText>;
  locateRemoteObjects: Array<ReaderObjectReference>;
  myVote?: Maybe<VoteValue>;
  privateNotes: PagedPrivateNotes;
  readerAccount?: Maybe<ReaderAccount>;
  readerAccounts: Array<ReaderAccount>;
  searchReaderAccounts: Array<ReaderAccount>;
  source?: Maybe<ReaderSource>;
  sources?: Maybe<Array<ReaderSource>>;
  text?: Maybe<ReaderText>;
  texts: PagedReaderTexts;
  viewedReaderTexts: PagedReaderTexts;
  viewedTexts: PagedTextViews;
};


/** Read operations for the reader. */
export type HadesQueriesAnnotationArgs = {
  id: Scalars['ID']['input'];
};


/** Read operations for the reader. */
export type HadesQueriesAnnotationsArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationInput>;
  textId: Scalars['ID']['input'];
};


/** Read operations for the reader. */
export type HadesQueriesClassifyTextLevelArgs = {
  text: Scalars['String']['input'];
};


/** Read operations for the reader. */
export type HadesQueriesCommentsArgs = {
  annotationId: Scalars['ID']['input'];
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationInput>;
};


/** Read operations for the reader. */
export type HadesQueriesDefineWordArgs = {
  dictionary?: InputMaybe<WordDictionary>;
  scope?: InputMaybe<Array<WordScope>>;
  word: Scalars['String']['input'];
};


/** Read operations for the reader. */
export type HadesQueriesLocateReaderTextsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


/** Read operations for the reader. */
export type HadesQueriesLocateRemoteObjectsArgs = {
  ids: Array<Scalars['String']['input']>;
};


/** Read operations for the reader. */
export type HadesQueriesMyVoteArgs = {
  targetId: Scalars['ID']['input'];
  targetType: ReaderVoteTarget;
};


/** Read operations for the reader. */
export type HadesQueriesPrivateNotesArgs = {
  pagination?: InputMaybe<PaginationInput>;
  textId: Scalars['ID']['input'];
};


/** Read operations for the reader. */
export type HadesQueriesReaderAccountsArgs = {
  remoteUsers: Array<RemoteUserInput>;
};


/** Read operations for the reader. */
export type HadesQueriesSearchReaderAccountsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  query: Scalars['String']['input'];
};


/** Read operations for the reader. */
export type HadesQueriesSourceArgs = {
  id: Scalars['ID']['input'];
};


/** Read operations for the reader. */
export type HadesQueriesTextArgs = {
  id: Scalars['ID']['input'];
};


/** Read operations for the reader. */
export type HadesQueriesTextsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Read operations for the reader. */
export type HadesQueriesViewedReaderTextsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


/** Read operations for the reader. */
export type HadesQueriesViewedTextsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};

export type HubApp = {
  __typename?: 'HubApp';
  description: Scalars['String']['output'];
  devPort: Scalars['Int']['output'];
  dir: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  prodPort: Scalars['Int']['output'];
  self: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
};

export type HubAppInput = {
  description: Scalars['String']['input'];
  devPort: Scalars['Int']['input'];
  dir: Scalars['String']['input'];
  enabled: Scalars['Boolean']['input'];
  key: Scalars['String']['input'];
  name: Scalars['String']['input'];
  prodPort: Scalars['Int']['input'];
  self: Scalars['Boolean']['input'];
  url: Scalars['String']['input'];
};

export enum HubMode {
  Dev = 'dev',
  Serve = 'serve'
}

export type HubRegistry = {
  __typename?: 'HubRegistry';
  apps: Array<HubApp>;
  mode: HubMode;
};

export type HubRegistryInput = {
  apps: Array<HubAppInput>;
  mode: HubMode;
};

/** Write operations for forums. */
export type IcarusMutations = {
  __typename?: 'IcarusMutations';
  archiveThread: ArchiveThreadResponse;
  attachObject: AttachForumObjectResponse;
  createPost: CreatePostResponse;
  createThread: CreateThreadResponse;
  deletePost: DeletePostResponse;
  editPost: EditPostResponse;
  lockThread: LockThreadResponse;
  removeVote: RemoveVoteResponse;
  vote: VoteForumResponse;
};


/** Write operations for forums. */
export type IcarusMutationsArchiveThreadArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for forums. */
export type IcarusMutationsAttachObjectArgs = {
  source: Scalars['ID']['input'];
  target: Scalars['String']['input'];
};


/** Write operations for forums. */
export type IcarusMutationsCreatePostArgs = {
  input: CreatePostInput;
};


/** Write operations for forums. */
export type IcarusMutationsCreateThreadArgs = {
  input: CreateThreadInput;
};


/** Write operations for forums. */
export type IcarusMutationsDeletePostArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for forums. */
export type IcarusMutationsEditPostArgs = {
  body: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


/** Write operations for forums. */
export type IcarusMutationsLockThreadArgs = {
  id: Scalars['ID']['input'];
};


/** Write operations for forums. */
export type IcarusMutationsRemoveVoteArgs = {
  postId: Scalars['ID']['input'];
};


/** Write operations for forums. */
export type IcarusMutationsVoteArgs = {
  input: ForumVoteInput;
};

/** Read operations for forums. */
export type IcarusQueries = {
  __typename?: 'IcarusQueries';
  locateRemoteObjects: Array<ForumObjectReference>;
  myVote?: Maybe<VoteValue>;
  posts: PagedForumPosts;
  thread?: Maybe<ForumThread>;
  threadsFor: PagedForumThreads;
};


/** Read operations for forums. */
export type IcarusQueriesLocateRemoteObjectsArgs = {
  ids: Array<Scalars['String']['input']>;
};


/** Read operations for forums. */
export type IcarusQueriesMyVoteArgs = {
  postId: Scalars['ID']['input'];
};


/** Read operations for forums. */
export type IcarusQueriesPostsArgs = {
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationInput>;
  threadId: Scalars['ID']['input'];
};


/** Read operations for forums. */
export type IcarusQueriesThreadArgs = {
  id: Scalars['ID']['input'];
};


/** Read operations for forums. */
export type IcarusQueriesThreadsForArgs = {
  pagination?: InputMaybe<PaginationInput>;
  remoteObject: Scalars['String']['input'];
};

export type IngestBlogFromSourceResponse = {
  __typename?: 'IngestBlogFromSourceResponse';
  message: Scalars['String']['output'];
  post: BlogPost;
};

export type IngestBlogInput = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
  sourceId: Scalars['String']['input'];
  sourceKind: SourceKind;
  title: Scalars['String']['input'];
  typeName: Scalars['String']['input'];
};

export type IpWhitelistEntry = {
  __typename?: 'IpWhitelistEntry';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  immutable: Scalars['Boolean']['output'];
  pattern: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type IpWhitelistEntryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  immutable?: InputMaybe<Scalars['Boolean']['input']>;
  pattern: Scalars['String']['input'];
};

export type IssueApiKeyResponse = {
  __typename?: 'IssueApiKeyResponse';
  apiKey: IssuedApiKey;
  message: Scalars['String']['output'];
};

export type IssuedApiKey = {
  __typename?: 'IssuedApiKey';
  apiKey: ApiKey;
  plaintextKey: Scalars['String']['output'];
};

/** Status of an item within a checklist entry. */
export enum ItemStatus {
  Complete = 'COMPLETE',
  Failed = 'FAILED',
  NotNeeded = 'NOT_NEEDED',
  NotStarted = 'NOT_STARTED'
}

/**  Detailed metadata for a specific key. */
export type KeyDetail = {
  __typename?: 'KeyDetail';
  archivedAt?: Maybe<Scalars['String']['output']>;
  bucket: Scalars['String']['output'];
  contentType?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  keyPath: Scalars['String']['output'];
  lastUpdatedAt?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

/**  Directory-like entry for a bucket key. */
export type KeyEntry = {
  __typename?: 'KeyEntry';
  description?: Maybe<Scalars['String']['output']>;
  isDirectory: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  lastModified?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  /**  Present only when this key is an in-progress torrent download. */
  torrent?: Maybe<TorrentDownload>;
};

/** Predicted probability for a single CEFR level. */
export type LevelProbability = {
  __typename?: 'LevelProbability';
  level: CefrLevel;
  probability: Scalars['Float']['output'];
};

export type LinkQuestionResponse = {
  __typename?: 'LinkQuestionResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type LockThreadResponse = {
  __typename?: 'LockThreadResponse';
  message: Scalars['String']['output'];
  thread: ForumThread;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
};

/**  Torrent metadata captured when a job is added. */
export type MagnetDetail = {
  __typename?: 'MagnetDetail';
  comment?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  files?: Maybe<Array<TorrentFile>>;
  id: Scalars['String']['output'];
  infoHash: Scalars['String']['output'];
  infoHashVersion?: Maybe<Scalars['String']['output']>;
  isPrivate: Scalars['Boolean']['output'];
  pieceCount?: Maybe<Scalars['Int']['output']>;
  pieceLength?: Maybe<Scalars['Long']['output']>;
  sourceUri?: Maybe<Scalars['String']['output']>;
  totalSize: Scalars['Long']['output'];
  trackers?: Maybe<Array<Scalars['String']['output']>>;
};

export type MarkViewedResponse = {
  __typename?: 'MarkViewedResponse';
  message: Scalars['String']['output'];
  textId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  blogMutations: BlogMutations;
  checklistMutations: ChecklistMutations;
  fatesMutations: FatesMutations;
  filestoreMutations: FilestoreMutations;
  gaiaMutations: GaiaMutations;
  galleryMutations: GalleryMutations;
  hadesMutations: HadesMutations;
  icarusMutations: IcarusMutations;
  questionMutations: QuestionMutations;
};

/** Generic page metadata for a paged list. */
export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PagedAccounts = {
  __typename?: 'PagedAccounts';
  items: Array<Account>;
  pageInfo: PageInfo;
};

export type PagedAnswers = {
  __typename?: 'PagedAnswers';
  items: Array<Answer>;
  pageInfo: PageInfo;
};

export type PagedBlogPosts = {
  __typename?: 'PagedBlogPosts';
  items: Array<BlogPost>;
  pageInfo: PageInfo;
};

/** A page of items linked to an entry. */
export type PagedChecklistEntryItems = {
  __typename?: 'PagedChecklistEntryItems';
  items: Array<ChecklistEntryItem>;
  pageInfo: PageInfo;
};

/** A page of checklist items. */
export type PagedChecklistItems = {
  __typename?: 'PagedChecklistItems';
  items: Array<ChecklistItem>;
  pageInfo: PageInfo;
};

/** A page of items linked to a template. */
export type PagedChecklistTemplateItems = {
  __typename?: 'PagedChecklistTemplateItems';
  items: Array<ChecklistTemplateItem>;
  pageInfo: PageInfo;
};

export type PagedForumPosts = {
  __typename?: 'PagedForumPosts';
  items: Array<ForumPost>;
  pageInfo: PageInfo;
};

export type PagedForumThreads = {
  __typename?: 'PagedForumThreads';
  items: Array<ForumThread>;
  pageInfo: PageInfo;
};

export type PagedPrivateNotes = {
  __typename?: 'PagedPrivateNotes';
  items: Array<PrivateNote>;
  pageInfo: PageInfo;
};

export type PagedQuestions = {
  __typename?: 'PagedQuestions';
  items: Array<Question>;
  pageInfo: PageInfo;
};

export type PagedReaderAnnotations = {
  __typename?: 'PagedReaderAnnotations';
  items: Array<ReaderAnnotation>;
  pageInfo: PageInfo;
};

export type PagedReaderComments = {
  __typename?: 'PagedReaderComments';
  items: Array<ReaderComment>;
  pageInfo: PageInfo;
};

export type PagedReaderTexts = {
  __typename?: 'PagedReaderTexts';
  items: Array<ReaderText>;
  pageInfo: PageInfo;
};

export type PagedTextViews = {
  __typename?: 'PagedTextViews';
  items: Array<TextView>;
  pageInfo: PageInfo;
};

/** Generic pagination, sort, and filter input. */
export type PaginationInput = {
  filters?: InputMaybe<Array<FilterInput>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDir?: InputMaybe<SortDirection>;
  sorts?: InputMaybe<Array<SortInput>>;
};

/**  Response payload for the pauseTorrent mutation. */
export type PauseTorrentResponse = {
  __typename?: 'PauseTorrentResponse';
  job: TorrentJob;
  message: Scalars['String']['output'];
};

export type Person = {
  __typename?: 'Person';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Place>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PersonInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  lastName: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  placeId?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Place = {
  __typename?: 'Place';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  line1?: Maybe<Scalars['String']['output']>;
  line2?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
};

export type PlaceInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
};

export enum PostStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Hidden = 'HIDDEN'
}

/**  Input for a single presigned-upload request. */
export type PresignInput = {
  bucket: Scalars['String']['input'];
  contentType?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
};

/** A per-user private note anchored to a text range. */
export type PrivateNote = {
  __typename?: 'PrivateNote';
  author?: Maybe<RemoteUser>;
  authorProfile?: Maybe<ReaderAccount>;
  body: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endOffset: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  remoteObject?: Maybe<Array<Scalars['String']['output']>>;
  startOffset: Scalars['Int']['output'];
  textId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  visibility: PrivateNoteVisibility;
};

export type PrivateNoteInput = {
  body: Scalars['String']['input'];
  endOffset: Scalars['Int']['input'];
  startOffset: Scalars['Int']['input'];
  textId: Scalars['ID']['input'];
};

export enum PrivateNoteVisibility {
  Private = 'PRIVATE',
  Shared = 'SHARED'
}

export type PropertySetEntry = {
  __typename?: 'PropertySetEntry';
  configurable: Scalars['Boolean']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  entryName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  ownerKey: Scalars['String']['output'];
  propertySet: Scalars['String']['output'];
  status: EntryStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  values: Scalars['JSON']['output'];
};

export type PropertySetSchema = {
  __typename?: 'PropertySetSchema';
  configurable: Scalars['Boolean']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerKey?: Maybe<Scalars['String']['output']>;
  properties: Scalars['JSON']['output'];
  status: EntryStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PropertySetSchemaInput = {
  configurable?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  ownerKey?: InputMaybe<Scalars['String']['input']>;
  properties: Scalars['JSON']['input'];
};

export type PutKeyInput = {
  bucket: Scalars['String']['input'];
  key?: InputMaybe<Scalars['String']['input']>;
};

/**  Response payload for the putKey mutation. */
export type PutKeyResponse = {
  __typename?: 'PutKeyResponse';
  key: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  blogQueries: BlogQueries;
  checklistQueries: ChecklistQueries;
  fatesQueries: FatesQueries;
  filestoreQueries: FilestoreQueries;
  gaiaQueries: GaiaQueries;
  galleryQueries: GalleryQueries;
  hadesQueries: HadesQueries;
  icarusQueries: IcarusQueries;
  questionQueries: QuestionQueries;
  stemPlayerQueries: StemPlayerQueries;
  viewerQueries: ViewerQueries;
  wikiQueries: WikiQueries;
};

export type Question = {
  __typename?: 'Question';
  answer: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  explanation?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  remoteObject: Array<Scalars['String']['output']>;
  stem: Scalars['String']['output'];
};

export type QuestionInput = {
  answer: Scalars['String']['input'];
  explanation?: InputMaybe<Scalars['String']['input']>;
  remoteObject?: InputMaybe<Array<Scalars['String']['input']>>;
  stem: Scalars['String']['input'];
};

export type QuestionMutations = {
  __typename?: 'QuestionMutations';
  bulkCreateQuestions: BulkCreateQuestionsResponse;
  linkQuestion: LinkQuestionResponse;
  submitAnswer: SubmitAnswerResponse;
};


export type QuestionMutationsBulkCreateQuestionsArgs = {
  inputs: Array<QuestionInput>;
};


export type QuestionMutationsLinkQuestionArgs = {
  questionId: Scalars['ID']['input'];
  target: Scalars['String']['input'];
};


export type QuestionMutationsSubmitAnswerArgs = {
  input: AnswerInput;
  questionId: Scalars['ID']['input'];
};

export type QuestionQueries = {
  __typename?: 'QuestionQueries';
  listAnswers: PagedAnswers;
  listQuestions: PagedQuestions;
  locateQuestion?: Maybe<Question>;
};


export type QuestionQueriesListAnswersArgs = {
  pagination?: InputMaybe<PaginationInput>;
  questionId: Scalars['ID']['input'];
};


export type QuestionQueriesListQuestionsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  remoteObject?: InputMaybe<Scalars['String']['input']>;
};


export type QuestionQueriesLocateQuestionArgs = {
  id: Scalars['ID']['input'];
};

/** Reader-specific profile for a member. */
export type ReaderAccount = {
  __typename?: 'ReaderAccount';
  avatar?: Maybe<Scalars['String']['output']>;
  cefrLevel?: Maybe<CefrLevel>;
  discordId: Scalars['String']['output'];
  discordUsername?: Maybe<Scalars['String']['output']>;
  gaiaAccountId: Scalars['ID']['output'];
  globalName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  roles: Array<ReaderRole>;
};

/** A markdown explanation a user wrote for a position. */
export type ReaderAnnotation = {
  __typename?: 'ReaderAnnotation';
  author?: Maybe<RemoteUser>;
  authorProfile?: Maybe<ReaderAccount>;
  body: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  downvotes: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  myVote?: Maybe<VoteValue>;
  netScore: Scalars['Int']['output'];
  position?: Maybe<ReaderPosition>;
  positionId: Scalars['ID']['output'];
  remoteObject?: Maybe<Array<Scalars['String']['output']>>;
  replyCount: Scalars['Int']['output'];
  status: ReaderStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  upvotes: Scalars['Int']['output'];
};

/** A threaded reply on an annotation. */
export type ReaderComment = {
  __typename?: 'ReaderComment';
  annotationId: Scalars['ID']['output'];
  author?: Maybe<RemoteUser>;
  authorProfile?: Maybe<ReaderAccount>;
  body: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  downvotes: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  myVote?: Maybe<VoteValue>;
  netScore: Scalars['Int']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  status: ReaderStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  upvotes: Scalars['Int']['output'];
};

export type ReaderObjectReference = {
  __typename?: 'ReaderObjectReference';
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
};

/** A character range on a text. */
export type ReaderPosition = {
  __typename?: 'ReaderPosition';
  endOffset: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  startOffset: Scalars['Int']['output'];
  textId: Scalars['ID']['output'];
};

/** A learner level granted by a Discord guild role. */
export type ReaderRole = {
  __typename?: 'ReaderRole';
  cefrLevel?: Maybe<CefrLevel>;
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

/** The website a reader text originated from. */
export type ReaderSource = {
  __typename?: 'ReaderSource';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export enum ReaderStatus {
  Active = 'ACTIVE',
  Hidden = 'HIDDEN'
}

/** A foreign-language text that users annotate. */
export type ReaderText = {
  __typename?: 'ReaderText';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  language: Scalars['String']['output'];
  level: CefrLevel;
  ownerId?: Maybe<Scalars['ID']['output']>;
  sourceId?: Maybe<Scalars['ID']['output']>;
  status: ReaderTextStatus;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ReaderTextInput = {
  content: Scalars['String']['input'];
  language: Scalars['String']['input'];
  level: CefrLevel;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  sourceId?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export enum ReaderTextStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED'
}

export enum ReaderVoteTarget {
  Annotation = 'ANNOTATION',
  Comment = 'COMMENT'
}

export type RegisterInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RegisterPropertySetSchemaResponse = {
  __typename?: 'RegisterPropertySetSchemaResponse';
  message: Scalars['String']['output'];
  schema: PropertySetSchema;
};

export type RelatedTopic = {
  __typename?: 'RelatedTopic';
  extract?: Maybe<Scalars['String']['output']>;
  pageUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/**
 * A generic reference returned by locateRemoteObjects: which checklist detail
 * references a given foreign object.
 */
export type RemoteObjectReference = {
  __typename?: 'RemoteObjectReference';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  ownerType: RemoteObjectType;
};

/** The kind of checklist entity that owns a detail. */
export enum RemoteObjectType {
  Entry = 'ENTRY',
  Item = 'ITEM',
  Template = 'TEMPLATE'
}

/** A user identity on a remote provider. */
export type RemoteUser = {
  __typename?: 'RemoteUser';
  id: Scalars['String']['output'];
  type: RemoteUserType;
};

export type RemoteUserInput = {
  id: Scalars['String']['input'];
  type: RemoteUserType;
};

export enum RemoteUserType {
  Discord = 'DISCORD'
}

/** Result of removing an item from a checklist entry. */
export type RemoveItemResponse = {
  __typename?: 'RemoveItemResponse';
  entry: ChecklistEntry;
  message: Scalars['String']['output'];
};

export type RemoveRemoteObjectResponse = {
  __typename?: 'RemoveRemoteObjectResponse';
  message: Scalars['String']['output'];
  post: BlogPost;
};

/** Result of removing an item from a checklist template. */
export type RemoveTemplateItemResponse = {
  __typename?: 'RemoveTemplateItemResponse';
  message: Scalars['String']['output'];
  template: ChecklistTemplate;
};

export type RemoveVoteResponse = {
  __typename?: 'RemoveVoteResponse';
  message: Scalars['String']['output'];
  post: ForumPost;
};

export type RenameKeyInput = {
  bucket: Scalars['String']['input'];
  merge: Scalars['Boolean']['input'];
  sourceKey: Scalars['String']['input'];
  targetKey: Scalars['String']['input'];
};

/**  Response payload for the renameKey mutation. */
export type RenameKeyResponse = {
  __typename?: 'RenameKeyResponse';
  conflicts: Array<Scalars['String']['output']>;
  hasConflicts: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type RequestAccountReactivationResponse = {
  __typename?: 'RequestAccountReactivationResponse';
  message: Scalars['String']['output'];
};

export type RequestPasswordResetResponse = {
  __typename?: 'RequestPasswordResetResponse';
  message: Scalars['String']['output'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  message: Scalars['String']['output'];
};

/**  Response payload for the resumeTorrent mutation. */
export type ResumeTorrentResponse = {
  __typename?: 'ResumeTorrentResponse';
  job: TorrentJob;
  message: Scalars['String']['output'];
};

/** Result of retiring a checklist item. */
export type RetireItemResponse = {
  __typename?: 'RetireItemResponse';
  item: ChecklistItem;
  message: Scalars['String']['output'];
};

export type RevokeApiKeyResponse = {
  __typename?: 'RevokeApiKeyResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'Role';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RotateApiKeyResponse = {
  __typename?: 'RotateApiKeyResponse';
  apiKey: IssuedApiKey;
  message: Scalars['String']['output'];
};

/** Result of saving a checklist category. */
export type SaveCategoryResponse = {
  __typename?: 'SaveCategoryResponse';
  category: ChecklistCategory;
  message: Scalars['String']['output'];
};

/** Result of saving a checklist entry. */
export type SaveChecklistResponse = {
  __typename?: 'SaveChecklistResponse';
  entry: ChecklistEntry;
  message: Scalars['String']['output'];
};

/** Result of saving a checklist item. */
export type SaveItemResponse = {
  __typename?: 'SaveItemResponse';
  item: ChecklistItem;
  message: Scalars['String']['output'];
};

export type SavePersonResponse = {
  __typename?: 'SavePersonResponse';
  message: Scalars['String']['output'];
  person: Person;
};

export type SavePlaceResponse = {
  __typename?: 'SavePlaceResponse';
  message: Scalars['String']['output'];
  place: Place;
};

export type SaveRegistryResponse = {
  __typename?: 'SaveRegistryResponse';
  message: Scalars['String']['output'];
  registry: HubRegistry;
};

/** Result of saving a checklist template. */
export type SaveTemplateResponse = {
  __typename?: 'SaveTemplateResponse';
  message: Scalars['String']['output'];
  template: ChecklistTemplate;
};

export type SetAccountPermissionsResponse = {
  __typename?: 'SetAccountPermissionsResponse';
  accountId: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  permissions: Array<Scalars['String']['output']>;
};

export type SetAccountRolesResponse = {
  __typename?: 'SetAccountRolesResponse';
  accountId: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  roles: Array<Scalars['String']['output']>;
};

/** Result of setting an item's status within a checklist entry. */
export type SetItemStatusResponse = {
  __typename?: 'SetItemStatusResponse';
  entry: ChecklistEntry;
  message: Scalars['String']['output'];
};

export type SetPropertyInput = {
  property: Scalars['String']['input'];
  value: Scalars['JSON']['input'];
};

export type SetPropertyResponse = {
  __typename?: 'SetPropertyResponse';
  entry: PropertySetEntry;
  message: Scalars['String']['output'];
};

export type SetRolePermissionsResponse = {
  __typename?: 'SetRolePermissionsResponse';
  message: Scalars['String']['output'];
  permissions: Array<Scalars['String']['output']>;
  roleId: Scalars['ID']['output'];
};

export type ShareInput = {
  objectId: Scalars['ID']['input'];
  objectType: Scalars['String']['input'];
  relation: Scalars['String']['input'];
  subjectId: Scalars['ID']['input'];
  subjectType: Scalars['String']['input'];
};

export type ShareNotesInput = {
  subjectEmails?: InputMaybe<Array<Scalars['String']['input']>>;
  subjectIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  textId: Scalars['ID']['input'];
};

export type ShareNotesResponse = {
  __typename?: 'ShareNotesResponse';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
};

export type Song = {
  __typename?: 'Song';
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  stems?: Maybe<Array<Maybe<Stem>>>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortInput = {
  dir: SortDirection;
  field: Scalars['String']['input'];
};

export enum SourceKind {
  Wikipedia = 'WIKIPEDIA',
  Wiktionary = 'WIKTIONARY'
}

export type Stem = {
  __typename?: 'Stem';
  name?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
};

export type StemPlayerQueries = {
  __typename?: 'StemPlayerQueries';
  list?: Maybe<Array<Maybe<Song>>>;
  locate?: Maybe<Song>;
};


export type StemPlayerQueriesLocateArgs = {
  id: Scalars['ID']['input'];
};

export type SubmitAnswerResponse = {
  __typename?: 'SubmitAnswerResponse';
  answer: Answer;
  message: Scalars['String']['output'];
};

export type Summary = {
  __typename?: 'Summary';
  extract?: Maybe<Scalars['String']['output']>;
  pageUrl?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type SuspendAccountResponse = {
  __typename?: 'SuspendAccountResponse';
  account: Account;
  message: Scalars['String']['output'];
};

export type TailscaleDevice = {
  __typename?: 'TailscaleDevice';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expiredAt?: Maybe<Scalars['DateTime']['output']>;
  headscaleId: Scalars['Long']['output'];
  id: Scalars['ID']['output'];
  ipv4?: Maybe<Scalars['String']['output']>;
  lastSeen?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  online: Scalars['Boolean']['output'];
  status: DeviceStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Predicted CEFR level with confidence and contributing factors. */
export type TextLevelAssessment = {
  __typename?: 'TextLevelAssessment';
  confidence: Scalars['Float']['output'];
  factors: Array<ComplexityFactor>;
  level: CefrLevel;
  probabilities: Array<LevelProbability>;
};

/** A record that the current user has viewed a text. */
export type TextView = {
  __typename?: 'TextView';
  textId: Scalars['ID']['output'];
  viewedAt: Scalars['DateTime']['output'];
};

export enum ThreadStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Locked = 'LOCKED'
}

/**  The live download state attached to a key while a torrent is in progress. */
export type TorrentDownload = {
  __typename?: 'TorrentDownload';
  downloadRateBps?: Maybe<Scalars['Int']['output']>;
  downloadedBytes?: Maybe<Scalars['Long']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  etaSeconds?: Maybe<Scalars['Int']['output']>;
  jobId: Scalars['String']['output'];
  magnetDetailId?: Maybe<Scalars['String']['output']>;
  peersConnected?: Maybe<Scalars['Int']['output']>;
  progress: Scalars['Float']['output'];
  status: TorrentJobStatus;
  totalBytes?: Maybe<Scalars['Long']['output']>;
};

/**  A single file declared within a torrent. */
export type TorrentFile = {
  __typename?: 'TorrentFile';
  indexInTorrent: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  size: Scalars['Long']['output'];
};

/**  A single torrent download job tracked in the database. */
export type TorrentJob = {
  __typename?: 'TorrentJob';
  bucket: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  downloadRateBps?: Maybe<Scalars['Int']['output']>;
  downloadedBytes: Scalars['Long']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  etaSeconds?: Maybe<Scalars['Long']['output']>;
  id: Scalars['String']['output'];
  infoHash: Scalars['String']['output'];
  magnetDetail?: Maybe<MagnetDetail>;
  peersConnected?: Maybe<Scalars['Int']['output']>;
  progress: Scalars['Float']['output'];
  seedsConnected?: Maybe<Scalars['Int']['output']>;
  sourceType: Scalars['String']['output'];
  status: TorrentJobStatus;
  targetKeyPath: Scalars['String']['output'];
  totalBytes: Scalars['Long']['output'];
  uploadRateBps?: Maybe<Scalars['Int']['output']>;
  uploadedBytes: Scalars['Long']['output'];
};

/**  Lifecycle state of a torrent download job. */
export enum TorrentJobStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Downloading = 'DOWNLOADING',
  Failed = 'FAILED',
  Metadata = 'METADATA',
  Paused = 'PAUSED',
  Queued = 'QUEUED',
  Transcoding = 'TRANSCODING',
  Uploading = 'UPLOADING'
}

/**  A torrent search result from Prowlarr. */
export type TorrentSearchResult = {
  __typename?: 'TorrentSearchResult';
  leechers: Scalars['Int']['output'];
  magnet: Scalars['String']['output'];
  name: Scalars['String']['output'];
  publishDate?: Maybe<Scalars['String']['output']>;
  seeders: Scalars['Int']['output'];
  size: Scalars['String']['output'];
  sizeBytes: Scalars['Long']['output'];
};

export type UnsuspendAccountResponse = {
  __typename?: 'UnsuspendAccountResponse';
  account: Account;
  message: Scalars['String']['output'];
};

export type UpdateBlogPostResponse = {
  __typename?: 'UpdateBlogPostResponse';
  message: Scalars['String']['output'];
  post: BlogPost;
};

export type UpdateBlogWithPropertiesResponse = {
  __typename?: 'UpdateBlogWithPropertiesResponse';
  message: Scalars['String']['output'];
  post: BlogPost;
};

export type UpdateConfigurationResponse = {
  __typename?: 'UpdateConfigurationResponse';
  configuration: Configuration;
  message: Scalars['String']['output'];
};

export type UpdateIpWhitelistEntryResponse = {
  __typename?: 'UpdateIpWhitelistEntryResponse';
  entry: IpWhitelistEntry;
  message: Scalars['String']['output'];
};

export type UpsertPropertyEntryInput = {
  values: Scalars['JSON']['input'];
};

export type UpsertPropertyEntryResponse = {
  __typename?: 'UpsertPropertyEntryResponse';
  entry: PropertySetEntry;
  message: Scalars['String']['output'];
};

/** Read operations for the viewer. */
export type ViewerQueries = {
  __typename?: 'ViewerQueries';
  vncCredentials: VncCredentials;
};

/** Credentials the browser viewer needs to connect to the desktop. */
export type VncCredentials = {
  __typename?: 'VncCredentials';
  iframeSrc: Scalars['String']['output'];
};

export type VoteForumResponse = {
  __typename?: 'VoteForumResponse';
  message: Scalars['String']['output'];
  post: ForumPost;
};

export type VoteInput = {
  targetId: Scalars['ID']['input'];
  targetType: ReaderVoteTarget;
  value: VoteValue;
};

export type VoteReaderResponse = {
  __typename?: 'VoteReaderResponse';
  annotation?: Maybe<ReaderAnnotation>;
  comment?: Maybe<ReaderComment>;
  message: Scalars['String']['output'];
};

export enum VoteValue {
  Down = 'DOWN',
  Up = 'UP'
}

export type WikiQueries = {
  __typename?: 'WikiQueries';
  wikipediaPage?: Maybe<Scalars['String']['output']>;
  wikipediaRelatedTopics: Array<RelatedTopic>;
  wikipediaSearch: Array<Summary>;
  wikipediaSummary?: Maybe<Summary>;
  wiktionaryEntry?: Maybe<Entry>;
};


export type WikiQueriesWikipediaPageArgs = {
  title: Scalars['String']['input'];
};


export type WikiQueriesWikipediaRelatedTopicsArgs = {
  title: Scalars['String']['input'];
};


export type WikiQueriesWikipediaSearchArgs = {
  query: Scalars['String']['input'];
};


export type WikiQueriesWikipediaSummaryArgs = {
  title: Scalars['String']['input'];
};


export type WikiQueriesWiktionaryEntryArgs = {
  word: Scalars['String']['input'];
};

/** A dictionary word with its translations, compounds, and related words. */
export type Word = {
  __typename?: 'Word';
  compounds: Array<WordEntry>;
  entries: Array<WordEntry>;
  id: Scalars['ID']['output'];
  relatedWords: Array<Word>;
  sourceUrl: Scalars['String']['output'];
  term: Scalars['String']['output'];
  wordType?: Maybe<Scalars['String']['output']>;
};

/** Which WordReference dictionary to query. */
export enum WordDictionary {
  English = 'ENGLISH',
  GreekEnglish = 'GREEK_ENGLISH'
}

/** A single dictionary entry for a headword. */
export type WordEntry = {
  __typename?: 'WordEntry';
  examples: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  sense?: Maybe<Scalars['String']['output']>;
  term: Scalars['String']['output'];
  translations: Array<WordTranslation>;
  wordType: Scalars['String']['output'];
};

/** Which parts of a WordReference word page to include. */
export enum WordScope {
  AllTranslations = 'ALL_TRANSLATIONS',
  Compounds = 'COMPOUNDS',
  Examples = 'EXAMPLES',
  RelatedWords = 'RELATED_WORDS'
}

/** A translated term under a word entry. */
export type WordTranslation = {
  __typename?: 'WordTranslation';
  term: Scalars['String']['output'];
  usageNotes: Array<Scalars['String']['output']>;
  wordType?: Maybe<Scalars['String']['output']>;
};

export type _Service = {
  __typename?: '_Service';
  sdl: Scalars['String']['output'];
};

export type AddChecklistItemMutationVariables = Exact<{
  entryId: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddChecklistItemMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', addItem: { __typename?: 'AddItemResponse', message: string, entry: { __typename?: 'ChecklistEntry', id: string, name?: string | null, dueAt?: any | null, completedAt?: any | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type AddChecklistTemplateItemMutationVariables = Exact<{
  templateId: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddChecklistTemplateItemMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', addTemplateItem: { __typename?: 'AddTemplateItemResponse', message: string, template: { __typename?: 'ChecklistTemplate', id: string, name: string, description?: string | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type ArchiveChecklistMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ArchiveChecklistMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', archiveChecklist: { __typename?: 'ArchiveChecklistResponse', message: string, entry: { __typename?: 'ChecklistEntry', id: string, name?: string | null, dueAt?: any | null, completedAt?: any | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type ArchiveChecklistTemplateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ArchiveChecklistTemplateMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', archiveTemplate: { __typename?: 'ArchiveTemplateResponse', message: string, template: { __typename?: 'ChecklistTemplate', id: string, name: string, description?: string | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type AttachChecklistObjectMutationVariables = Exact<{
  source: Scalars['ID']['input'];
  target: Scalars['ID']['input'];
  ownerType?: InputMaybe<RemoteObjectType>;
}>;


export type AttachChecklistObjectMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', attachObject: { __typename?: 'AttachChecklistObjectResponse', message: string, id: string } } };

export type CompleteChecklistMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompleteChecklistMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', completeChecklist: { __typename?: 'CompleteChecklistResponse', message: string, entry: { __typename?: 'ChecklistEntry', id: string, name?: string | null, dueAt?: any | null, completedAt?: any | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type CreateChecklistCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateChecklistCategoryMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', createCategory: { __typename?: 'CreateCategoryResponse', message: string, category: { __typename?: 'ChecklistCategory', id: string, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null } } } };

export type CreateChecklistEntryMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateChecklistEntryMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', createChecklist: { __typename?: 'CreateChecklistResponse', message: string, entry: { __typename?: 'ChecklistEntry', id: string, name?: string | null, dueAt?: any | null, completedAt?: any | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type CreateChecklistFromTemplateMutationVariables = Exact<{
  templateId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateChecklistFromTemplateMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', createChecklistFromTemplate: { __typename?: 'CreateChecklistFromTemplateResponse', message: string, entry: { __typename?: 'ChecklistEntry', id: string, name?: string | null, dueAt?: any | null, completedAt?: any | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type CreateChecklistFromTemplatesMutationVariables = Exact<{
  templateIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateChecklistFromTemplatesMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', createChecklistFromTemplates: { __typename?: 'CreateChecklistFromTemplatesResponse', message: string, entry: { __typename?: 'ChecklistEntry', id: string, name?: string | null, dueAt?: any | null, completedAt?: any | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type CreateChecklistItemMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateChecklistItemMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', createItem: { __typename?: 'CreateItemResponse', message: string, item: { __typename?: 'ChecklistItem', id: string, name: string, description?: string | null, icon?: string | null, categoryId?: string | null, lifecycleStatus: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type CreateChecklistTemplateMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  itemIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type CreateChecklistTemplateMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', createTemplate: { __typename?: 'CreateTemplateResponse', message: string, template: { __typename?: 'ChecklistTemplate', id: string, name: string, description?: string | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type DeleteChecklistMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteChecklistMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', deleteChecklist: { __typename?: 'DeleteChecklistResponse', message: string, id: string } } };

export type DetachChecklistObjectMutationVariables = Exact<{
  source: Scalars['ID']['input'];
  target: Scalars['ID']['input'];
  ownerType?: InputMaybe<RemoteObjectType>;
}>;


export type DetachChecklistObjectMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', detachObject: { __typename?: 'DetachObjectResponse', message: string, id: string } } };

export type ListChecklistCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListChecklistCategoriesQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', listCategories?: Array<{ __typename?: 'ChecklistCategory', id: string, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null } };

export type ListChecklistEntriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListChecklistEntriesQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', listEntries?: Array<{ __typename?: 'ChecklistEntry', id: string, name?: string | null, dueAt?: any | null, completedAt?: any | null, status: string, createdAt?: any | null, updatedAt?: any | null }> | null } };

export type ListChecklistEntryItemsQueryVariables = Exact<{
  entryId: Scalars['ID']['input'];
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ListChecklistEntryItemsQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', entryItems: { __typename?: 'PagedChecklistEntryItems', items: Array<{ __typename?: 'ChecklistEntryItem', id: string, entryId: string, itemId: string, name?: string | null, icon?: string | null, status: ItemStatus, position: number }>, pageInfo: { __typename?: 'PageInfo', page: number, size: number, totalPages: number, totalCount: number, hasNextPage: boolean, hasPreviousPage: boolean } } } };

export type ListChecklistItemsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ListChecklistItemsQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', items: { __typename?: 'PagedChecklistItems', items: Array<{ __typename?: 'ChecklistItem', id: string, name: string, description?: string | null, icon?: string | null, categoryId?: string | null, lifecycleStatus: string, createdAt?: any | null, updatedAt?: any | null }>, pageInfo: { __typename?: 'PageInfo', page: number, size: number, totalPages: number, totalCount: number, hasNextPage: boolean, hasPreviousPage: boolean } } } };

export type ListChecklistTemplateItemsQueryVariables = Exact<{
  templateId: Scalars['ID']['input'];
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ListChecklistTemplateItemsQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', templateItems: { __typename?: 'PagedChecklistTemplateItems', items: Array<{ __typename?: 'ChecklistTemplateItem', id: string, templateId: string, itemId: string, name?: string | null, icon?: string | null, position: number }>, pageInfo: { __typename?: 'PageInfo', page: number, size: number, totalPages: number, totalCount: number, hasNextPage: boolean, hasPreviousPage: boolean } } } };

export type ListChecklistTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListChecklistTemplatesQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', listTemplates?: Array<{ __typename?: 'ChecklistTemplate', id: string, name: string, description?: string | null, status: string, createdAt?: any | null, updatedAt?: any | null }> | null } };

export type LocateChecklistEntryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LocateChecklistEntryQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', entry?: { __typename?: 'ChecklistEntry', id: string, name?: string | null, dueAt?: any | null, completedAt?: any | null, status: string, createdAt?: any | null, updatedAt?: any | null } | null } };

export type LocateChecklistEntryDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LocateChecklistEntryDetailsQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', entryDetails?: { __typename?: 'ChecklistDetail', ownerId: string, description?: string | null, remoteObject?: Array<string> | null } | null } };

export type LocateChecklistItemQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LocateChecklistItemQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', item?: { __typename?: 'ChecklistItem', id: string, name: string, description?: string | null, icon?: string | null, categoryId?: string | null, lifecycleStatus: string, createdAt?: any | null, updatedAt?: any | null } | null } };

export type LocateChecklistItemDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LocateChecklistItemDetailsQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', itemDetails?: { __typename?: 'ChecklistDetail', ownerId: string, description?: string | null, remoteObject?: Array<string> | null } | null } };

export type LocateChecklistTemplateQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LocateChecklistTemplateQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', template?: { __typename?: 'ChecklistTemplate', id: string, name: string, description?: string | null, status: string, createdAt?: any | null, updatedAt?: any | null } | null } };

export type LocateChecklistTemplateDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LocateChecklistTemplateDetailsQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', templateDetails?: { __typename?: 'ChecklistDetail', ownerId: string, description?: string | null, remoteObject?: Array<string> | null } | null } };

export type LocateRemoteObjectsQueryVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type LocateRemoteObjectsQuery = { __typename?: 'Query', checklistQueries: { __typename?: 'ChecklistQueries', locateRemoteObjects: Array<{ __typename?: 'RemoteObjectReference', id: string, ownerType: RemoteObjectType, ownerId: string, description?: string | null }> } };

export type RemoveChecklistItemMutationVariables = Exact<{
  entryId: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
}>;


export type RemoveChecklistItemMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', removeItem: { __typename?: 'RemoveItemResponse', message: string, entry: { __typename?: 'ChecklistEntry', id: string, name?: string | null, dueAt?: any | null, completedAt?: any | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type RemoveChecklistTemplateItemMutationVariables = Exact<{
  templateId: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
}>;


export type RemoveChecklistTemplateItemMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', removeTemplateItem: { __typename?: 'RemoveTemplateItemResponse', message: string, template: { __typename?: 'ChecklistTemplate', id: string, name: string, description?: string | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type RetireChecklistItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RetireChecklistItemMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', retireItem: { __typename?: 'RetireItemResponse', message: string, item: { __typename?: 'ChecklistItem', id: string, name: string, description?: string | null, icon?: string | null, categoryId?: string | null, lifecycleStatus: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type SaveChecklistCategoryMutationVariables = Exact<{
  input: ChecklistCategoryInput;
}>;


export type SaveChecklistCategoryMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', saveCategory: { __typename?: 'SaveCategoryResponse', message: string, category: { __typename?: 'ChecklistCategory', id: string, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null } } } };

export type SaveChecklistEntryMutationVariables = Exact<{
  input: ChecklistEntryInput;
}>;


export type SaveChecklistEntryMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', saveChecklist: { __typename?: 'SaveChecklistResponse', message: string, entry: { __typename?: 'ChecklistEntry', id: string, name?: string | null, dueAt?: any | null, completedAt?: any | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type SaveChecklistItemMutationVariables = Exact<{
  input: ChecklistItemInput;
}>;


export type SaveChecklistItemMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', saveItem: { __typename?: 'SaveItemResponse', message: string, item: { __typename?: 'ChecklistItem', id: string, name: string, description?: string | null, icon?: string | null, categoryId?: string | null, lifecycleStatus: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type SaveChecklistTemplateMutationVariables = Exact<{
  input: ChecklistTemplateInput;
}>;


export type SaveChecklistTemplateMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', saveTemplate: { __typename?: 'SaveTemplateResponse', message: string, template: { __typename?: 'ChecklistTemplate', id: string, name: string, description?: string | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type SetChecklistItemStatusMutationVariables = Exact<{
  entryId: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
  status: ItemStatus;
}>;


export type SetChecklistItemStatusMutation = { __typename?: 'Mutation', checklistMutations: { __typename?: 'ChecklistMutations', setItemStatus: { __typename?: 'SetItemStatusResponse', message: string, entry: { __typename?: 'ChecklistEntry', id: string, name?: string | null, dueAt?: any | null, completedAt?: any | null, status: string, createdAt?: any | null, updatedAt?: any | null } } } };

export type DeleteFileMutationVariables = Exact<{
  input: BucketKeyInput;
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', filestoreMutations: { __typename?: 'FilestoreMutations', deleteFile: { __typename?: 'DeleteFileResponse', message: string, key: string } } };

export type GetPresignedUploadUrlMutationVariables = Exact<{
  input: PresignInput;
}>;


export type GetPresignedUploadUrlMutation = { __typename?: 'Mutation', filestoreMutations: { __typename?: 'FilestoreMutations', getPresignedUploadUrl: { __typename?: 'GetPresignedUploadUrlResponse', message: string, url: string } } };

export type GetPresignedUploadUrlsMutationVariables = Exact<{
  input: Array<PresignInput> | PresignInput;
}>;


export type GetPresignedUploadUrlsMutation = { __typename?: 'Mutation', filestoreMutations: { __typename?: 'FilestoreMutations', getPresignedUploadUrls: { __typename?: 'GetPresignedUploadUrlsResponse', message: string, urls: Array<string> } } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', gaiaMutations: { __typename?: 'GaiaMutations', login?: { __typename?: 'AuthResult', token: string } | null } };

export type CreateGalleryItemMutationVariables = Exact<{
  input: GalleryItemInput;
}>;


export type CreateGalleryItemMutation = { __typename?: 'Mutation', galleryMutations: { __typename?: 'GalleryMutations', create: { __typename?: 'CreateGalleryItemResponse', message: string, item: { __typename?: 'GalleryItem', id: string, title: string, description?: string | null, content?: string | null, imagePath?: string | null, remoteObject?: Array<string> | null, keyDetailId?: string | null, createdAt?: any | null, updatedAt?: any | null } } } };

export type LocateGalleryItemsQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type LocateGalleryItemsQuery = { __typename?: 'Query', galleryQueries: { __typename?: 'GalleryQueries', locateGalleryItems?: Array<{ __typename?: 'GalleryItem', id: string, title: string, description?: string | null, imagePath?: string | null } | null> | null } };


export const AddChecklistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addChecklistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"entryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"entry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddChecklistItemMutation, AddChecklistItemMutationVariables>;
export const AddChecklistTemplateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addChecklistTemplateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTemplateItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"templateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddChecklistTemplateItemMutation, AddChecklistTemplateItemMutationVariables>;
export const ArchiveChecklistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"archiveChecklist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archiveChecklist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"entry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ArchiveChecklistMutation, ArchiveChecklistMutationVariables>;
export const ArchiveChecklistTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"archiveChecklistTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archiveTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ArchiveChecklistTemplateMutation, ArchiveChecklistTemplateMutationVariables>;
export const AttachChecklistObjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"attachChecklistObject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"target"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteObjectType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attachObject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"target"},"value":{"kind":"Variable","name":{"kind":"Name","value":"target"}}},{"kind":"Argument","name":{"kind":"Name","value":"ownerType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AttachChecklistObjectMutation, AttachChecklistObjectMutationVariables>;
export const CompleteChecklistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"completeChecklist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeChecklist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"entry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompleteChecklistMutation, CompleteChecklistMutationVariables>;
export const CreateChecklistCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createChecklistCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateChecklistCategoryMutation, CreateChecklistCategoryMutationVariables>;
export const CreateChecklistEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createChecklistEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChecklist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"entry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateChecklistEntryMutation, CreateChecklistEntryMutationVariables>;
export const CreateChecklistFromTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createChecklistFromTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChecklistFromTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"templateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"entry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateChecklistFromTemplateMutation, CreateChecklistFromTemplateMutationVariables>;
export const CreateChecklistFromTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createChecklistFromTemplates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"templateIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChecklistFromTemplates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"templateIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"templateIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"entry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateChecklistFromTemplatesMutation, CreateChecklistFromTemplatesMutationVariables>;
export const CreateChecklistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createChecklistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"icon"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"icon"},"value":{"kind":"Variable","name":{"kind":"Name","value":"icon"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"lifecycleStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateChecklistItemMutation, CreateChecklistItemMutationVariables>;
export const CreateChecklistTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createChecklistTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateChecklistTemplateMutation, CreateChecklistTemplateMutationVariables>;
export const DeleteChecklistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteChecklist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteChecklist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteChecklistMutation, DeleteChecklistMutationVariables>;
export const DetachChecklistObjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"detachChecklistObject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"target"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoteObjectType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"detachObject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"target"},"value":{"kind":"Variable","name":{"kind":"Name","value":"target"}}},{"kind":"Argument","name":{"kind":"Name","value":"ownerType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DetachChecklistObjectMutation, DetachChecklistObjectMutationVariables>;
export const ListChecklistCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listChecklistCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListChecklistCategoriesQuery, ListChecklistCategoriesQueryVariables>;
export const ListChecklistEntriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listChecklistEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListChecklistEntriesQuery, ListChecklistEntriesQueryVariables>;
export const ListChecklistEntryItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listChecklistEntryItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entryItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"entryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entryId"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListChecklistEntryItemsQuery, ListChecklistEntryItemsQueryVariables>;
export const ListChecklistItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listChecklistItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"lifecycleStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListChecklistItemsQuery, ListChecklistItemsQueryVariables>;
export const ListChecklistTemplateItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listChecklistTemplateItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templateItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"templateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListChecklistTemplateItemsQuery, ListChecklistTemplateItemsQueryVariables>;
export const ListChecklistTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listChecklistTemplates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listTemplates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListChecklistTemplatesQuery, ListChecklistTemplatesQueryVariables>;
export const LocateChecklistEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"locateChecklistEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<LocateChecklistEntryQuery, LocateChecklistEntryQueryVariables>;
export const LocateChecklistEntryDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"locateChecklistEntryDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entryDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"remoteObject"}}]}}]}}]}}]} as unknown as DocumentNode<LocateChecklistEntryDetailsQuery, LocateChecklistEntryDetailsQueryVariables>;
export const LocateChecklistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"locateChecklistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"lifecycleStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<LocateChecklistItemQuery, LocateChecklistItemQueryVariables>;
export const LocateChecklistItemDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"locateChecklistItemDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"remoteObject"}}]}}]}}]}}]} as unknown as DocumentNode<LocateChecklistItemDetailsQuery, LocateChecklistItemDetailsQueryVariables>;
export const LocateChecklistTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"locateChecklistTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"template"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<LocateChecklistTemplateQuery, LocateChecklistTemplateQueryVariables>;
export const LocateChecklistTemplateDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"locateChecklistTemplateDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templateDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"remoteObject"}}]}}]}}]}}]} as unknown as DocumentNode<LocateChecklistTemplateDetailsQuery, LocateChecklistTemplateDetailsQueryVariables>;
export const LocateRemoteObjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"locateRemoteObjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locateRemoteObjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<LocateRemoteObjectsQuery, LocateRemoteObjectsQueryVariables>;
export const RemoveChecklistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeChecklistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"entryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"entry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RemoveChecklistItemMutation, RemoveChecklistItemMutationVariables>;
export const RemoveChecklistTemplateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeChecklistTemplateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTemplateItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"templateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RemoveChecklistTemplateItemMutation, RemoveChecklistTemplateItemMutationVariables>;
export const RetireChecklistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"retireChecklistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retireItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"lifecycleStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RetireChecklistItemMutation, RetireChecklistItemMutationVariables>;
export const SaveChecklistCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"saveChecklistCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChecklistCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SaveChecklistCategoryMutation, SaveChecklistCategoryMutationVariables>;
export const SaveChecklistEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"saveChecklistEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChecklistEntryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveChecklist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"entry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SaveChecklistEntryMutation, SaveChecklistEntryMutationVariables>;
export const SaveChecklistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"saveChecklistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChecklistItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"lifecycleStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SaveChecklistItemMutation, SaveChecklistItemMutationVariables>;
export const SaveChecklistTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"saveChecklistTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChecklistTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SaveChecklistTemplateMutation, SaveChecklistTemplateMutationVariables>;
export const SetChecklistItemStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setChecklistItemStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemStatus"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklistMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setItemStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"entryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"entry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetChecklistItemStatusMutation, SetChecklistItemStatusMutationVariables>;
export const DeleteFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BucketKeyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filestoreMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteFileMutation, DeleteFileMutationVariables>;
export const GetPresignedUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getPresignedUploadUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PresignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filestoreMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPresignedUploadUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetPresignedUploadUrlMutation, GetPresignedUploadUrlMutationVariables>;
export const GetPresignedUploadUrlsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getPresignedUploadUrls"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PresignInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filestoreMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPresignedUploadUrls"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"urls"}}]}}]}}]}}]} as unknown as DocumentNode<GetPresignedUploadUrlsMutation, GetPresignedUploadUrlsMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gaiaMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateGalleryItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGalleryItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GalleryItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"galleryMutations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"remoteObject"}},{"kind":"Field","name":{"kind":"Name","value":"keyDetailId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateGalleryItemMutation, CreateGalleryItemMutationVariables>;
export const LocateGalleryItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"locateGalleryItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"galleryQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locateGalleryItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}}]}}]}}]}}]} as unknown as DocumentNode<LocateGalleryItemsQuery, LocateGalleryItemsQueryVariables>;