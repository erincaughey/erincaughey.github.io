var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function l(t){t.forEach(e)}function o(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let r,a;function i(t,e){return r||(r=document.createElement("a")),r.href=e,t===r.href}function c(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function h(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function g(){return m(" ")}function p(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function v(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function k(t){a=t}function $(t){(function(){if(!a)throw new Error("Function called outside component initialization");return a})().$$.on_mount.push(t)}const w=[],y=[],x=[],b=[],_=Promise.resolve();let q=!1;function j(t){x.push(t)}let C=!1;const E=new Set;function T(){if(!C){C=!0;do{for(let t=0;t<w.length;t+=1){const e=w[t];k(e),S(e.$$)}for(k(null),w.length=0;y.length;)y.pop()();for(let t=0;t<x.length;t+=1){const e=x[t];E.has(e)||(E.add(e),e())}x.length=0}while(w.length);for(;b.length;)b.pop()();q=!1,C=!1,E.clear()}}function S(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(j)}}const A=new Set;let M;function D(){M={r:0,c:[],p:M}}function R(){M.r||l(M.c),M=M.p}function I(t,e){t&&t.i&&(A.delete(t),t.i(e))}function N(t,e,n,l){if(t&&t.o){if(A.has(t))return;A.add(t),M.c.push((()=>{A.delete(t),l&&(n&&t.d(1),l())})),t.o(e)}}function O(t){t&&t.c()}function P(t,n,s,r){const{fragment:a,on_mount:i,on_destroy:c,after_update:u}=t.$$;a&&a.m(n,s),r||j((()=>{const n=i.map(e).filter(o);c?c.push(...n):l(n),t.$$.on_mount=[]})),u.forEach(j)}function B(t,e){const n=t.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function K(t,e){-1===t.$$.dirty[0]&&(w.push(t),q||(q=!0,_.then(T)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function L(e,o,s,r,i,c,u,d=[-1]){const h=a;k(e);const m=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(h?h.$$.context:o.context||[]),callbacks:n(),dirty:d,skip_bound:!1,root:o.target||h.$$.root};u&&u(m.root);let g=!1;if(m.ctx=s?s(e,o.props||{},((t,n,...l)=>{const o=l.length?l[0]:n;return m.ctx&&i(m.ctx[t],m.ctx[t]=o)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](o),g&&K(e,t)),n})):[],m.update(),g=!0,l(m.before_update),m.fragment=!!r&&r(m.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);m.fragment&&m.fragment.l(t),t.forEach(f)}else m.fragment&&m.fragment.c();o.intro&&I(e.$$.fragment),P(e,o.target,o.anchor,o.customElement),T()}k(h)}class z{$destroy(){B(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function F(e){let n;return{c(){n=h("header"),n.innerHTML='<div class="header-wrapper svelte-k5tmoq"><div class="name-title svelte-k5tmoq"><h1 class="svelte-k5tmoq">Erin <span class="blinking svelte-k5tmoq">|</span> Caughey</h1> \n            <h2 class="svelte-k5tmoq">Data — Development — Design</h2></div> \n        <b class="line svelte-k5tmoq"></b> \n        <div class="about-me svelte-k5tmoq"><p class="svelte-k5tmoq">Current: Newsroom developer with the <a href="https://www.sfchronicle.com/" class="svelte-k5tmoq">San Francisco Chronicle</a>.</p> \n\t\t\t<p class="svelte-k5tmoq">Preivous: Developer/Designer at the <a href="https://www.jsonline.com" class="svelte-k5tmoq">Milwaukee Journal Sentinel</a></p>  \n            <p class="svelte-k5tmoq">I&#39;m a self-taught front-end developer capable of, and dedicated to, learning new skills through my work. I&#39;ve worked on Alfred I. duPont-Columbia, Edward R. Murrow and Society of Professional Journalists award winning projects, and was part of the newspaper&#39;s 2017 Knight-Temple Table Stakes team to strategize a successful digital future.</p> \n            <p class="svelte-k5tmoq">I studied journalism at Marquette University and completed a masters in digital content strategy and data interpretation from the University of Kansas.</p> \n            <p class="links svelte-k5tmoq"><strong>Reach out →</strong>  <a class="all-links svelte-k5tmoq" href="mailto:erinrcaughey@gmail.com">Email</a> | <a class="all-links svelte-k5tmoq" href="https://twitter.com/erin_caughey" target="_blank">Twitter</a> | <a class="all-links svelte-k5tmoq" href="https://github.com/erincaughey" target="_blank">Github</a> | <a class="all-links svelte-k5tmoq" href="https://www.linkedin.com/in/erin-caughey/" target="_blank">Linkedin</a></p></div> \n        <div class="work svelte-k5tmoq"><ul><li class="svelte-k5tmoq"><a class="all-links svelte-k5tmoq" href="#work">work</a></li> \n                <li class="svelte-k5tmoq"><a class="all-links svelte-k5tmoq" href="mailto:erinrcaughey@gmail.com">contact</a></li></ul></div></div>',p(n,"class","svelte-k5tmoq")},m(t,e){u(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}class H extends z{constructor(t){super(),L(this,t,null,F,s,{})}}function J(e){let n,l,o,s,r,a,i;return{c(){n=h("li"),l=h("strong"),o=m(e[0]),s=m(":"),r=g(),a=h("a"),i=m(e[1]),p(a,"href",e[2]),p(a,"class","svelte-13ec1jx"),p(n,"class","svelte-13ec1jx")},m(t,e){u(t,n,e),c(n,l),c(l,o),c(l,s),c(n,r),c(n,a),c(a,i)},p(t,[e]){1&e&&v(o,t[0]),2&e&&v(i,t[1]),4&e&&p(a,"href",t[2])},i:t,o:t,d(t){t&&f(n)}}}function U(t,e,n){let{category:l}=e,{text:o}=e,{url:s}=e;return t.$$set=t=>{"category"in t&&n(0,l=t.category),"text"in t&&n(1,o=t.text),"url"in t&&n(2,s=t.url)},[l,o,s]}class G extends z{constructor(t){super(),L(this,t,U,J,s,{category:0,text:1,url:2})}}function W(t){let e,n,l,o;return{c(){e=h("div"),n=h("strong"),n.textContent="Role:",l=g(),o=m(t[3]),p(e,"class","role svelte-vd6olj")},m(t,s){u(t,e,s),c(e,n),c(e,l),c(e,o)},p(t,e){8&e&&v(o,t[3])},d(t){t&&f(e)}}}function Q(t){let e,n,l,o;return{c(){e=h("div"),n=h("strong"),n.textContent="Tools:",l=g(),o=m(t[4]),p(e,"class","tools svelte-vd6olj")},m(t,s){u(t,e,s),c(e,n),c(e,l),c(e,o)},p(t,e){16&e&&v(o,t[4])},d(t){t&&f(e)}}}function V(e){let n,l,o,s,r,a,d,k,$,w,y,x,b,_,q,j,C=""!==e[3]&&W(e),E=""!==e[4]&&Q(e);return{c(){n=h("div"),l=h("a"),o=h("img"),r=g(),a=h("div"),d=h("h4"),k=h("a"),$=m(e[1]),w=g(),y=h("div"),x=h("strong"),x.textContent="About:",b=g(),_=m(e[2]),q=g(),C&&C.c(),j=g(),E&&E.c(),p(o,"class","clip svelte-vd6olj"),i(o.src,s=e[0])||p(o,"src",s),p(o,"alt",e[2]),p(l,"href",e[5]),p(k,"class","all-links"),p(k,"href",e[5]),p(d,"class","svelte-vd6olj"),p(y,"class","description svelte-vd6olj"),p(a,"class","item-group svelte-vd6olj"),p(n,"class","col-two-item svelte-vd6olj")},m(t,e){u(t,n,e),c(n,l),c(l,o),c(n,r),c(n,a),c(a,d),c(d,k),c(k,$),c(a,w),c(a,y),c(y,x),c(y,b),c(y,_),c(a,q),C&&C.m(a,null),c(a,j),E&&E.m(a,null)},p(t,[e]){1&e&&!i(o.src,s=t[0])&&p(o,"src",s),4&e&&p(o,"alt",t[2]),32&e&&p(l,"href",t[5]),2&e&&v($,t[1]),32&e&&p(k,"href",t[5]),4&e&&v(_,t[2]),""!==t[3]?C?C.p(t,e):(C=W(t),C.c(),C.m(a,j)):C&&(C.d(1),C=null),""!==t[4]?E?E.p(t,e):(E=Q(t),E.c(),E.m(a,null)):E&&(E.d(1),E=null)},i:t,o:t,d(t){t&&f(n),C&&C.d(),E&&E.d()}}}function X(t,e,n){let{images:l}=e,{headline:o}=e,{text:s}=e,{role:r}=e,{tools:a}=e,{link:i}=e;return t.$$set=t=>{"images"in t&&n(0,l=t.images),"headline"in t&&n(1,o=t.headline),"text"in t&&n(2,s=t.text),"role"in t&&n(3,r=t.role),"tools"in t&&n(4,a=t.tools),"link"in t&&n(5,i=t.link)},[l,o,s,r,a,i]}class Y extends z{constructor(t){super(),L(this,t,X,V,s,{images:0,headline:1,text:2,role:3,tools:4,link:5})}}function Z(e){let n;return{c(){n=h("div"),n.innerHTML='<div class="link svelte-10vltyn"><a class="all-links svelte-10vltyn" href="mailto:erinrcaughey@gmail.com" target="_blank">erinrcaughey@gmail.com</a>  <br/> \n        <a class="all-links svelte-10vltyn" href="https://twitter.com/erin_caughey" target="_blank"><i class="fab fa-twitter"></i> erin_caughey</a>  <br/> \n        <a class="all-links svelte-10vltyn" href="https://github.com/erincaughey" target="_blank"><i class="fab fa-github"></i> erincaughey</a>  <br/></div>',p(n,"class","footer-wrapper svelte-10vltyn")},m(t,e){u(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}class tt extends z{constructor(t){super(),L(this,t,null,Z,s,{})}}function et(t,e,n){const l=t.slice();return l[2]=e[n],l[4]=n,l}function nt(t,e,n){const l=t.slice();return l[5]=e[n],l[4]=n,l}function lt(t){let e,n;return e=new G({props:{category:t[5].category,url:t[5].url,text:t[5].text}}),{c(){O(e.$$.fragment)},m(t,l){P(e,t,l),n=!0},p(t,n){const l={};2&n&&(l.category=t[5].category),2&n&&(l.url=t[5].url),2&n&&(l.text=t[5].text),e.$set(l)},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){N(e.$$.fragment,t),n=!1},d(t){B(e,t)}}}function ot(t){let e,n;return e=new Y({props:{images:t[2].images,headline:t[2].headline,text:t[2].text,role:t[2].role,tools:t[2].tools,awards:t[2].awards,link:t[2].link}}),{c(){O(e.$$.fragment)},m(t,l){P(e,t,l),n=!0},p(t,n){const l={};1&n&&(l.images=t[2].images),1&n&&(l.headline=t[2].headline),1&n&&(l.text=t[2].text),1&n&&(l.role=t[2].role),1&n&&(l.tools=t[2].tools),1&n&&(l.awards=t[2].awards),1&n&&(l.link=t[2].link),e.$set(l)},i(t){n||(I(e.$$.fragment,t),n=!0)},o(t){N(e.$$.fragment,t),n=!1},d(t){B(e,t)}}}function st(t){let e,n,l,o,s,r,a,i,m,v,k,$,w,y,x,b,_;n=new H({});let q=t[1],j=[];for(let e=0;e<q.length;e+=1)j[e]=lt(nt(t,q,e));const C=t=>N(j[t],1,1,(()=>{j[t]=null}));let E=t[0],T=[];for(let e=0;e<E.length;e+=1)T[e]=ot(et(t,E,e));const S=t=>N(T[t],1,1,(()=>{T[t]=null}));return b=new tt({}),{c(){e=h("div"),O(n.$$.fragment),l=g(),o=h("h2"),o.textContent="WORK",s=g(),r=h("div"),a=h("div"),i=h("div"),m=h("div"),v=h("h4"),v.textContent="[Reporting Contributions]",k=g(),$=h("ul");for(let t=0;t<j.length;t+=1)j[t].c();w=g(),y=h("div");for(let t=0;t<T.length;t+=1)T[t].c();x=g(),O(b.$$.fragment),p(o,"id","work"),p(o,"class","svelte-tlgx5s"),p(v,"class","svelte-tlgx5s"),p(m,"class","item-group svelte-tlgx5s"),p(i,"class","col-one-item svelte-tlgx5s"),p(a,"class","col-one"),p(y,"class","col-two"),p(r,"class","work-items svelte-tlgx5s"),p(e,"class","container")},m(t,f){u(t,e,f),P(n,e,null),c(e,l),c(e,o),c(e,s),c(e,r),c(r,a),c(a,i),c(i,m),c(m,v),c(m,k),c(m,$);for(let t=0;t<j.length;t+=1)j[t].m($,null);c(r,w),c(r,y);for(let t=0;t<T.length;t+=1)T[t].m(y,null);c(e,x),P(b,e,null),_=!0},p(t,[e]){if(2&e){let n;for(q=t[1],n=0;n<q.length;n+=1){const l=nt(t,q,n);j[n]?(j[n].p(l,e),I(j[n],1)):(j[n]=lt(l),j[n].c(),I(j[n],1),j[n].m($,null))}for(D(),n=q.length;n<j.length;n+=1)C(n);R()}if(1&e){let n;for(E=t[0],n=0;n<E.length;n+=1){const l=et(t,E,n);T[n]?(T[n].p(l,e),I(T[n],1)):(T[n]=ot(l),T[n].c(),I(T[n],1),T[n].m(y,null))}for(D(),n=E.length;n<T.length;n+=1)S(n);R()}},i(t){if(!_){I(n.$$.fragment,t);for(let t=0;t<q.length;t+=1)I(j[t]);for(let t=0;t<E.length;t+=1)I(T[t]);I(b.$$.fragment,t),_=!0}},o(t){N(n.$$.fragment,t),j=j.filter(Boolean);for(let t=0;t<j.length;t+=1)N(j[t]);T=T.filter(Boolean);for(let t=0;t<T.length;t+=1)N(T[t]);N(b.$$.fragment,t),_=!1},d(t){t&&f(e),B(n),d(j,t),d(T,t),B(b)}}}function rt(t,e,n){let l=[],o=[];return $((async()=>{const t=await fetch("data/work.json");n(0,l=await t.json());const e=await fetch("data/contributions.json");n(1,o=await e.json())})),[l,o]}return new class extends z{constructor(t){super(),L(this,t,rt,st,s,{})}}({target:document.querySelector("#content")})}();
//# sourceMappingURL=bundle.js.map
