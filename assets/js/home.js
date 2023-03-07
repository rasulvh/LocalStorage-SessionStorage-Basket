"use strict";

let buttons = document.querySelectorAll(".add-cart");
let productCount = document.querySelector("sup");
let cards = document.querySelectorAll(".card");

let products = [];

if (JSON.parse(localStorage.getItem("products") != null)) {
  products = JSON.parse(localStorage.getItem("products"));
}

buttons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    let productName = this.parentNode.firstElementChild.innerText;
    let productDescription =
      this.previousElementSibling.previousElementSibling.innerText;
    let productPriceStr = this.previousElementSibling.innerText;
    let productPrice = parseInt(
      productPriceStr.slice(0, productPriceStr.length - 2)
    );
    let productPicture =
      this.parentNode.previousElementSibling.getAttribute("src");
    let productId = parseInt(this.closest(".card").getAttribute("data-id"));
    console.log(productId);

    let existProduct = products.find((m) => m.id == productId);

    if (existProduct != undefined) {
      existProduct.count++;
    }
    else {

      products.push({
        id: productId,
        name: productName,
        description: productDescription,
        price: productPrice,
        picture: productPicture,
        count: 1,
      });
    }

    localStorage.setItem("products", JSON.stringify(products));

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Product was added to the cart',
      showConfirmButton: false,
      timer: 1500
    })

    productCount.innerText = getCartCount(JSON.parse(localStorage.getItem("products")))
  });
});

function getCartCount(products) {
  let count = 0;
  for (const product of products) {
    count += product.count
  }
  return count;
}

productCount.innerText = getCartCount(JSON.parse(localStorage.getItem("products")))