import{CommandsMatcher as e}from"../CommandsMatcher.js";import{Driver as t}from"../Driver.js";let r=new e(e=>e.includes("\x1a"),(e,t)=>e.indexOf("\x1a",t));r.addLiteral("\x1a",(e,t)=>{let r=e.codePointAt(t+1);return e.slice(t,t+r)});export const TPHD=new t("TPHD",e=>r.match(e));