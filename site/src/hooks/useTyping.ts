"use client";

import { useEffect, useState } from "react";

export function useTyping(lines: string[]) {
  const [text, setText] = useState(lines[0] ?? "");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let li = 0;
    let ci = lines[0]?.length ?? 0;
    let del = true;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const line = lines[li];
      if (del) {
        ci--;
        if (ci <= 0) {
          del = false;
          li = (li + 1) % lines.length;
        }
      } else {
        ci++;
        if (ci >= line.length) {
          del = true;
          setText(line);
          timer = setTimeout(step, 2600);
          return;
        }
      }
      setText(lines[li].slice(0, Math.max(0, ci)));
      timer = setTimeout(step, del ? 26 : 52);
    };

    timer = setTimeout(step, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}
