import styles from "./layout.module.css";
import { getBackgroundHex } from "@sun/utils";
import { useEffect, useState } from "react";
import { BreadcrumbProvider } from "@sun/components";
import Nav from "~/components/nav";

type LayoutProps = React.PropsWithChildren;

const Layout = (props: LayoutProps) => {
  const { children } = props;
  // Computed after mount (not during render) so the SSR HTML and the client's
  // first render match. getBackgroundHex() depends on the wall clock, so
  // computing it during hydration caused React #418 when the minute boundary
  // fell between server render and client mount.
  const [backgroundColour, setBackgroundColour] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const update = () => setBackgroundColour(getBackgroundHex());
    update();
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ backgroundColor: backgroundColour }} className={styles.main}>
      <BreadcrumbProvider>
        <Nav />
        {children}
      </BreadcrumbProvider>
    </main>
  );
};

export default Layout;
