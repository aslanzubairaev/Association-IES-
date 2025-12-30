/* 
 Этот файл определяет небольшой блок “Instagram”.
 Он показывает иконку и подпись “Instagram” рядом с жирным хэндлом аккаунта.
 По клику человек может открыть профиль ассоциации в новой вкладке.
*/

"use client";

import { useEffect, useRef } from "react";
import { instagramBadgeCopy } from "@/content/actions";

type InstagramBadgeProps = {
  locale: "ru" | "fr";
  href: string;
  handle: string;
};

// Этот блок нужен для аккуратной ссылки на Instagram внутри карточек (например, в Hero).
export function InstagramBadge({ locale, href, handle }: InstagramBadgeProps) {
  const copy = instagramBadgeCopy[locale];
  const outlineRef = useRef<SVGPathElement | null>(null);
  const badgeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const outline = outlineRef.current;
    const badge = badgeRef.current;
    if (!outline || !badge) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    let lastScrollY = window.scrollY;
    let isInView = false;
    let ticking = false;

    const restart = () => {
      outline.classList.remove("is-animating");
      void outline.getBoundingClientRect();
      outline.classList.add("is-animating");
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (isInView && currentY < lastScrollY - 4) {
          restart();
        }
        lastScrollY = currentY;
        ticking = false;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === badge) {
            isInView = entry.isIntersecting;
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(badge);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="info instagramBadge">
      <a ref={badgeRef} className="instagramBadge-link" href={href} target="_blank" rel="noreferrer">
        <span className="instagramBadge-icon" aria-hidden="true">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="instagramBadgeGradient" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#feda75" />
                <stop offset="25%" stopColor="#fa7e1e" />
                <stop offset="50%" stopColor="#d62976" />
                <stop offset="75%" stopColor="#962fbf" />
                <stop offset="100%" stopColor="#4f5bd5" />
              </linearGradient>
            </defs>
            <path
              ref={outlineRef}
              className="instagramBadge-outline is-animating"
              d="M16.8 3H7.2C4.88 3 3 4.88 3 7.2v9.6C3 19.12 4.88 21 7.2 21h9.6c2.32 0 4.2-1.88 4.2-4.2V7.2C21 4.88 19.12 3 16.8 3Z"
              stroke="url(#instagramBadgeGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
              stroke="url(#instagramBadgeGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.4 6.6h.01"
              stroke="url(#instagramBadgeGradient)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="instagramBadge-text">
          <span className="instagramBadge-titleRow">
            <span className="instagramBadge-label">{copy.label}</span>
            <span className="instagramBadge-handle">{handle}</span>
          </span>
          <span className="instagramBadge-description">{copy.description}</span>
        </span>
      </a>
    </div>
  );
}


