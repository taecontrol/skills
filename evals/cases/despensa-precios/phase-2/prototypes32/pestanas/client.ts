import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  createDb,
  makeApi,
  OperationFailed,
  type Failure,
  type KindSummary,
  type Product,
} from "./data.ts";
import type { Filters } from "./scenarios.ts";

export const api = makeApi(createDb());

const wideQuery = window.matchMedia("(min-width: 1024px)");
const subscribeWide = (onChange: () => void) => {
  wideQuery.addEventListener("change", onChange);
  return () => wideQuery.removeEventListener("change", onChange);
};
export const useWide = () => useSyncExternalStore(subscribeWide, () => wideQuery.matches);

/** A failed write, with the product a ProductAlreadyMerged points to. */
export type UiError = { failure: Failure; into?: Product | undefined };

/** There is no get_product: a product is found by paging list_products. */
export async function findProduct(id: string): Promise<Product | undefined> {
  let cursor: string | undefined;
  do {
    const page = await api.list_products({ limit: 50, ...(cursor ? { cursor } : {}) });
    const found = page.products.find((product) => product.id === id);
    if (found) return found;
    cursor = page.nextCursor ?? undefined;
  } while (cursor);
  return undefined;
}

export async function toUiError(error: unknown): Promise<UiError> {
  const failure: Failure =
    error instanceof OperationFailed ? error.failure : { _tag: "Offline" };
  if (failure._tag === "ProductAlreadyMerged")
    return { failure, into: await findProduct(failure.intoProductId) };
  return { failure };
}

type ListState = {
  products: Product[];
  nextCursor: string | null;
  status: "loading" | "ready" | "error";
  fetching: boolean;
  moreError: boolean;
  /** Why the first page failed, when it did. */
  failure?: string | undefined;
};

export function useProductList(filters: Filters, enabled = true) {
  const [state, setState] = useState<ListState>({
    products: [],
    nextCursor: null,
    status: "loading",
    fetching: true,
    moreError: false,
  });
  const request = useRef(0);
  const loaded = useRef(0);

  const load = useCallback(
    async (limit: number) => {
      const id = ++request.current;
      setState((previous) => ({ ...previous, fetching: true }));
      try {
        const page = await api.list_products({
          ...(filters.search.trim() ? { search: filters.search.trim() } : {}),
          ...(filters.kind ? { kind: filters.kind } : {}),
          ...(filters.withoutKind ? { withoutKind: true } : {}),
          ...(filters.withoutPurchases ? { withoutPurchases: true } : {}),
          limit,
        });
        if (id !== request.current) return;
        loaded.current = page.products.length;
        setState({
          products: page.products,
          nextCursor: page.nextCursor,
          status: "ready",
          fetching: false,
          moreError: false,
        });
      } catch (error) {
        if (id !== request.current) return;
        const failure = error instanceof OperationFailed ? error.failure._tag : "Offline";
        setState((previous) => ({ ...previous, status: "error", fetching: false, failure }));
      }
    },
    [filters.search, filters.kind, filters.withoutKind, filters.withoutPurchases],
  );

  useEffect(() => {
    if (!enabled) return;
    const timer = setTimeout(() => void load(20), filters.search ? 180 : 0);
    return () => clearTimeout(timer);
  }, [load, enabled, filters.search]);

  const loadMore = async () => {
    if (!state.nextCursor) return;
    const id = ++request.current;
    setState((previous) => ({ ...previous, fetching: true }));
    try {
      const page = await api.list_products({
        ...(filters.search.trim() ? { search: filters.search.trim() } : {}),
        ...(filters.withoutKind ? { withoutKind: true } : {}),
        ...(filters.withoutPurchases ? { withoutPurchases: true } : {}),
        ...(filters.kind ? { kind: filters.kind } : {}),
        cursor: state.nextCursor,
        limit: 20,
      });
      if (id !== request.current) return;
      setState((previous) => {
        const products = [...previous.products, ...page.products];
        loaded.current = products.length;
        return { ...previous, products, nextCursor: page.nextCursor, fetching: false };
      });
    } catch {
      setState((previous) => ({ ...previous, fetching: false, moreError: true }));
    }
  };

  /** After a write, reload as many rows as are on screen. */
  const refresh = useCallback(
    () => load(Math.max(20, Math.ceil(loaded.current / 20) * 20)),
    [load],
  );
  return { ...state, loadMore, refresh, retry: () => load(20) };
}

export function useKinds() {
  const [kinds, setKinds] = useState<KindSummary[]>([]);
  const [loaded, setLoaded] = useState(false);
  const refresh = useCallback(async () => {
    try {
      setKinds((await api.list_kinds()).kinds);
      setLoaded(true);
    } catch {
      // The kind field still accepts any typed name.
    }
  }, []);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return { kinds, loaded, refresh };
}
