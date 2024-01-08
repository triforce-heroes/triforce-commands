import{CommandsBuilder as e}from"./CommandsBuilder.js";import{Entries as s}from"./entries/Entries.js";import{EntryCommand as t}from"./entries/EntryCommand.js";import{EntryCommandUnknown as n}from"./entries/EntryCommandUnknown.js";import{EntryText as r}from"./entries/EntryText.js";import{RuleExpression as i}from"./rules/RuleExpression.js";import{RuleFailureExpression as o}from"./rules/RuleFailureExpression.js";import{RuleFailureLiteral as f}from"./rules/RuleFailureLiteral.js";import{RuleLiteral as l}from"./rules/RuleLiteral.js";export class CommandsMatcher{constructor(e,s){this.rules=[],this.test=e,this.advancer=s}addExpression(...e){this.rules.push(new i(...e))}addLiteral(...e){this.rules.push(new l(...e))}addFailureLiteral(...e){this.rules.push(new f(...e))}addFailureExpression(...e){this.rules.push(new o(...e))}match(u){if(this.test?.(u)===!1)return new s([new r(u)]);let a=new e(u,this.advancer);e:for(;a.offset<u.length;){for(let e of this.rules)if(e instanceof l){if(u.startsWith(e.literal,a.offset)){let s="function"==typeof e.consume?e.consume(u,a.offset).length:e.literal.length+e.consume;a.push(new t(u.slice(a.offset,a.offset+s)));continue e}}else if(e instanceof i){e.expression.lastIndex=a.offset;let s=e.expression.exec(u);if(s){a.push(new t(u.slice(a.offset,a.offset+s[0].length)));continue e}}else if(e instanceof f&&u.startsWith(e.condition,a.offset)){a.push(new n(u.slice(a.offset)));continue e}else if(e instanceof o&&(e.expression.lastIndex=a.offset,e.expression.exec(u))){a.push(new n(u.slice(a.offset)));continue e}a.advance()}return a.entries}}