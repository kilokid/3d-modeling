(()=>{"use strict";const e=(e,t="+7 (___) ___-__-__")=>{function o(e){const o=e.keyCode,n=t,s=n.replace(/\D/g,""),c=this.value.replace(/\D/g,"");let r=0,a=n.replace(/[_\d]/g,(e=>r<c.length?c.charAt(r++)||s.charAt(r):e));r=a.indexOf("_"),-1!=r&&(a=a.slice(0,r));let l=n.substr(0,this.value.length).replace(/_+/g,(e=>"\\d{1,"+e.length+"}")).replace(/[+()]/g,"\\$&");l=new RegExp("^"+l+"$"),(!l.test(this.value)||this.value.length<5||o>47&&o<58)&&(this.value=a),"blur"==e.type&&this.value.length<5&&(this.value="")}e.addEventListener("input",o),e.addEventListener("focus",o),e.addEventListener("blur",o)};(e=>{const t=document.querySelector("#timer-hours"),o=document.querySelector("#timer-minutes"),n=document.querySelector("#timer-seconds");let s=null;const c=()=>{const e=function(){const e=(new Date("6 November 2021").getTime()-(new Date).getTime())/1e3,t=Math.floor(e%60),o=Math.floor(e/60%60);return{timeRemaining:e,hours:Math.floor(e/60/60),minutes:o,seconds:t}}();e.timeRemaining<=0?(s||clearInterval(s),t.textContent="00",o.textContent="00",n.textContent="00"):(t.textContent=addZero(e.hours),o.textContent=addZero(e.minutes),n.textContent=addZero(e.seconds))};c(),s=setInterval(c,1e3)})(),(()=>{const e=document.querySelector("menu"),t=()=>{e.classList.remove("active-menu")};document.addEventListener("click",(o=>{const n=o.target,s=n.closest(".menu"),c=n.closest(".close-btn"),r=n.classList.contains("js-menu-link");s?e.classList.add("active-menu"):c||r?(o.preventDefault(),t()):!n.closest("menu")&&t()}))})(),(()=>{const e=document.querySelector(".popup"),t=document.querySelectorAll(".popup-btn"),o=document.querySelector(".popup-content"),n={count:-445,speed:25,startPos:-445,endPos:50},s=()=>{n.startPos>n.endPos?n.count-=n.speed:n.count+=n.speed,o.style.transform=`translateY(${n.count}px)`,n.startPos>n.endPos||n.count<n.endPos&&requestAnimationFrame(s)},c=()=>{n.startPos>n.endPos?n.count-=n.speed:n.count+=n.speed,o.style.transform=`translateY(${n.count}px)`,n.startPos>n.endPos||(n.count<n.endPos?requestAnimationFrame(c):(n.startPos=-445,n.endPos=50,e.style.display="none"))};t.forEach((t=>{t.addEventListener("click",(()=>{e.style.display="block",screen.width>768&&(n.count=n.startPos,o.style.left="36%",requestAnimationFrame(s))}))})),e.addEventListener("click",(t=>{const o=t.target;n.startPos=50,n.endPos=700,o.classList.contains("popup-close")?screen.width>768?requestAnimationFrame(c):e.style.display="none":o.closest(".popup-content")||(screen.width>768?requestAnimationFrame(c):e.style.display="none")}))})(),document.querySelectorAll('a[href^="#"]:not(a[href="#"])').forEach((e=>{e.addEventListener("click",(t=>{t.preventDefault();const o=e.getAttribute("href").slice(1);document.getElementById(o).scrollIntoView({behavior:"smooth"})}))})),(()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),o=document.querySelectorAll(".service-tab");e.addEventListener("click",(e=>{const n=e.target.closest(".service-header-tab");n&&t.forEach(((e,s)=>{e===n&&(e=>{for(let n=0;n<o.length;n++)e===n?(t[n].classList.add("active"),o[n].classList.remove("d-none")):(t[n].classList.remove("active"),o[n].classList.add("d-none"))})(s)}))}))})(),(()=>{const e=document.querySelectorAll(".portfolio-item"),t=document.querySelector(".portfolio-content");let o,n=0;(()=>{const t=document.querySelector(".portfolio-dots");e.forEach((e=>{const o=document.createElement("li");o.classList.add("dot"),e.matches(".portfolio-item-active")&&o.classList.add("dot-active"),t.append(o)}))})();const s=document.querySelectorAll(".dot"),c=(e,t,o)=>{e[t].classList.remove(o)},r=(e,t,o)=>{e[t].classList.add(o)},a=()=>{c(e,n,"portfolio-item-active"),c(s,n,"dot-active"),n++,n>=e.length&&(n=0),r(e,n,"portfolio-item-active"),r(s,n,"dot-active")},l=(e=3e3)=>{o=setInterval(a,e)};t.addEventListener("click",(t=>{t.preventDefault();const o=t.target;o.matches(".portfolio-btn, .dot")&&(c(e,n,"portfolio-item-active"),c(s,n,"dot-active"),o.matches("#arrow-right")?n++:o.matches("#arrow-left")?n--:o.matches(".dot")&&s.forEach(((e,t)=>{e===o&&(n=t)})),n>=e.length&&(n=0),n<0&&(n=e.length-1),r(e,n,"portfolio-item-active"),r(s,n,"dot-active"))})),t.addEventListener("mouseover",(e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(o)})),t.addEventListener("mouseout",(e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&l(1500)})),l(1500)})(),(()=>{const e=document.getElementById("command"),t=e=>{const t=e.target;if(t.classList.contains("command__photo")){const e=t.src;t.src=t.dataset.img,t.dataset.img=e}};e.addEventListener("mouseover",t),e.addEventListener("mouseout",t)})(),((e=100)=>{const t=document.querySelector(".calc-block"),o=document.querySelector(".calc-type"),n=document.querySelector(".calc-square"),s=document.querySelector(".calc-day"),c=document.querySelector(".calc-count"),r=document.getElementById("total");t.addEventListener("change",(t=>{const a=t.target;(a.matches("select")||a.matches("input"))&&(()=>{let t=0,a=1,l=1,i=25,d=r.textContent;const u=o.options[o.selectedIndex].value,m=+n.value;let v;c.value>1&&(a+=(c.value-1)/10),s.value&&s.value<5?l*=2:s.value&&s.value<10&&(l*=1.5),u&&m&&(t=e*u*m*a*l);const p=()=>{d<t?v=requestAnimationFrame(p):d>t&&(i=-25,v=requestAnimationFrame(p)),r.textContent=+r.textContent+i,(t-r.textContent)*i<1&&(cancelAnimationFrame(p),d=r.textContent,r.textContent=Math.round(t))};v=requestAnimationFrame(p)})()})),document.querySelector(".calc-block").addEventListener("input",(e=>{const t=e.target;"text"===t.type&&(t.value=t.value.replace(/[^0-9.]/,""))}))})(100),(()=>{const e=document.createElement("div");e.style.cssText="font-size: 2rem; color: white",document.addEventListener("submit",(o=>{o.preventDefault();const n=o.target;n.append(e),e.textContent="Загрузка...";const s=new FormData(n),c={};s.forEach(((e,t)=>{c[t]=e})),console.log(c),t(c).then((t=>{if(200!==t.status)throw new Error("Status network not 200");n.querySelectorAll("input").forEach((e=>e.value="")),e.style.color="green",e.textContent="Спасибо, мы скоро с вами свяжемся!"})).catch((t=>{e.style.color="red",e.textContent="Что-то пошло не так...",console.error(t)}))}));const t=e=>fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})})(),document.querySelectorAll('[name="user_form"]').forEach((t=>{const o=t.querySelector(".form-phone");e(o)})),document.addEventListener("input",(e=>{const t=e.target;(t.closest(".form-name")||"Ваше имя"===t.placeholder)&&(t.value=t.value.replace(/[^а-яё ]+$/gi,""))}))})();