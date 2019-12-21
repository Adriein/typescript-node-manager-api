export default class ModelAttributes<T> {
  constructor(private data: T) {}

  public get = <K extends keyof T>(propName: K): T[K] => {
    return this.data[propName];
  }

  public set(update: T): void {
    Object.assign(this.data, update);
  }
}
