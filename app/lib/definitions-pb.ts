import PocketBase, { RecordService } from 'pocketbase';

export interface Brand {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  BRANDS_ID: string;
  NAME: string;
}

export interface JeansProduct {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  ID_PRODUCT: string;
  STOCK: number;
  NAME: string;
  DESCRIPTION: string;
  CATEGORY_ID: string;
  BRAND_ID: string;
  SUPPLIER_ID: string;
  COLOR: string;
  SIZE: string;
  COST: number;
  PRICE: number;
  TAGS: string;
  STATUS: string;
  COMMENTS: string;
  IMG: string;
  expand?: {
    BRAND_ID?: Brand;
  };
}

export interface CapsProduct {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  ID_PRODUCT: string;
  STOCK: number;
  NAME: string;
  DESCRIPTION: string;
  CATEGORY_ID: string;
  BRAND_ID: string;
  SUPPLIER_ID: string;
  COLOR: string;
  SIZE: string;
  COST: number;
  PRICE: number;
  TAGS: string;
  STATUS: string;
  COMMENTS: string;
  IMG: string;
  expand?: {
    BRAND_ID?: { NAME: string };
  };
}

export interface BagsProduct {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  ID_PRODUCT: string;
  STOCK: number;
  NAME: string;
  DESCRIPTION: string;
  CATEGORY_ID: string;
  BRAND_ID: string;
  SUPPLIER_ID: string;
  COLOR: string;
  SIZE: string;
  COST: number;
  PRICE: number;
  TAGS: string;
  STATUS: string;
  COMMENTS: string;
  IMG: string;
  expand?: {
    BRAND_ID?: { NAME: string };
  };
}

export interface RemerasProduct {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  ID_PRODUCT: string;
  STOCK: number;
  NAME: string;
  DESCRIPTION: string;
  CATEGORY_ID: string;
  BRAND_ID: string;
  SUPPLIER_ID: string;
  COLOR: string;
  SIZE: string;
  COST: number;
  PRICE: number;
  TAGS: string;
  STATUS: string;
  COMMENTS: string;
  IMG: string;
  expand?: {
    BRAND_ID?: { NAME: string };
  };
}

export interface RemerasMangasLargasProduct {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  ID_PRODUCT: string;
  STOCK: number;
  NAME: string;
  DESCRIPTION: string;
  CATEGORY_ID: string;
  BRAND_ID: string;
  SUPPLIER_ID: string;
  COLOR: string;
  SIZE: string;
  COST: number;
  PRICE: number;
  TAGS: string;
  STATUS: string;
  COMMENTS: string;
  IMG: string;
  expand?: {
    BRAND_ID?: { NAME: string };
  };
}

export interface PoloShirtProduct {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  ID_PRODUCT: string;
  STOCK: number;
  NAME: string;
  DESCRIPTION: string;
  CATEGORY_ID: string;
  BRAND_ID: string;
  SUPPLIER_ID: string;
  COLOR: string;
  SIZE: string;
  COST: number;
  PRICE: number;
  TAGS: string;
  STATUS: string;
  COMMENTS: string;
  IMG: string;
  expand?: {
    BRAND_ID?: { NAME: string };
  };
}

export interface CottonSweaterProduct {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  ID_PRODUCT: string;
  STOCK: number;
  NAME: string;
  DESCRIPTION: string;
  CATEGORY_ID: string;
  BRAND_ID: string;
  SUPPLIER_ID: string;
  COLOR: string;
  SIZE: string;
  COST: number;
  PRICE: number;
  TAGS: string;
  STATUS: string;
  COMMENTS: string;
  IMG: string;
  expand?: {
    BRAND_ID?: { NAME: string };
  };
}

export interface JacketProduct {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  ID_PRODUCT: string;
  STOCK: number;
  NAME: string;
  DESCRIPTION: string;
  CATEGORY_ID: string;
  BRAND_ID: string;
  SUPPLIER_ID: string;
  COLOR: string;
  SIZE: string;
  COST: number;
  PRICE: number;
  TAGS: string;
  STATUS: string;
  COMMENTS: string;
  IMG: string;
  expand?: {
    BRAND_ID?: { NAME: string };
  };
}

export interface ShortsProduct {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string; // ISO 8601 date string
  updated: string; // ISO 8601 date string
  ID_PRODUCT: string;
  STOCK: number;
  NAME: string;
  DESCRIPTION: string;
  CATEGORY_ID: string;
  BRAND_ID: string;
  SUPPLIER_ID: string;
  COLOR: string;
  SIZE: string;
  COST: number;
  PRICE: number;
  TAGS: string;
  STATUS: string;
  COMMENTS: string;
  IMG: string;
  expand?: {
    BRAND_ID?: { NAME: string };
  };
}

export interface CollectionResponse<T> {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

export interface PbUser {
  id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  created: string;
  updated: string;
  name?: string;
  avatar?: string;
  // Add other fields as needed
}

export interface PocketBaseAuthResponse {
  token: string;
  record: PbUser;
}

export interface TypedPocketBase extends PocketBase {
  collection(collectionIdentifier: string): RecordService; // default fallback for any other collection
  collection(collectionIdentifier: 'prod_jeans'): RecordService<JeansProduct>;
  collection(collectionIdentifier: 'prod_gorras'): RecordService<CapsProduct>;
  collection(collectionIdentifier: 'prod_bags'): RecordService<BagsProduct>;
  collection(collectionIdentifier: 'prod_remeras'): RecordService<RemerasProduct>;
  collection(collectionIdentifier: 'prod_bermudas'): RecordService<ShortsProduct>;
  collection(collectionIdentifier: 'prod_chombas'): RecordService<PoloShirtProduct>;
  collection(collectionIdentifier: 'prod_buzos'): RecordService<CottonSweaterProduct>;
  collection(collectionIdentifier: 'prod_camperas'): RecordService<JacketProduct>;
  collection(collectionIdentifier: 'prod_remeras_mlargas'): RecordService<RemerasMangasLargasProduct>;
}