"use client";

import { useEffect, useState } from "react";
import { fetchSiteLogo } from "@/shared/sanity/lib/siteLogo";
import { urlFor } from "@/shared/sanity/lib/image";

export default function Logo({
  className = "",
  ...props
}: {
  className?: string;
  [key: string]: any;
}) {
  const [logo, setLogo] = useState<{ logo?: any; alt?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteLogo().then((data) => {
      setLogo(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div
        className={className}
        style={{
          width: 100,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <span className="sr-only">Loading logo...</span>
        <svg
          width="32"
          height="32"
          viewBox="0 0 48 48"
          fill="none"
          className="animate-spin">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            opacity="0.2"
          />
          <path
            d="M44 24c0-11.046-8.954-20-20-20"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (logo && logo.logo) {
    return (
      <div
        className="flex items-center justify-center aspect-[16/9] w-full"
        style={{
          backgroundImage: `url(${urlFor(logo.logo).url()})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}></div>
    );
  }

  // Fallback: scritta con il nome del progetto da env
  const projectTitle =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Schema UI Starter"
      : "Schema UI Starter";
  return (
    <span
      className={className}
      style={{
        fontWeight: 700,
        fontSize: 24,
        letterSpacing: 1,
        display: "inline-block",
        lineHeight: 1,
        color: "var(--primary, #000)",
        ...props.style,
      }}
      {...props}>
      {projectTitle.replace(/(^["']|["']$)/g, "")}
    </span>
  );
}
