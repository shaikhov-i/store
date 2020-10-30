'use strict';

export const userData = {
    wishListData: ['idd005', 'idd100', 'idd077', 'idd033'],
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
    },
    cartListData: [
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
    ]
}

