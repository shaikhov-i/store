'use strict';



import {generateHeader} from './generateHeader.js';
import {generateFooter} from './generateFooter.js';
import {generateCatalog} from './generateCatalog.js';
import {generateSubCatalog} from './generateSubCatalog.js';
import {loadData} from './loadData.js';
import {generateCartPage} from './generaateCartPage.js';
import {generateGoodsPage} from './generateGoodsPage.js';
import {generateItemPage} from './getItemPage.js';

generateHeader();
generateFooter();
generateCatalog();
generateSubCatalog();
generateCartPage()
generateGoodsPage();
generateItemPage();
loadData();
