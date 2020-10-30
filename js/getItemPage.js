import {getData} from './getData.js';
import {userData} from './userData.js';
const NEW_COUNT = 6;

export const generateItemPage = () => {

    function renderCard(data) {
        const {category, subcategory, name: itemName, price, description, id, img: image, count} = data;
        const breadcrumbLink = document.querySelectorAll('.breadcrumb__link')
        const goodImages = document.querySelector('.good-images');
        const goodItemNew = document.querySelector('.good-item__new');
        const goodItemHeader = document.querySelector('.good-item__header');
        const goodItemPriceValue = document.querySelector('.good-item__price-value');
        const goodItemDescription = document.querySelector('.good-item__description');
        const goodItemEmpty = document.querySelector('.good-item__empty');
        const btnGood = document.querySelector('.btn-good');
        const btnAddWishlist = document.querySelector('.btn-add-wishlist');
        console.log(data);

        goodItemHeader.textContent = itemName;
        goodItemDescription.textContent = description;
        goodItemPriceValue.textContent = price;
        btnGood.dataset.idd = id;
        btnAddWishlist.dataset.idd = id;

        let arr = [category, subcategory, itemName];
        for (let i = 0; i < arr.length; i++) {
            breadcrumbLink[i].textContent = arr[i];
            if(i < 1) {
                breadcrumbLink[i].href = `goods.html?cat=${category}`
            } else {
                breadcrumbLink[i].href = `goods.html?subcat=${subcategory}`
            }
        }

        image.forEach(item => {
            goodImages.insertAdjacentHTML('beforeend', 
            `<div class="good-image__item">
                <img src="${item}" alt="${itemName} - ${description}">
            </div>`);
        });

        if(count > NEW_COUNT) {
            goodItemNew.style.display = 'block';
        } else if(!count) {
            goodItemEmpty.style.display = 'block';
            btnGood.style.display = 'none';
        }
        function checkWishList() {
            if(userData.wishList.includes(id)) {
                btnAddWishlist.classList.add('contains-wishlist');
            } else {
                btnAddWishlist.classList.remove('contains-wishlist');
            }
        }

        btnAddWishlist.addEventListener('click', function() {
            userData.wishList = id;
            checkWishList();
        });
    }

    if(location.hash) {
        getData.item(location.hash.substring(1), renderCard);
    }
}