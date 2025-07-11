import { useMemo, useCallback, useRef } from 'react';

// Memoize expensive calculations
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps);
}

// Memoize callbacks
export function useMemoizedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps);
}

// Memoize with custom comparison
export function useMemoizedWithComparison<T>(
  factory: () => T,
  deps: React.DependencyList,
  compare: (prev: T, next: T) => boolean
): T {
  const prevValueRef = useRef<T>();
  const depsRef = useRef<React.DependencyList>();

  return useMemo(() => {
    const newValue = factory();
    
    // Only update if dependencies changed or comparison fails
    if (
      !depsRef.current ||
      !prevValueRef.current ||
      depsRef.current.some((dep, index) => dep !== deps[index]) ||
      !compare(prevValueRef.current, newValue)
    ) {
      prevValueRef.current = newValue;
      depsRef.current = deps;
    }
    
    return prevValueRef.current!;
  }, deps);
}

// Memoize expensive filtering operations
export function useMemoizedFilter<T>(
  items: T[],
  filterFn: (item: T) => boolean,
  deps: React.DependencyList = []
): T[] {
  return useMemo(() => items.filter(filterFn), [items, ...deps]);
}

// Memoize expensive sorting operations
export function useMemoizedSort<T>(
  items: T[],
  sortFn: (a: T, b: T) => number,
  deps: React.DependencyList = []
): T[] {
  return useMemo(() => [...items].sort(sortFn), [items, ...deps]);
}

// Memoize expensive grouping operations
export function useMemoizedGroup<T, K extends string | number>(
  items: T[],
  groupBy: (item: T) => K,
  deps: React.DependencyList = []
): Record<K, T[]> {
  return useMemo(() => {
    return items.reduce((groups, item) => {
      const key = groupBy(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {} as Record<K, T[]>);
  }, [items, ...deps]);
} 