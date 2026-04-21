"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const revealedElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (revealedElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    revealedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
