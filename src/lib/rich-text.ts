import type { Document } from "@contentful/rich-text-types";

type RichTextNode = {
  nodeType: string;
  value?: string;
  content?: RichTextNode[];
};

function getNodeText(node: RichTextNode): string {
  if (node.nodeType === "text") return node.value ?? "";
  if (!node.content) return "";

  return node.content.map(getNodeText).join(" ").replace(/\s+/g, " ").trim();
}

export function richTextToPlainText(document: Document): string {
  return (document as unknown as RichTextNode)
    .content!.map(getNodeText)
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
