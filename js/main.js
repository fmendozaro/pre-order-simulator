"use strict";

const API_URL = "https://preorder-json-srv.glitch.me/inventory";
let options;

let addCartBtn = document.querySelector("#add-to-cart");

addCartBtn.addEventListener("click", e => {
    getInventory().then(items => {
        items.forEach(itemObj => {
            if(itemObj.name === 'ps5'){
                console.log(itemObj);
                if (itemObj.quantity <= 0) {
                    console.error("outta stock")
                } else {
                    itemObj.quantity--;
                    options = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(itemObj),
                    };
                    updateInventory(itemObj.id, options).then(response => console.log(response)).catch(error => console.error(error));
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