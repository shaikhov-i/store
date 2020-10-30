import {getData} from './getData.js';
'use strict';

const wishList = ['idd005', 'idd100', 'idd077', 'idd033'];
const cartList = [
   {
       id: 'idd015',
       count: 3
   },
   {
    id: 'idd045',
    count: 1
   },
   {
    id: 'idd095',
    count: 2
   }
];

export function generateGoodsPage() {
    if(location.pathname.includes('goods') && location.search) {
        let search = location.search;
        let prop = search.split('=')[0].substring(1);
        let value = decodeURI(search.split('=')[1]);
        
        const mainHeader = document.querySelector('.main-header');
        const goodsList = document.querySelector('.goods-list');

        function generateCards(data) {
            goodsList.textContent = '';
            if(data.length == 0) {
                const goods = document.querySelector('.goods');
                goods.textContent = location.search === '?cat=wishlist' ?
                'Список желаний пуст':'К сожалению по вашему запросу ничего не найдено';
                return;
            } 
            data.forEach(item => {
                const {name: itemName, description, price, img:image, id} = item;
                goodsList.insertAdjacentHTML('afterbegin', 
                `<li class="goods-list__item">
                <a class="goods-item__link" href="card.html#${id}">
                    <article class="goods-item">
                        <div class="goods-item__img">
                            <img src="${image[0]}"
                                 ${image[1]?`data-second-image="${image[1]}`: ''} alt="ФАБЛЕР БЬЁРН">
                        </div>
                        <h3 class="goods-item__header">${itemName}</h3>
                        <p class="goods-item__description">${description}</p>
                        <p class="goods-item__price">
                            <span class="goods-item__price-value">${price}</span>
                            <span class="goods-item__currency"> ₽</span>
                        </p>
                        <button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="idd001"></button>
                    </article>
                </a>
            </li>`);
            });
        }

        if(prop === 's') {
            getData.search(value, generateCards);
            mainHeader.innerHTML = `Результаты поиска: ${value}`;
        } else if(value === 'wishlist') {
            getData.wishList(wishList, generateCards);
            mainHeader.innerHTML = `Список желаний`;
        }  else if(prop === 'cat' || prop === 'subcat'){
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }
    }
}