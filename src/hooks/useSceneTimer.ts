import { useEffect, useState } from "react";

export function useSceneTimer(key: string) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    const start = Date.now();
    const id = window.setInterval(() => {
      setElapsed(Date.now() - start);
    }, 60);
    return () => window.clearInterval(id);
  }, [key]);

  return elapsed;
}
