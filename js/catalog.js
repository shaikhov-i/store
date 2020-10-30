import {getData} from './getData.js';
import {generateSubCatalog} from './generateSubCatalog.js';
'use strict';


export function catalog() {
    const updateSubCatalog = generateSubCatalog();
    const btnBurger = document.querySelector('.btn-burger'),
        catalog = document.querySelector('.catalog'),
        btnClose = document.querySelector('.btn-close'),
        subCatalogHeader = document.querySelector('.subcatalog-header'),
        catalogBtn = document.querySelector('.catalog-btn');
    let subCatalog, btnReturn;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.insertAdjacentElement('beforeend', overlay);
    function openMenu() {
        catalog.classList.add('open');
        overlay.classList.add('active');
    }

    function closeMenu() {
        catalog.classList.remove('open');
        overlay.classList.remove('active');
        closeSubMenu();
    }

    function handlerCatalog(event) {
        event.preventDefault();
        const target = event.target;
        const itemList = target.closest('.catalog-list__item');
        if (itemList) {
            getData.subCatalog(target.textContent, data => {
                updateSubCatalog(itemList.textContent.trim(), data);
                subCatalog = document.querySelector('.subcatalog');
                btnReturn = subCatalog.querySelector('.btn-return ');
                btnReturn.addEventListener('click', closeSubMenu);
                subCatalog.classList.add('subopen');
            });
        }
    }

    function closeSubMenu() {
        if(subCatalog) {
            subCatalog.classList.remove('subopen');
        } 
    }

    btnBurger.addEventListener('click', openMenu);
    btnClose.addEventListener('click', closeMenu);
    catalog.addEventListener('click', handlerCatalog);
    overlay.addEventListener('click', closeMenu);
}