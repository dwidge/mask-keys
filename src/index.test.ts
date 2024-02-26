import test from "node:test";
import { expect } from "expect";
import { includesAny, maskKeys, maskValue } from ".";

test("maskKeys should mask specific keys in an object", () => {
  const input = {
    name: "John",
    age: 30,
    address: {
      street: "123 Main St",
      city: "Anytown",
    },
  };

  // Mask the "age" key
  const masked1 = maskKeys((key) => key === "age")(input);
  expect(masked1).toStrictEqual({
    name: "John",
    age: "**",
    address: {
      street: "123 Main St",
      city: "Anytown",
    },
  });

  // Mask the "city" key
  const masked2 = maskKeys((key) => key === "city")(input);
  expect(masked2).toStrictEqual({
    name: "John",
    age: 30,
    address: {
      street: "123 Main St",
      city: "*******",
    },
  });

  // Mask both "name" and "street" keys
  const masked3 = maskKeys((key) => key === "name" || key === "street")(input);
  expect(masked3).toStrictEqual({
    name: "****",
    age: 30,
    address: {
      street: "***********",
      city: "Anytown",
    },
  });
});

test("maskKeys should handle arrays", () => {
  const input = {
    name: "John",
    age: 30,
    addresses: [
      {
        street: "123 Main St",
        city: "Anytown",
      },
      {
        street: "456 Main St",
        city: "Othertown",
      },
    ],
  };

  const masked = maskKeys((key) => key === "name" || key === "street")(input);
  expect(masked).toStrictEqual({
    name: "****",
    age: 30,
    addresses: [
      {
        street: "***********",
        city: "Anytown",
      },
      {
        street: "***********",
        city: "Othertown",
      },
    ],
  });
});

test("maskValue should mask sensitive values", () => {
  const originalValue = "password123";
  const maskedValue = maskValue(originalValue);

  expect(maskedValue).toStrictEqual("***********");
});

test("includesAny should return true if value includes any of the items", () => {
  const items = ["apple", "banana", "cherry"];
  const value1 = "I love bananas!";
  const value2 = "Oranges are great.";

  expect(includesAny(items)(value1)).toBeTruthy();
  expect(includesAny(items)(value2)).toBeFalsy();
});
