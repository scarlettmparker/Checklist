import styles from "./layout.module.css";
import { getBackgroundHex } from "@sun/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import { BreadcrumbProvider } from "@sun/components";
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
  // The 5s background transition is disabled until after the initial colour is
  // applied, otherwise the first (instant) set fades in over 5s.
  const [transitionEnabled, setTransitionEnabled] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const update = () => setBackgroundColour(getBackgroundHex());
    update();
    // Re-enable the transition on the next frame, after the initial colour has
    // been committed with duration 0.
    const raf = requestAnimationFrame(() => setTransitionEnabled(true));
    const interval = setInterval(update, 5000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, []);

  return (
    <main
      style={{
        backgroundColor: backgroundColour,
        transitionDuration: transitionEnabled ? undefined : "0s",
      }}
      className={styles.main}
    >
      <BreadcrumbProvider>
        <Nav />
        {children}
      </BreadcrumbProvider>
    </main>
  );
};

export default Layout;
