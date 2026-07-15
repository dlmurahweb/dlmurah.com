import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";

import { sanitizePublicUrl } from "@/lib/urls";

const options: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => <p>{children}</p>,
    [BLOCKS.HEADING_2]: (_node, children) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (_node, children) => <h3>{children}</h3>,
    [BLOCKS.UL_LIST]: (_node, children) => <ul>{children}</ul>,
    [BLOCKS.OL_LIST]: (_node, children) => <ol>{children}</ol>,
    [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_node, children) => <blockquote>{children}</blockquote>,
    [INLINES.HYPERLINK]: (node, children) => {
      const href = sanitizePublicUrl(String(node.data.uri ?? ""));
      if (!href) return <span>{children}</span>;

      const external = href.startsWith("https://");
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: () => null,
    [BLOCKS.EMBEDDED_ENTRY]: () => null,
  },
};

export function RichText({ document }: { document: Document }) {
  return documentToReactComponents(document, options);
}
