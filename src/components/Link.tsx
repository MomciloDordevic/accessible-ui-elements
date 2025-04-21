import React from "react";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  ariaLabel?: string;
};

const Link: React.FC<LinkProps> = ({ href, children, external = false, ariaLabel }) => {
  const isExternal = external || href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={`
        text-blue-800 underline underline-offset-2 font-medium
        hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2
        transition-colors duration-200
      `}
    >
      {children}
      {isExternal && (
        <span className="sr-only"> (opens in a new tab)</span>
      )}
    </a>
  );
};

export default Link;
