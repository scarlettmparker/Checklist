import styles from "./layout.module.css";
import { getBackgroundHex } from "@sun/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import { BreadcrumbProvider } from "@sun/components";
import { ThemeSwitcher, THEME_APPLIED_EVENT, type ThemeOption } from "@sun/themes";
import Nav from "~/components/nav";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type LayoutProps = React.PropsWithChildren;

const Layout = (props: LayoutProps) => {
  const { children } = props;
  // Computed after mount (not during render) so the SSR HTML and the client's
  // first render match. getBackgroundHex() depends on the wall clock, so
  // computing it during hydration caused React #418 when the boundary between
  // server render and client mount changed the interpolated colour.
  const [backgroundColour, setBackgroundColour] = useState<string | undefined>(
    undefined,
  );
  const [themes, setThemes] = useState<ThemeOption[]>([]);

  useIsomorphicLayoutEffect(() => {
    const update = () => setBackgroundColour(getBackgroundHex());
    update();
    const interval = setInterval(update, 5000);
    window.addEventListener(THEME_APPLIED_EVENT, update);
    return () => {
      clearInterval(interval);
      window.removeEventListener(THEME_APPLIED_EVENT, update);
    };
  }, []);

  useEffect(() => {
    setThemes(window.__themes__ ?? []);
  }, []);

  return (
    <main style={{ backgroundColor: backgroundColour }} className={styles.main}>
      <BreadcrumbProvider>
        <Nav />
        {children}
      </BreadcrumbProvider>
      <div className={styles.switcher}>
        <ThemeSwitcher themes={themes} />
      </div>
    </main>
  );
};

export default Layout;
