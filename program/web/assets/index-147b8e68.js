(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();function k(){}const je=t=>t;function Ae(t){return t()}function ye(){return Object.create(null)}function B(t){t.forEach(Ae)}function ce(t){return typeof t=="function"}function x(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Fe(t){return Object.keys(t).length===0}function He(t,...e){if(t==null)return k;const s=t.subscribe(...e);return s.unsubscribe?()=>s.unsubscribe():s}function fe(t,e,s){t.$$.on_destroy.push(He(e,s))}function be(t){return t??""}function V(t,e,s){return t.set(s),e}const Le=typeof window<"u";let Ge=Le?()=>window.performance.now():()=>Date.now(),ae=Le?t=>requestAnimationFrame(t):k;const W=new Set;function Te(t){W.forEach(e=>{e.c(t)||(W.delete(e),e.f())}),W.size!==0&&ae(Te)}function Ke(t){let e;return W.size===0&&ae(Te),{promise:new Promise(s=>{W.add(e={c:t,f:s})}),abort(){W.delete(e)}}}function b(t,e){t.appendChild(e)}function De(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function We(t){const e=$("style");return Je(De(t),e),e.sheet}function Je(t,e){return b(t.head||t,e),e.sheet}function y(t,e,s){t.insertBefore(e,s||null)}function g(t){t.parentNode&&t.parentNode.removeChild(t)}function ie(t,e){for(let s=0;s<t.length;s+=1)t[s]&&t[s].d(e)}function $(t){return document.createElement(t)}function L(t){return document.createTextNode(t)}function S(){return L(" ")}function me(){return L("")}function ee(t,e,s,n){return t.addEventListener(e,s,n),()=>t.removeEventListener(e,s,n)}function w(t,e,s){s==null?t.removeAttribute(e):t.getAttribute(e)!==s&&t.setAttribute(e,s)}function Me(t){return t===""?null:+t}function Qe(t){return Array.from(t.childNodes)}function te(t,e){e=""+e,t.data!==e&&(t.data=e)}function K(t,e){t.value=e??""}function xe(t,e,{bubbles:s=!1,cancelable:n=!1}={}){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,s,n,e),o}function $e(t,e){return new t(e)}const ne=new Map;let se=0;function Ue(t){let e=5381,s=t.length;for(;s--;)e=(e<<5)-e^t.charCodeAt(s);return e>>>0}function Ve(t,e){const s={stylesheet:We(e),rules:{}};return ne.set(t,s),s}function Xe(t,e,s,n,o,r,i,m=0){const c=16.666/n;let l=`{
`;for(let d=0;d<=1;d+=c){const q=e+(s-e)*r(d);l+=d*100+`%{${i(q,1-q)}}
`}const u=l+`100% {${i(s,1-s)}}
}`,f=`__svelte_${Ue(u)}_${m}`,a=De(t),{stylesheet:h,rules:v}=ne.get(a)||Ve(a,t);v[f]||(v[f]=!0,h.insertRule(`@keyframes ${f} ${u}`,h.cssRules.length));const C=t.style.animation||"";return t.style.animation=`${C?`${C}, `:""}${f} ${n}ms linear ${o}ms 1 both`,se+=1,f}function Ye(t,e){const s=(t.style.animation||"").split(", "),n=s.filter(e?r=>r.indexOf(e)<0:r=>r.indexOf("__svelte")===-1),o=s.length-n.length;o&&(t.style.animation=n.join(", "),se-=o,se||Ze())}function Ze(){ae(()=>{se||(ne.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&g(e)}),ne.clear())})}let Y;function X(t){Y=t}function oe(){if(!Y)throw new Error("Function called outside component initialization");return Y}function et(t){oe().$$.on_mount.push(t)}function Be(){const t=oe();return(e,s,{cancelable:n=!1}={})=>{const o=t.$$.callbacks[e];if(o){const r=xe(e,s,{cancelable:n});return o.slice().forEach(i=>{i.call(t,r)}),!r.defaultPrevented}return!0}}function tt(t,e){return oe().$$.context.set(t,e),e}function _e(t){return oe().$$.context.get(t)}function nt(t,e){const s=t.$$.callbacks[e.type];s&&s.slice().forEach(n=>n.call(this,e))}const G=[],we=[];let J=[];const ke=[],st=Promise.resolve();let ue=!1;function rt(){ue||(ue=!0,st.then(Ie))}function re(t){J.push(t)}const le=new Set;let F=0;function Ie(){if(F!==0)return;const t=Y;do{try{for(;F<G.length;){const e=G[F];F++,X(e),ot(e.$$)}}catch(e){throw G.length=0,F=0,e}for(X(null),G.length=0,F=0;we.length;)we.pop()();for(let e=0;e<J.length;e+=1){const s=J[e];le.has(s)||(le.add(s),s())}J.length=0}while(G.length);for(;ke.length;)ke.pop()();ue=!1,le.clear(),X(t)}function ot(t){if(t.fragment!==null){t.update(),B(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(re)}}function lt(t){const e=[],s=[];J.forEach(n=>t.indexOf(n)===-1?e.push(n):s.push(n)),s.forEach(n=>n()),J=e}let U;function it(){return U||(U=Promise.resolve(),U.then(()=>{U=null})),U}function ve(t,e,s){t.dispatchEvent(xe(`${e?"intro":"outro"}${s}`))}const Z=new Set;let D;function he(){D={r:0,c:[],p:D}}function pe(){D.r||B(D.c),D=D.p}function z(t,e){t&&t.i&&(Z.delete(t),t.i(e))}function O(t,e,s,n){if(t&&t.o){if(Z.has(t))return;Z.add(t),D.c.push(()=>{Z.delete(t),n&&(s&&t.d(1),n())}),t.o(e)}else n&&n()}const ut={duration:0};function ct(t,e,s){const n={direction:"out"};let o=e(t,s,n),r=!0,i;const m=D;m.r+=1;function c(){const{delay:l=0,duration:u=300,easing:f=je,tick:a=k,css:h}=o||ut;h&&(i=Xe(t,1,0,u,l,f,h));const v=Ge()+l,C=v+u;re(()=>ve(t,!1,"start")),Ke(d=>{if(r){if(d>=C)return a(0,1),ve(t,!1,"end"),--m.r||B(m.c),!1;if(d>=v){const q=f((d-v)/u);a(1-q,q)}}return r})}return ce(o)?it().then(()=>{o=o(n),c()}):c(),{end(l){l&&o.tick&&o.tick(1,0),r&&(i&&Ye(t,i),r=!1)}}}const ft=["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"];[...ft];function M(t){t&&t.c()}function j(t,e,s,n){const{fragment:o,after_update:r}=t.$$;o&&o.m(e,s),n||re(()=>{const i=t.$$.on_mount.map(Ae).filter(ce);t.$$.on_destroy?t.$$.on_destroy.push(...i):B(i),t.$$.on_mount=[]}),r.forEach(re)}function A(t,e){const s=t.$$;s.fragment!==null&&(lt(s.after_update),B(s.on_destroy),s.fragment&&s.fragment.d(e),s.on_destroy=s.fragment=null,s.ctx=[])}function at(t,e){t.$$.dirty[0]===-1&&(G.push(t),rt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function I(t,e,s,n,o,r,i,m=[-1]){const c=Y;X(t);const l=t.$$={fragment:null,ctx:[],props:r,update:k,not_equal:o,bound:ye(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:ye(),dirty:m,skip_bound:!1,root:e.target||c.$$.root};i&&i(l.root);let u=!1;if(l.ctx=s?s(t,e.props||{},(f,a,...h)=>{const v=h.length?h[0]:a;return l.ctx&&o(l.ctx[f],l.ctx[f]=v)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](v),u&&at(t,f)),a}):[],l.update(),u=!0,B(l.before_update),l.fragment=n?n(l.ctx):!1,e.target){if(e.hydrate){const f=Qe(e.target);l.fragment&&l.fragment.l(f),f.forEach(g)}else l.fragment&&l.fragment.c();e.intro&&z(t.$$.fragment),j(t,e.target,e.anchor,e.customElement),Ie()}X(c)}class R{$destroy(){A(this,1),this.$destroy=k}$on(e,s){if(!ce(s))return k;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(s),()=>{const o=n.indexOf(s);o!==-1&&n.splice(o,1)}}$set(e){this.$$set&&!Fe(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function mt(t,{delay:e=0,duration:s=400,easing:n=je}={}){const o=+getComputedStyle(t).opacity;return{delay:e,duration:s,easing:n,css:r=>`opacity: ${r*o}`}}function _t(t){let e,s,n=t[2][t[0]]+"",o,r,i,m,c;return{c(){e=$("div"),s=$("span"),o=L(n),r=L(t[1]),w(s,"class","svelte-1ngtdr9"),w(e,"class",i=be(t[0])+" svelte-1ngtdr9")},m(l,u){y(l,e,u),b(e,s),b(s,o),b(e,r),c=!0},p(l,[u]){(!c||u&1)&&n!==(n=l[2][l[0]]+"")&&te(o,n),(!c||u&2)&&te(r,l[1]),(!c||u&1&&i!==(i=be(l[0])+" svelte-1ngtdr9"))&&w(e,"class",i)},i(l){c||(m&&m.end(1),c=!0)},o(l){m=ct(e,mt,{duration:250}),c=!1},d(l){l&&g(e),l&&m&&m.end()}}}function ht(t,e,s){let{category:n,message:o}=e;const r={warning:"Warning: ",error:"Error: ",success:"Success: "};return t.$$set=i=>{"category"in i&&s(0,n=i.category),"message"in i&&s(1,o=i.message)},[n,o,r]}class Re extends R{constructor(e){super(),I(this,e,ht,_t,x,{category:0,message:1})}}const H=[];function pt(t,e=k){let s;const n=new Set;function o(m){if(x(t,m)&&(t=m,s)){const c=!H.length;for(const l of n)l[1](),H.push(l,t);if(c){for(let l=0;l<H.length;l+=2)H[l][0](H[l+1]);H.length=0}}}function r(m){o(m(t))}function i(m,c=k){const l=[m,c];return n.add(l),n.size===1&&(s=e(o)||k),m(t),()=>{n.delete(l),n.size===0&&s&&(s(),s=null)}}return{set:o,update:r,subscribe:i}}const T=pt({stock:null,size:null,batch:null,unique_parents:null,letter:null});function dt(t){let e,s,n,o;return{c(){e=$("button"),s=L(t[0])},m(r,i){y(r,e,i),b(e,s),n||(o=ee(e,"click",t[1]),n=!0)},p(r,[i]){i&1&&te(s,r[0])},i:k,o:k,d(r){r&&g(e),n=!1,o()}}}function gt(t,e,s){let{title:n}=e;const o=Be(),r=()=>o("next");return t.$$set=i=>{"title"in i&&s(0,n=i.title)},[n,r]}class de extends R{constructor(e){super(),I(this,e,gt,dt,x,{title:0})}}function Ee(t){let e,s;return e=new Re({props:{category:t[1].category,message:t[1].message}}),{c(){M(e.$$.fragment)},m(n,o){j(e,n,o),s=!0},p(n,o){const r={};o&2&&(r.category=n[1].category),o&2&&(r.message=n[1].message),e.$set(r)},i(n){s||(z(e.$$.fragment,n),s=!0)},o(n){O(e.$$.fragment,n),s=!1},d(n){A(e,n)}}}function yt(t){let e,s,n,o,r,i,m,c,l,u;r=new de({props:{title:"Generate Batch"}}),r.$on("next",t[2]);let f=t[1].show&&Ee(t);return{c(){e=$("input"),s=S(),n=$("input"),o=S(),M(r.$$.fragment),i=S(),f&&f.c(),m=me(),w(e,"type","text"),w(e,"placeholder","Stock ID"),e.required=!0,w(e,"class","svelte-1i0rgby"),w(n,"type","number"),w(n,"placeholder","Number of Pairs"),n.required=!0,w(n,"class","svelte-1i0rgby")},m(a,h){y(a,e,h),K(e,t[0].stock),y(a,s,h),y(a,n,h),K(n,t[0].size),y(a,o,h),j(r,a,h),y(a,i,h),f&&f.m(a,h),y(a,m,h),c=!0,l||(u=[ee(e,"input",t[3]),ee(n,"input",t[4])],l=!0)},p(a,[h]){h&1&&e.value!==a[0].stock&&K(e,a[0].stock),h&1&&Me(n.value)!==a[0].size&&K(n,a[0].size),a[1].show?f?(f.p(a,h),h&2&&z(f,1)):(f=Ee(a),f.c(),z(f,1),f.m(m.parentNode,m)):f&&(he(),O(f,1,1,()=>{f=null}),pe())},i(a){c||(z(r.$$.fragment,a),z(f),c=!0)},o(a){O(r.$$.fragment,a),O(f),c=!1},d(a){a&&g(e),a&&g(s),a&&g(n),a&&g(o),A(r,a),a&&g(i),f&&f.d(a),a&&g(m),l=!1,B(u)}}}function bt(t,e,s){let n;fe(t,T,f=>s(5,n=f));const o={stock:null,size:null},r={category:null,message:null,show:!1},i=_e("eel"),m=Be(),c=async()=>{const f={stock:{result:o.stock!==null&&o.stock.length!==0,message:"Stock ID is missing."},size:{result:o.size!==null&&o.size>0,message:"Number of pairs must be greater than or equal to 1."}};if(!(f.stock.result&&f.size.result)){s(1,r.category="warning",r),s(1,r.message=f.stock.result?f.size.message:f.stock.message,r),s(1,r.show=!0,r),setTimeout(()=>s(1,r.show=!1,r),2500);return}const a=await i.assemble(o.stock,o.size)();if(a.batch.length===0){s(1,r.category="error",r),s(1,r.message=`Could not generate any pairs for the stock: ${o.stock}.`,r),s(1,r.show=!0,r),setTimeout(()=>s(1,r.show=!1,r),2500);return}V(T,n.stock=o.stock,n),V(T,n.size=o.size,n),V(T,n.batch=a.batch,n),V(T,n.unique_parents=a.unique_parents,n),m("next")};function l(){o.stock=this.value,s(0,o)}function u(){o.size=Me(this.value),s(0,o)}return[o,r,c,l,u]}class $t extends R{constructor(e){super(),I(this,e,bt,yt,x,{})}}function ze(t,e,s){const n=t.slice();return n[4]=e[s],n[6]=s,n}function qe(t,e,s){const n=t.slice();return n[7]=e[s],n}function Ne(t,e,s){const n=t.slice();return n[10]=e[s],n}function Se(t){let e,s=t[10]+"",n;return{c(){e=$("th"),n=L(s),w(e,"class","svelte-2nne3z")},m(o,r){y(o,e,r),b(e,n)},p:k,d(o){o&&g(e)}}}function Oe(t){let e,s=t[7]+"",n;return{c(){e=$("td"),n=L(s),w(e,"class","svelte-2nne3z")},m(o,r){y(o,e,r),b(e,n)},p:k,d(o){o&&g(e)}}}function Ce(t){let e,s,n=t[6]+1+"",o,r,i,m,c=Object.values(t[4]),l=[];for(let u=0;u<c.length;u+=1)l[u]=Oe(qe(t,c,u));return{c(){e=$("tr"),s=$("td"),o=L(n),r=$("span"),r.textContent=":",i=S();for(let u=0;u<l.length;u+=1)l[u].c();m=S(),w(r,"class","svelte-2nne3z"),w(s,"class","svelte-2nne3z")},m(u,f){y(u,e,f),b(e,s),b(s,o),b(s,r),b(e,i);for(let a=0;a<l.length;a+=1)l[a]&&l[a].m(e,null);b(e,m)},p(u,f){if(f&2){c=Object.values(u[4]);let a;for(a=0;a<c.length;a+=1){const h=qe(u,c,a);l[a]?l[a].p(h,f):(l[a]=Oe(h),l[a].c(),l[a].m(e,m))}for(;a<l.length;a+=1)l[a].d(1);l.length=c.length}},d(u){u&&g(e),ie(l,u)}}}function wt(t){var ge;let e,s=((ge=t[0].letter)==null?void 0:ge.status)+"",n,o,r,i,m,c,l,u,f,a,h,v,C=Object.keys(t[1][0]),d=[];for(let _=0;_<C.length;_+=1)d[_]=Se(Ne(t,C,_));let q=t[1],E=[];for(let _=0;_<q.length;_+=1)E[_]=Ce(ze(t,q,_));return h=new de({props:{title:"Continue"}}),h.$on("next",t[2]),{c(){e=$("h3"),n=L(s),o=S(),r=$("table"),i=$("thead"),m=$("tr"),c=$("th"),l=S();for(let _=0;_<d.length;_+=1)d[_].c();u=S(),f=$("tbody");for(let _=0;_<E.length;_+=1)E[_].c();a=S(),M(h.$$.fragment),w(c,"class","svelte-2nne3z")},m(_,P){y(_,e,P),b(e,n),y(_,o,P),y(_,r,P),b(r,i),b(i,m),b(m,c),b(m,l);for(let N=0;N<d.length;N+=1)d[N]&&d[N].m(m,null);b(r,u),b(r,f);for(let N=0;N<E.length;N+=1)E[N]&&E[N].m(f,null);y(_,a,P),j(h,_,P),v=!0},p(_,[P]){var N;if((!v||P&1)&&s!==(s=((N=_[0].letter)==null?void 0:N.status)+"")&&te(n,s),P&2){C=Object.keys(_[1][0]);let p;for(p=0;p<C.length;p+=1){const Q=Ne(_,C,p);d[p]?d[p].p(Q,P):(d[p]=Se(Q),d[p].c(),d[p].m(m,null))}for(;p<d.length;p+=1)d[p].d(1);d.length=C.length}if(P&2){q=_[1];let p;for(p=0;p<q.length;p+=1){const Q=ze(_,q,p);E[p]?E[p].p(Q,P):(E[p]=Ce(Q),E[p].c(),E[p].m(f,null))}for(;p<E.length;p+=1)E[p].d(1);E.length=q.length}},i(_){v||(z(h.$$.fragment,_),v=!0)},o(_){O(h.$$.fragment,_),v=!1},d(_){_&&g(e),_&&g(o),_&&g(r),ie(d,_),ie(E,_),_&&g(a),A(h,_)}}}function kt(t,e,s){let n;fe(t,T,m=>s(0,n=m));const o=_e("eel");et(async()=>{const m=[n.stock,n.batch.length,n.size,n.batch,n.unique_parents],c=await o.display(...m)();V(T,n.letter=c,n)});const r=n.batch;function i(m){nt.call(this,t,m)}return[n,r,i]}class vt extends R{constructor(e){super(),I(this,e,kt,wt,x,{})}}function Pe(t){let e,s;return e=new Re({props:{category:t[1].category,message:t[1].message}}),{c(){M(e.$$.fragment)},m(n,o){j(e,n,o),s=!0},p(n,o){const r={};o&2&&(r.category=n[1].category),o&2&&(r.message=n[1].message),e.$set(r)},i(n){s||(z(e.$$.fragment,n),s=!0)},o(n){O(e.$$.fragment,n),s=!1},d(n){A(e,n)}}}function Et(t){let e,s,n,o,r,i,m,c;n=new de({props:{title:"Send Email"}}),n.$on("next",t[2]);let l=t[1].show&&Pe(t);return{c(){e=$("input"),s=S(),M(n.$$.fragment),o=S(),l&&l.c(),r=me(),w(e,"type","email"),w(e,"placeholder","Email Address"),e.required=!0,w(e,"class","svelte-1oywla6")},m(u,f){y(u,e,f),K(e,t[0]),y(u,s,f),j(n,u,f),y(u,o,f),l&&l.m(u,f),y(u,r,f),i=!0,m||(c=ee(e,"input",t[3]),m=!0)},p(u,[f]){f&1&&e.value!==u[0]&&K(e,u[0]),u[1].show?l?(l.p(u,f),f&2&&z(l,1)):(l=Pe(u),l.c(),z(l,1),l.m(r.parentNode,r)):l&&(he(),O(l,1,1,()=>{l=null}),pe())},i(u){i||(z(n.$$.fragment,u),z(l),i=!0)},o(u){O(n.$$.fragment,u),O(l),i=!1},d(u){u&&g(e),u&&g(s),A(n,u),u&&g(o),l&&l.d(u),u&&g(r),m=!1,c()}}}function zt(t,e,s){let n;fe(t,T,l=>s(4,n=l));let o=localStorage.getItem("address")??"";const r={category:null,message:null,show:!1},i=_e("eel"),m=async()=>{const l={empty:{result:o.length!==0,message:"Email address is missing."},format:{result:o.includes("@")&&o.includes("."),message:"Email address is not valid."}};if(!(l.empty.result&&l.format.result)){s(1,r.category="warning",r),s(1,r.message=l.empty.result?l.format.message:l.empty.message,r),s(1,r.show=!0,r),setTimeout(()=>s(1,r.show=!1,r),2500);return}if(localStorage.setItem("address",o),await i.send(n.stock,n.batch.length,n.size,n.batch,n.unique_parents,o)()===!1){s(1,r.category="error",r),s(1,r.message=`Email could not be sent to ${o}.`,r),s(1,r.show=!0,r),setTimeout(()=>s(1,r.show=!1,r),2500);return}s(1,r.category="success",r),s(1,r.message=`Email was sent to ${o}.`,r),s(1,r.show=!0,r),setTimeout(()=>s(1,r.show=!1,r),2500)};function c(){o=this.value,s(0,o)}return[o,r,m,c]}class qt extends R{constructor(e){super(),I(this,e,zt,Et,x,{})}}function Nt(t){let e;return{c(){e=$("header"),e.innerHTML=`<h1 class="svelte-1jsnvtf">Mating-Pair Selection Algorithm</h1> 
    <h2 class="svelte-1jsnvtf">Peromyscus Genetic Stock Center</h2>`,w(e,"class","svelte-1jsnvtf")},m(s,n){y(s,e,n)},p:k,i:k,o:k,d(s){s&&g(e)}}}class St extends R{constructor(e){super(),I(this,e,null,Nt,x,{})}}function Ot(t){let e,s,n,o,r;e=new St({});var i=t[1][t[0]];function m(c){return{}}return i&&(n=$e(i,m()),n.$on("next",t[3])),{c(){M(e.$$.fragment),s=S(),n&&M(n.$$.fragment),o=me()},m(c,l){j(e,c,l),y(c,s,l),n&&j(n,c,l),y(c,o,l),r=!0},p(c,[l]){if(l&1&&i!==(i=c[1][c[0]])){if(n){he();const u=n;O(u.$$.fragment,1,0,()=>{A(u,1)}),pe()}i?(n=$e(i,m()),n.$on("next",c[3]),M(n.$$.fragment),z(n.$$.fragment,1),j(n,o.parentNode,o)):n=null}},i(c){r||(z(e.$$.fragment,c),n&&z(n.$$.fragment,c),r=!0)},o(c){O(e.$$.fragment,c),n&&O(n.$$.fragment,c),r=!1},d(c){A(e,c),c&&g(s),c&&g(o),n&&A(n,c)}}}function Ct(t,e,s){let{eel:n}=e;tt("eel",n);const o=[$t,vt,qt];let r=0;const i=()=>s(0,++r);return t.$$set=m=>{"eel"in m&&s(2,n=m.eel)},[r,o,n,i]}class Pt extends R{constructor(e){super(),I(this,e,Ct,Ot,x,{eel:2})}}new Pt({target:document.querySelector("#app"),props:{eel}});
