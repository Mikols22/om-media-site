// Basic email format check — not exhaustive RFC 5322 validation, just enough
// to catch obviously malformed addresses client-side before they reach the
// CRM, which hard-rejects them with a 400.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
