import { Link, useLocation } from "react-router-dom";
import { Button } from "@sun/components";
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

/**
 * Top-level navigation bar across Checklist pages.
 */
const Nav = () => {
  const { pathname } = useLocation();

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
    </nav>
  );
};

export default Nav;
