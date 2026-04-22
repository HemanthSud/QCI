import type { User } from "@supabase/supabase-js";

const specialMemberEmails = new Set(["hemanth2016d20@gmail.com"]);

export const specialMemberProfiles = {
  hemanth: {
    displayName: "Hemanth Sudhaharan",
    email: "hemanth2016d20@gmail.com",
  },
} as const;

function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? "";
}

export function isSpecialMember(user: User | null | undefined) {
  return specialMemberEmails.has(normalizeEmail(user?.email));
}

export function isQciMember(user: User | null | undefined) {
  return user?.app_metadata?.qci_member === true || isSpecialMember(user);
}
