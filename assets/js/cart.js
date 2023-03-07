"use strict";

let tBody = document.querySelector("tbody")
let products = JSON.parse(localStorage.getItem("products"))
let totalPrice = document.querySelector(".total-price")
let productCount = document.querySelector("sup");
let deleteAll = document.querySelector(".delete-all");


if(totalPrice.innerText == ""){
    totalPrice.innerText = "0 ₼"
}

for (const product of products) {
    tableBody(product)
}

function tableBody(product) {
    tBody.innerHTML += `
    <tr>
    <td><img src="${product.picture}" alt=""></td>
    <td>${product.name}</td>
    <td><span class="sync-price" data-id=${product.id}>${oneProductPrice(product)}</span> ₼</td>
    <td class="product-count" data-id = ${product.id}>
    <span class="decrease" data-id="${product.id}">-</span>
    <span class="sync-count" data-id=${product.id}>${product.count}</span>
    <span class="increase" data-id="${product.id}">+</span>
    </td>
    <td>
    <i data-id="${product.id}" class="fa-solid fa-trash"></i>
    </td>
    </tr>
    `
}

let deleteButtons = document.querySelectorAll(".fa-trash")
let decreaseCountButtons = document.querySelectorAll(".decrease")
let increaseCountButtons = document.querySelectorAll(".increase")
let syncCounts = document.querySelectorAll(".sync-count")
let syncPrices = document.querySelectorAll(".sync-price")

for (const btn of deleteButtons) {
    btn.addEventListener("click", function () {
        this.parentNode.parentNode.remove()

        let deleteProduct = products.find(m => m.id == btn.getAttribute("data-id"))

        let deleteIndex = products.indexOf(deleteProduct)

        if (deleteIndex > -1) {
            products.splice(deleteIndex, 1)
        }

        localStorage.setItem("products", JSON.stringify(products))

        totalPrice.innerText = `${getPrice(JSON.parse(localStorage.getItem("products")))} ₼`

        productCount.innerText = getCartCount(JSON.parse(localStorage.getItem("products")))
    })
}

decreaseCountButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        let changeProduct = products.find(m => m.id == btn.getAttribute("data-id"))
        if (changeProduct.count > 1) {
            changeProduct.count--;
            localStorage.setItem("products", JSON.stringify(products))

            for (const syncCount of syncCounts) {
                if (syncCount.getAttribute("data-id") == btn.getAttribute("data-id")) {
                    syncCount.innerText = syncCount.innerText - 1
                }
            }

            for (const syncPrice of syncPrices) {
                if (syncPrice.getAttribute("data-id") == btn.getAttribute("data-id")) {
                    syncPrice.innerText = syncPrice.innerText - changeProduct.price
                }
            }
        }
        totalPrice.innerText = `${getPrice(JSON.parse(localStorage.getItem("products")))} ₼`

        productCount.innerText = getCartCount(JSON.parse(localStorage.getItem("products")))
    })
});

increaseCountButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        let changeProduct = products.find(m => m.id == btn.getAttribute("data-id"))

        changeProduct.count++;
        localStorage.setItem("products", JSON.stringify(products))

        for (const syncCount of syncCounts) {
            if (syncCount.getAttribute("data-id") == btn.getAttribute("data-id")) {
                syncCount.innerText = parseInt(syncCount.innerText) + 1
            }
        }

        for (const syncPrice of syncPrices) {
            if (syncPrice.getAttribute("data-id") == btn.getAttribute("data-id")) {
                syncPrice.innerText = parseInt(syncPrice.innerText) + changeProduct.price
            }
        }

        totalPrice.innerText = `${getPrice(JSON.parse(localStorage.getItem("products")))} ₼`

        productCount.innerText = getCartCount(JSON.parse(localStorage.getItem("products")))
    })
});

deleteAll.addEventListener("click", function(){
    while (tBody.hasChildNodes()){
        tBody.firstChild.remove()
    }

    localStorage.clear();

    totalPrice.innerText = `0 ₼`

    productCount.innerText = "0"
})


function getPrice(products) {
    let sum = 0;
    for (const product of products) {
        sum += (product.price * product.count);
    }
    return sum;
}

totalPrice.innerText = `${getPrice(JSON.parse(localStorage.getItem("products")))} ₼`

function getCartCount(products) {
    let count = 0;
    for (const product of products) {
        count += product.count
    }
    return count;
}

productCount.innerText = getCartCount(JSON.parse(localStorage.getItem("products")))

function oneProductPrice(product) {
    return product.price * product.count;
}

console.log(tBody.hasChildNodes());