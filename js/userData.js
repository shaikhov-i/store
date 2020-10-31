import {getLocalStorage, setLocalStorage} from './storage.js';
'use strict';

export const userData = {
    wishListData: getLocalStorage('wishList'),
    get wishList() {
        console.log(this.wishListData);
        return this.wishListData;
    },
    set wishList(data) {
        if(this.wishListData.includes(data)) {
            const index = this.wishListData.indexOf(data);
            this.wishListData.splice(index, 1);
        } else {
            this.wishListData.push(data);
        }
        setLocalStorage('wishList', this.wishList);
    },
    cartListData: getLocalStorage('cartList'),
    get cartList() {
        return this.cartListData;
    },
    set cartList(id) {
        let obj = this.cartListData.find(item => item.id === id);
        if(obj) {
            obj.count++;
        } else {
            obj = {
                id,
                count : 1
            }
            this.cartListData.push(obj);
        }
        setLocalStorage('cartList', this.cartList);
    },
    set changeCountCartList(itemCart) {
        let obj = this.cartListData.find(item => item.id === itemCart.id);
        obj.count = itemCart.count;
        setLocalStorage('cartList', this.cartList);
    },
    set deleteItemCart(idd) {
        let index = -1;
        this.cartListData.forEach((item, i) => {
            if(item.id === idd) {
                index = i;
            }
        });
        this.cartListData.splice(index, 1);
        setLocalStorage('cartList', this.cartList);
    }
}

