import { TPHD } from "./drivers/TPHD.js";
import { ZTFH } from "./drivers/ZTFH.js";

export type * from "./Driver.js";

export const CommandsDrivers = {
  TPHD,
  ZTFH,
};
