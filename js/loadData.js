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
import {getData} from './getData.js';


export function loadData() {
    if(location.search) {
        let search = location.search;
        let prop = search.split('=')[0].substring(1);
        let value = decodeURI(search.split('=')[1]);
        
        if(prop === 's') {
            getData.search(value, data => console.log(data));
        } else if(value === 'wishlist') {
            getData.wishList(wishList, (data) => {
                // console.log(data);
            });
        }  else if(prop === 'cat' || prop === 'subcat'){
            // console.log(prop, value);
            getData.category(prop, value, data => console.log(data));
        }
        // console.log(prop);
    }
    // if(location.hash) {
    //     getData.item(location.hash.substring(1), (data) => console.log(data));
    // }
    if(location.pathname.includes('cart')) {
        getData.cart(cartList, (data) => console.log(data));
    }

    // getData.catalog(data => console.log(data));
    // getData.subCatalog('Мебель' ,(data) => console.log(data));

}