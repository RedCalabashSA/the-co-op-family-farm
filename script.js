
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const cart=JSON.parse(localStorage.getItem('coopCart')||'[]');
function save(){localStorage.setItem('coopCart',JSON.stringify(cart)); renderCart();}
function renderCart(){$$('.cart-count').forEach(x=>x.textContent=cart.length); const box=$('#cartItems'); if(!box)return; box.innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-item"><img src="${x.image}"><div><b>${x.name}</b><span>Enquiry item</span></div><button onclick="removeCart(${i})">×</button></div>`).join(''):'<p>Your basket is empty.</p>';}
window.removeCart=(i)=>{cart.splice(i,1);save()};
$$('.add-cart').forEach(b=>b.addEventListener('click',()=>{cart.push({name:b.dataset.name,image:b.dataset.image});save();openCart()}));
function openCart(){ $('#cartDrawer')?.classList.add('open'); $('#backdrop')?.classList.add('show'); }
function closeCart(){ $('#cartDrawer')?.classList.remove('open'); $('#backdrop')?.classList.remove('show'); }
$$('[data-cart]').forEach(b=>b.onclick=openCart); $('[data-close]')?.addEventListener('click',closeCart); $('#backdrop')?.addEventListener('click',closeCart);
$('.menu-btn')?.addEventListener('click',()=>$('.nav')?.classList.toggle('open'));
function filter(){const c=$('#catFilter')?.value||'All',m=$('#makerFilter')?.value||'All'; let n=0; $$('#productGrid .product-card').forEach(card=>{let show=(c==='All'||card.dataset.category===c)&&(m==='All'||card.dataset.maker===m); card.style.display=show?'':'none'; if(show)n++}); if($('#resultCount'))$('#resultCount').textContent=n+' products';}
$('#catFilter')?.addEventListener('change',filter); $('#makerFilter')?.addEventListener('change',filter);
renderCart();
