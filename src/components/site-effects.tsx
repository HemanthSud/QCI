"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function SiteEffects() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine) and (hover: hover)");

    if (!mediaQuery.matches) {
      return;
    }

    const cursor = cursorRef.current;
    const ring = ringRef.current;

    if (!cursor || !ring) {
      return;
    }

    let ringTimeout = 0;

    const handleMove = (event: MouseEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

      window.clearTimeout(ringTimeout);
      ringTimeout = window.setTimeout(() => {
        ring.style.left = `${event.clientX}px`;
        ring.style.top = `${event.clientY}px`;
      }, 60);
    };

    const activate = () => {
      cursor.dataset.active = "true";
      ring.dataset.active = "true";
    };

    const deactivate = () => {
      delete cursor.dataset.active;
      delete ring.dataset.active;
    };

    const interactiveElements = Array.from(
      document.querySelectorAll<HTMLElement>("a, button, input, textarea, select, label"),
    );

    document.addEventListener("mousemove", handleMove);
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", activate);
      element.addEventListener("mouseleave", deactivate);
    });

    return () => {
      document.removeEventListener("mousemove", handleMove);
      window.clearTimeout(ringTimeout);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", activate);
        element.removeEventListener("mouseleave", deactivate);
      });
    };
  }, [pathname]);

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

  return (
    <>
      <div aria-hidden className="custom-cursor" ref={cursorRef} />
      <div aria-hidden className="custom-cursor-ring" ref={ringRef} />
    </>
  );
}
