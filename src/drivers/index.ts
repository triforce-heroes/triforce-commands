import { Driver } from "../Driver.js";

import { HWAC } from "./HWAC.js";
import { PKLA } from "./PKLA.js";
import { RAW } from "./RAW.js";
import { TPHD } from "./TPHD.js";
import { UDK } from "./UDK.js";
import { ZTFH } from "./ZTFH.js";

const enginesDrivers = Object.fromEntries(
  Object.entries({ HWAC, PKLA, RAW, TPHD, UDK, ZTFH }).map(([key, value]) => [
    key.toLowerCase(),
    value,
  ]),
);

export function loadEngineDriver(name: string): Driver | undefined {
  return enginesDrivers[name.toLowerCase()];
}
