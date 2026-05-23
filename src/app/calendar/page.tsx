import type { Metadata } from "next";

import { EditableCalendar } from "@/components/editable-calendar";
import { createPageMetadata } from "@/lib/seo";
import { createDefaultSiteEditorContent } from "@/lib/site-editor";

export const metadata: Metadata = createPageMetadata({
  title: "Calendar",
  description:
    "View upcoming Queen City Ishaare performances, showcases, competition weekends, and team events for UNC Charlotte's Bollywood fusion dance team.",
  path: "/calendar",
});

const fallbackEditorContent = createDefaultSiteEditorContent();

export default function CalendarPage() {
  return <EditableCalendar fallbackCalendar={fallbackEditorContent.calendar} />;
}
