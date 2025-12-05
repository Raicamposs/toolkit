
type Builder<T> = (props: T) => T

export class CompositeBuilder<T> {
  private data: Builder<T>[] = []


  static new<T>(): CompositeBuilder<T> {
    return new CompositeBuilder<T>()
  }

  add(item: Builder<T>): CompositeBuilder<T> {
    this.data.push(item)
    return this
  }

  build(data: T): T {
    return this.data.reduce((result, builder) => {
      const changes = builder(result);
      return {
        ...result,
        ...changes
      } as T;
    }, data);
  }
}
