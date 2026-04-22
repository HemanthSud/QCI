import type { User } from "@supabase/supabase-js";

const elevatedMemberEmails = new Set(["hemanth2016d20@gmail.com"]);

export const elevatedMemberProfiles = {
  hemanth: {
    displayName: "Hemanth Sudhaharan",
    email: "hemanth2016d20@gmail.com",
  },
} as const;

export const specialMemberProfiles = elevatedMemberProfiles;

function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? "";
}

export function isSpecialMember(user: User | null | undefined) {
  return isElevatedMember(user);
}

export function isElevatedMember(user: User | null | undefined) {
  return elevatedMemberEmails.has(normalizeEmail(user?.email));
}

export function isQciMember(user: User | null | undefined) {
  return user?.app_metadata?.qci_member === true || isElevatedMember(user);
}
