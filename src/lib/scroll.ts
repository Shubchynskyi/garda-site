function getCurrentHashId() {
  const rawHash = window.location.hash.slice(1);
  if (!rawHash) return "";

  try {
    return decodeURIComponent(rawHash);
  } catch {
    return rawHash;
  }
}

export function scrollToSection(id: string, behavior?: ScrollBehavior) {
  const element = document.getElementById(id);
  if (!element) return false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: behavior ?? (reduceMotion ? "auto" : "smooth"), block: "start" });

  const hash = `#${id}`;
  if (window.location.hash !== hash) {
    window.history.replaceState(null, "", hash);
  }

  return true;
}

export function scrollToCurrentHash(behavior: ScrollBehavior = "auto") {
  const id = getCurrentHashId();
  if (!id) return false;

  return scrollToSection(id, behavior);
}
