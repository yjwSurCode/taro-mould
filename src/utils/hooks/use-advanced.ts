import { useCallback, useRef, useState, Dispatch, SetStateAction } from "react";
import { useMountedState } from "./use-life-cycle";
import useDestroyedRef from "./use-destroyed-ref";

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

export function usePersistFn<T extends (...args: any[]) => any>(fn: T): T {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const persistFn = useRef<T>();
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return fnRef.current!.apply(this, args);
    } as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return persistFn.current!;
}

export interface AsyncState<R> {
  loading: boolean;
  error?: Error;
  data?: R;
}

type AsyncFn<R, P extends any[]> = [
  AsyncState<R>,
  {
    run: (...args: P) => Promise<R>;
    mutate: (data: R | ((prevData: R) => R)) => void;
  }
];

interface AsyncOptions<R, P extends any[]> {
  initialState?: AsyncState<R> | (() => AsyncState<R>);
  cacheData?: boolean;
  onSuccess?: (data: R, params: P) => void;
  onError?: (e: Error, params: P) => void;
}

export function useAsyncFn<R = any, P extends any[] = any[]>(
  service: (...args: P) => Promise<R>,
  options: AsyncOptions<R, P> = {}
): AsyncFn<R, P> {
  const lastCallId = useRef(0);
  const [state, setState] = useState<AsyncState<R>>(
    options.initialState || (() => ({ loading: false }))
  );

  const isMounted = useMountedState();
  const onSuccess = usePersistFn(options.onSuccess || noop);
  const onError = usePersistFn(options.onError || noop);
  service = usePersistFn(service);

  const run = usePersistFn(async (...args: P): Promise<R> => {
    const cacheData = options.cacheData;
    const callId = ++lastCallId.current;

    if (cacheData) {
      setState((prev) => ({ data: prev.data, loading: true }));
    } else {
      setState({ loading: true });
    }

    return service(...args).then(
      (data) => {
        if (isMounted() && callId === lastCallId.current) {
          setState({ data, loading: false });
          onSuccess(data, args);
        }

        return data;
      },
      (error) => {
        if (isMounted() && callId === lastCallId.current) {
          setState({ error, loading: false });
          onError(error, args);
        }

        return error;
      }
    );
  });

  const mutate = useCallback((data: any): void => {
    if (typeof data === "function") {
      setState((preState) => ({
        ...preState,
        data: data(preState.data),
      }));
    } else {
      setState((preState) => ({ ...preState, data }));
    }
  }, []);

  return [state, { run, mutate }];
}

export function useSafeState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];

export function useSafeState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];

export function useSafeState(initialState?: any) {
  const destroyedRef = useDestroyedRef();

  const [state, setState] = useState(initialState);

  const setCurrentState = useCallback(
    (currentState) => {
      /** 如果组件已经卸载则不再更新 state */
      if (destroyedRef.current) return;
      setState(currentState);
    },
    [destroyedRef]
  );

  return [state, setCurrentState] as const;
}
