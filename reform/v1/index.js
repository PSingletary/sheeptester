function u(e){return e>1e9?`${(e/1e9).toPrecision(3)} GB`:e>1e6?`${(e/1e6).toPrecision(3)} MB`:e>1e3?`${(e/1e3).toPrecision(3)} kB`:e!==1?`${e} bytes`:"1 byte"}function m(e){let t=e.lastIndexOf(".");return t===-1?e:e.slice(0,t)}var w=new TextEncoder;function x({fileName:e=null,input:t,dropTarget:n,pasteTarget:l,onFile:i}){async function c(o){if(o===null||(o instanceof FileList?o:o.items).length===0)return;let d=o instanceof FileList?o[0]:o.items[0].kind==="string"?await new Promise(s=>o.items[0].getAsString(s)):o.items[0].getAsFile();if(d!==null){e&&(e.textContent=d instanceof File?`${d.name} \xB7 ${u(d.size)}`:`Plain text \xB7 ${u(w.encode(d).length)}`,e.classList.remove("file-error"));try{await i(d)}catch(s){console.error(s),e&&(e.textContent+=" \u2014 failed to load",e.classList.add("file-error"))}}}t?.addEventListener("change",()=>{c(t.files),t.value=""}),n?.addEventListener("drop",async o=>{c(o.dataTransfer),n.classList.remove("drag-over"),o.preventDefault()}),n?.addEventListener("dragover",o=>{n.classList.add("drag-over"),o.preventDefault()}),n?.addEventListener("dragleave",()=>{n.classList.remove("drag-over")}),l&&document.addEventListener("paste",o=>{o.target instanceof HTMLTextAreaElement||o.target instanceof HTMLInputElement||c(o.clipboardData)})}function b(e,t){t&&!(t instanceof HTMLInputElement)?(console.warn(t,"is not an <input> element"),t=null):t&&(t.dataset.ignore="true");let n=t?.closest(".reform\\:io"),l=n?.querySelector(".input-content canvas");l&&!(l instanceof HTMLCanvasElement)&&(console.warn(l,"is not a <canvas> element"),l=null);let i=l??document.createElement("canvas"),c=i.getContext("2d");x({fileName:t?.parentElement?.querySelector(".file-name"),input:t,dropTarget:n instanceof HTMLElement?n:void 0,pasteTarget:t?.classList.contains("reform:paste-target"),onFile:async o=>{if(typeof o=="string")return;let d=URL.createObjectURL(o);try{let s=document.createElement("img");s.src=d,await new Promise((a,g)=>{s.addEventListener("load",a),s.addEventListener("error",g)}),i.dataset.name=m(o.name),i.width=s.width,i.height=s.height,c?.drawImage(s,0,0),e.handleValue(i)}finally{URL.revokeObjectURL(d)}}})}function v(e,t){let n=t?.closest(".reform\\:io");t&&!(t instanceof HTMLInputElement)?(console.warn(t,"is not an <input> element"),t=null):t&&(t.dataset.ignore="true");let l=n?.querySelector(".input-controls"),i=n?.querySelector(".input-content");x({fileName:t?.parentElement?.querySelector(".file-name"),input:t,dropTarget:l instanceof HTMLElement?l:void 0,pasteTarget:t?.classList.contains("reform:paste-target"),onFile:async c=>{let o=c instanceof File?await c.text():c;i instanceof HTMLTextAreaElement&&(i.value=o),e.handleValue(o)}})}var h=class e{#e=null;#t=null;#o;#n;constructor({fileName:t=null,downloadLink:n=null,copyButton:l,shareButton:i}){this.#o=t,this.#n=n,l?.addEventListener("click",()=>{this.#e&&navigator.clipboard.write([new ClipboardItem({[this.#e.type]:this.#e})])}),i?.addEventListener("click",async()=>{this.#e&&(this.#e.type==="text/plain"&&this.#e.size<4e3?navigator.share({text:await this.#e.text()}):navigator.share({files:[this.#e]}))})}handleFile(t){this.#e=t,this.#o&&(this.#o.textContent=`${t.name} \xB7 ${u(t.size)}`),this.#n&&(this.#t&&URL.revokeObjectURL(this.#t),this.#t=URL.createObjectURL(t),this.#n.href=this.#t,this.#n.download=t.name)}static fromOutputControls(t){let n=t?.querySelector(".download");return n&&!(n instanceof HTMLAnchorElement)&&(console.warn(n,"is not an <a> element"),n=null),new e({fileName:t?.querySelector(".file-name"),downloadLink:n,copyButton:t?.querySelector(".icon-copy"),shareButton:t?.querySelector(".icon-share")})}};var p=class{lastValue;dependents=[];handleValue(t){this.lastValue=t;for(let n of this.dependents)n(t)}};var r={};function f(e){if(!(e instanceof HTMLElement&&e.dataset.ignore))if(e instanceof HTMLInputElement)if(r[e.name]??=new p,e.type==="number"||e.type==="range"||e.inputMode==="numeric"){if(e.value==="")return;r[e.name].handleValue(+e.value);let t=e.closest(".range-wrapper");if(t)if(e.type==="range"){let n=t.lastElementChild;n instanceof HTMLInputElement&&(n.value=e.step==="any"||e.step&&+e.step<.1?(+e.value).toFixed(2):e.value)}else{let n=t.querySelector('[type="range"]');n instanceof HTMLInputElement&&(n.value=e.value)}}else e.type==="checkbox"?r[e.name].handleValue(e.checked):e.type==="file"?e.files&&e.files.length>0&&r[e.name].handleValue(Array.from(e.files)):e.type==="radio"?e.checked&&r[e.name].handleValue(e.value):r[e.name].handleValue(e.value);else(e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)&&(r[e.name]??=new p,r[e.name].handleValue(e.value))}for(let e of document.getElementsByClassName("reform:image-input"))e instanceof HTMLInputElement&&(r[e.name]??=new p,b(r[e.name],e));for(let e of document.getElementsByClassName("reform:text-input"))e instanceof HTMLInputElement&&(r[e.name]??=new p,v(r[e.name],e));for(let e of document.forms)for(let t of e.elements)f(t);document.addEventListener("input",e=>f(e.target));document.addEventListener("change",e=>f(e.target));function j(e,t){r[e]??=new p;let n=document.getElementById(e);if(!n){let a=document.getElementsByName(e);a.length>1&&console.warn("More than one element with name",e,Array.from(a)),n=a[0]}let l=n?.dataset.deps?.split(" ")??[],i={},c=n instanceof HTMLCanvasElement?n.getContext("2d")??n:n,o=n.closest(".reform\\:io")?.querySelector(".output-controls");if(o){let a=h.fromOutputControls(o);r[e].dependents.push(g=>a.handleFile(g))}let d=async()=>{if(s.size===l.length){let a=await t(c,i);r[e].handleValue(a)}},s=new Set;for(let a of l)r[a]??=new p,r[a].lastValue!==void 0&&(i[a]=r[a].lastValue,s.add(a)),r[a].dependents.push(g=>{i[a]=g,s.add(a),d()});d()}export{j as on};
