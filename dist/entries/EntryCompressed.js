import{Entry as t}from"./Entry.js";export class EntryCompressed extends t{constructor(t,n){super(),this.index=t,this.contents=n}get length(){return this.contents.length}toString(){return this.contents}}