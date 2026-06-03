/**
 * Represents the state of an async operation with three discriminated cases.
 * Use the `status` field to narrow to the specific state.
 *
 * @example
 * function handleState<T>(state: AsyncState<T>) {
 *   switch (state.status) {
 *     case 'loading': return <Spinner />
 *     case 'success': return <View data={state.data} />
 *     case 'error':   return <Error message={state.error.message} />
 *   }
 * }
 */
export type AsyncLoading = { readonly status: 'loading' }
export type AsyncSuccess<T> = { readonly status: 'success'; readonly data: T }
export type AsyncError<E = Error> = { readonly status: 'error'; readonly error: E }

export type AsyncState<T, E = Error> = AsyncLoading | AsyncSuccess<T> | AsyncError<E>

export const asyncLoading = (): AsyncLoading => ({ status: 'loading' })
export const asyncSuccess = <T>(data: T): AsyncSuccess<T> => ({ status: 'success', data })
export const asyncError = <E = Error>(error: E): AsyncError<E> => ({ status: 'error', error })
