import{a as m,S as h,i as a}from"./assets/vendor-CucEYOFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();const p="45321984-abcdef1234567890987654321",d="https://pixabay.com/api/";function g(t){const r=new URLSearchParams({key:p,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true"});return m.get(`${d}?${r}`).then(o=>o.data)}const y=new h(".gallery a",{captionsData:"alt",captionDelay:250});function c(t){t.innerHTML=""}function b(t,r){const o=t.map(({webformatURL:n,largeImageURL:e,tags:i,likes:s,views:l,comments:u,downloads:f})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${e}">
            <img class="gallery-image" src="${n}" alt="${i}" />
          </a>
          <div class="info-block">
            <p class="info-item"><b>Likes:</b> ${s}</p>
            <p class="info-item"><b>Views:</b> ${l}</p>
            <p class="info-item"><b>Comments:</b> ${u}</p>
            <p class="info-item"><b>Downloads:</b> ${f}</p>
          </div>
        </li>
      `).join("");r.innerHTML=o,y.refresh()}function L(t,r){c(r),b(t,r)}function w(t){t.classList.remove("is-hidden")}function S(t){t.classList.add("is-hidden")}const $=document.querySelector(".search-form");$.addEventListener("submit",P);function P(t){t.preventDefault();const r=t.currentTarget.elements.query.value.trim();if(r===""){a.warning({title:"Warning",message:"Search field cannot be empty!",position:"topRight"});return}c(),w(),g(r).then(o=>{if(o.hits.length===0){a.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(o.hits)}).catch(o=>{a.error({title:"Error",message:"Something went wrong with the server fetching.",position:"topRight"}),console.error(o)}).finally(()=>{S()}),t.currentTarget.reset()}
//# sourceMappingURL=index.js.map
