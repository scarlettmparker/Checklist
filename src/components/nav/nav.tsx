import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Form } from "@sun/components";
import { CsrfField } from "@sun/ssr/react";
import styles from "./nav.module.css";

type NavItem = {
  /**
   * Label shown on the link.
   */
  label: string;
  /**
   * Path the link navigates to.
   */
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Checklists", href: "/" },
  { label: "Items", href: "/items" },
  { label: "Templates", href: "/templates" },
  { label: "Categories", href: "/categories" },
];

const PUBLIC_PATHS = ["/login"];

/**
 * Top-level navigation bar across Checklist pages.
 */
const Nav = () => {
  const { t } = useTranslation("nav");
  const { pathname } = useLocation();

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} to={item.href} className={styles.link}>
            <Button
              variant={active ? "default" : "secondary"}
              className={styles.button}
            >
              {item.label}
            </Button>
          </Link>
        );
      })}
      <Form action="/__logout" method="post" className={styles.logout}>
        <CsrfField />
        <Button type="submit" variant="secondary">
          {t("logout")}
        </Button>
      </Form>
    </nav>
  );
};

export default Nav;
