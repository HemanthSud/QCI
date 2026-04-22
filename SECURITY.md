# Security Notes

## Member Signup

Member signup is intentionally handled through server-only API routes:

- `QCI_SIGNUP_CODE` gates access to the signup flow.
- `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_SECRET_KEY` is used only on the server to create approved member accounts.
- Approved accounts are stamped with `app_metadata.qci_member = true`.
- The members portal rejects accounts that do not have that server-owned app metadata flag.

Never put the signup code or a Supabase service role/secret key in a `NEXT_PUBLIC_` variable. `NEXT_PUBLIC_` values are bundled into browser code.

## Supabase Checklist

- Keep the public app on the Supabase publishable key only.
- If Supabase Auth open signup is not needed elsewhere, disable public signup in the Supabase dashboard and use this app's server signup route instead.
- Keep direct table access protected by RLS before creating any public tables.
- Do not use `user_metadata` for authorization decisions because users can edit it.
- Store future private member data in tables protected by RLS or behind server routes.
- Add budget alerts/caps in Supabase and any third-party services used by the site.

## Elevated Gallery Uploads

- Elevated gallery uploads are accepted only through server API routes.
- Upload authorization checks the user's Supabase access token server-side before writing to Storage.
- The Storage bucket stays private; public gallery reads use short-lived signed URLs from the server.
- Keep `QCI_GALLERY_BUCKET` server-only unless the bucket name is intentionally public.
