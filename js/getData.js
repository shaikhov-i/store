const PARAM = {
    cat: 'category',
    subcat: 'subcategory',
    search: ['category', 'name', 'description', 'subcategory']
};


export const getData = {
    url: 'database/dataBase.json',
    getD(process) {
        fetch(this.url)
            .then(response => response.json())
            .then(process);
    },
    wishList(list, callback) {
        this.getD(data => {
            const result = data.filter(item => {
                return list.includes(item.id);
            });
            callback(result);
        });
    },
    item(value, callback) {
        this.getD(data => {
            const result = data.find(item => {
                return value === item.id;
            });
            callback(result);
        });
    },
    cart(obj, callback) {
        this.getD(data => {
            const result = data.filter(item => {
                return obj.some(elem => {
                    return elem.id === item.id;
                });
            });
            callback(result);
        });
    },
    category(prop, value, callback) {
        this.getD(data => {
            const result = data.filter(item => {
                return item[PARAM[prop]] === value;
            });
            callback(result);
        });
    },
    search(value, callback) {
        this.getD(data => {
            const result = data.filter(item => {
                for (const prop in item) {
                    if (PARAM.search.includes(prop) &&
                        item[prop].toLowerCase().includes(value.toLowerCase())) {
                        return true;
                    }
                }
            });
            callback(result);
        });
    },
    catalog(callback) {
        this.getD(data => {
            const result = [];
            data.forEach(element => {
                if (!result.includes(element[PARAM.cat])) {
                    result.push(element[PARAM.cat]);
                }
            });
            callback(result);
        });
    },
    subCatalog(value, callback) {
        this.getD(data => {
            const result = [];
            data.forEach(element => {
                if (!result.includes(element[PARAM.subcat]) && value === element[PARAM.cat]) {
                    result.push(element[PARAM.subcat]);
                }
            });
            callback(result);
        });
    },
};