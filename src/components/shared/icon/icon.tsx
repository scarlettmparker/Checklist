import * as OutlineIcons from "@heroicons/react/24/outline";
import { WrenchIcon } from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const icons = OutlineIcons as unknown as Record<string, IconComponent>;

/**
 * Every Heroicons 24/outline export name, e.g. "WrenchIcon".
 */
export const ICON_NAMES: string[] = Object.keys(icons).filter((name) =>
  name.endsWith("Icon"),
);

/**
 * Fallback icon used when an item has no icon (or an unknown one).
 */
export const FALLBACK_ICON = "WrenchIcon";

/**
 * Resolves a stored icon name to its component.
 */
export function getIcon(name?: string | null): IconComponent {
  if (name && icons[name]) {
    return icons[name];
  }
  return WrenchIcon;
}

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  /**
   * Stored Heroicons name.
   */
  name?: string | null;
};

/**
 * Renders a Heroicons 24/outline icon by its stored name.
 */
const Icon = ({ name, ...rest }: IconProps) => {
  const IconComponent = getIcon(name);
  return <IconComponent {...rest} />;
};

export default Icon;
