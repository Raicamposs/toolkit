type Builder<T> = (props: T) => T;

/**
 * A builder that composes multiple builder functions to create a final object.
 * This class is immutable; methods return a new instance.
 *
 * @template T The type of the object being built.
 */
export class CompositeBuilder<T> {
  private readonly _builders: Builder<T>[];

  private constructor(builders: Builder<T>[] = []) {
    this._builders = builders;
  }

  /**
   * Creates a new empty CompositeBuilder.
   *
   * @template T The type of the object being built.
   * @returns A new CompositeBuilder instance.
   */
  static new<T>(): CompositeBuilder<T> {
    return new CompositeBuilder<T>();
  }

  /**
   * Adds a builder function to the composition.
   *
   * @param builder The builder function to add.
   * @returns A new CompositeBuilder instance with the added builder.
   */
  add(builder: Builder<T>): CompositeBuilder<T> {
    return new CompositeBuilder<T>([...this._builders, builder]);
  }

  /**
   * Builds the final object by applying all builder functions in order.
   *
   * @param initialData The initial data to start building from.
   * @returns The resulting object after applying all builders.
   */
  build(initialData: T): T {
    return this._builders.reduce((acc, builder) => {
      const changes = builder(acc);
      return {
        ...acc,
        ...changes,
      };
    }, initialData);
  }
}
