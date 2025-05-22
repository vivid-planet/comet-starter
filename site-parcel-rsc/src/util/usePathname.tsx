"use client"
import { useEffect, useState, createContext, useContext } from 'react';

const InitialUrlContext = createContext<string | undefined>(undefined);

export function InitialUrlProvider({ children, value }: { children: React.ReactNode, value: string }) {
    return (
      <InitialUrlContext.Provider value={value}>
        {children}
      </InitialUrlContext.Provider>
    );
}

let isPatched = false;
export function patchHistoryEvents(): void {
  if (isPatched) return;
  isPatched = true;

  const dispatchLocationChange = () => {
    // Schedule after paint to avoid hydration/state timing issues
    setTimeout(() => {
      window.dispatchEvent(new Event('locationchange'));
    }, 0);
  };

  const wrap = (method: 'pushState' | 'replaceState') => {
    const original = history[method];
    history[method] = function (...args: Parameters<typeof original>) {
      const result = original.apply(this, args);
      dispatchLocationChange();
      return result;
    };
  };

  wrap('pushState');
  wrap('replaceState');
}

// This hook returns the current pathname and updates it when the URL changes.
export function usePathname(): string | undefined {
  const initialUrl = useContext(InitialUrlContext);
  const [pathname, setPathname] = useState(typeof window === 'undefined' ? initialUrl : window.location.pathname);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    patchHistoryEvents();

    const update = () => setPathname(window.location.pathname);

    window.addEventListener('popstate', update);
    window.addEventListener('locationchange', update);

    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('locationchange', update);
    };
  }, []);

  return pathname;
}