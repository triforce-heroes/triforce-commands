import{Entries as e}from"./entries/Entries.js";import{EntryCommand as r}from"./entries/EntryCommand.js";import{EntryCommandDefined as n}from"./entries/EntryCommandDefined.js";export class Driver{constructor(e,r,n){this.name=e,this.parseRaw=r,this.definer=n}define(e){return this.definer?.(e.command)??new n(e.command)}parse(n){return new e(this.parseRaw(n).entries.map(e=>e instanceof r?this.define(e):e))}}