import { Driver } from "../Driver.js";

import { HWAC } from "./HWAC.js";
import { RAW } from "./RAW.js";
import { TPHD } from "./TPHD.js";
import { ZTFH } from "./ZTFH.js";

const enginesDrivers = Object.fromEntries(
  Object.entries({ HWAC, RAW, TPHD, ZTFH }).map(([key, value]) => [
    key.toLowerCase(),
    value,
  ]),
);

export function loadEngineDriver(name: string): Driver | undefined {
  return enginesDrivers[name.toLowerCase()];
}
