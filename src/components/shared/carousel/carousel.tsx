import { Children, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@sun/components";
import styles from "./carousel.module.css";

type CarouselProps = {
  pageSize?: number;
} & React.PropsWithChildren;

/**
 * Simple state-paginated carousel.
 */
const Carousel = ({ children, pageSize = 3 }: CarouselProps) => {
  const [page, setPage] = useState(0);

  const items = Children.toArray(children);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(page, pageCount - 1);
  const start = current * pageSize;
  const slice = items.slice(start, start + pageSize);
  const ICON = 20;

  return (
    <div className={styles.carousel}>
      <Button
        variant="secondary"
        className={styles.nav}
        disabled={current === 0}
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        title="Previous"
        aria-label="Previous"
      >
        <ChevronLeft width={ICON} height={ICON} />
      </Button>
      <div className={styles.track}>{slice}</div>
      <Button
        variant="secondary"
        className={styles.nav}
        disabled={current >= pageCount - 1}
        onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
        title="Next"
        aria-label="Next"
      >
        <ChevronRight width={ICON} height={ICON} />
      </Button>
    </div>
  );
};

export default Carousel;
