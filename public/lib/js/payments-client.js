!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):"object"==typeof exports?exports.PaymentsClient=e():t.PaymentsClient=e()}(this,function(){return function(t){function e(i){if(o[i])return o[i].exports;var n=o[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){"use strict";function i(t){t=t||{},this.modalParent=t.modalParent||document.body,this.id="_"+Math.random().toString(36).substr(2,9),this.modalWidth=t.modalWidth||318,this.modalHeight=t.modalHeight||468,this.closeDelayMs="number"==typeof t.closeDelayMs?t.closeDelayMs:300,this.accessToken=t.accessToken,this.product=t.product,this.paymentHost=t.paymentHost||"http://pay.dev:8000/",this.httpsOnly="undefined"==typeof t.httpsOnly?!0:t.httpsOnly;var e=n.getProtocol(this.paymentHost);if(this.httpsOnly===!0&&"https:"!==e)throw new Error("paymentHost is not https");if("http:"!==e&&"https:"!==e)throw new Error("paymentHost must be http or https");if("string"!=typeof this.product)throw new Error("A 'product' string must be provided");if("string"!=typeof this.accessToken)throw new Error("An 'accessToken' string must be provided");this.httpsOnly===!1&&console.warn("httpsOnly is set to false. Only use for dev");var o=this;return window.addEventListener("message",function(t){o.receiveMessage.call(o,t)},!1),this}var n=o(1);i.prototype={validIframeOrigins:["http://pay.dev:8000","http://pay.dev.mozaws.net:8000"],classPrefix:"fxa-pay",prefix:function(t){return this.classPrefix+"-"+t},receiveMessage:function(t){if(-1===this.validIframeOrigins.indexOf(t.origin))return void console.warn("Ignored message from invalid origin",t.origin);try{var e=JSON.parse(t.data)||{};"purchase-completed"===e.event?this.close():console.warn("Unhandled postMessage data received")}catch(o){throw console.error("postMessage data should be stringified JSON",t.data),o}},getStyle:function(t,e){return"undefined"!=typeof getComputedStyle?getComputedStyle(t,null).getPropertyValue(e):t.currentStyle[e]},iframeStyle:{border:"none",width:"100%",height:"100%"},closeButtonStyle:{color:"#666",fontSize:"20px",position:"absolute",padding:"10px",top:0,right:0,textDecoration:"none"},outerStyle:{backgroundColor:"rgba(0, 0, 0, 0.5)",position:"fixed",top:0,bottom:0,left:0,right:0,zIndex:2e3,transition:"opacity 0.3s",opacity:0},getInnerStyle:function(){var t=this;return{padding:"5px",paddingTop:"25px",position:"absolute",top:"50%",left:"50%",height:t.modalHeight+"px",width:t.modalWidth+"px",backgroundColor:"#fff",marginTop:"-"+t.modalHeight/2+"px",marginLeft:"-"+t.modalWidth/2+"px",border:"1px solid #C3CFD8",borderRadius:"2px",boxShadow:"0 3px 7px rgba(0, 0, 0, 0.5)",zIndex:2010,transition:"opacity 0.3s",opacity:0}},applyStyles:function(t,e){Object.keys(e).forEach(function(o){t.style[o]=e[o]})},buildModal:function(){var t=this,e=document,o=e.createElement("div");o.setAttribute("id",this.id),o.className=this.prefix("container"),o.addEventListener("click",function(e){e.preventDefault(),t.close()},!1);var i=e.createElement("div");i.className=this.prefix("modal"),i.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation()},!1),o.appendChild(i),this.applyStyles(o,this.outerStyle);var r=e.createElement("a");r.href="#";var s=e.createTextNode("×");r.appendChild(s),this.applyStyles(r,this.closeButtonStyle),r.addEventListener("click",function(e){e.preventDefault(),t.close()},!1),i.appendChild(r);var a=e.createElement("iframe"),l=n.buildIframeSrc(this.paymentHost,{access_token:this.accessToken,product:this.product});return a.setAttribute("src",l),i.appendChild(a),this.applyStyles(a,this.iframeStyle),this.applyStyles(i,this.getInnerStyle()),o._inner=i,o},show:function(){this.modal=this.buildModal(),this.parentOverflow=this.getStyle(this.modalParent,"overflowY"),this.modalParent.style.overflowY="hidden",this.modalParent.appendChild(this.modal),this.modal.style.opacity=1,this.modal._inner.style.opacity=1},close:function(){this.modalParent.style.overflow=this.parentOverflow,this.modal.style.opacity=0,this.modal._inner.style.opacity=0;var t=this;window.setTimeout(function(){t.modalParent.removeChild(t.modal)},this.closeDelayMs)}},t.exports=i},function(t,e,o){"use strict";t.exports={getProtocol:function(t){var e=document.createElement("a");return e.href=t,e.protocol},serialize:function(t){var e=[];for(var o in t)t.hasOwnProperty(o)&&e.push(encodeURIComponent(o)+"="+encodeURIComponent(t[o]));return e.join("&")},buildIframeSrc:function(t,e){return t=/\/$/.test(t)?t:t+"/",t+"?"+this.serialize(e)}}}])});