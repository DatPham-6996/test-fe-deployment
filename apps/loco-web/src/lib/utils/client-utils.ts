export function isInAppBrowser() {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  return /FBAN|FBAV|FBIOS|FB_IAB|FBDV|FBOP|FBCR|INSTAGRAM|TIKTOK|ZALO/i.test(userAgent);
}
