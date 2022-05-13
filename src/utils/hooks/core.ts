export type Dictionary<T = any> = { [key: string]: T };

export interface OkRes<R> {
  isError: false;
  value: R;
}

export interface ErrRes<E> {
  isError: true;
  error: E;
}

export type Res<R, E> = OkRes<R> | ErrRes<E>;
