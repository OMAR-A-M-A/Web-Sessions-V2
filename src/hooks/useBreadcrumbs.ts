import { useLocation } from "react-router-dom";

export interface Breadcrumb {
  label: string;
  to: string;
}

export function useBreadcrumbs(): Breadcrumb[] {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const label = value
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { label, to };
  });

  return breadcrumbs;
}
