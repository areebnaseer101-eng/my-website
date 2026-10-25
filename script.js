// Areeba Blooms — interactive storefront
// To enable direct WhatsApp orders, replace the empty string with your number including country code,
// digits only. Example format for Pakistan: 923001234567 (do not include + or spaces).
const WHATSAPP_NUMBER = "";

const products = [
  {id:"money-1",name:"Classic Money Rose Bouquet",category:"money",label:"Money Bouquet",price:4500,image:"assets/money-bouquet-1.jpg",desc:"Red roses with a fan of notes"},
  {id:"money-2",name:"Blush Money Bouquet",category:"money",label:"Money Bouquet",price:5500,image:"assets/money-bouquet-2.jpg",desc:"A thoughtful money surprise"},
  {id:"teddy-1",name:"Teddy Heart Gift",category:"teddy",label:"Teddy Bouquet",price:3800,image:"assets/teddy-bouquet-1.jpg",desc:"Teddy, hearts and roses"},
  {id:"teddy-2",name:"Birthday Balloon Teddy",category:"teddy",label:"Teddy Bouquet",price:4200,image:"assets/teddy-bouquet-2.jpg",desc:"A sweet birthday surprise"},
  {id:"choco-1",name:"Chocolate Rose Bouquet",category:"chocolate",label:"Chocolate Bouquet",price:3500,image:"assets/chocolate-bouquet-1.jpg",desc:"Roses and favourite chocolates"},
  {id:"choco-2",name:"Love & Chocolate",category:"chocolate",label:"Chocolate Bouquet",price:3900,image:"assets/chocolate-bouquet-2.jpg",desc:"A classic romantic gift"},
  {id:"birthday-1",name:"Birthday Rose Garden",category:"birthday",label:"Birthday Bouquet",price:5000,image:"assets/birthday-bouquet-1.jpg",desc:"A generous rose arrangement"},
  {id:"birthday-2",name:"Pink Birthday Blooms",category:"birthday",label:"Birthday Bouquet",price:4500,image:"assets/birthday-bouquet-2.jpg",desc:"Soft pink blooms in a hat box"},
  {id:"jewel-1",name:"Jewellery Gift Box",category:"jewellery",label:"Jewellery Bouquet",price:4200,image:"assets/jewellery-bouquet-1.jpg",desc:"A keepsake gift box"},
  {id:"jewel-2",name:"Pink Jewellery Bouquet",category:"jewellery",label:"Jewellery Bouquet",price:3800,image:"assets/jewellery-bouquet-2.jpg",desc:"Jewellery with pink roses"},
  {id:"car-1",name:"Pink Gift Flower Box",category:"car",label:"Car Bouquet",price:3200,image:"assets/car-bouquet-1.jpg",desc:"A soft pink boxed arrangement"},
  {id:"cake-1",name:"Rose & Red Velvet Cake",category:"cake",label:"Cake Bouquet",price:6500,image:"assets/cake-bouquet-1.jpg",desc:"Roses paired with a celebration cake"},
  {id:"cake-2",name:"Floral Birthday Surprise",category:"cake",label:"Cake Bouquet",price:4800,image:"assets/cake-bouquet-2.jpg",desc:"A cheerful celebration gift"}
];
const categories = [
  {id:"all",en:"All gifts",ur:"تمام تحفے"},{id:"money",en:"Money bouquets",ur:"منی بُوکے"},
  {id:"teddy",en:"Teddy bear",ur:"ٹیڈی بیئر"},{id:"chocolate",en:"Chocolate",ur:"چاکلیٹ"},
  {id:"birthday",en:"Birthday",ur:"سالگرہ"},{id:"car",en:"Car bouquets",ur:"کار بُوکے"},
  {id:"jewellery",en:"Jewellery",ur:"جیولری"},{id:"cake",en:"Cake bouquets",ur:"کیک بُوکے"}
];
let activeCategory="all", cart=[], currentOrderText="", language="en";
const $=s=>document.querySelector(s);
const money=n=>"Rs. "+Number(n).toLocaleString("en-PK");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function showToast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>el.classList.remove("show"),2600)}
function renderFilters(){ $("#categoryFilters").innerHTML=categories.map(c=>`<button class="filter-chip ${activeCategory===c.id?"active":""}" data-category="${c.id}">${language==="en"?c.en:c.ur}</button>`).join("");}
function renderProducts(){const shown=activeCategory==="all"?products:products.filter(p=>p.category===activeCategory);$("#productGrid").innerHTML=shown.map((p,i)=>`<article class="product-card" style="animation-delay:${(i%4)*65}ms"><div class="product-image"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy"><span class="product-tag">${esc(p.label)}</span><button class="quick-add" data-add="${p.id}">＋ ${language==="en"?"Add to bag":"بیگ میں شامل کریں"}</button></div><div class="product-info"><span class="category">${esc(p.label)}</span><h3>${esc(p.name)}</h3><div class="product-info-bottom"><span class="product-price">${money(p.price)}</span><small>${esc(p.desc)}</small></div></div></article>`).join("");}
function renderCart(){const count=cart.reduce((n,x)=>n+x.qty,0);$("#cartCount").textContent=count;$("#cartCountModal").textContent=`(${count})`;$("#cartTotal").textContent=money(cart.reduce((n,x)=>n+x.price*x.qty,0));$("#cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><img src="${x.image}" alt=""><div><h4>${esc(x.name)}</h4><small>Qty: ${x.qty} · ${money(x.price)}</small><br><button class="remove-item" data-remove="${x.id}">Remove</button></div><strong>${money(x.price*x.qty)}</strong></div>`).join(""):`<div class="empty-cart">Your bag is waiting for something lovely. ✿</div>`;}
function addToCart(id){const p=products.find(x=>x.id===id);if(!p)return;const existing=cart.find(x=>x.id===id);if(existing)existing.qty++;else cart.push({...p,qty:1});renderCart();showToast(`${p.name} added to your bag`)}
function openModal(id){const el=$(id);el.classList.add("open");el.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeModal(id){const el=$(id);el.classList.remove("open");el.setAttribute("aria-hidden","true");if(!document.querySelector(".modal-backdrop.open"))document.body.style.overflow=""}
function makeCustomOrder(){const type=$("#customType").value,color=$("#customColor").value,budget=$("#customBudget").value,extras=[...document.querySelectorAll(".addon-grid input:checked")].map(x=>x.value),message=$("#customMessage").value.trim();return `AREEBA BLOOMS — CUSTOM ORDER\nBouquet: ${type}\nColours: ${color}\nBudget: PKR ${budget}\nAdd-ons: ${extras.length?extras.join(", "):"None selected"}\nSpecial message / requests: ${message||"None"}\nPlease confirm availability, final price and delivery details.`}
function whatsapp(text){if(!WHATSAPP_NUMBER){showToast("WhatsApp is not connected yet. Add your number in script.js; order details can still be copied.");return false}const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;window.open(url,"_blank","noopener,noreferrer");return true}
$("#categoryFilters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;renderFilters();renderProducts()});
$("#productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(b.dataset.add)});
$("#cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;cart=cart.filter(x=>x.id!==b.dataset.remove);renderCart()});
$("#cartOpen").addEventListener("click",()=>{renderCart();openModal("#cartModal")});
$("#cartClose").addEventListener("click",()=>closeModal("#cartModal"));
$("#cartModal").addEventListener("click",e=>{if(e.target.id==="cartModal")closeModal("#cartModal")});
$("#checkoutButton").addEventListener("click",()=>{if(!cart.length){showToast("Your bag is empty.");return}const text="AREEBA BLOOMS — ORDER REQUEST\n"+cart.map(x=>`${x.name} x ${x.qty}: ${money(x.price*x.qty)}`).join("\n")+"\nEstimated subtotal: "+money(cart.reduce((n,x)=>n+x.price*x.qty,0))+"\nPlease confirm final price, availability and delivery.";if(whatsapp(text))closeModal("#cartModal");else{currentOrderText=text;$("#orderSummary").textContent=text;$("#orderTitle").textContent="Your bag order";closeModal("#cartModal");openModal("#orderModal")}});
$("#customForm").addEventListener("submit",e=>{e.preventDefault();currentOrderText=makeCustomOrder();$("#orderSummary").textContent=currentOrderText;$("#orderTitle").textContent="Your idea, beautifully wrapped.";openModal("#orderModal")});
$("#orderClose").addEventListener("click",()=>closeModal("#orderModal"));
$("#orderModal").addEventListener("click",e=>{if(e.target.id==="orderModal")closeModal("#orderModal")});
$("#sendCustomWhatsApp").addEventListener("click",()=>whatsapp(currentOrderText));
$("#copyOrder").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(currentOrderText);showToast("Order details copied.");}catch(e){const ta=document.createElement("textarea");ta.value=currentOrderText;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();showToast("Order details copied.")}});
$("#contactWhatsApp").addEventListener("click",()=>whatsapp("Hello Areeba Blooms! I would like to ask about your bouquets and gifts."));
$("#themeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark");$("#themeToggle").textContent=document.body.classList.contains("dark")?"☀":"☾"});
$("#languageToggle").addEventListener("click",()=>{language=language==="en"?"ur":"en";document.documentElement.lang=language==="ur"?"ur":"en";document.body.dir=language==="ur"?"rtl":"ltr";$("#languageToggle").textContent=language==="ur"?"English":"اردو";document.querySelectorAll("[data-en][data-ur]").forEach(el=>{el.innerHTML=el.dataset[language]});renderFilters();renderProducts();});
$("#menuToggle").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
$("#mainNav").addEventListener("click",e=>{if(e.target.closest("a"))$("#mainNav").classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal("#cartModal");closeModal("#orderModal")}});
$("#year").textContent=new Date().getFullYear();
renderFilters();renderProducts();renderCart();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
// If a local video has not been added, the hero's poster/background image remains visible.
const heroVideo=document.querySelector(".hero-video");heroVideo.addEventListener("error",()=>{heroVideo.style.display="none"});
