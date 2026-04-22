import type { Metadata } from "next";

import { EditableCalendar } from "@/components/editable-calendar";
import { createDefaultSiteEditorContent } from "@/lib/site-editor";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Check upcoming Queen City Ishaare dates.",
};

const fallbackEditorContent = createDefaultSiteEditorContent();

export default function CalendarPage() {
  return <EditableCalendar fallbackCalendar={fallbackEditorContent.calendar} />;
}
