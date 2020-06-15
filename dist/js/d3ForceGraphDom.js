!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./js/d3ForceGraphSimulation.js")}({"./js/d3ForceGraphSimulation.js":function(e,t,n){"use strict";function i(e,t){var n=t.get(e);if(!n)throw new TypeError("attempted to get private field on non-instance");return n.get?n.get.call(e):n.value}function r(e,t,n){var i=t.get(e);if(!i)throw new TypeError("attempted to set private field on non-instance");if(i.set)i.set.call(e,n);else{if(!i.writable)throw new TypeError("attempted to set read only private field");i.value=n}return n}n.r(t),n.d(t,"d3ForceGraphSimulation",(function(){return o}));class o{constructor(){a.set(this,{writable:!0,value:void 0}),l.set(this,{writable:!0,value:void 0}),s.set(this,{writable:!0,value:void 0}),r(this,a,d3.forceSimulation()),r(this,s,{alpha:{alphaMin:.01,alphaDecay:null,alphaTarget:null,velocityDecay:null},center:{x:document.body.clientWidth/2,y:document.body.clientHeight/2},collision:{radius:5,strength:.7,iterations:null},link:{strength:.5,iterations:null},charge:{strength:-30,theta:null,distanceMin:1,distanceMax:1e3},position:{forceX:null,strengthX:null,x:null,forceY:null,strengthY:null,y:null},radial:{forceRadial:null,strength:null,radius:null,x:null,y:null}}),i(this,a).force("charge",d3.forceManyBody().strength(i(this,s).charge.strength).distanceMin(i(this,s).charge.distanceMin).distanceMax(i(this,s).charge.distanceMax)).force("link",d3.forceLink().strength(i(this,s).link.strength)).force("center",d3.forceCenter(i(this,s).center.x,i(this,s).center.y)).force("collide",d3.forceCollide().radius(i(this,s).collision.radius).strength(i(this,s).collision.strength)),i(this,a).alphaMin(i(this,s).alpha.alphaMin)}start(){i(this,a).restart(),i(this,a).alpha(1)}stop(){i(this,a).alpha(0)}ticked(){window.graph=i(this,l),window.graphDom.update()}ended(){console.log("simulation ended"),window.graph=i(this,l),window.graphDom.update()}setData(){r(this,l,window.graph),i(this,a).nodes(i(this,l).nodes).on("tick",()=>this.ticked()).on("end",()=>this.ended()),i(this,a).force("link",d3.forceLink().id(e=>e.id).links(i(this,l).links))}}var a=new WeakMap,l=new WeakMap,s=new WeakMap}});