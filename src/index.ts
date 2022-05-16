import { ESLint } from "eslint";
import * as prettier from "prettier";

export const lintAndPrettifySource = async (source: string) => {
  const eslint = new ESLint({
    fix: true,
    useEslintrc: false,
    baseConfig: {
      extends: "@cybozu/eslint-config/presets/typescript",
    },
  });
  const eslintResult = await eslint.lintText(source);
  const eslintOutput = eslintResult
    .map((r) => {
      // https://eslint.org/docs/developer-guide/nodejs-api#-lintresult-type
      if ("output" in r) {
        return r.output;
      }
      if ("source" in r) {
        return r.source;
      }
      return "";
    })
    .join("");
  return prettier.format(eslintOutput, {
    parser: "typescript",
  });
};
