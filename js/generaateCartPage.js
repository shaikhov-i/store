import {userData} from './userData.js';
import {getData} from './getData.js'
'use strict';

export function generateCartPage() {
    if(location.pathname.includes('cart')) {
        const cartList = document.querySelector('.cart-list');
        const cartTotalPrice = document.querySelector('.cart-total-price');
        
        // cartList.textContent = '';

        const renderCartList = (data) => {
            console.log(data);
            let totalPrice = 0;
            cartList.textContent = '';

            data.forEach(({name:itemName, id, img, price, description, count}) => {
                let options = '';

                let countUser = userData.cartList.find(item => item.id === id).count;
                
                if(countUser > count) {
                    countUser = count;
                }
              
                for (let i = 1; i <= count; i++) {
                    options += `<option value="${i}" ${countUser === i ? 'selected' : ''}>${i}</option>`
                }
                totalPrice+= countUser * price;
                if(countUser != 0) {
                    cartList.insertAdjacentHTML('beforeend',  
                    `<li class="cart-item">
                        <div class="product">
                            <div class="product__image-container">
                                <img src="${img}" alt="IKEA ФАБЛЕР БЬЁРН Мягкая игрушка" aria-describedby="aria_product_description_40366083" itemprop="image">
                            </div>
                            <div class="product__description">
                                <h3 class="product__name">
                                    <a href="card.html#${id}">${itemName}</a></h3>
                                <p class="product_description-text">${description}</p>
                            </div>
                            <div class="product__prices">
                                <div class="product__price-type product__price-type-regular">
                                    <div>
                                        <div class="product__total product__total-regular">${countUser * price}.-</div>
                                        ${countUser > 1 ? `<div class="product__price-regular">${price}.-</div>` : ``}
                                    </div>
                                </div>
                            </div>
                            <div class="product__controls">
    
                                <div class="product-controls__remove">
                                    <button type="button" class="btn btn-remove" data-idd="${id}">
                                        <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                                    </button>
                                </div>
                                <div class="product-controls__quantity">
                                    <select title="Выберите количество" aria-label="Выберите количество" data-idd="${id}">
                                        ${options}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </li>`);
                }
                cartTotalPrice.textContent = totalPrice;
            });
        };
        
        cartList.addEventListener('change', (ev) => {
            console.log(ev.target);
            userData.changeCountCartList = {
                id: ev.target.dataset.idd,
                count: parseInt(ev.target.value)
            }
            getData.cart(userData.cartList, renderCartList);
        });
        cartList.addEventListener('click', (ev) => {
            const btnRemove = ev.target.closest('.btn-remove'); 
            if(btnRemove) {
                userData.deleteItemCart = btnRemove.dataset.idd;
                getData.cart(userData.cartList, renderCartList);
            }
            
        });
        getData.cart(userData.cartList, renderCartList);
    }
}