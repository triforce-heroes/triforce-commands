import { Driver } from "../Driver.js";
export declare function debugEntries(driver: Driver, entries: string[], length: number, includeSamples?: boolean): {
    unknowns: string[];
    knowns: string[];
    samples: [string, string[]][];
};
