export type ContentfulLinkType = "Asset" | "Entry";

export type ContentfulLink = {
  sys: {
    id: string;
    linkType: ContentfulLinkType;
    type: "Link";
  };
};

export type ContentfulEntry<TFields extends Record<string, unknown>> = {
  sys: {
    id: string;
    type: "Entry";
    contentType?: ContentfulLink;
  };
  fields: TFields;
};

export type ContentfulAsset = {
  sys: {
    id: string;
    type: "Asset";
  };
  fields: {
    title?: string;
    description?: string;
    file?: {
      url?: string;
      contentType?: string;
      details?: {
        image?: {
          width?: number;
          height?: number;
        };
      };
    };
  };
};

export type ContentfulCollection<TFields extends Record<string, unknown>> = {
  total: number;
  skip: number;
  limit: number;
  items: Array<ContentfulEntry<TFields>>;
  includes?: {
    Asset?: ContentfulAsset[];
    Entry?: Array<ContentfulEntry<Record<string, unknown>>>;
  };
};
