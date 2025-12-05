import { describe, expect, it } from "vitest";
import { mapAllOr, mapOr } from "./map-or";

describe("mapOr", () => {

  it("should return the mapped value when the input is not null or undefined", () => {
    const value = 5;
    const map = (v: number) => v * 2;
    const result = mapOr(value, map);
    expect(result).toBe(10);
  });

  it("should return the default value when the input is null", () => {
    const value = null;
    const map = (v: number) => v * 2;
    const defaultValue = 0;
    const result = mapOr(value, map, defaultValue);
    expect(result).toBe(defaultValue);
  });

  it("should return the default value when the input is undefined", () => {
    const value = undefined;
    const map = (v: number) => v * 2;
    const defaultValue = 0;
    const result = mapOr(value, map, defaultValue);
    expect(result).toBe(defaultValue);
  });

  it("should return undefined when the input is null and no default value is provided", () => {
    const value = null;
    const map = (v: number) => v * 2;
    const result = mapOr(value, map);
    expect(result).toBeUndefined();
  });

  it("should return undefined when the input is undefined and no default value is provided", () => {
    const value = undefined;
    const map = (v: number) => v * 2;
    const result = mapOr(value, map);
    expect(result).toBeUndefined();
  });
});

describe("mapAllOr", () => {
  it("should return the mapped array when the input is not null or undefined", () => {
    const value = [1, 2, 3];
    const map = (v: number) => v * 2;
    const result = mapAllOr(value, map);
    expect(result).toEqual([2, 4, 6]);
  });

  it("should return the default value when the input is null", () => {
    const value = null;
    const map = (v: number) => v * 2;
    const defaultValue: number[] = [];
    const result = mapAllOr(value, map, defaultValue);
    expect(result).toEqual(defaultValue);
  });

  it("should return the default value when the input is undefined", () => {
    const value = undefined;
    const map = (v: number) => v * 2;
    const defaultValue: number[] = [];
    const result = mapAllOr(value, map, defaultValue);
    expect(result).toEqual(defaultValue);
  });

  it("should return an empty array when the input is null and no default value is provided", () => {
    const value = null;
    const map = (v: number) => v * 2;
    const result = mapAllOr(value, map);
    expect(result).toEqual([]);
  });

  it("should return an empty array when the input is undefined and no default value is provided", () => {
    const value = undefined;
    const map = (v: number) => v * 2;
    const result = mapAllOr(value, map);
    expect(result).toEqual([]);
  });

  it("should return an empty array when the input is an empty array", () => {
    const value: number[] = [];
    const map = (v: number) => v * 2;
    const result = mapAllOr(value, map);
    expect(result).toEqual([]);
  });
});
