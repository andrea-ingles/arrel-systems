// Extend the global Window type so window.plausible is typed everywhere.
// This eliminates all (window as any).plausible usages across the codebase.
declare global {
  interface Window {
    plausible?: (
      event: string,
      opts?: { props?: Record<string, string> }
    ) => void
  }
}

/**
 * Fire a Plausible custom event.
 * Safe to call server-side or during SSR — the guard prevents any execution
 * outside a browser context.
 */
export function trackEvent(
  name: string,
  props?: Record<string, string>
): void {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(name, props ? { props } : undefined)
  }
}
