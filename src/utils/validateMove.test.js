import { describe, it, expect } from "vitest";
import { validateMove } from "./validateMove.js";

const today = new Date(2026, 7, 28);

const validMove = {
  address: "Solvägen 12",
  zip: "80267",
  city: "Gävle",
  date: "2026-10-01",
  contract: "Rörligt pris",
};

const isoDatePlusDays = (days) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("sv-SE");
};

describe("validateMove", () => {
  it("returns an empty object for a valid move", () => {
    expect(validateMove(validMove, today)).toEqual({});
  });

  it.each(["address", "zip", "city", "date", "contract"])(
    "requires %s to be filled in",
    (field) => {
      expect(validateMove({ ...validMove, [field]: "" }, today)).toMatchObject({
        [field]: "Fältet får inte vara tomt",
      });
    },
  );

  it("returns an error when zip code is not exactly five digits", () => {
    expect(validateMove({ ...validMove, zip: "802 67" }, today)).toEqual({
      zip: "Postnummer ska vara fem siffror",
    });
  });

  it.each(["1234", "123456", "ABCDE", "80-267"])(
    "rejects zip code %s",
    (zip) => {
      expect(validateMove({ ...validMove, zip }, today)).toMatchObject({
        zip: "Postnummer ska vara fem siffror",
      });
    },
  );

  it("validates the date format", () => {
    expect(
      validateMove({ ...validMove, date: "2026/10/01" }, today),
    ).toMatchObject({
      date: "Datum måste vara i formatet ÅÅÅÅ-MM-DD",
    });
  });

  it("rejects a date that doesn't exist on the calendar", () => {
    expect(
      validateMove({ ...validMove, date: "2026-02-30" }, today),
    ).toMatchObject({
      date: "Datum måste vara i formatet ÅÅÅÅ-MM-DD",
    });
  });

  it("allows a move date exactly 14 days in the future", () => {
    const date = isoDatePlusDays(14);
    expect(validateMove({ ...validMove, date }, today)).toEqual({});
  });

  it("rejects a move date that is only 13 days away", () => {
    const date = isoDatePlusDays(13);
    expect(validateMove({ ...validMove, date }, today)).toMatchObject({
      date: "Anmälan måste göras senast 14 dagar före flytt",
    });
  });

  it("returns errors for multiple invalid fields at once", () => {
    expect(
      validateMove({ ...validMove, address: "", zip: "123" }, today),
    ).toEqual({
      address: "Fältet får inte vara tomt",
      zip: "Postnummer ska vara fem siffror",
    });
  });
});
