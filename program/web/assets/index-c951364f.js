(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();function v(){}const Pe=t=>t;function je(t){return t()}function pe(){return Object.create(null)}function D(t){t.forEach(je)}function ue(t){return typeof t=="function"}function B(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Re(t){return Object.keys(t).length===0}function Fe(t,...e){if(t==null)return v;const s=t.subscribe(...e);return s.unsubscribe?()=>s.unsubscribe():s}function ce(t,e,s){t.$$.on_destroy.push(Fe(e,s))}function ge(t){return t??""}function U(t,e,s){return t.set(s),e}const Ae=typeof window<"u";let He=Ae?()=>window.performance.now():()=>Date.now(),fe=Ae?t=>requestAnimationFrame(t):v;const K=new Set;function xe(t){K.forEach(e=>{e.c(t)||(K.delete(e),e.f())}),K.size!==0&&fe(xe)}function Ge(t){let e;return K.size===0&&fe(xe),{promise:new Promise(s=>{K.add(e={c:t,f:s})}),abort(){K.delete(e)}}}function $(t,e){t.appendChild(e)}function Le(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Ke(t){const e=k("style");return We(Le(t),e),e.sheet}function We(t,e){return $(t.head||t,e),e.sheet}function b(t,e,s){t.insertBefore(e,s||null)}function y(t){t.parentNode&&t.parentNode.removeChild(t)}function le(t,e){for(let s=0;s<t.length;s+=1)t[s]&&t[s].d(e)}function k(t){return document.createElement(t)}function j(t){return document.createTextNode(t)}function q(){return j(" ")}function ae(){return j("")}function Z(t,e,s,n){return t.addEventListener(e,s,n),()=>t.removeEventListener(e,s,n)}function w(t,e,s){s==null?t.removeAttribute(e):t.getAttribute(e)!==s&&t.setAttribute(e,s)}function Te(t){return t===""?null:+t}function Je(t){return Array.from(t.childNodes)}function ee(t,e){e=""+e,t.data!==e&&(t.data=e)}function G(t,e){t.value=e??""}function Be(t,e,{bubbles:s=!1,cancelable:n=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,s,n,e),r}function ye(t,e){return new t(e)}const te=new Map;let ne=0;function Qe(t){let e=5381,s=t.length;for(;s--;)e=(e<<5)-e^t.charCodeAt(s);return e>>>0}function Ue(t,e){const s={stylesheet:Ke(e),rules:{}};return te.set(t,s),s}function Ve(t,e,s,n,r,o,f,m=0){const c=16.666/n;let l=`{
`;for(let g=0;g<=1;g+=c){const A=e+(s-e)*o(g);l+=g*100+`%{${f(A,1-A)}}
`}const u=l+`100% {${f(s,1-s)}}
}`,a=`__svelte_${Qe(u)}_${m}`,i=Le(t),{stylesheet:d,rules:h}=te.get(i)||Ue(i,t);h[a]||(h[a]=!0,d.insertRule(`@keyframes ${a} ${u}`,d.cssRules.length));const S=t.style.animation||"";return t.style.animation=`${S?`${S}, `:""}${a} ${n}ms linear ${r}ms 1 both`,ne+=1,a}function Xe(t,e){const s=(t.style.animation||"").split(", "),n=s.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),r=s.length-n.length;r&&(t.style.animation=n.join(", "),ne-=r,ne||Ye())}function Ye(){fe(()=>{ne||(te.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&y(e)}),te.clear())})}let X;function V(t){X=t}function re(){if(!X)throw new Error("Function called outside component initialization");return X}function Ze(t){re().$$.on_mount.push(t)}function De(){const t=re();return(e,s,{cancelable:n=!1}={})=>{const r=t.$$.callbacks[e];if(r){const o=Be(e,s,{cancelable:n});return r.slice().forEach(f=>{f.call(t,o)}),!o.defaultPrevented}return!0}}function et(t,e){return re().$$.context.set(t,e),e}function me(t){return re().$$.context.get(t)}function tt(t,e){const s=t.$$.callbacks[e.type];s&&s.slice().forEach(n=>n.call(this,e))}const H=[],be=[];let W=[];const $e=[],nt=Promise.resolve();let ie=!1;function st(){ie||(ie=!0,nt.then(Me))}function se(t){W.push(t)}const oe=new Set;let R=0;function Me(){if(R!==0)return;const t=X;do{try{for(;R<H.length;){const e=H[R];R++,V(e),rt(e.$$)}}catch(e){throw H.length=0,R=0,e}for(V(null),H.length=0,R=0;be.length;)be.pop()();for(let e=0;e<W.length;e+=1){const s=W[e];oe.has(s)||(oe.add(s),s())}W.length=0}while(H.length);for(;$e.length;)$e.pop()();ie=!1,oe.clear(),V(t)}function rt(t){if(t.fragment!==null){t.update(),D(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(se)}}function ot(t){const e=[],s=[];W.forEach(n=>t.indexOf(n)===-1?e.push(n):s.push(n)),s.forEach(n=>n()),W=e}let Q;function lt(){return Q||(Q=Promise.resolve(),Q.then(()=>{Q=null})),Q}function we(t,e,s){t.dispatchEvent(Be(`${e?"intro":"outro"}${s}`))}const Y=new Set;let L;function _e(){L={r:0,c:[],p:L}}function de(){L.r||D(L.c),L=L.p}function E(t,e){t&&t.i&&(Y.delete(t),t.i(e))}function N(t,e,s,n){if(t&&t.o){if(Y.has(t))return;Y.add(t),L.c.push(()=>{Y.delete(t),n&&(s&&t.d(1),n())}),t.o(e)}else n&&n()}const it={duration:0};function ut(t,e,s){const n={direction:"out"};let r=e(t,s,n),o=!0,f;const m=L;m.r+=1;function c(){const{delay:l=0,duration:u=300,easing:a=Pe,tick:i=v,css:d}=r||it;d&&(f=Ve(t,1,0,u,l,a,d));const h=He()+l,S=h+u;se(()=>we(t,!1,"start")),Ge(g=>{if(o){if(g>=S)return i(0,1),we(t,!1,"end"),--m.r||D(m.c),!1;if(g>=h){const A=a((g-h)/u);i(1-A,A)}}return o})}return ue(r)?lt().then(()=>{r=r(n),c()}):c(),{end(l){l&&r.tick&&r.tick(1,0),o&&(f&&Xe(t,f),o=!1)}}}const ct=["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"];[...ct];function T(t){t&&t.c()}function C(t,e,s,n){const{fragment:r,after_update:o}=t.$$;r&&r.m(e,s),n||se(()=>{const f=t.$$.on_mount.map(je).filter(ue);t.$$.on_destroy?t.$$.on_destroy.push(...f):D(f),t.$$.on_mount=[]}),o.forEach(se)}function P(t,e){const s=t.$$;s.fragment!==null&&(ot(s.after_update),D(s.on_destroy),s.fragment&&s.fragment.d(e),s.on_destroy=s.fragment=null,s.ctx=[])}function ft(t,e){t.$$.dirty[0]===-1&&(H.push(t),st(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function M(t,e,s,n,r,o,f,m=[-1]){const c=X;V(t);const l=t.$$={fragment:null,ctx:[],props:o,update:v,not_equal:r,bound:pe(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:pe(),dirty:m,skip_bound:!1,root:e.target||c.$$.root};f&&f(l.root);let u=!1;if(l.ctx=s?s(t,e.props||{},(a,i,...d)=>{const h=d.length?d[0]:i;return l.ctx&&r(l.ctx[a],l.ctx[a]=h)&&(!l.skip_bound&&l.bound[a]&&l.bound[a](h),u&&ft(t,a)),i}):[],l.update(),u=!0,D(l.before_update),l.fragment=n?n(l.ctx):!1,e.target){if(e.hydrate){const a=Je(e.target);l.fragment&&l.fragment.l(a),a.forEach(y)}else l.fragment&&l.fragment.c();e.intro&&E(t.$$.fragment),C(t,e.target,e.anchor,e.customElement),Me()}V(c)}class I{$destroy(){P(this,1),this.$destroy=v}$on(e,s){if(!ue(s))return v;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(s),()=>{const r=n.indexOf(s);r!==-1&&n.splice(r,1)}}$set(e){this.$$set&&!Re(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function at(t,{delay:e=0,duration:s=400,easing:n=Pe}={}){const r=+getComputedStyle(t).opacity;return{delay:e,duration:s,easing:n,css:o=>`opacity: ${o*r}`}}function mt(t){let e,s,n=t[2][t[0]]+"",r,o,f,m,c;return{c(){e=k("div"),s=k("span"),r=j(n),o=j(t[1]),w(s,"class","svelte-1ngtdr9"),w(e,"class",f=ge(t[0])+" svelte-1ngtdr9")},m(l,u){b(l,e,u),$(e,s),$(s,r),$(e,o),c=!0},p(l,[u]){(!c||u&1)&&n!==(n=l[2][l[0]]+"")&&ee(r,n),(!c||u&2)&&ee(o,l[1]),(!c||u&1&&f!==(f=ge(l[0])+" svelte-1ngtdr9"))&&w(e,"class",f)},i(l){c||(m&&m.end(1),c=!0)},o(l){m=ut(e,at,{duration:250}),c=!1},d(l){l&&y(e),l&&m&&m.end()}}}function _t(t,e,s){let{category:n,message:r}=e;const o={warning:"Warning: ",error:"Error: ",success:"Success: "};return t.$$set=f=>{"category"in f&&s(0,n=f.category),"message"in f&&s(1,r=f.message)},[n,r,o]}class Ie extends I{constructor(e){super(),M(this,e,_t,mt,B,{category:0,message:1})}}const F=[];function dt(t,e=v){let s;const n=new Set;function r(m){if(B(t,m)&&(t=m,s)){const c=!F.length;for(const l of n)l[1](),F.push(l,t);if(c){for(let l=0;l<F.length;l+=2)F[l][0](F[l+1]);F.length=0}}}function o(m){r(m(t))}function f(m,c=v){const l=[m,c];return n.add(l),n.size===1&&(s=e(r)||v),m(t),()=>{n.delete(l),n.size===0&&s&&(s(),s=null)}}return{set:r,update:o,subscribe:f}}const x=dt({stock:null,size:null,batch:null,unique_parents:null,letter:null});function ht(t){let e,s,n,r;return{c(){e=k("button"),s=j(t[0])},m(o,f){b(o,e,f),$(e,s),n||(r=Z(e,"click",t[1]),n=!0)},p(o,[f]){f&1&&ee(s,o[0])},i:v,o:v,d(o){o&&y(e),n=!1,r()}}}function pt(t,e,s){let{title:n}=e;const r=De(),o=()=>r("next");return t.$$set=f=>{"title"in f&&s(0,n=f.title)},[n,o]}class he extends I{constructor(e){super(),M(this,e,pt,ht,B,{title:0})}}function ke(t){let e,s;return e=new Ie({props:{category:t[1].category,message:t[1].message}}),{c(){T(e.$$.fragment)},m(n,r){C(e,n,r),s=!0},p(n,r){const o={};r&2&&(o.category=n[1].category),r&2&&(o.message=n[1].message),e.$set(o)},i(n){s||(E(e.$$.fragment,n),s=!0)},o(n){N(e.$$.fragment,n),s=!1},d(n){P(e,n)}}}function gt(t){let e,s,n,r,o,f,m,c,l,u;o=new he({props:{title:"Generate Batch"}}),o.$on("next",t[2]);let a=t[1].show&&ke(t);return{c(){e=k("input"),s=q(),n=k("input"),r=q(),T(o.$$.fragment),f=q(),a&&a.c(),m=ae(),w(e,"type","text"),w(e,"placeholder","Stock ID"),e.required=!0,w(e,"class","svelte-1i0rgby"),w(n,"type","number"),w(n,"placeholder","Number of Pairs"),n.required=!0,w(n,"class","svelte-1i0rgby")},m(i,d){b(i,e,d),G(e,t[0].stock),b(i,s,d),b(i,n,d),G(n,t[0].size),b(i,r,d),C(o,i,d),b(i,f,d),a&&a.m(i,d),b(i,m,d),c=!0,l||(u=[Z(e,"input",t[3]),Z(n,"input",t[4])],l=!0)},p(i,[d]){d&1&&e.value!==i[0].stock&&G(e,i[0].stock),d&1&&Te(n.value)!==i[0].size&&G(n,i[0].size),i[1].show?a?(a.p(i,d),d&2&&E(a,1)):(a=ke(i),a.c(),E(a,1),a.m(m.parentNode,m)):a&&(_e(),N(a,1,1,()=>{a=null}),de())},i(i){c||(E(o.$$.fragment,i),E(a),c=!0)},o(i){N(o.$$.fragment,i),N(a),c=!1},d(i){i&&y(e),i&&y(s),i&&y(n),i&&y(r),P(o,i),i&&y(f),a&&a.d(i),i&&y(m),l=!1,D(u)}}}function yt(t,e,s){let n;ce(t,x,a=>s(5,n=a));const r={stock:null,size:null},o={category:null,message:null,show:!1},f=me("eel"),m=De(),c=async()=>{const a={both:{result:r.stock!==null||r.size!==null,message:"Both fields are required."},stock:{result:r.stock!==null&&r.stock.length!==0,message:"Stock ID is required."},size:{result:r.size!==null&&r.size>0,message:"Number of pairs must be greater than or equal to 1."}};if(!(a.stock.result&&a.size.result)){s(1,o.category="warning",o),s(1,o.message=a.both?a.stock.result?a.size.message:a.stock.message:a.both.message,o),s(1,o.show=!0,o),setTimeout(()=>s(1,o.show=!1,o),2500);return}const i=await f.assemble(r.stock,r.size)();if(i.batch.length===0){s(1,o.category="error",o),s(1,o.message=`Could not generate any pairs for the stock: ${r.stock}.`,o),s(1,o.show=!0,o),setTimeout(()=>s(1,o.show=!1,o),2500);return}U(x,n.stock=r.stock,n),U(x,n.size=r.size,n),U(x,n.batch=i.batch,n),U(x,n.unique_parents=i.unique_parents,n),m("next")};function l(){r.stock=this.value,s(0,r)}function u(){r.size=Te(this.value),s(0,r)}return[r,o,c,l,u]}class bt extends I{constructor(e){super(),M(this,e,yt,gt,B,{})}}function ve(t,e,s){const n=t.slice();return n[4]=e[s],n[6]=s,n}function Ee(t,e,s){const n=t.slice();return n[7]=e[s],n}function ze(t,e,s){const n=t.slice();return n[10]=e[s],n}function qe(t){let e,s=t[0].letter.status+"",n;return{c(){e=k("h3"),n=j(s),w(e,"class","svelte-2yoxz4")},m(r,o){b(r,e,o),$(e,n)},p(r,o){o&1&&s!==(s=r[0].letter.status+"")&&ee(n,s)},d(r){r&&y(e)}}}function Ne(t){let e,s=t[10]+"",n;return{c(){e=k("th"),n=j(s),w(e,"class","svelte-2yoxz4")},m(r,o){b(r,e,o),$(e,n)},p:v,d(r){r&&y(e)}}}function Se(t){let e,s=t[7]+"",n;return{c(){e=k("td"),n=j(s),w(e,"class","svelte-2yoxz4")},m(r,o){b(r,e,o),$(e,n)},p:v,d(r){r&&y(e)}}}function Oe(t){let e,s,n=t[6]+1+"",r,o,f,m,c=Object.values(t[4]),l=[];for(let u=0;u<c.length;u+=1)l[u]=Se(Ee(t,c,u));return{c(){e=k("tr"),s=k("td"),r=j(n),o=k("span"),o.textContent=":",f=q();for(let u=0;u<l.length;u+=1)l[u].c();m=q(),w(o,"class","svelte-2yoxz4"),w(s,"class","svelte-2yoxz4")},m(u,a){b(u,e,a),$(e,s),$(s,r),$(s,o),$(e,f);for(let i=0;i<l.length;i+=1)l[i]&&l[i].m(e,null);$(e,m)},p(u,a){if(a&2){c=Object.values(u[4]);let i;for(i=0;i<c.length;i+=1){const d=Ee(u,c,i);l[i]?l[i].p(d,a):(l[i]=Se(d),l[i].c(),l[i].m(e,m))}for(;i<l.length;i+=1)l[i].d(1);l.length=c.length}},d(u){u&&y(e),le(l,u)}}}function $t(t){var A;let e,s,n,r,o,f,m,c,l,u,a,i=((A=t[0].letter)==null?void 0:A.status)&&qe(t),d=Object.keys(t[1][0]),h=[];for(let _=0;_<d.length;_+=1)h[_]=Ne(ze(t,d,_));let S=t[1],g=[];for(let _=0;_<S.length;_+=1)g[_]=Oe(ve(t,S,_));return u=new he({props:{title:"Continue"}}),u.$on("next",t[2]),{c(){i&&i.c(),e=q(),s=k("table"),n=k("thead"),r=k("tr"),o=k("th"),f=q();for(let _=0;_<h.length;_+=1)h[_].c();m=q(),c=k("tbody");for(let _=0;_<g.length;_+=1)g[_].c();l=q(),T(u.$$.fragment),w(o,"class","svelte-2yoxz4")},m(_,O){i&&i.m(_,O),b(_,e,O),b(_,s,O),$(s,n),$(n,r),$(r,o),$(r,f);for(let z=0;z<h.length;z+=1)h[z]&&h[z].m(r,null);$(s,m),$(s,c);for(let z=0;z<g.length;z+=1)g[z]&&g[z].m(c,null);b(_,l,O),C(u,_,O),a=!0},p(_,[O]){var z;if((z=_[0].letter)!=null&&z.status?i?i.p(_,O):(i=qe(_),i.c(),i.m(e.parentNode,e)):i&&(i.d(1),i=null),O&2){d=Object.keys(_[1][0]);let p;for(p=0;p<d.length;p+=1){const J=ze(_,d,p);h[p]?h[p].p(J,O):(h[p]=Ne(J),h[p].c(),h[p].m(r,null))}for(;p<h.length;p+=1)h[p].d(1);h.length=d.length}if(O&2){S=_[1];let p;for(p=0;p<S.length;p+=1){const J=ve(_,S,p);g[p]?g[p].p(J,O):(g[p]=Oe(J),g[p].c(),g[p].m(c,null))}for(;p<g.length;p+=1)g[p].d(1);g.length=S.length}},i(_){a||(E(u.$$.fragment,_),a=!0)},o(_){N(u.$$.fragment,_),a=!1},d(_){i&&i.d(_),_&&y(e),_&&y(s),le(h,_),le(g,_),_&&y(l),P(u,_)}}}function wt(t,e,s){let n;ce(t,x,m=>s(0,n=m));const r=me("eel");Ze(async()=>{const m=[n.stock,n.batch.length,n.size,n.batch,n.unique_parents],c=await r.display(...m)();U(x,n.letter=c,n)});const o=n.batch;function f(m){tt.call(this,t,m)}return[n,o,f]}class kt extends I{constructor(e){super(),M(this,e,wt,$t,B,{})}}function Ce(t){let e,s;return e=new Ie({props:{category:t[1].category,message:t[1].message}}),{c(){T(e.$$.fragment)},m(n,r){C(e,n,r),s=!0},p(n,r){const o={};r&2&&(o.category=n[1].category),r&2&&(o.message=n[1].message),e.$set(o)},i(n){s||(E(e.$$.fragment,n),s=!0)},o(n){N(e.$$.fragment,n),s=!1},d(n){P(e,n)}}}function vt(t){let e,s,n,r,o,f,m,c;n=new he({props:{title:"Send Email"}}),n.$on("next",t[2]);let l=t[1].show&&Ce(t);return{c(){e=k("input"),s=q(),T(n.$$.fragment),r=q(),l&&l.c(),o=ae(),w(e,"type","email"),w(e,"placeholder","Email Address"),e.required=!0,w(e,"class","svelte-1oywla6")},m(u,a){b(u,e,a),G(e,t[0]),b(u,s,a),C(n,u,a),b(u,r,a),l&&l.m(u,a),b(u,o,a),f=!0,m||(c=Z(e,"input",t[3]),m=!0)},p(u,[a]){a&1&&e.value!==u[0]&&G(e,u[0]),u[1].show?l?(l.p(u,a),a&2&&E(l,1)):(l=Ce(u),l.c(),E(l,1),l.m(o.parentNode,o)):l&&(_e(),N(l,1,1,()=>{l=null}),de())},i(u){f||(E(n.$$.fragment,u),E(l),f=!0)},o(u){N(n.$$.fragment,u),N(l),f=!1},d(u){u&&y(e),u&&y(s),P(n,u),u&&y(r),l&&l.d(u),u&&y(o),m=!1,c()}}}function Et(t,e,s){let n;ce(t,x,l=>s(4,n=l));let r=localStorage.getItem("address")??"";const o={category:null,message:null,show:!1},f=me("eel"),m=async()=>{const l={empty:{result:r.length!==0,message:"Email address is required."},format:{result:r.includes("@")&&r.includes("."),message:"Email address is not valid."}};if(!(l.empty.result&&l.format.result)){s(1,o.category="warning",o),s(1,o.message=l.empty.result?l.format.message:l.empty.message,o),s(1,o.show=!0,o),setTimeout(()=>s(1,o.show=!1,o),2500);return}if(localStorage.setItem("address",r),await f.send(n.letter.header,n.letter.status,n.letter.schema,n.letter.message,n.batch,r)()===!1){s(1,o.category="error",o),s(1,o.message=`Email could not be sent to ${r}.`,o),s(1,o.show=!0,o),setTimeout(()=>s(1,o.show=!1,o),2500);return}s(1,o.category="success",o),s(1,o.message=`Email was sent to ${r}.`,o),s(1,o.show=!0,o),setTimeout(()=>s(1,o.show=!1,o),2500)};function c(){r=this.value,s(0,r)}return[r,o,m,c]}class zt extends I{constructor(e){super(),M(this,e,Et,vt,B,{})}}function qt(t){let e;return{c(){e=k("header"),e.innerHTML=`<h1 class="svelte-1jsnvtf">Mating-Pair Selection Algorithm</h1> 
    <h2 class="svelte-1jsnvtf">Peromyscus Genetic Stock Center</h2>`,w(e,"class","svelte-1jsnvtf")},m(s,n){b(s,e,n)},p:v,i:v,o:v,d(s){s&&y(e)}}}class Nt extends I{constructor(e){super(),M(this,e,null,qt,B,{})}}function St(t){let e,s,n,r,o;e=new Nt({});var f=t[1][t[0]];function m(c){return{}}return f&&(n=ye(f,m()),n.$on("next",t[3])),{c(){T(e.$$.fragment),s=q(),n&&T(n.$$.fragment),r=ae()},m(c,l){C(e,c,l),b(c,s,l),n&&C(n,c,l),b(c,r,l),o=!0},p(c,[l]){if(l&1&&f!==(f=c[1][c[0]])){if(n){_e();const u=n;N(u.$$.fragment,1,0,()=>{P(u,1)}),de()}f?(n=ye(f,m()),n.$on("next",c[3]),T(n.$$.fragment),E(n.$$.fragment,1),C(n,r.parentNode,r)):n=null}},i(c){o||(E(e.$$.fragment,c),n&&E(n.$$.fragment,c),o=!0)},o(c){N(e.$$.fragment,c),n&&N(n.$$.fragment,c),o=!1},d(c){P(e,c),c&&y(s),c&&y(r),n&&P(n,c)}}}function Ot(t,e,s){let{eel:n}=e;et("eel",n);const r=[bt,kt,zt];let o=0;const f=()=>s(0,++o);return t.$$set=m=>{"eel"in m&&s(2,n=m.eel)},[o,r,n,f]}class Ct extends I{constructor(e){super(),M(this,e,Ot,St,B,{eel:2})}}new Ct({target:document.querySelector("#app"),props:{eel}});
