import { hasSomePropertyAssigned } from "./has-some-property-assigned";

export const hasAnyPropertyAssigned = (object: unknown) =>
  !hasSomePropertyAssigned(object) 