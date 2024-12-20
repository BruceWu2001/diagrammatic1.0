export type DeepKeys<T> = T extends object ? {
    [K in keyof T]-?: K extends string | number
      ? `${K}` | `${K}.${DeepKeys<T[K]>}`
      : never;
  }[keyof T] : never;

export type Action = 'reply' | 'initiate';