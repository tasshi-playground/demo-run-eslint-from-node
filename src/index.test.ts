import { lintAndPrettifySource } from "./index";

test("lint and prettify correctly", async () => {
  const source = "const a=1;";
  const expected = "const a = 1;\n";
  const actual = await lintAndPrettifySource(source);
  expect(actual).toBe(expected);
});
