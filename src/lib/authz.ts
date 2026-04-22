import type { User } from "@supabase/supabase-js";

export const elevatedMemberProfiles = {
  hemanth: {
    displayName: "Hemanth Sudhaharan",
    email: "hemanth2016d20@gmail.com",
  },
  nidhi: {
    displayName: "Nidhi Patel",
    email: "np102007@gmail.com",
  },
} as const;

export const specialMemberProfiles = elevatedMemberProfiles;

const elevatedMemberEmails = new Set(
  Object.values(elevatedMemberProfiles)
    .map((profile) => profile.email.trim().toLowerCase())
    .filter(Boolean),
);

function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? "";
}

function hasElevatedAppMetadata(user: User | null | undefined) {
  return user?.app_metadata?.qci_elevated === true || user?.app_metadata?.qci_role === "elevated";
}

export function getElevatedMemberProfile(user: User | null | undefined) {
  if (!isElevatedMember(user)) {
    return null;
  }

  const email = normalizeEmail(user?.email);
  const staticProfile = Object.values(elevatedMemberProfiles).find(
    (profile) => normalizeEmail(profile.email) === email,
  );

  if (staticProfile) {
    return staticProfile;
  }

  const displayName =
    typeof user?.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()
      ? user.user_metadata.full_name.trim()
      : user?.email || "Elevated member";

  return {
    displayName,
    email: user?.email ?? "",
  };
}

export function isSpecialMember(user: User | null | undefined) {
  return isElevatedMember(user);
}

export function isElevatedMember(user: User | null | undefined) {
  return hasElevatedAppMetadata(user) || elevatedMemberEmails.has(normalizeEmail(user?.email));
}

export function isQciMember(user: User | null | undefined) {
  return user?.app_metadata?.qci_member === true || isElevatedMember(user);
}
