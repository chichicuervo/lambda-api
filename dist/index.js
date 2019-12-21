!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["@jbelich/lambda-api"]=t():e["@jbelich/lambda-api"]=t()}(global,(function(){return function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){e.exports=require("lambda-api")},function(e,t,r){"use strict";r.r(t);var s=class{constructor(e,t,r={}){e.log.trace("ApiObject:constructor"),this.request=e,this.response=t,this.setOptions(r),this.timestamp=Math.floor(Date.now()/1e3),this.resolve&&this.resolve.bind(this)}get className(){return this.constructor.name}get store(){return this._store||(this._store=new Map),this._store}setStore(e={}){for(let[t,r]of Object.entries(e))this.store.set(t,r);return this}set(e,t){return this.store.has(e)||this.store.set(e,t instanceof Function?t():t),this.store.get(e)}get options(){return this._options||(this._options={}),this._options}setOptions(e={}){return this._options={...this._options,...e},this}get log(){return this.request.log}get body(){return this.request.body}get headers(){return{...this.request.multiValueHeaders,ipAddress:this.ipAddress}}get cookies(){return this.request.cookies}get ipAddress(){return this.request.ip}get auth(){return this.request.auth}get parsed(){return{headers:this.headers,cookies:this.cookies,auth:this.auth,body:this.body}}get lambda(){const{id:e,interface:t,awsNamespace:r,coldStart:s,clientType:n,clientCountry:o,requestCount:i}=this.request;return{requestId:e,requestCount:i,requestTs:this.timestamp,awsInterface:t,awsNamespace:r,coldStart:s,clientType:n,clientCountry:o}}};var n=class extends s{constructor(e,t,{noHandle:r,...s}={}){const n=e.log;n.trace("ApiHandler:constructor"),super(e,t,s);const o=(async()=>{e.log.trace(`ApiHandler:handler/${this.className}`);try{return this.resolve&&await this.resolve()||{response:null}}catch(e){const{message:r,fileName:s,lineNumber:o,...i}=e;return n.error(`ApiHandler:handler/${this.className}/catch`,{message:r,fileName:s,lineNumber:o,...i}),t.status(500),{error:{message:r,fileName:s,lineNumber:o,...i}}}}).bind(this);if(!r)return o;this.handler=o}};var o=class extends s{constructor(e,t,r,{noHandle:s,...n}={}){e.log.trace("ApiMiddleware:constructor"),super(e,t,n);const o=(async()=>{e.log.trace(`ApiMiddleware:handler/${this.className}`);try{this.resolve&&await this.resolve(),r()}catch(r){console.log(r),e.log.error(`ApiHandler:handler/${this.className}/catch`,r),t.error(500)}}).bind(this);if(!s)return o;this.handler=o}},i=r(0),a=r.n(i);r.d(t,"ApiHandler",(function(){return n})),r.d(t,"ApiMiddleware",(function(){return o})),r.d(t,"ApiObject",(function(){return s})),r.d(t,"Api",(function(){return a.a}));t.default=a.a}])}));