import{inspect as n}from"node:util";import{EntryCommand as o}from"../entries/EntryCommand.js";import{EntryCommandUnknown as t}from"../entries/EntryCommandUnknown.js";export function debugEntries(e,r,m,s="CommandUnknown"){let a=new Set;for(let n of r)for(let r of e.parseRaw(n).entries){let n="Command"===s&&r instanceof o,e="CommandUnknown"===s&&r instanceof t;(n||e)&&a.add(r.command.slice(0,m))}process.stdout.write(n([...a].sort(),{depth:null,colors:!0,maxArrayLength:null}))}