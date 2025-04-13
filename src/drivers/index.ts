import type { Driver } from "@/Driver.js";
import { HWAC } from "@/drivers/HWAC.js";
import { PKLA } from "@/drivers/PKLA.js";
import { RAW } from "@/drivers/RAW.js";
import { TPHD } from "@/drivers/TPHD.js";
import { UDK } from "@/drivers/UDK.js";
import { ZTFH } from "@/drivers/ZTFH.js";

const enginesDrivers = Object.fromEntries(
  Object.entries({ HWAC, PKLA, RAW, TPHD, UDK, ZTFH }).map(([key, value]) => [
    key.toLowerCase(),
    value,
  ]),
);

export function loadEngineDriver(name: string): Driver | undefined {
  return enginesDrivers[name.toLowerCase()];
}
