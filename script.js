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
 
addProductButton.addEventListener("click", (e)=> {
  e.preventDefault();
  const name = productNameInput.value;
  const price = parseFloat(productPriceInput.value);
 
  if (name && !isNaN(price) && price > 0) {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.dataset.price = price;
    li.innerHTML = `
    <div class="item-info">
      <div class="cadres">
        <span class="name">${name}</span>
        <span class="price">$${price.toFixed(2)}</span>
     </div>
      <div class="qty-controls">
          <button class="decrease-qty">-</button>
          <span class="quantity">1</span>
          <button class="increase-qty">+</button>
          <button class="remove-item">Remove</button>
      </div>   
    </div>
    `;
    cart.appendChild(li);
    updateTotalPrice(price);
    // Add event listeners for quantity buttons and remove button
    li.querySelector('.increase-qty').addEventListener('click', () => {
      const qtySpan = li.querySelector('.quantity');
      let quantity = parseInt(qtySpan.textContent);
      quantity += 1;
      qtySpan.textContent = quantity;
      updateTotalPrice(price);
      console.log("price: ", price);
    });
 
    li.querySelector('.decrease-qty').addEventListener('click', () => {
      const qtySpan = li.querySelector('.quantity');
      let quantity = parseInt(qtySpan.textContent);
      if (quantity > 1) {
        quantity -= 1;
        qtySpan.textContent = quantity;
        updateTotalPrice(-price);
        console.log("price: ", price);
      }
    });
    // Function to remove an item
  function removeItem(event) {
    const item = event.target.closest('li');
    const price = parseFloat(item.dataset.price);
    console.log("price: ", price);
    // updateTotalPrice(-price);
    const quantity = parseInt(item.querySelector('.quantity').textContent);
    console.log("quantity: ", quantity);
    updateTotalPrice(-price * quantity); // Deduct the total price based on quantity
    console.log("totalPrice: ", totalPrice); // Check updated totalPrice
    item.remove();
  }
  
  li.querySelector('.remove-item').addEventListener('click', removeItem); 
    // Clear input fields
    productNameInput.value = '';
    productPriceInput.value = '';
  } else {
    alert('Please enter a valid product name and price.');
  }     
});