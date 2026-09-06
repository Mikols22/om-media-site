// Base URL for large media assets (video) hosted on Backblaze B2, e.g.
// https://f005.backblazeb2.com/file/om-media-site-assets — set via
// NEXT_PUBLIC_ASSET_URL. Unset in local dev by default, so components fall
// back to whatever's on disk under /public.
const ASSET_BASE_URL = process.env.NEXT_PUBLIC_ASSET_URL;

/**
 * Resolves the URL for a large media asset. If NEXT_PUBLIC_ASSET_URL is set,
 * builds a URL against that remote bucket using `remoteFilename`. Otherwise
 * falls back to `localPath` (an existing path under /public).
 */
export function getAssetUrl(remoteFilename: string, localPath: string): string {
  if (!ASSET_BASE_URL) return localPath;
  return `${ASSET_BASE_URL}/${remoteFilename}`;
}
