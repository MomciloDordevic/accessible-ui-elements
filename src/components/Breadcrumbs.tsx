import React from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="text-sm ml-2" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && (
              <ChevronRight className="mx-1 h-4 w-4 text-gray-400" aria-hidden="true" />
            )}

            {item.href && !item.isCurrent ? (
              <a
                href={item.href}
                className="hover:underline text-blue-600 dark:text-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
              >
                {item.label}
              </a>
            ) : (
              <span
                className="text-gray-500 dark:text-gray-400"
                aria-current={item.isCurrent ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
