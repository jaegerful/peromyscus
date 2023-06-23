(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();function v(){}const ze=t=>t;function Ne(t){return t()}function ae(){return Object.create(null)}function L(t){t.forEach(Ne)}function se(t){return typeof t=="function"}function j(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Te(t){return Object.keys(t).length===0}function De(t,...e){if(t==null)return v;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function re(t,e,n){t.$$.on_destroy.push(De(e,n))}function me(t){return t??""}function J(t,e,n){return t.set(n),e}const Se=typeof window<"u";let Be=Se?()=>window.performance.now():()=>Date.now(),oe=Se?t=>requestAnimationFrame(t):v;const R=new Set;function qe(t){R.forEach(e=>{e.c(t)||(R.delete(e),e.f())}),R.size!==0&&oe(qe)}function Ie(t){let e;return R.size===0&&oe(qe),{promise:new Promise(n=>{R.add(e={c:t,f:n})}),abort(){R.delete(e)}}}function b(t,e){t.appendChild(e)}function Oe(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Me(t){const e=w("style");return Re(Oe(t),e),e.sheet}function Re(t,e){return b(t.head||t,e),e.sheet}function y(t,e,n){t.insertBefore(e,n||null)}function g(t){t.parentNode&&t.parentNode.removeChild(t)}function ee(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function w(t){return document.createElement(t)}function P(t){return document.createTextNode(t)}function N(){return P(" ")}function le(){return P("")}function U(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function $(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ce(t){return t===""?null:+t}function Fe(t){return Array.from(t.childNodes)}function te(t,e){e=""+e,t.data!==e&&(t.data=e)}function M(t,e){t.value=e??""}function Pe(t,e,{bubbles:n=!1,cancelable:s=!1}={}){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,s,e),o}function _e(t,e){return new t(e)}const V=new Map;let X=0;function He(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Ge(t,e){const n={stylesheet:Me(e),rules:{}};return V.set(t,n),n}function Ke(t,e,n,s,o,r,u,m=0){const a=16.666/s;let l=`{
`;for(let k=0;k<=1;k+=a){const h=e+(n-e)*r(k);l+=k*100+`%{${u(h,1-h)}}
`}const c=l+`100% {${u(n,1-n)}}
}`,f=`__svelte_${He(c)}_${m}`,i=Oe(t),{stylesheet:d,rules:p}=V.get(i)||Ge(i,t);p[f]||(p[f]=!0,d.insertRule(`@keyframes ${f} ${c}`,d.cssRules.length));const _=t.style.animation||"";return t.style.animation=`${_?`${_}, `:""}${f} ${s}ms linear ${o}ms 1 both`,X+=1,f}function We(t,e){const n=(t.style.animation||"").split(", "),s=n.filter(e?r=>r.indexOf(e)<0:r=>r.indexOf("__svelte")===-1),o=n.length-s.length;o&&(t.style.animation=s.join(", "),X-=o,X||Je())}function Je(){oe(()=>{X||(V.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&g(e)}),V.clear())})}let W;function K(t){W=t}function ie(){if(!W)throw new Error("Function called outside component initialization");return W}function je(){const t=ie();return(e,n,{cancelable:s=!1}={})=>{const o=t.$$.callbacks[e];if(o){const r=Pe(e,n,{cancelable:s});return o.slice().forEach(u=>{u.call(t,r)}),!r.defaultPrevented}return!0}}function Qe(t,e){return ie().$$.context.set(t,e),e}function Ae(t){return ie().$$.context.get(t)}function Ue(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(s=>s.call(this,e))}const I=[],he=[];let F=[];const de=[],Ve=Promise.resolve();let ne=!1;function Xe(){ne||(ne=!0,Ve.then(Le))}function Y(t){F.push(t)}const Z=new Set;let D=0;function Le(){if(D!==0)return;const t=W;do{try{for(;D<I.length;){const e=I[D];D++,K(e),Ye(e.$$)}}catch(e){throw I.length=0,D=0,e}for(K(null),I.length=0,D=0;he.length;)he.pop()();for(let e=0;e<F.length;e+=1){const n=F[e];Z.has(n)||(Z.add(n),n())}F.length=0}while(I.length);for(;de.length;)de.pop()();ne=!1,Z.clear(),K(t)}function Ye(t){if(t.fragment!==null){t.update(),L(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Y)}}function Ze(t){const e=[],n=[];F.forEach(s=>t.indexOf(s)===-1?e.push(s):n.push(s)),n.forEach(s=>s()),F=e}let G;function et(){return G||(G=Promise.resolve(),G.then(()=>{G=null})),G}function pe(t,e,n){t.dispatchEvent(Pe(`${e?"intro":"outro"}${n}`))}const Q=new Set;let O;function ce(){O={r:0,c:[],p:O}}function ue(){O.r||L(O.c),O=O.p}function E(t,e){t&&t.i&&(Q.delete(t),t.i(e))}function z(t,e,n,s){if(t&&t.o){if(Q.has(t))return;Q.add(t),O.c.push(()=>{Q.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}const tt={duration:0};function nt(t,e,n){const s={direction:"out"};let o=e(t,n,s),r=!0,u;const m=O;m.r+=1;function a(){const{delay:l=0,duration:c=300,easing:f=ze,tick:i=v,css:d}=o||tt;d&&(u=Ke(t,1,0,c,l,f,d));const p=Be()+l,_=p+c;Y(()=>pe(t,!1,"start")),Ie(k=>{if(r){if(k>=_)return i(0,1),pe(t,!1,"end"),--m.r||L(m.c),!1;if(k>=p){const h=f((k-p)/c);i(1-h,h)}}return r})}return se(o)?et().then(()=>{o=o(s),a()}):a(),{end(l){l&&o.tick&&o.tick(1,0),r&&(u&&We(t,u),r=!1)}}}const st=["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"];[...st];function C(t){t&&t.c()}function S(t,e,n,s){const{fragment:o,after_update:r}=t.$$;o&&o.m(e,n),s||Y(()=>{const u=t.$$.on_mount.map(Ne).filter(se);t.$$.on_destroy?t.$$.on_destroy.push(...u):L(u),t.$$.on_mount=[]}),r.forEach(Y)}function q(t,e){const n=t.$$;n.fragment!==null&&(Ze(n.after_update),L(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function rt(t,e){t.$$.dirty[0]===-1&&(I.push(t),Xe(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function x(t,e,n,s,o,r,u,m=[-1]){const a=W;K(t);const l=t.$$={fragment:null,ctx:[],props:r,update:v,not_equal:o,bound:ae(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(a?a.$$.context:[])),callbacks:ae(),dirty:m,skip_bound:!1,root:e.target||a.$$.root};u&&u(l.root);let c=!1;if(l.ctx=n?n(t,e.props||{},(f,i,...d)=>{const p=d.length?d[0]:i;return l.ctx&&o(l.ctx[f],l.ctx[f]=p)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](p),c&&rt(t,f)),i}):[],l.update(),c=!0,L(l.before_update),l.fragment=s?s(l.ctx):!1,e.target){if(e.hydrate){const f=Fe(e.target);l.fragment&&l.fragment.l(f),f.forEach(g)}else l.fragment&&l.fragment.c();e.intro&&E(t.$$.fragment),S(t,e.target,e.anchor,e.customElement),Le()}K(a)}class T{$destroy(){q(this,1),this.$destroy=v}$on(e,n){if(!se(n))return v;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const o=s.indexOf(n);o!==-1&&s.splice(o,1)}}$set(e){this.$$set&&!Te(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function ot(t,{delay:e=0,duration:n=400,easing:s=ze}={}){const o=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:s,css:r=>`opacity: ${r*o}`}}function lt(t){let e,n,s=t[2][t[0]]+"",o,r,u,m,a;return{c(){e=w("div"),n=w("span"),o=P(s),r=P(t[1]),$(n,"class","svelte-1ngtdr9"),$(e,"class",u=me(t[0])+" svelte-1ngtdr9")},m(l,c){y(l,e,c),b(e,n),b(n,o),b(e,r),a=!0},p(l,[c]){(!a||c&1)&&s!==(s=l[2][l[0]]+"")&&te(o,s),(!a||c&2)&&te(r,l[1]),(!a||c&1&&u!==(u=me(l[0])+" svelte-1ngtdr9"))&&$(e,"class",u)},i(l){a||(m&&m.end(1),a=!0)},o(l){m=nt(e,ot,{duration:250}),a=!1},d(l){l&&g(e),l&&m&&m.end()}}}function it(t,e,n){let{category:s,message:o}=e;const r={warning:"Warning: ",error:"Error: ",success:"Success: "};return t.$$set=u=>{"category"in u&&n(0,s=u.category),"message"in u&&n(1,o=u.message)},[s,o,r]}class xe extends T{constructor(e){super(),x(this,e,it,lt,j,{category:0,message:1})}}const B=[];function ct(t,e=v){let n;const s=new Set;function o(m){if(j(t,m)&&(t=m,n)){const a=!B.length;for(const l of s)l[1](),B.push(l,t);if(a){for(let l=0;l<B.length;l+=2)B[l][0](B[l+1]);B.length=0}}}function r(m){o(m(t))}function u(m,a=v){const l=[m,a];return s.add(l),s.size===1&&(n=e(o)||v),m(t),()=>{s.delete(l),s.size===0&&n&&(n(),n=null)}}return{set:o,update:r,subscribe:u}}const A=ct({stock:null,size:null,batch:null,unique_parents:null});function ut(t){let e,n,s,o;return{c(){e=w("button"),n=P(t[0])},m(r,u){y(r,e,u),b(e,n),s||(o=U(e,"click",t[1]),s=!0)},p(r,[u]){u&1&&te(n,r[0])},i:v,o:v,d(r){r&&g(e),s=!1,o()}}}function ft(t,e,n){let{title:s}=e;const o=je(),r=()=>o("next");return t.$$set=u=>{"title"in u&&n(0,s=u.title)},[s,r]}class fe extends T{constructor(e){super(),x(this,e,ft,ut,j,{title:0})}}function ge(t){let e,n;return e=new xe({props:{category:t[1].category,message:t[1].message}}),{c(){C(e.$$.fragment)},m(s,o){S(e,s,o),n=!0},p(s,o){const r={};o&2&&(r.category=s[1].category),o&2&&(r.message=s[1].message),e.$set(r)},i(s){n||(E(e.$$.fragment,s),n=!0)},o(s){z(e.$$.fragment,s),n=!1},d(s){q(e,s)}}}function at(t){let e,n,s,o,r,u,m,a,l,c;r=new fe({props:{title:"Generate Batch"}}),r.$on("next",t[2]);let f=t[1].show&&ge(t);return{c(){e=w("input"),n=N(),s=w("input"),o=N(),C(r.$$.fragment),u=N(),f&&f.c(),m=le(),$(e,"type","text"),$(e,"placeholder","Stock ID"),e.required=!0,$(e,"class","svelte-1i0rgby"),$(s,"type","number"),$(s,"placeholder","Number of Pairs"),s.required=!0,$(s,"class","svelte-1i0rgby")},m(i,d){y(i,e,d),M(e,t[0].stock),y(i,n,d),y(i,s,d),M(s,t[0].size),y(i,o,d),S(r,i,d),y(i,u,d),f&&f.m(i,d),y(i,m,d),a=!0,l||(c=[U(e,"input",t[3]),U(s,"input",t[4])],l=!0)},p(i,[d]){d&1&&e.value!==i[0].stock&&M(e,i[0].stock),d&1&&Ce(s.value)!==i[0].size&&M(s,i[0].size),i[1].show?f?(f.p(i,d),d&2&&E(f,1)):(f=ge(i),f.c(),E(f,1),f.m(m.parentNode,m)):f&&(ce(),z(f,1,1,()=>{f=null}),ue())},i(i){a||(E(r.$$.fragment,i),E(f),a=!0)},o(i){z(r.$$.fragment,i),z(f),a=!1},d(i){i&&g(e),i&&g(n),i&&g(s),i&&g(o),q(r,i),i&&g(u),f&&f.d(i),i&&g(m),l=!1,L(c)}}}function mt(t,e,n){let s;re(t,A,f=>n(5,s=f));const o={stock:null,size:null},r={category:null,message:null,show:!1},u=Ae("eel"),m=je(),a=async()=>{const f={stock:{result:o.stock!==null&&o.stock.length!==0,message:"Stock ID is missing."},size:{result:o.size!==null&&o.size>0,message:"Number of pairs must be greater than or equal to 1."}};if(!(f.stock.result&&f.size.result)){n(1,r.category="warning",r),n(1,r.message=f.stock.result?f.size.message:f.stock.message,r),n(1,r.show=!0,r),setTimeout(()=>n(1,r.show=!1,r),2500);return}const i=await u.assemble(o.stock,o.size)();if(i.batch.length===0){n(1,r.category="error",r),n(1,r.message=`Could not generate any pairs for the stock: ${o.stock}.`,r),n(1,r.show=!0,r),setTimeout(()=>n(1,r.show=!1,r),2500);return}J(A,s.stock=o.stock,s),J(A,s.size=o.size,s),J(A,s.batch=i.batch,s),J(A,s.unique_parents=i.unique_parents,s),m("next")};function l(){o.stock=this.value,n(0,o)}function c(){o.size=Ce(this.value),n(0,o)}return[o,r,a,l,c]}class _t extends T{constructor(e){super(),x(this,e,mt,at,j,{})}}function ye(t,e,n){const s=t.slice();return s[3]=e[n],s[5]=n,s}function be(t,e,n){const s=t.slice();return s[6]=e[n],s}function $e(t,e,n){const s=t.slice();return s[9]=e[n],s}function we(t){let e,n=t[9]+"",s;return{c(){e=w("th"),s=P(n),$(e,"class","svelte-2nne3z")},m(o,r){y(o,e,r),b(e,s)},p:v,d(o){o&&g(e)}}}function ke(t){let e,n=t[6]+"",s;return{c(){e=w("td"),s=P(n),$(e,"class","svelte-2nne3z")},m(o,r){y(o,e,r),b(e,s)},p:v,d(o){o&&g(e)}}}function ve(t){let e,n,s=t[5]+1+"",o,r,u,m,a=Object.values(t[3]),l=[];for(let c=0;c<a.length;c+=1)l[c]=ke(be(t,a,c));return{c(){e=w("tr"),n=w("td"),o=P(s),r=w("span"),r.textContent=":",u=N();for(let c=0;c<l.length;c+=1)l[c].c();m=N(),$(r,"class","svelte-2nne3z"),$(n,"class","svelte-2nne3z")},m(c,f){y(c,e,f),b(e,n),b(n,o),b(n,r),b(e,u);for(let i=0;i<l.length;i+=1)l[i]&&l[i].m(e,null);b(e,m)},p(c,f){if(f&1){a=Object.values(c[3]);let i;for(i=0;i<a.length;i+=1){const d=be(c,a,i);l[i]?l[i].p(d,f):(l[i]=ke(d),l[i].c(),l[i].m(e,m))}for(;i<l.length;i+=1)l[i].d(1);l.length=a.length}},d(c){c&&g(e),ee(l,c)}}}function ht(t){let e,n,s,o,r,u,m,a,l,c,f=Object.keys(t[0][0]),i=[];for(let _=0;_<f.length;_+=1)i[_]=we($e(t,f,_));let d=t[0],p=[];for(let _=0;_<d.length;_+=1)p[_]=ve(ye(t,d,_));return l=new fe({props:{title:"Continue"}}),l.$on("next",t[1]),{c(){e=w("table"),n=w("thead"),s=w("tr"),o=w("th"),r=N();for(let _=0;_<i.length;_+=1)i[_].c();u=N(),m=w("tbody");for(let _=0;_<p.length;_+=1)p[_].c();a=N(),C(l.$$.fragment),$(o,"class","svelte-2nne3z")},m(_,k){y(_,e,k),b(e,n),b(n,s),b(s,o),b(s,r);for(let h=0;h<i.length;h+=1)i[h]&&i[h].m(s,null);b(e,u),b(e,m);for(let h=0;h<p.length;h+=1)p[h]&&p[h].m(m,null);y(_,a,k),S(l,_,k),c=!0},p(_,[k]){if(k&1){f=Object.keys(_[0][0]);let h;for(h=0;h<f.length;h+=1){const H=$e(_,f,h);i[h]?i[h].p(H,k):(i[h]=we(H),i[h].c(),i[h].m(s,null))}for(;h<i.length;h+=1)i[h].d(1);i.length=f.length}if(k&1){d=_[0];let h;for(h=0;h<d.length;h+=1){const H=ye(_,d,h);p[h]?p[h].p(H,k):(p[h]=ve(H),p[h].c(),p[h].m(m,null))}for(;h<p.length;h+=1)p[h].d(1);p.length=d.length}},i(_){c||(E(l.$$.fragment,_),c=!0)},o(_){z(l.$$.fragment,_),c=!1},d(_){_&&g(e),ee(i,_),ee(p,_),_&&g(a),q(l,_)}}}function dt(t,e,n){let s;re(t,A,u=>n(2,s=u));const o=s.batch;function r(u){Ue.call(this,t,u)}return[o,r]}class pt extends T{constructor(e){super(),x(this,e,dt,ht,j,{})}}function Ee(t){let e,n;return e=new xe({props:{category:t[1].category,message:t[1].message}}),{c(){C(e.$$.fragment)},m(s,o){S(e,s,o),n=!0},p(s,o){const r={};o&2&&(r.category=s[1].category),o&2&&(r.message=s[1].message),e.$set(r)},i(s){n||(E(e.$$.fragment,s),n=!0)},o(s){z(e.$$.fragment,s),n=!1},d(s){q(e,s)}}}function gt(t){let e,n,s,o,r,u,m,a;s=new fe({props:{title:"Send Email"}}),s.$on("next",t[2]);let l=t[1].show&&Ee(t);return{c(){e=w("input"),n=N(),C(s.$$.fragment),o=N(),l&&l.c(),r=le(),$(e,"type","email"),$(e,"placeholder","Email Address"),e.required=!0,$(e,"class","svelte-1oywla6")},m(c,f){y(c,e,f),M(e,t[0]),y(c,n,f),S(s,c,f),y(c,o,f),l&&l.m(c,f),y(c,r,f),u=!0,m||(a=U(e,"input",t[3]),m=!0)},p(c,[f]){f&1&&e.value!==c[0]&&M(e,c[0]),c[1].show?l?(l.p(c,f),f&2&&E(l,1)):(l=Ee(c),l.c(),E(l,1),l.m(r.parentNode,r)):l&&(ce(),z(l,1,1,()=>{l=null}),ue())},i(c){u||(E(s.$$.fragment,c),E(l),u=!0)},o(c){z(s.$$.fragment,c),z(l),u=!1},d(c){c&&g(e),c&&g(n),q(s,c),c&&g(o),l&&l.d(c),c&&g(r),m=!1,a()}}}function yt(t,e,n){let s;re(t,A,l=>n(4,s=l));let o=localStorage.getItem("address")??"";const r={category:null,message:null,show:!1},u=Ae("eel"),m=async()=>{const l={empty:{result:o.length!==0,message:"Email address is missing."},format:{result:o.includes("@")&&o.includes("."),message:"Email address is not valid."}};if(!(l.empty.result&&l.format.result)){n(1,r.category="warning",r),n(1,r.message=l.empty.result?l.format.message:l.empty.message,r),n(1,r.show=!0,r),setTimeout(()=>n(1,r.show=!1,r),2500);return}if(localStorage.setItem("address",o),await u.send(s.stock,s.batch.length,s.batch,s.unique_parents,o)()===!1){n(1,r.category="error",r),n(1,r.message=`Email could not be sent to ${o}.`,r),n(1,r.show=!0,r),setTimeout(()=>n(1,r.show=!1,r),2500);return}n(1,r.category="success",r),n(1,r.message=`Email was sent to ${o}.`,r),n(1,r.show=!0,r),setTimeout(()=>n(1,r.show=!1,r),2500)};function a(){o=this.value,n(0,o)}return[o,r,m,a]}class bt extends T{constructor(e){super(),x(this,e,yt,gt,j,{})}}function $t(t){let e;return{c(){e=w("header"),e.innerHTML=`<h1 class="svelte-1jsnvtf">Mating-Pair Selection Algorithm</h1> 
    <h2 class="svelte-1jsnvtf">Peromyscus Genetic Stock Center</h2>`,$(e,"class","svelte-1jsnvtf")},m(n,s){y(n,e,s)},p:v,i:v,o:v,d(n){n&&g(e)}}}class wt extends T{constructor(e){super(),x(this,e,null,$t,j,{})}}function kt(t){let e,n,s,o,r;e=new wt({});var u=t[1][t[0]];function m(a){return{}}return u&&(s=_e(u,m()),s.$on("next",t[3])),{c(){C(e.$$.fragment),n=N(),s&&C(s.$$.fragment),o=le()},m(a,l){S(e,a,l),y(a,n,l),s&&S(s,a,l),y(a,o,l),r=!0},p(a,[l]){if(l&1&&u!==(u=a[1][a[0]])){if(s){ce();const c=s;z(c.$$.fragment,1,0,()=>{q(c,1)}),ue()}u?(s=_e(u,m()),s.$on("next",a[3]),C(s.$$.fragment),E(s.$$.fragment,1),S(s,o.parentNode,o)):s=null}},i(a){r||(E(e.$$.fragment,a),s&&E(s.$$.fragment,a),r=!0)},o(a){z(e.$$.fragment,a),s&&z(s.$$.fragment,a),r=!1},d(a){q(e,a),a&&g(n),a&&g(o),s&&q(s,a)}}}function vt(t,e,n){let{eel:s}=e;Qe("eel",s);const o=[_t,pt,bt];let r=0;const u=()=>n(0,++r);return t.$$set=m=>{"eel"in m&&n(2,s=m.eel)},[r,o,s,u]}class Et extends T{constructor(e){super(),x(this,e,vt,kt,j,{eel:2})}}new Et({target:document.querySelector("#app"),props:{eel}});
