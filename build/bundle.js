var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function l(t){t.forEach(e)}function o(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let r,a;function i(t,e){return r||(r=document.createElement("a")),r.href=e,t===r.href}function c(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode&&t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function h(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function g(){return m(" ")}function p(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function v(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function $(t){a=t}function k(t){(function(){if(!a)throw new Error("Function called outside component initialization");return a})().$$.on_mount.push(t)}const w=[],y=[],x=[],b=[],_=Promise.resolve();let j=!1;function q(t){x.push(t)}const C=new Set;let E=0;function S(){const t=a;do{for(;E<w.length;){const t=w[E];E++,$(t),T(t.$$)}for($(null),w.length=0,E=0;y.length;)y.pop()();for(let t=0;t<x.length;t+=1){const e=x[t];C.has(e)||(C.add(e),e())}x.length=0}while(w.length);for(;b.length;)b.pop()();j=!1,C.clear(),$(t)}function T(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(q)}}const A=new Set;let M;function R(){M={r:0,c:[],p:M}}function D(){M.r||l(M.c),M=M.p}function I(t,e){t&&t.i&&(A.delete(t),t.i(e))}function N(t,e,n,l){if(t&&t.o){if(A.has(t))return;A.add(t),M.c.push((()=>{A.delete(t),l&&(n&&t.d(1),l())})),t.o(e)}else l&&l()}function P(t){t&&t.c()}function O(t,n,s,r){const{fragment:a,after_update:i}=t.$$;a&&a.m(n,s),r||q((()=>{const n=t.$$.on_mount.map(e).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...n):l(n),t.$$.on_mount=[]})),i.forEach(q)}function z(t,e){const n=t.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function B(t,e){-1===t.$$.dirty[0]&&(w.push(t),j||(j=!0,_.then(S)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function F(e,o,s,r,i,c,u,d=[-1]){const h=a;$(e);const m=e.$$={fragment:null,ctx:[],props:c,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(h?h.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:o.target||h.$$.root};u&&u(m.root);let g=!1;if(m.ctx=s?s(e,o.props||{},((t,n,...l)=>{const o=l.length?l[0]:n;return m.ctx&&i(m.ctx[t],m.ctx[t]=o)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](o),g&&B(e,t)),n})):[],m.update(),g=!0,l(m.before_update),m.fragment=!!r&&r(m.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);m.fragment&&m.fragment.l(t),t.forEach(f)}else m.fragment&&m.fragment.c();o.intro&&I(e.$$.fragment),O(e,o.target,o.anchor,o.customElement),S()}$(h)}class J{$destroy(){z(this,1),this.$destroy=t}$on(e,n){if(!o(n))return t;const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const t=l.indexOf(n);-1!==t&&l.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function K(e){let n;return{c(){n=h("header"),n.innerHTML='<div class="header-wrapper svelte-k5tmoq"><div class="name-title svelte-k5tmoq"><h1 class="svelte-k5tmoq">Erin <span class="blinking svelte-k5tmoq">|</span> Caughey</h1> \n            <h2 class="svelte-k5tmoq">Data — Development — Design</h2></div> \n        <b class="line svelte-k5tmoq"></b> \n        <div class="about-me svelte-k5tmoq"><p class="svelte-k5tmoq"><strong>Current:</strong> Newsroom developer with the <a href="https://www.sfchronicle.com/" class="svelte-k5tmoq">San Francisco Chronicle</a>.</p> \n\t\t\t<p class="svelte-k5tmoq"><strong>Previous:</strong> Developer/Designer at the <a href="https://www.jsonline.com" class="svelte-k5tmoq">Milwaukee Journal Sentinel</a>.</p>  \n            <p class="svelte-k5tmoq">I&#39;m a self-taught front-end developer capable of, and dedicated to, learning new skills through my work. I&#39;ve worked on Pulitzer Finalist, Alfred I. duPont-Columbia, Edward R. Murrow and Society of Professional Journalists award winning projects. I was part of the Journal Sentinel&#39;s 2017 Knight-Temple Table Stakes team to strategize a successful digital future.</p> \n            <p class="svelte-k5tmoq">I studied journalism at Marquette University and completed a masters in digital content strategy and data interpretation from the University of Kansas.</p> \n            <p class="links svelte-k5tmoq"><strong>Reach out →</strong>  <a class="all-links svelte-k5tmoq" href="mailto:erinrcaughey@gmail.com">Email</a> | <a class="all-links svelte-k5tmoq" href="https://twitter.com/erin_caughey" target="_blank" rel="noreferrer">Twitter</a> | <a class="all-links svelte-k5tmoq" href="https://www.linkedin.com/in/erin-caughey/" target="_blank" rel="noreferrer">Linkedin</a></p></div> \n        <div class="work svelte-k5tmoq"><ul><li class="svelte-k5tmoq"><a class="all-links svelte-k5tmoq" href="#work">work</a></li> \n                <li class="svelte-k5tmoq"><a class="all-links svelte-k5tmoq" href="mailto:erinrcaughey@gmail.com">contact</a></li></ul></div></div>',p(n,"class","svelte-k5tmoq")},m(t,e){u(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}class L extends J{constructor(t){super(),F(this,t,null,K,s,{})}}function H(e){let n,l,o,s,r,a,i;return{c(){n=h("li"),l=h("strong"),o=m(e[0]),s=m(":"),r=g(),a=h("a"),i=m(e[1]),p(a,"href",e[2]),p(a,"class","svelte-13ec1jx"),p(n,"class","svelte-13ec1jx")},m(t,e){u(t,n,e),c(n,l),c(l,o),c(l,s),c(n,r),c(n,a),c(a,i)},p(t,[e]){1&e&&v(o,t[0]),2&e&&v(i,t[1]),4&e&&p(a,"href",t[2])},i:t,o:t,d(t){t&&f(n)}}}function U(t,e,n){let{category:l}=e,{text:o}=e,{url:s}=e;return t.$$set=t=>{"category"in t&&n(0,l=t.category),"text"in t&&n(1,o=t.text),"url"in t&&n(2,s=t.url)},[l,o,s]}class W extends J{constructor(t){super(),F(this,t,U,H,s,{category:0,text:1,url:2})}}function G(t){let e,n,l,o;return{c(){e=h("div"),n=h("strong"),n.textContent="Role:",l=g(),o=m(t[3]),p(e,"class","role svelte-vd6olj")},m(t,s){u(t,e,s),c(e,n),c(e,l),c(e,o)},p(t,e){8&e&&v(o,t[3])},d(t){t&&f(e)}}}function Q(t){let e,n,l,o;return{c(){e=h("div"),n=h("strong"),n.textContent="Tools:",l=g(),o=m(t[4]),p(e,"class","tools svelte-vd6olj")},m(t,s){u(t,e,s),c(e,n),c(e,l),c(e,o)},p(t,e){16&e&&v(o,t[4])},d(t){t&&f(e)}}}function V(e){let n,l,o,s,r,a,d,$,k,w,y,x,b,_,j,q,C=""!==e[3]&&G(e),E=""!==e[4]&&Q(e);return{c(){n=h("div"),l=h("a"),o=h("img"),r=g(),a=h("div"),d=h("h4"),$=h("a"),k=m(e[1]),w=g(),y=h("div"),x=h("strong"),x.textContent="About:",b=g(),_=m(e[2]),j=g(),C&&C.c(),q=g(),E&&E.c(),p(o,"class","clip svelte-vd6olj"),i(o.src,s=e[0])||p(o,"src",s),p(o,"alt",e[2]),p(l,"href",e[5]),p($,"class","all-links"),p($,"href",e[5]),p(d,"class","svelte-vd6olj"),p(y,"class","description svelte-vd6olj"),p(a,"class","item-group svelte-vd6olj"),p(n,"class","col-two-item svelte-vd6olj")},m(t,e){u(t,n,e),c(n,l),c(l,o),c(n,r),c(n,a),c(a,d),c(d,$),c($,k),c(a,w),c(a,y),c(y,x),c(y,b),c(y,_),c(a,j),C&&C.m(a,null),c(a,q),E&&E.m(a,null)},p(t,[e]){1&e&&!i(o.src,s=t[0])&&p(o,"src",s),4&e&&p(o,"alt",t[2]),32&e&&p(l,"href",t[5]),2&e&&v(k,t[1]),32&e&&p($,"href",t[5]),4&e&&v(_,t[2]),""!==t[3]?C?C.p(t,e):(C=G(t),C.c(),C.m(a,q)):C&&(C.d(1),C=null),""!==t[4]?E?E.p(t,e):(E=Q(t),E.c(),E.m(a,null)):E&&(E.d(1),E=null)},i:t,o:t,d(t){t&&f(n),C&&C.d(),E&&E.d()}}}function X(t,e,n){let{images:l}=e,{headline:o}=e,{text:s}=e,{role:r}=e,{tools:a}=e,{link:i}=e;return t.$$set=t=>{"images"in t&&n(0,l=t.images),"headline"in t&&n(1,o=t.headline),"text"in t&&n(2,s=t.text),"role"in t&&n(3,r=t.role),"tools"in t&&n(4,a=t.tools),"link"in t&&n(5,i=t.link)},[l,o,s,r,a,i]}class Y extends J{constructor(t){super(),F(this,t,X,V,s,{images:0,headline:1,text:2,role:3,tools:4,link:5})}}function Z(e){let n;return{c(){n=h("div"),n.innerHTML='<div class="link svelte-12nfjl8"><a class="all-links svelte-12nfjl8" href="media/caughey-cv-2022.pdf" target="_blank">Resume</a>  <br/> \n        <a class="all-links svelte-12nfjl8" href="mailto:erinrcaughey@gmail.com" target="_blank">erinrcaughey@gmail.com</a>  <br/>\n        Copyright © 2024 Erin Caughey</div> \n    <div class="link svelte-12nfjl8"><a class="all-links svelte-12nfjl8" href="https://twitter.com/erin_caughey" target="_blank" rel="noreferrer"><i class="fab fa-twitter"></i> erin_caughey</a>  <br/> \n        <a class="all-links svelte-12nfjl8" href="https://github.com/erincaughey" target="_blank" rel="noreferrer"><i class="fab fa-github"></i> erincaughey</a>  <br/> \n        <a class="all-links svelte-12nfjl8" href="https://newsie.social/@erin_caughey" rel="me"><i class="fab fa-mastodon"></i> erin_caughey</a></div>',p(n,"class","footer-wrapper svelte-12nfjl8")},m(t,e){u(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}class tt extends J{constructor(t){super(),F(this,t,null,Z,s,{})}}function et(t,e,n){const l=t.slice();return l[2]=e[n],l[4]=n,l}function nt(t,e,n){const l=t.slice();return l[5]=e[n],l[4]=n,l}function lt(t){let e,n;return e=new W({props:{category:t[5].category,url:t[5].url,text:t[5].text}}),{c(){P(e.$$.fragment)},m(t,l){O(e,t,l),n=!0},p(t,n){const l={};2&n&&(l.category=t[5].category),2&n&&(l.url=t[5].url),2&n&&(l.text=t[5].text),e.$set(l)},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){N(e.$$.fragment,t),n=!1},d(t){z(e,t)}}}function ot(t){let e,n;return e=new Y({props:{images:t[2].images,headline:t[2].headline,text:t[2].text,role:t[2].role,tools:t[2].tools,awards:t[2].awards,link:t[2].link}}),{c(){P(e.$$.fragment)},m(t,l){O(e,t,l),n=!0},p(t,n){const l={};1&n&&(l.images=t[2].images),1&n&&(l.headline=t[2].headline),1&n&&(l.text=t[2].text),1&n&&(l.role=t[2].role),1&n&&(l.tools=t[2].tools),1&n&&(l.awards=t[2].awards),1&n&&(l.link=t[2].link),e.$set(l)},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){N(e.$$.fragment,t),n=!1},d(t){z(e,t)}}}function st(t){let e,n,l,o,s,r,a,i,m,v,$,k,w,y,x,b,_;n=new L({});let j=t[1],q=[];for(let e=0;e<j.length;e+=1)q[e]=lt(nt(t,j,e));const C=t=>N(q[t],1,1,(()=>{q[t]=null}));let E=t[0],S=[];for(let e=0;e<E.length;e+=1)S[e]=ot(et(t,E,e));const T=t=>N(S[t],1,1,(()=>{S[t]=null}));return b=new tt({}),{c(){e=h("div"),P(n.$$.fragment),l=g(),o=h("h2"),o.textContent="WORK",s=g(),r=h("div"),a=h("div"),i=h("div"),m=h("div"),v=h("h4"),v.textContent="[Reporting Contributions]",$=g(),k=h("ul");for(let t=0;t<q.length;t+=1)q[t].c();w=g(),y=h("div");for(let t=0;t<S.length;t+=1)S[t].c();x=g(),P(b.$$.fragment),p(o,"id","work"),p(o,"class","svelte-tlgx5s"),p(v,"class","svelte-tlgx5s"),p(m,"class","item-group svelte-tlgx5s"),p(i,"class","col-one-item svelte-tlgx5s"),p(a,"class","col-one"),p(y,"class","col-two"),p(r,"class","work-items svelte-tlgx5s"),p(e,"class","container")},m(t,f){u(t,e,f),O(n,e,null),c(e,l),c(e,o),c(e,s),c(e,r),c(r,a),c(a,i),c(i,m),c(m,v),c(m,$),c(m,k);for(let t=0;t<q.length;t+=1)q[t].m(k,null);c(r,w),c(r,y);for(let t=0;t<S.length;t+=1)S[t].m(y,null);c(e,x),O(b,e,null),_=!0},p(t,[e]){if(2&e){let n;for(j=t[1],n=0;n<j.length;n+=1){const l=nt(t,j,n);q[n]?(q[n].p(l,e),I(q[n],1)):(q[n]=lt(l),q[n].c(),I(q[n],1),q[n].m(k,null))}for(R(),n=j.length;n<q.length;n+=1)C(n);D()}if(1&e){let n;for(E=t[0],n=0;n<E.length;n+=1){const l=et(t,E,n);S[n]?(S[n].p(l,e),I(S[n],1)):(S[n]=ot(l),S[n].c(),I(S[n],1),S[n].m(y,null))}for(R(),n=E.length;n<S.length;n+=1)T(n);D()}},i(t){if(!_){I(n.$$.fragment,t);for(let t=0;t<j.length;t+=1)I(q[t]);for(let t=0;t<E.length;t+=1)I(S[t]);I(b.$$.fragment,t),_=!0}},o(t){N(n.$$.fragment,t),q=q.filter(Boolean);for(let t=0;t<q.length;t+=1)N(q[t]);S=S.filter(Boolean);for(let t=0;t<S.length;t+=1)N(S[t]);N(b.$$.fragment,t),_=!1},d(t){t&&f(e),z(n),d(q,t),d(S,t),z(b)}}}function rt(t,e,n){let l=[],o=[];return k((async()=>{const t=await fetch("data/work.json");n(0,l=await t.json());const e=await fetch("data/contributions.json");n(1,o=await e.json())})),[l,o]}return new class extends J{constructor(t){super(),F(this,t,rt,st,s,{})}}({target:document.querySelector("#content")})}();
//# sourceMappingURL=bundle.js.map
