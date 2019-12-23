import { FrontJElementOptions } from './index'

export type FrontJElement = (
  optionsOrContent?: FrontJElementOptions | string,
  ...contents: string[]
) => string
