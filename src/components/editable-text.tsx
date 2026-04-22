"use client";

import type { ElementType, HTMLAttributes } from "react";

import { getEditableTextValue } from "@/lib/site-editor";

import { useEditableSiteContent } from "./editable-site-content";

type EditableTextProps = {
  as?: ElementType;
  fallback: string;
  id: string;
} & HTMLAttributes<HTMLElement>;

export function EditableText({
  as: Component = "span",
  fallback,
  id,
  ...props
}: EditableTextProps) {
  const content = useEditableSiteContent();
  const value = getEditableTextValue(content, id, fallback);

  return <Component {...props}>{value}</Component>;
}
