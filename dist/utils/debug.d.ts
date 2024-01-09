import { Driver } from "../Driver.js";
type DebugMode = "Command" | "CommandUnknown";
export declare function debugEntries(driver: Driver, entries: string[], length: number, mode?: DebugMode): void;
export {};
