import{BufferConsumer as e}from"@triforce-heroes/triforce-core/BufferConsumer";import{CommandsMatcher as r}from"../CommandsMatcher.js";import{Driver as t}from"../Driver.js";import{EntryCommandDefined as a}from"../entries/EntryCommandDefined.js";let d=new r;d.addLiteral("\x1a",(e,r)=>{let t=e.codePointAt(r+1);return e.slice(r,r+t)}),d.addLiteral("%d"),d.addLiteral("->"),d.addLiteral(""),d.addLiteral(""),d.addLiteral(""),d.addLiteral(""),d.addLiteral(""),d.addLiteral(" "),d.addFailureExpression(/[^\d\p{L}\n !"%&'()*+,\-./:;=?_~¡©«°»¿×]/u);export const TPHD=new t("TPHD",e=>d.match(e),r=>{if(!r.startsWith("\x1a"))return new a(r,{type:0,subtype:0,attributes:[...r].map(e=>e.codePointAt(0))});let t=new e(Buffer.from(r,"binary"),1);return new a(r,{type:t.readUnsignedInt8(),subtype:t.readUnsignedInt16(),attributes:[...t.rest()]})});