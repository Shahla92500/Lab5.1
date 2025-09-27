const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');
 
let totalPrice = 0;
 
// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}
 
// Function to remove an item
function removeItem(event) {
  const item = event.target.closest('li');
  const price = parseFloat(item.dataset.price);
  updateTotalPrice(-price);
  item.remove();
}
addProductButton.addEventListener("click", (e)=> {
  e.preventDefault();
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);
 
  if (name && !isNaN(price) && price > 0) {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.dataset.price = price;
    li.innerHTML = `
      ${name} - $${price.toFixed(2)}
      <div class="qty-controls">
        <button class="decrease-qty">-</button>
        <span class="quantity">1</span>
        <button class="increase-qty">+</button>
      </div>
      <button class="remove-item">Remove</button>
    `;
    cart.appendChild(li);
    updateTotalPrice(price);
 
    // Clear input fields
    productNameInput.value = '';
    productPriceInput.value = '';
  } else {
    alert('Please enter a valid product name and price.');
  }     


});