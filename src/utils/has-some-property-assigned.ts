import { isAssigned } from "./isAssigned"
import { isNullOrUndefined } from "./isNullOrUndefined"

export const hasSomePropertyAssigned = (object: unknown) => {
  if (isNullOrUndefined(object)) return false

  if (object instanceof Object) {
    return Object.values(object).some((value) => isAssigned(value))
  }

  return isAssigned(object)
}


