import { Nullable } from "../types";
import { isNullOrUndefined } from "./isNullOrUndefined";

export const mapOr = <I, O>(
  value: Nullable<I>,
  map: (value: I) => O,
  defaultValue: Nullable<O> = undefined,
): Nullable<O> => {
  if (isNullOrUndefined(value)) {
    return defaultValue
  }

  return map(value)
};

export const mapAllOr = <I, O>(
  value: Nullable<Array<I>>,
  map: (value: I) => O,
  defaultValue: Nullable<Array<O>> = Array<O>(),
): Nullable<Array<O>> => {
  if (isNullOrUndefined(value)) {
    return defaultValue
  }

  return value.map(map)
};