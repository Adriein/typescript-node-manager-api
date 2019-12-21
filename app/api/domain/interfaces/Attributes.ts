export default interface Attributes<T> {
  set(update: T): void;
  get<K extends keyof T>(propName: K): T[K];
}
