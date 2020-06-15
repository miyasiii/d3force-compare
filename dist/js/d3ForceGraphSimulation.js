!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="./js/d3ForceGraphDom.js")}({"./js/d3ForceGraphDom.js":function(t,e,n){"use strict";function r(t,e){var n=e.get(t);if(!n)throw new TypeError("attempted to get private field on non-instance");return n.get?n.get.call(t):n.value}function i(t,e,n){var r=e.get(t);if(!r)throw new TypeError("attempted to set private field on non-instance");if(r.set)r.set.call(t,n);else{if(!r.writable)throw new TypeError("attempted to set read only private field");r.value=n}return n}n.r(e),n.d(e,"d3ForceGraphDom",(function(){return o}));class o{constructor(t,e){if(a.set(this,{writable:!0,value:void 0}),d.set(this,{writable:!0,value:void 0}),s.set(this,{writable:!0,value:void 0}),l.set(this,{writable:!0,value:void 0}),c.set(this,{writable:!0,value:void 0}),"svg"===e){const e=d3.select(t).append("svg").attr("width",document.body.clientWidth).attr("height",document.body.clientHeight),n=e.append("rect").attr("id","background").attr("fill","#fff").attr("x",.5).attr("y",.5).attr("width",document.body.clientWidth).attr("height",document.body.clientHeight),r=e.append("svg:g").attr("id","svgGroup");i(this,d,r.append("g").attr("id","links")),i(this,a,r.append("g").attr("id","nodes"));const o=d3.zoom().scaleExtent([.1,1]).on("zoom",()=>{r.attr("transform",`translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`)});e.call(o),i(this,s,new ResizeObserver(r=>{d3.select(t).attr("width",document.body.clientWidth),d3.select(t).attr("height",document.body.clientHeight),e.attr("width",document.body.clientWidth),e.attr("height",document.body.clientHeight),n.attr("width",document.body.clientWidth),n.attr("height",document.body.clientHeight)}))}else if("canvas"===e){const e=d3.select(t).append("canvas").attr("width",document.body.clientWidth).attr("height",document.body.clientHeight);i(this,c,d3.select("canvas").node().getContext("2d")),i(this,s,new ResizeObserver(n=>{d3.select(t).attr("width",document.body.clientWidth),d3.select(t).attr("height",document.body.clientHeight),e.attr("width",document.body.clientWidth),e.attr("height",document.body.clientHeight)})),e.call(d3.zoom().scaleExtent([.1,1]).on("zoom",()=>{i(this,l,d3.event.transform),this.update()}))}r(this,s).observe(document.body),i(this,l,d3.zoomIdentity)}setData(){let t=r(this,a).selectAll("g").data(window.graph.nodes,t=>t.id),e=t.enter().append("g").attr("id",t=>t.id||null).on("contextmenu",(t,e)=>{d3.event.preventDefault()});t.exit().remove(),e.append("circle").classed("node",!0).attr("r",2).attr("fill","#000"),t=e.merge(t);let n=r(this,d).selectAll("line").data(window.graph.links);n.exit().remove();let i=n.enter().append("line").style("stroke-width","1px").style("stroke","#000").attr("opacity",.25);n=i.merge(n)}update(){if(!1===d3.select("svg").empty()){let t=r(this,a).selectAll("g").data(window.graph.nodes);r(this,d).selectAll("line").data(window.graph.links).attr("x1",t=>t.source.x).attr("y1",t=>t.source.y).attr("x2",t=>t.target.x).attr("y2",t=>t.target.y),t.attr("transform",t=>`translate(${[t.x,t.y]})`)}else!1===d3.select("canvas").empty()&&(r(this,c).save(),r(this,c).clearRect(0,0,document.body.clientWidth,document.body.clientHeight),r(this,c).translate(r(this,l).x,r(this,l).y),r(this,c).scale(r(this,l).k,r(this,l).k),r(this,c).globalAlpha=.25,r(this,c).beginPath(),r(this,c).strokeStyle="#000",window.graph.links.forEach(t=>{r(this,c).moveTo(t.source.x,t.source.y),r(this,c).lineTo(t.target.x,t.target.y)}),r(this,c).stroke(),r(this,c).globalAlpha=1,window.graph.nodes.forEach(t=>{r(this,c).fillRect(t.x-1,t.y-1,2,2)}),r(this,c).restore())}}var a=new WeakMap,d=new WeakMap,s=new WeakMap,l=new WeakMap,c=new WeakMap}});