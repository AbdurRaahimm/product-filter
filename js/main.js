import {formatPrice} from './FormatPrice.js';
import { starRating } from './starRating.js';
const gridList = document.querySelectorAll('.gridList i');
const productContainer = document.querySelector('.productContainer');
console.log(productContainer);

gridList.forEach((grid) => {
    // check bi-grid-3x3-gap-fill this class then add class grid-cols-4 otherwise add class grid-cols-1
    grid.addEventListener('click', () => {
        if (grid.classList.contains('bi-grid-3x3-gap-fill')) {
            productContainer.classList.add('grid-cols-3');
        } else {
            productContainer.classList.remove('grid-cols-3');
        }
    });
});

// dynamic product fethcing 
const productFetch = async () => {
    const response = await fetch('./data/products.json');
    const { products } = await response.json();
    return products;
};

const products = await productFetch();

products.forEach((product) => {
    productContainer.innerHTML += `
    <div class="bg-white p-4 rounded shadow space-y-3">
        <img class="rounded" loading="lazy" src="${product.image}" alt="produc-img">
        <h1 class="text-xl font-bold"> ${product.title} </h1>
        <div class="">
            ${product.category.map((cat) => `<span class="text-gray-500">${cat}</span>`).join(',')}
        </div>              
        <p class="text-gray-500">
            ${starRating(product.rating)}(${product.rating})
        </p>
        <div class="color"> 
            ${
                product.colors.map((color) => {
                    return `<span class="w-4 h-4 rounded-full inline-block m-px" style="background:${color};"></span>`
                }).join('')                               
            }
        </div>
        <div class="flex justify-between items-center mt-4">
            <h1 class="text-2xl font-bold text-pink-500">${formatPrice(product.price)}</h1>
            <button class="px-4 py-2 bg-blue-500 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 ">Add to Cart</button>
        </div>
    </div>`;
});