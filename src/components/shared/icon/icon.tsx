import * as Heroicons from "preact-heroicons";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const icons = Heroicons as unknown as Record<string, IconComponent>;

/**
 * Maps a stored Heroicons name to its preact-heroicons outline export.
 */
function toOutlineName(name: string): string {
  const base = name.replace(/Icon$/, "");
  return `${base === "Squares2X2" ? "Squares2x2" : base}Outline`;
}

/**
 * Every Heroicons 24/outline export name, e.g. "WrenchOutline".
 */
export const ICON_NAMES: string[] = Object.keys(icons).filter((name) =>
  name.endsWith("Outline"),
);

/**
 * Fallback icon used when an item has no icon (or an unknown one).
 */
export const FALLBACK_ICON = "WrenchOutline";

/**
 * Resolves a stored icon name to its component.
 */
export function getIcon(name?: string | null): IconComponent {
  if (name) {
    const resolved = icons[name] ?? icons[toOutlineName(name)];
    if (resolved) {
      return resolved;
    }
  }
  return icons[FALLBACK_ICON];
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
