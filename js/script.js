(function(){
var h=document.getElementById("hd"),t=document.querySelector(".tog"),n=document.getElementById("nav");
function sc(){h.classList.toggle("solid",window.scrollY>40)}sc();addEventListener("scroll",sc,{passive:true});
function set(o){n.classList.toggle("open",o);t.setAttribute("aria-expanded",o)}
t.addEventListener("click",function(){set(!n.classList.contains("open"))});
n.addEventListener("click",function(e){if(e.target.tagName==="A")set(false)});
document.getElementById("f").addEventListener("submit",function(e){
e.preventDefault();
document.getElementById("ok").textContent="Thank you. We will call you within two working days.";
this.reset();
});
})();

/* Theme switcher for comparing palettes. Delete this block (and .themesw in base.css) before launch. */
(function(){
var themes=[["midnight-gold","Midnight & Gold"],["emerald-brass","Emerald & Brass"],["burgundy-champagne","Burgundy & Champagne"],["obsidian-rosegold","Obsidian & Rose Gold"],["plum-saffron","Aubergine & Saffron"]];
var link=document.getElementById("theme");
var sel=document.createElement("select");
sel.className="themesw";sel.setAttribute("aria-label","Colour theme");
themes.forEach(function(t){var o=document.createElement("option");o.value=t[0];o.textContent=t[1];sel.appendChild(o)});
function apply(id){link.href="css/theme-"+id+".css";sel.value=id;try{localStorage.setItem("aos-theme",id)}catch(e){}}
var saved=null;try{saved=localStorage.getItem("aos-theme")}catch(e){}
if(saved&&themes.some(function(t){return t[0]===saved})){apply(saved)}
sel.addEventListener("change",function(){apply(sel.value)});
document.body.appendChild(sel);
})();
