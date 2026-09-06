// Base URL for media assets (video, brand imagery) hosted on Backblaze B2,
// e.g. https://f005.backblazeb2.com/file/om-media-site-assets — set via
// NEXT_PUBLIC_ASSET_URL. Unset in local dev by default, so components fall
// back to whatever's on disk under /public.
const ASSET_BASE_URL = process.env.NEXT_PUBLIC_ASSET_URL;

/**
 * Resolves the URL for a media asset. If NEXT_PUBLIC_ASSET_URL is set,
 * builds a URL against that remote bucket using `remoteFilename`. Otherwise
 * falls back to `localPath` (an existing path under /public).
 */
export function getAssetUrl(remoteFilename: string, localPath: string): string {
  if (!ASSET_BASE_URL) return localPath;
  return `${ASSET_BASE_URL}/${remoteFilename}`;
}

// Shared logo URL for Navbar and Footer — the file doesn't exist locally
// (public/images has no logo asset), so the fallback path is a documented
// placeholder that 404s until one is added, matching this site's existing
// pattern for not-yet-provisioned images (see CLAUDE.md's Assets section).
export const LOGO_URL = getAssetUrl(
  "logos/OM+Media+Logo+2026_White_Transparent.png",
  "/images/om-media-logo.png",
);
