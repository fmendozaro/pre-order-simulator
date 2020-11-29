"use strict";

const API_URL = "https://preorder-json-srv.glitch.me/inventory";
const MAX_INVENTORY = 10;
let options;

let addCartBtn = document.querySelector("#add-to-cart");
let stock = document.querySelector("#stock");

init();

function init(){
    showLoading('Checking Inventory');
    options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": 1,
            "name": "ps5",
            "quantity": Math.floor(Math.random() * Math.floor(MAX_INVENTORY))
        }),
    };
    updateInventory(1, options).then( (e) => {
        hideLoading();
    });

    refreshInventory();
}

function refreshInventory(){
    showLoading();
    getInventory().then(items => {
        hideLoading();
        items.forEach(itemObj => {
            if(itemObj.name === 'ps5'){
                stock.innerHTML = itemObj.quantity;
            }
        });
    });
}

addCartBtn.addEventListener("click", e => {
    showLoading('Trying to add to the cart');
    getInventory().then(items => {
        hideLoading();
        items.forEach(itemObj => {
            if(itemObj.name === 'ps5'){
                if (itemObj.quantity <= 0) {
                    addCartBtn.disabled=true;
                    console.error("outta stock");
                } else {
                    itemObj.quantity--;
                    options = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(itemObj),
                    };
                    updateInventory(itemObj.id, options).then(response => {
                        stock.innerHTML = itemObj.quantity;
                    }).catch(error => console.error(error));
                }
            }
        });
    }).catch(error => console.error(error));
});

function getInventory() {
    return fetch(API_URL).then(response => response.json())
}

function updateInventory(id, options) {
    return fetch(`${API_URL}/${id}`, options).then(response => response.json())
}