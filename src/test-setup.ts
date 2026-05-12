// Workaround: Node 26 defines `localStorage` as a global property (behind
// --localstorage-file), which causes vitest's populateGlobal to skip the jsdom
// version. Re-expose it from the jsdom window so tests can use it normally.

if (
  typeof globalThis.localStorage === "undefined" &&
  typeof globalThis.window !== "undefined" &&
  typeof (globalThis.window as Window & typeof globalThis).localStorage ===
    "undefined"
) {
  // jsdom with a url should have localStorage on its window. The issue is
  // vitest skipped injecting it. Access it via the jsdom instance directly.
  const jsdomInstance = (globalThis as Record<string, unknown>).jsdom as
    | { window: { localStorage: Storage } }
    | undefined;
  if (jsdomInstance?.window?.localStorage) {
    Object.defineProperty(globalThis, "localStorage", {
      value: jsdomInstance.window.localStorage,
      writable: true,
      configurable: true,
    });
  }
}
