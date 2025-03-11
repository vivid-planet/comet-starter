import type { DamImageBlockData, FooterContentBlockData, LinkBlockData, NewsContentBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "./blocks.generated";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** DamImage root block data */
  DamImageBlockData: DamImageBlockData;
  /** DamImage root block input */
  DamImageBlockInput: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: string;
  /** FooterContent root block data */
  FooterContentBlockData: FooterContentBlockData;
  /** FooterContent root block input */
  FooterContentBlockInput: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** Link root block data */
  LinkBlockData: LinkBlockData;
  /** Link root block input */
  LinkBlockInput: any;
  /** NewsContent root block data */
  NewsContentBlockData: NewsContentBlockData;
  /** NewsContent root block input */
  NewsContentBlockInput: any;
  /** PageContent root block data */
  PageContentBlockData: PageContentBlockData;
  /** PageContent root block input */
  PageContentBlockInput: any;
  /** Seo root block data */
  SeoBlockData: SeoBlockData;
  /** Seo root block input */
  SeoBlockInput: any;
  /** Stage root block data */
  StageBlockData: StageBlockData;
  /** Stage root block input */
  StageBlockInput: any;
};

export type GQLAttachedDocumentInput = {
  id?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type GQLBooleanFilter = {
  equal?: InputMaybe<Scalars['Boolean']>;
};

export type GQLCopyFilesResponse = {
  __typename?: 'CopyFilesResponse';
  mappedFiles: Array<GQLMappedFile>;
};

export type GQLCreateDamFolderInput = {
  isInboxFromOtherScope?: Scalars['Boolean'];
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['ID']>;
};

export type GQLCurrentUser = {
  __typename?: 'CurrentUser';
  authenticatedUser: Maybe<GQLUserPermissionsUser>;
  email: Scalars['String'];
  id: Scalars['String'];
  impersonated: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  permissions: Array<GQLCurrentUserPermission>;
  permissionsForScope: Array<Scalars['String']>;
};


export type GQLCurrentUserpermissionsForScopeArgs = {
  scope: Scalars['JSONObject'];
};

export type GQLCurrentUserPermission = {
  __typename?: 'CurrentUserPermission';
  contentScopes: Array<Scalars['JSONObject']>;
  permission: Scalars['String'];
};

export type GQLDamFile = {
  __typename?: 'DamFile';
  altText: Maybe<Scalars['String']>;
  archived: Scalars['Boolean'];
  contentHash: Scalars['String'];
  createdAt: Scalars['DateTime'];
  damPath: Scalars['String'];
  dependents: GQLPaginatedDependencies;
  duplicates: Array<GQLDamFile>;
  fileUrl: Scalars['String'];
  folder: Maybe<GQLDamFolder>;
  id: Scalars['ID'];
  image: Maybe<GQLDamFileImage>;
  importSourceId: Maybe<Scalars['String']>;
  importSourceType: Maybe<Scalars['String']>;
  license: Maybe<GQLDamFileLicense>;
  mimetype: Scalars['String'];
  name: Scalars['String'];
  size: Scalars['Int'];
  title: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


export type GQLDamFiledependentsArgs = {
  filter?: InputMaybe<GQLDependentFilter>;
  forceRefresh?: Scalars['Boolean'];
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};

export type GQLDamFileImage = {
  __typename?: 'DamFileImage';
  cropArea: GQLImageCropArea;
  dominantColor: Maybe<Scalars['String']>;
  exif: Maybe<Scalars['JSONObject']>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  url: Maybe<Scalars['String']>;
  width: Scalars['Int'];
};


export type GQLDamFileImageurlArgs = {
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type GQLDamFileLicense = {
  __typename?: 'DamFileLicense';
  author: Maybe<Scalars['String']>;
  details: Maybe<Scalars['String']>;
  durationFrom: Maybe<Scalars['DateTime']>;
  durationTo: Maybe<Scalars['DateTime']>;
  /** The expirationDate is the durationTo + 1 day */
  expirationDate: Maybe<Scalars['DateTime']>;
  expiresWithinThirtyDays: Scalars['Boolean'];
  hasExpired: Scalars['Boolean'];
  isNotValidYet: Scalars['Boolean'];
  isValid: Scalars['Boolean'];
  type: Maybe<GQLLicenseType>;
};

export type GQLDamFolder = {
  __typename?: 'DamFolder';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isInboxFromOtherScope: Scalars['Boolean'];
  mpath: Array<Scalars['ID']>;
  name: Scalars['String'];
  numberOfChildFolders: Scalars['Int'];
  numberOfFiles: Scalars['Int'];
  parent: Maybe<GQLDamFolder>;
  parents: Array<GQLDamFolder>;
  updatedAt: Scalars['DateTime'];
};

export type GQLDamItem = GQLDamFile | GQLDamFolder;

export type GQLDamItemFilterInput = {
  mimetypes?: InputMaybe<Array<Scalars['String']>>;
  searchText?: InputMaybe<Scalars['String']>;
};

export type GQLDamItemType =
  | 'File'
  | 'Folder';

export type GQLDamScopeInput = {
  thisScopeHasNoFields____?: InputMaybe<Scalars['String']>;
};

export type GQLDateTimeFilter = {
  equal?: InputMaybe<Scalars['DateTime']>;
  greaterThan?: InputMaybe<Scalars['DateTime']>;
  greaterThanEqual?: InputMaybe<Scalars['DateTime']>;
  lowerThan?: InputMaybe<Scalars['DateTime']>;
  lowerThanEqual?: InputMaybe<Scalars['DateTime']>;
  notEqual?: InputMaybe<Scalars['DateTime']>;
};

export type GQLDependency = {
  __typename?: 'Dependency';
  jsonPath: Scalars['String'];
  name: Maybe<Scalars['String']>;
  rootColumnName: Scalars['String'];
  rootGraphqlObjectType: Scalars['String'];
  rootId: Scalars['String'];
  secondaryInformation: Maybe<Scalars['String']>;
  targetGraphqlObjectType: Scalars['String'];
  targetId: Scalars['String'];
  visible: Scalars['Boolean'];
};

export type GQLDependencyFilter = {
  rootColumnName?: InputMaybe<Scalars['String']>;
  targetGraphqlObjectType?: InputMaybe<Scalars['String']>;
  targetId?: InputMaybe<Scalars['String']>;
};

export type GQLDependentFilter = {
  rootColumnName?: InputMaybe<Scalars['String']>;
  rootGraphqlObjectType?: InputMaybe<Scalars['String']>;
  rootId?: InputMaybe<Scalars['String']>;
};

export type GQLDocumentInterface = {
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type GQLFileFilterInput = {
  mimetypes?: InputMaybe<Array<Scalars['String']>>;
  searchText?: InputMaybe<Scalars['String']>;
};

export type GQLFilenameInput = {
  folderId?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type GQLFilenameResponse = {
  __typename?: 'FilenameResponse';
  folderId: Maybe<Scalars['ID']>;
  isOccupied: Scalars['Boolean'];
  name: Scalars['String'];
};

export type GQLFocalPoint =
  | 'CENTER'
  | 'NORTHEAST'
  | 'NORTHWEST'
  | 'SMART'
  | 'SOUTHEAST'
  | 'SOUTHWEST';

export type GQLFolderFilterInput = {
  searchText?: InputMaybe<Scalars['String']>;
};

export type GQLFooter = GQLDocumentInterface & {
  __typename?: 'Footer';
  content: Scalars['FooterContentBlockData'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  scope: GQLFooterScope;
  updatedAt: Scalars['DateTime'];
};

export type GQLFooterInput = {
  content: Scalars['FooterContentBlockInput'];
};

export type GQLFooterScope = {
  __typename?: 'FooterScope';
  domain: Scalars['String'];
  language: Scalars['String'];
};

export type GQLFooterScopeInput = {
  domain: Scalars['String'];
  language: Scalars['String'];
};

export type GQLImageCropArea = {
  __typename?: 'ImageCropArea';
  focalPoint: GQLFocalPoint;
  height: Maybe<Scalars['Float']>;
  width: Maybe<Scalars['Float']>;
  x: Maybe<Scalars['Float']>;
  y: Maybe<Scalars['Float']>;
};

export type GQLImageCropAreaInput = {
  focalPoint: GQLFocalPoint;
  height?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
  x?: InputMaybe<Scalars['Float']>;
  y?: InputMaybe<Scalars['Float']>;
};

export type GQLLicenseInput = {
  author?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  durationFrom?: InputMaybe<Scalars['DateTime']>;
  durationTo?: InputMaybe<Scalars['DateTime']>;
  type?: InputMaybe<GQLLicenseType>;
};

export type GQLLicenseType =
  | 'RIGHTS_MANAGED'
  | 'ROYALTY_FREE';

export type GQLLink = GQLDocumentInterface & {
  __typename?: 'Link';
  content: Scalars['LinkBlockData'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  pageTreeNode: Maybe<GQLPageTreeNode>;
  updatedAt: Scalars['DateTime'];
};

export type GQLLinkInput = {
  content: Scalars['LinkBlockInput'];
};

export type GQLMappedFile = {
  __typename?: 'MappedFile';
  copy: GQLDamFile;
  rootFile: GQLDamFile;
};

export type GQLMovePageTreeNodesByNeighbourInput = {
  afterId?: InputMaybe<Scalars['String']>;
  beforeId?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['String']>;
};

export type GQLMovePageTreeNodesByPosInput = {
  parentId?: InputMaybe<Scalars['String']>;
  pos: Scalars['Int'];
};

export type GQLMutation = {
  __typename?: 'Mutation';
  archiveDamFile: GQLDamFile;
  archiveDamFiles: Array<GQLDamFile>;
  copyFilesToScope: GQLCopyFilesResponse;
  createDamFolder: GQLDamFolder;
  createNews: GQLNews;
  createNewsComment: GQLNewsComment;
  createPageTreeNode: GQLPageTreeNode;
  createRedirect: GQLRedirect;
  currentUserSignOut: Scalars['String'];
  deleteDamFile: Scalars['Boolean'];
  deleteDamFolder: Scalars['Boolean'];
  deleteNews: Scalars['Boolean'];
  deleteNewsComment: Scalars['Boolean'];
  deletePageTreeNode: Scalars['Boolean'];
  deleteRedirect: Scalars['Boolean'];
  importDamFileByDownload: GQLDamFile;
  moveDamFiles: Array<GQLDamFile>;
  moveDamFolders: Array<GQLDamFolder>;
  movePageTreeNodesByNeighbour: Array<GQLPageTreeNode>;
  movePageTreeNodesByPos: Array<GQLPageTreeNode>;
  restoreDamFile: GQLDamFile;
  restoreDamFiles: Array<GQLDamFile>;
  saveFooter: GQLFooter;
  saveLink: GQLLink;
  savePage: GQLPage;
  savePredefinedPage: GQLPredefinedPage;
  updateDamFile: GQLDamFile;
  updateDamFolder: GQLDamFolder;
  updateNews: GQLNews;
  updateNewsComment: GQLNewsComment;
  updatePageTreeNode: GQLPageTreeNode;
  updatePageTreeNodeCategory: GQLPageTreeNode;
  updatePageTreeNodeSlug: GQLPageTreeNode;
  updatePageTreeNodeVisibility: GQLPageTreeNode;
  updateRedirect: GQLRedirect;
  updateRedirectActiveness: GQLRedirect;
  userPermissionsCreatePermission: GQLUserPermission;
  userPermissionsDeletePermission: Scalars['Boolean'];
  userPermissionsUpdateContentScopes: Scalars['Boolean'];
  userPermissionsUpdateOverrideContentScopes: GQLUserPermission;
  userPermissionsUpdatePermission: GQLUserPermission;
};


export type GQLMutationarchiveDamFileArgs = {
  id: Scalars['ID'];
};


export type GQLMutationarchiveDamFilesArgs = {
  ids: Array<Scalars['ID']>;
};


export type GQLMutationcopyFilesToScopeArgs = {
  fileIds: Array<Scalars['ID']>;
  inboxFolderId: Scalars['ID'];
};


export type GQLMutationcreateDamFolderArgs = {
  input: GQLCreateDamFolderInput;
  scope?: GQLDamScopeInput;
};


export type GQLMutationcreateNewsArgs = {
  input: GQLNewsInput;
  scope: GQLNewsContentScopeInput;
};


export type GQLMutationcreateNewsCommentArgs = {
  input: GQLNewsCommentInput;
  newsId: Scalars['ID'];
};


export type GQLMutationcreatePageTreeNodeArgs = {
  category: Scalars['String'];
  input: GQLPageTreeNodeCreateInput;
  scope: GQLPageTreeNodeScopeInput;
};


export type GQLMutationcreateRedirectArgs = {
  input: GQLRedirectInput;
  scope: GQLRedirectScopeInput;
};


export type GQLMutationdeleteDamFileArgs = {
  id: Scalars['ID'];
};


export type GQLMutationdeleteDamFolderArgs = {
  id: Scalars['ID'];
};


export type GQLMutationdeleteNewsArgs = {
  id: Scalars['ID'];
};


export type GQLMutationdeleteNewsCommentArgs = {
  id: Scalars['ID'];
};


export type GQLMutationdeletePageTreeNodeArgs = {
  id: Scalars['ID'];
};


export type GQLMutationdeleteRedirectArgs = {
  id: Scalars['ID'];
};


export type GQLMutationimportDamFileByDownloadArgs = {
  input: GQLUpdateDamFileInput;
  scope?: GQLDamScopeInput;
  url: Scalars['String'];
};


export type GQLMutationmoveDamFilesArgs = {
  fileIds: Array<Scalars['ID']>;
  targetFolderId?: InputMaybe<Scalars['ID']>;
};


export type GQLMutationmoveDamFoldersArgs = {
  folderIds: Array<Scalars['ID']>;
  scope?: GQLDamScopeInput;
  targetFolderId?: InputMaybe<Scalars['ID']>;
};


export type GQLMutationmovePageTreeNodesByNeighbourArgs = {
  ids: Array<Scalars['ID']>;
  input: GQLMovePageTreeNodesByNeighbourInput;
};


export type GQLMutationmovePageTreeNodesByPosArgs = {
  ids: Array<Scalars['ID']>;
  input: GQLMovePageTreeNodesByPosInput;
};


export type GQLMutationrestoreDamFileArgs = {
  id: Scalars['ID'];
};


export type GQLMutationrestoreDamFilesArgs = {
  ids: Array<Scalars['ID']>;
};


export type GQLMutationsaveFooterArgs = {
  input: GQLFooterInput;
  scope: GQLFooterScopeInput;
};


export type GQLMutationsaveLinkArgs = {
  attachedPageTreeNodeId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  input: GQLLinkInput;
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']>;
};


export type GQLMutationsavePageArgs = {
  attachedPageTreeNodeId?: InputMaybe<Scalars['ID']>;
  input: GQLPageInput;
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']>;
  pageId: Scalars['ID'];
};


export type GQLMutationsavePredefinedPageArgs = {
  attachedPageTreeNodeId: Scalars['ID'];
  id: Scalars['ID'];
  input: GQLPredefinedPageInput;
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']>;
};


export type GQLMutationupdateDamFileArgs = {
  id: Scalars['ID'];
  input: GQLUpdateDamFileInput;
};


export type GQLMutationupdateDamFolderArgs = {
  id: Scalars['ID'];
  input: GQLUpdateDamFolderInput;
};


export type GQLMutationupdateNewsArgs = {
  id: Scalars['ID'];
  input: GQLNewsUpdateInput;
};


export type GQLMutationupdateNewsCommentArgs = {
  id: Scalars['ID'];
  input: GQLNewsCommentInput;
};


export type GQLMutationupdatePageTreeNodeArgs = {
  id: Scalars['ID'];
  input: GQLPageTreeNodeUpdateInput;
};


export type GQLMutationupdatePageTreeNodeCategoryArgs = {
  category: Scalars['String'];
  id: Scalars['ID'];
};


export type GQLMutationupdatePageTreeNodeSlugArgs = {
  id: Scalars['ID'];
  slug: Scalars['String'];
};


export type GQLMutationupdatePageTreeNodeVisibilityArgs = {
  id: Scalars['ID'];
  input: GQLPageTreeNodeUpdateVisibilityInput;
};


export type GQLMutationupdateRedirectArgs = {
  id: Scalars['ID'];
  input: GQLRedirectInput;
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']>;
};


export type GQLMutationupdateRedirectActivenessArgs = {
  id: Scalars['ID'];
  input: GQLRedirectUpdateActivenessInput;
};


export type GQLMutationuserPermissionsCreatePermissionArgs = {
  input: GQLUserPermissionInput;
  userId: Scalars['String'];
};


export type GQLMutationuserPermissionsDeletePermissionArgs = {
  id: Scalars['ID'];
};


export type GQLMutationuserPermissionsUpdateContentScopesArgs = {
  input: GQLUserContentScopesInput;
  userId: Scalars['String'];
};


export type GQLMutationuserPermissionsUpdateOverrideContentScopesArgs = {
  input: GQLUserPermissionOverrideContentScopesInput;
};


export type GQLMutationuserPermissionsUpdatePermissionArgs = {
  id: Scalars['String'];
  input: GQLUserPermissionInput;
};

export type GQLNews = {
  __typename?: 'News';
  category: GQLNewsCategory;
  comments: Array<GQLNewsComment>;
  content: Scalars['NewsContentBlockData'];
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  dependencies: GQLPaginatedDependencies;
  dependents: GQLPaginatedDependencies;
  id: Scalars['ID'];
  image: Scalars['DamImageBlockData'];
  scope: GQLNewsContentScope;
  slug: Scalars['String'];
  status: GQLNewsStatus;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type GQLNewsdependenciesArgs = {
  filter?: InputMaybe<GQLDependencyFilter>;
  forceRefresh?: Scalars['Boolean'];
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};


export type GQLNewsdependentsArgs = {
  filter?: InputMaybe<GQLDependentFilter>;
  forceRefresh?: Scalars['Boolean'];
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};

export type GQLNewsCategory =
  | 'Awards'
  | 'Company'
  | 'Events';

export type GQLNewsCategoryEnumFilter = {
  equal?: InputMaybe<GQLNewsCategory>;
  isAnyOf?: InputMaybe<Array<GQLNewsCategory>>;
  notEqual?: InputMaybe<GQLNewsCategory>;
};

export type GQLNewsComment = {
  __typename?: 'NewsComment';
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type GQLNewsCommentInput = {
  comment: Scalars['String'];
};

export type GQLNewsContentScope = {
  __typename?: 'NewsContentScope';
  domain: Scalars['String'];
  language: Scalars['String'];
};

export type GQLNewsContentScopeInput = {
  domain: Scalars['String'];
  language: Scalars['String'];
};

export type GQLNewsFilter = {
  and?: InputMaybe<Array<GQLNewsFilter>>;
  category?: InputMaybe<GQLNewsCategoryEnumFilter>;
  comments?: InputMaybe<GQLOneToManyFilter>;
  createdAt?: InputMaybe<GQLDateTimeFilter>;
  date?: InputMaybe<GQLDateTimeFilter>;
  or?: InputMaybe<Array<GQLNewsFilter>>;
  slug?: InputMaybe<GQLStringFilter>;
  status?: InputMaybe<GQLNewsStatusEnumFilter>;
  title?: InputMaybe<GQLStringFilter>;
  updatedAt?: InputMaybe<GQLDateTimeFilter>;
};

export type GQLNewsInput = {
  category: GQLNewsCategory;
  content: Scalars['NewsContentBlockInput'];
  date: Scalars['DateTime'];
  image: Scalars['DamImageBlockInput'];
  slug: Scalars['String'];
  status?: GQLNewsStatus;
  title: Scalars['String'];
};

export type GQLNewsSort = {
  direction?: GQLSortDirection;
  field: GQLNewsSortField;
};

export type GQLNewsSortField =
  | 'category'
  | 'createdAt'
  | 'date'
  | 'slug'
  | 'status'
  | 'title'
  | 'updatedAt';

export type GQLNewsStatus =
  | 'Active'
  | 'Deleted';

export type GQLNewsStatusEnumFilter = {
  equal?: InputMaybe<GQLNewsStatus>;
  isAnyOf?: InputMaybe<Array<GQLNewsStatus>>;
  notEqual?: InputMaybe<GQLNewsStatus>;
};

export type GQLNewsUpdateInput = {
  category?: InputMaybe<GQLNewsCategory>;
  content?: InputMaybe<Scalars['NewsContentBlockInput']>;
  date?: InputMaybe<Scalars['DateTime']>;
  image?: InputMaybe<Scalars['DamImageBlockInput']>;
  slug?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<GQLNewsStatus>;
  title?: InputMaybe<Scalars['String']>;
};

export type GQLOneToManyFilter = {
  contains?: InputMaybe<Scalars['ID']>;
  search?: InputMaybe<Scalars['String']>;
};

export type GQLPage = GQLDocumentInterface & {
  __typename?: 'Page';
  content: Scalars['PageContentBlockData'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  pageTreeNode: Maybe<GQLPageTreeNode>;
  seo: Scalars['SeoBlockData'];
  stage: Scalars['StageBlockData'];
  updatedAt: Scalars['DateTime'];
};

export type GQLPageContentUnion = GQLLink | GQLPage | GQLPredefinedPage;

export type GQLPageInput = {
  content: Scalars['PageContentBlockInput'];
  seo: Scalars['SeoBlockInput'];
  stage: Scalars['StageBlockInput'];
};

export type GQLPageTreeNode = {
  __typename?: 'PageTreeNode';
  category: GQLPageTreeNodeCategory;
  childNodes: Array<GQLPageTreeNode>;
  dependents: GQLPaginatedDependencies;
  document: Maybe<GQLPageContentUnion>;
  documentType: Scalars['String'];
  hideInMenu: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  numberOfDescendants: Scalars['Float'];
  parentId: Maybe<Scalars['String']>;
  parentNode: Maybe<GQLPageTreeNode>;
  parentNodes: Array<GQLPageTreeNode>;
  path: Scalars['String'];
  pos: Scalars['Int'];
  scope: GQLPageTreeNodeScope;
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  visibility: GQLPageTreeNodeVisibility;
};


export type GQLPageTreeNodedependentsArgs = {
  filter?: InputMaybe<GQLDependentFilter>;
  forceRefresh?: Scalars['Boolean'];
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};

export type GQLPageTreeNodeCategory =
  | 'MainNavigation';

export type GQLPageTreeNodeCreateInput = {
  attachedDocument: GQLAttachedDocumentInput;
  hideInMenu?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
  pos?: InputMaybe<Scalars['Int']>;
  slug: Scalars['String'];
};

export type GQLPageTreeNodeScope = {
  __typename?: 'PageTreeNodeScope';
  domain: Scalars['String'];
  language: Scalars['String'];
};

export type GQLPageTreeNodeScopeInput = {
  domain: Scalars['String'];
  language: Scalars['String'];
};

export type GQLPageTreeNodeSort = {
  direction?: GQLSortDirection;
  field: GQLPageTreeNodeSortField;
};

export type GQLPageTreeNodeSortField =
  | 'pos'
  | 'updatedAt';

export type GQLPageTreeNodeUpdateInput = {
  attachedDocument?: InputMaybe<GQLAttachedDocumentInput>;
  createAutomaticRedirectsOnSlugChange?: InputMaybe<Scalars['Boolean']>;
  hideInMenu?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type GQLPageTreeNodeUpdateVisibilityInput = {
  visibility: GQLPageTreeNodeVisibility;
};

export type GQLPageTreeNodeVisibility =
  | 'Archived'
  | 'Published'
  | 'Unpublished';

export type GQLPaginatedDamFiles = {
  __typename?: 'PaginatedDamFiles';
  nodes: Array<GQLDamFile>;
  totalCount: Scalars['Int'];
};

export type GQLPaginatedDamFolders = {
  __typename?: 'PaginatedDamFolders';
  nodes: Array<GQLDamFolder>;
  totalCount: Scalars['Int'];
};

export type GQLPaginatedDamItems = {
  __typename?: 'PaginatedDamItems';
  nodes: Array<GQLDamItem>;
  totalCount: Scalars['Int'];
};

export type GQLPaginatedDependencies = {
  __typename?: 'PaginatedDependencies';
  nodes: Array<GQLDependency>;
  totalCount: Scalars['Int'];
};

export type GQLPaginatedNews = {
  __typename?: 'PaginatedNews';
  nodes: Array<GQLNews>;
  totalCount: Scalars['Int'];
};

export type GQLPaginatedPageTreeNodes = {
  __typename?: 'PaginatedPageTreeNodes';
  nodes: Array<GQLPageTreeNode>;
  totalCount: Scalars['Int'];
};

export type GQLPaginatedRedirects = {
  __typename?: 'PaginatedRedirects';
  nodes: Array<GQLRedirect>;
  totalCount: Scalars['Int'];
};

export type GQLPredefinedPage = GQLDocumentInterface & {
  __typename?: 'PredefinedPage';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  type: Maybe<GQLPredefinedPageType>;
  updatedAt: Scalars['DateTime'];
};

export type GQLPredefinedPageInput = {
  type?: InputMaybe<GQLPredefinedPageType>;
};

export type GQLPredefinedPageType =
  | 'News';

export type GQLQuery = {
  __typename?: 'Query';
  currentUser: GQLCurrentUser;
  damAreFilenamesOccupied: Array<GQLFilenameResponse>;
  damFile: GQLDamFile;
  damFilesList: GQLPaginatedDamFiles;
  damFolder: GQLDamFolder;
  damFolderByNameAndParentId: Maybe<GQLDamFolder>;
  damFoldersFlat: Array<GQLDamFolder>;
  damFoldersList: GQLPaginatedDamFolders;
  damIsFilenameOccupied: Scalars['Boolean'];
  damItemListPosition: Scalars['Int'];
  damItemsList: GQLPaginatedDamItems;
  findCopiesOfFileInScope: Array<GQLDamFile>;
  footer: Maybe<GQLFooter>;
  link: Maybe<GQLLink>;
  mainMenu: Array<GQLPageTreeNode>;
  news: GQLNews;
  newsBySlug: Maybe<GQLNews>;
  newsList: GQLPaginatedNews;
  newsListByIds: Array<GQLNews>;
  page: GQLPage;
  pageTreeNode: Maybe<GQLPageTreeNode>;
  pageTreeNodeByPath: Maybe<GQLPageTreeNode>;
  pageTreeNodeList: Array<GQLPageTreeNode>;
  pageTreeNodeSlugAvailable: GQLSlugAvailability;
  paginatedPageTreeNodes: GQLPaginatedPageTreeNodes;
  paginatedRedirects: GQLPaginatedRedirects;
  predefinedPage: GQLPredefinedPage;
  redirect: GQLRedirect;
  redirectBySource: Maybe<GQLRedirect>;
  redirectSourceAvailable: Scalars['Boolean'];
  /** @deprecated Use paginatedRedirects instead. Will be removed in the next version. */
  redirects: Array<GQLRedirect>;
  sitePreviewJwt: Scalars['String'];
  userPermissionsAvailableContentScopes: Array<Scalars['JSONObject']>;
  userPermissionsAvailablePermissions: Array<Scalars['String']>;
  userPermissionsContentScopes: Array<Scalars['JSONObject']>;
  userPermissionsPermission: GQLUserPermission;
  userPermissionsPermissionList: Array<GQLUserPermission>;
  userPermissionsUserById: GQLUserPermissionsUser;
  userPermissionsUsers: GQLUserPermissionPaginatedUserList;
};


export type GQLQuerydamAreFilenamesOccupiedArgs = {
  filenames: Array<GQLFilenameInput>;
  scope?: GQLDamScopeInput;
};


export type GQLQuerydamFileArgs = {
  id: Scalars['ID'];
};


export type GQLQuerydamFilesListArgs = {
  filter?: InputMaybe<GQLFileFilterInput>;
  folderId?: InputMaybe<Scalars['ID']>;
  includeArchived?: InputMaybe<Scalars['Boolean']>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  scope?: GQLDamScopeInput;
  sortColumnName?: InputMaybe<Scalars['String']>;
  sortDirection?: GQLSortDirection;
};


export type GQLQuerydamFolderArgs = {
  id: Scalars['ID'];
};


export type GQLQuerydamFolderByNameAndParentIdArgs = {
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['ID']>;
  scope?: GQLDamScopeInput;
};


export type GQLQuerydamFoldersFlatArgs = {
  scope?: GQLDamScopeInput;
};


export type GQLQuerydamFoldersListArgs = {
  filter?: InputMaybe<GQLFolderFilterInput>;
  includeArchived?: InputMaybe<Scalars['Boolean']>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  parentId?: InputMaybe<Scalars['ID']>;
  scope?: GQLDamScopeInput;
  sortColumnName?: InputMaybe<Scalars['String']>;
  sortDirection?: GQLSortDirection;
};


export type GQLQuerydamIsFilenameOccupiedArgs = {
  filename: Scalars['String'];
  folderId?: InputMaybe<Scalars['String']>;
  scope?: GQLDamScopeInput;
};


export type GQLQuerydamItemListPositionArgs = {
  filter?: InputMaybe<GQLDamItemFilterInput>;
  folderId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  includeArchived?: InputMaybe<Scalars['Boolean']>;
  scope?: GQLDamScopeInput;
  sortColumnName?: InputMaybe<Scalars['String']>;
  sortDirection?: GQLSortDirection;
  type: GQLDamItemType;
};


export type GQLQuerydamItemsListArgs = {
  filter?: InputMaybe<GQLDamItemFilterInput>;
  folderId?: InputMaybe<Scalars['ID']>;
  includeArchived?: InputMaybe<Scalars['Boolean']>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  scope?: GQLDamScopeInput;
  sortColumnName?: InputMaybe<Scalars['String']>;
  sortDirection?: GQLSortDirection;
};


export type GQLQueryfindCopiesOfFileInScopeArgs = {
  id: Scalars['ID'];
  imageCropArea?: InputMaybe<GQLImageCropAreaInput>;
  scope?: GQLDamScopeInput;
};


export type GQLQueryfooterArgs = {
  scope: GQLFooterScopeInput;
};


export type GQLQuerylinkArgs = {
  id: Scalars['ID'];
};


export type GQLQuerymainMenuArgs = {
  scope: GQLPageTreeNodeScopeInput;
};


export type GQLQuerynewsArgs = {
  id: Scalars['ID'];
};


export type GQLQuerynewsBySlugArgs = {
  scope: GQLNewsContentScopeInput;
  slug: Scalars['String'];
};


export type GQLQuerynewsListArgs = {
  filter?: InputMaybe<GQLNewsFilter>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  scope: GQLNewsContentScopeInput;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<GQLNewsSort>>;
  status?: Array<GQLNewsStatus>;
};


export type GQLQuerynewsListByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type GQLQuerypageArgs = {
  id: Scalars['ID'];
};


export type GQLQuerypageTreeNodeArgs = {
  id: Scalars['ID'];
};


export type GQLQuerypageTreeNodeByPathArgs = {
  path: Scalars['String'];
  scope: GQLPageTreeNodeScopeInput;
};


export type GQLQuerypageTreeNodeListArgs = {
  category?: InputMaybe<Scalars['String']>;
  scope: GQLPageTreeNodeScopeInput;
};


export type GQLQuerypageTreeNodeSlugAvailableArgs = {
  parentId?: InputMaybe<Scalars['ID']>;
  scope: GQLPageTreeNodeScopeInput;
  slug: Scalars['String'];
};


export type GQLQuerypaginatedPageTreeNodesArgs = {
  category?: InputMaybe<Scalars['String']>;
  documentType?: InputMaybe<Scalars['String']>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  scope: GQLPageTreeNodeScopeInput;
  sort?: InputMaybe<Array<GQLPageTreeNodeSort>>;
};


export type GQLQuerypaginatedRedirectsArgs = {
  filter?: InputMaybe<GQLRedirectFilter>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  scope: GQLRedirectScopeInput;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<GQLRedirectSort>>;
};


export type GQLQuerypredefinedPageArgs = {
  id: Scalars['ID'];
};


export type GQLQueryredirectArgs = {
  id: Scalars['ID'];
};


export type GQLQueryredirectBySourceArgs = {
  scope: GQLRedirectScopeInput;
  source: Scalars['String'];
  sourceType: GQLRedirectSourceTypeValues;
};


export type GQLQueryredirectSourceAvailableArgs = {
  scope: GQLRedirectScopeInput;
  source: Scalars['String'];
};


export type GQLQueryredirectsArgs = {
  active?: InputMaybe<Scalars['Boolean']>;
  query?: InputMaybe<Scalars['String']>;
  scope: GQLRedirectScopeInput;
  sortColumnName?: InputMaybe<Scalars['String']>;
  sortDirection?: GQLSortDirection;
  type?: InputMaybe<GQLRedirectGenerationType>;
};


export type GQLQuerysitePreviewJwtArgs = {
  includeInvisible: Scalars['Boolean'];
  path: Scalars['String'];
  scope: Scalars['JSONObject'];
};


export type GQLQueryuserPermissionsContentScopesArgs = {
  skipManual?: InputMaybe<Scalars['Boolean']>;
  userId: Scalars['String'];
};


export type GQLQueryuserPermissionsPermissionArgs = {
  id: Scalars['ID'];
  userId?: InputMaybe<Scalars['String']>;
};


export type GQLQueryuserPermissionsPermissionListArgs = {
  userId: Scalars['String'];
};


export type GQLQueryuserPermissionsUserByIdArgs = {
  id: Scalars['String'];
};


export type GQLQueryuserPermissionsUsersArgs = {
  filter?: InputMaybe<GQLUserPermissionsUserFilter>;
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<GQLUserPermissionsUserSort>>;
};

export type GQLRedirect = {
  __typename?: 'Redirect';
  active: Scalars['Boolean'];
  comment: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dependencies: GQLPaginatedDependencies;
  generationType: GQLRedirectGenerationType;
  id: Scalars['ID'];
  scope: GQLRedirectScope;
  source: Scalars['String'];
  sourceType: GQLRedirectSourceTypeValues;
  target: Scalars['JSONObject'];
  updatedAt: Scalars['DateTime'];
};


export type GQLRedirectdependenciesArgs = {
  filter?: InputMaybe<GQLDependencyFilter>;
  forceRefresh?: Scalars['Boolean'];
  limit?: Scalars['Int'];
  offset?: Scalars['Int'];
};

export type GQLRedirectFilter = {
  active?: InputMaybe<GQLBooleanFilter>;
  and?: InputMaybe<Array<GQLRedirectFilter>>;
  createdAt?: InputMaybe<GQLDateTimeFilter>;
  generationType?: InputMaybe<GQLStringFilter>;
  or?: InputMaybe<Array<GQLRedirectFilter>>;
  source?: InputMaybe<GQLStringFilter>;
  updatedAt?: InputMaybe<GQLDateTimeFilter>;
};

export type GQLRedirectGenerationType =
  | 'automatic'
  | 'manual';

export type GQLRedirectInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  comment?: InputMaybe<Scalars['String']>;
  generationType: GQLRedirectGenerationType;
  source: Scalars['String'];
  sourceType: GQLRedirectSourceTypeValues;
  target: Scalars['JSONObject'];
};

export type GQLRedirectScope = {
  __typename?: 'RedirectScope';
  domain: Scalars['String'];
};

export type GQLRedirectScopeInput = {
  domain: Scalars['String'];
};

export type GQLRedirectSort = {
  direction?: GQLSortDirection;
  field: GQLRedirectSortField;
};

export type GQLRedirectSortField =
  | 'createdAt'
  | 'source'
  | 'updatedAt';

export type GQLRedirectSourceTypeValues =
  | 'path';

export type GQLRedirectUpdateActivenessInput = {
  active: Scalars['Boolean'];
};

export type GQLSlugAvailability =
  | 'Available'
  | 'Reserved'
  | 'Taken';

export type GQLSortDirection =
  | 'ASC'
  | 'DESC';

export type GQLStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equal?: InputMaybe<Scalars['String']>;
  notEqual?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type GQLUpdateDamFileInput = {
  altText?: InputMaybe<Scalars['String']>;
  folderId?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<GQLUpdateImageFileInput>;
  license?: InputMaybe<GQLLicenseInput>;
  name?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type GQLUpdateDamFolderInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['ID']>;
};

export type GQLUpdateImageFileInput = {
  cropArea?: InputMaybe<GQLImageCropAreaInput>;
};

export type GQLUserContentScopesInput = {
  contentScopes?: Array<Scalars['JSONObject']>;
};

export type GQLUserPermission = {
  __typename?: 'UserPermission';
  approvedBy: Maybe<Scalars['String']>;
  contentScopes: Array<Scalars['JSONObject']>;
  id: Scalars['ID'];
  overrideContentScopes: Scalars['Boolean'];
  permission: Scalars['String'];
  reason: Maybe<Scalars['String']>;
  requestedBy: Maybe<Scalars['String']>;
  source: GQLUserPermissionSource;
  validFrom: Maybe<Scalars['DateTime']>;
  validTo: Maybe<Scalars['DateTime']>;
};

export type GQLUserPermissionInput = {
  approvedBy?: InputMaybe<Scalars['String']>;
  permission: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
  requestedBy?: InputMaybe<Scalars['String']>;
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validTo?: InputMaybe<Scalars['DateTime']>;
};

export type GQLUserPermissionOverrideContentScopesInput = {
  contentScopes?: Array<Scalars['JSONObject']>;
  overrideContentScopes: Scalars['Boolean'];
  permissionId: Scalars['ID'];
};

export type GQLUserPermissionPaginatedUserList = {
  __typename?: 'UserPermissionPaginatedUserList';
  nodes: Array<GQLUserPermissionsUser>;
  totalCount: Scalars['Int'];
};

export type GQLUserPermissionSource =
  | 'BY_RULE'
  | 'MANUAL';

export type GQLUserPermissionsUser = {
  __typename?: 'UserPermissionsUser';
  contentScopesCount: Scalars['Int'];
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  permissionsCount: Scalars['Int'];
};

export type GQLUserPermissionsUserFilter = {
  and?: InputMaybe<Array<GQLUserPermissionsUserFilter>>;
  email?: InputMaybe<GQLStringFilter>;
  name?: InputMaybe<GQLStringFilter>;
  or?: InputMaybe<Array<GQLUserPermissionsUserFilter>>;
  status?: InputMaybe<GQLStringFilter>;
};

export type GQLUserPermissionsUserSort = {
  direction?: GQLSortDirection;
  field: GQLUserPermissionsUserSortField;
};

export type GQLUserPermissionsUserSortField =
  | 'email'
  | 'name'
  | 'status';
