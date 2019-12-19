import { FrontJElementOptions } from './index'

export type FrontJElement = (
  optionsOrContent?: FrontJElementOptions | string | TemplateStringsArray,
  ...contents: string[] | undefined[] | unknown[]
) => string | FrontJElement
