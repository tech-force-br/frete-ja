import { useEffect, useMemo, useRef, useState } from "react";

type Options = {
  pageSize?: number;
  rootMargin?: string;
  resetDeps?: any[];
};

export function useInfiniteScroll<T>(
  items: T[],
  { pageSize = 15, rootMargin = "200px", resetDeps = [] }: Options = {}
) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Slice visible items
  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const hasMore = visibleCount < items.length;

  // Observer
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;

        setVisibleCount((prev) => {
          if (prev >= items.length) return prev;
          return prev + pageSize;
        });
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length, pageSize, rootMargin]);

  // Reset when filters/search change
  useEffect(() => {
    setVisibleCount(pageSize);
  }, resetDeps);

  return { visibleItems, loadMoreRef, hasMore };
}