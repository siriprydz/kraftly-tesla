import { describe, it, expect } from "vitest";
import { firstName } from "./user.test";

describe("firstName", () => {
  it("returns the first name from a full name", () => {
    const user = "Anna Andersson";
    const result = firstName(user);
    expect(result).toBe("Anna");
  });
});
