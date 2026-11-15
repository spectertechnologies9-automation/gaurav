import { useCallback, useEffect, useRef, useState } from 'react';

/** Parses "#/project/:id" and "#/venture/:id" hashes into a route object. */
function parse() {
  const m = window.location.hash.match(/^#\/(project|venture)\/([\w-]+)/);
  return m ? { type: m[1], id: m[2] } : null;
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse);
  const pushedInApp = useRef(0);

  useEffect(() => {
    const onHash = () => {
      const next = parse();
      setRoute((prev) => {
        if (next && !prev) pushedInApp.current = 1;
        else if (next && prev) pushedInApp.current += 1;
        else pushedInApp.current = 0;
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const close = useCallback(() => {
    if (pushedInApp.current > 0) {
      const steps = pushedInApp.current;
      pushedInApp.current = 0;
      window.history.go(-steps);
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setRoute(null);
    }
  }, []);

  return [route, close];
}
