export type FrontJElement = {
  (
    ...contents: (string | number)[]
  ): string;
  (
    strings: TemplateStringsArray,
    ...values: (string | number)[]
  ): (
    ...contents: (string | number)[]
  ) => string;
}
