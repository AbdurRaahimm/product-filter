import { formatPrice } from "./formatPrice.js";
import { starRating } from "./starRating.js";
const cardItems = document.querySelector('.card #cardItems');
const aside = document.querySelector('aside');
let totalPrice = document.querySelector('.totalPrice');
console.log(cardItems);
const productContainer = document.querySelector('.productContainer');

const displayProducts = (product) => {
    productContainer.innerHTML += `
    <div class="bg-white p-4 rounded shadow space-y-3">
        <a href="singleProduct.html?id=${product.id}"><img class="rounded" loading="lazy" src="${product.image}" alt="produc-img"></a>
        <a href="singleProduct.html?id=${product.id}"><h1 class="text-xl font-bold"> ${product.title} </h1></a>
        <div class="">
            ${product.category.map((cat) => `<span class="text-gray-500">${cat}</span>`).join(',')}
        </div>              
        <p class="text-gray-500">
            ${starRating(product.rating)}(${product.rating})
        </p>
        <div class="color"> 
            ${product.colors.map((color) => {
        return `<span class="w-4 h-4 rounded-full inline-block m-px" style="background:${color};"></span>`
    }).join('')
        }
        </div>
        <div class="price flex justify-between items-center mt-4">
            <h1 class="text-2xl font-bold text-pink-500">${formatPrice(product.price)}</h1>
            <button class="addTocard px-4 py-2 bg-blue-500 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 ">Add to Cart</button>
        </div>
    </div>`;

    const btns = productContainer.querySelectorAll('.addTocard');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // increse count items
            let count = parseInt(cardItems.innerText.match(/\d+/g));
            count++;
            cardItems.innerText = `(${count})`;

            // items list add in aside
            const product = e.target.parentElement;
            const productImg = product.parentElement.querySelector('img').src;
            const productTitle = product.parentElement.querySelector('h1').innerText;
            const productPrice = product.parentElement.querySelector('.price h1').innerText;
            aside.innerHTML += `
            <div class="flex justify-between items-center p-4 bg-white rounded shadow space-x-3">
                <img class="w-20 h-20 rounded" src="${productImg}" alt="product-img" />
                <div class="text-left">
                    <h1 class="text-xl font-bold">${productTitle}</h1>
                    <p class="price text-gray-500">${productPrice}</p>
                </div>
                <button class="remove text-red-500 font-bold">X</button>
            </div>`;
            // calculate Total Price of Items
            let totalPrice = 0;
            const prices = aside.querySelectorAll('.price');
            console.log(prices)
            prices.forEach(price => {
                totalPrice += parseFloat(price.innerText.replace('$', ''));
            });
            document.querySelector('.totalPrice').innerText = `Total: ${formatPrice(totalPrice)}`;
        });
    })
};

export default displayProducts;

// remove card items
aside.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
        //decrese count item
        let count = parseInt(cardItems.innerText.match(/\d+/g));
        count--;
        cardItems.innerText = `(${count})`;

        
        console.log(e.target.parentElement.querySelector('.price').innerText.replace('$', ''))
        console.log(document.querySelector('.totalPrice').innerText.replace(/[^0-9.]/g, ''))
        // minus price from totalPrice 
        const newPrice = document.querySelector('.totalPrice').innerText.replace(/[^0-9.]/g, '') - e.target.parentElement.querySelector('.price').innerText.replace('$', '');
        // console.log(document.querySelector('.totalPrice').innerText.replace(/[^0-9.]/g, '') - e.target.parentElement.querySelector('.price').innerText.replace('$', ''))
        document.querySelector('.totalPrice').innerText = `Total: ${formatPrice(newPrice)}`;


    }
});
