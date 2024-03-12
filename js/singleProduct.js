import { starRating } from "./starRating.js";

const singleProductDiv = document.querySelector("#singleProduct")
const id = new URLSearchParams(window.location.search).get('id');
console.log(id)

const singleProduct = async()=>{
    try {
        let res = await fetch('./data/products.json');
        let {products} = await res.json();
        let item = products.find(p => p.id == id);
        console.log(item);
        singleProductDiv.innerHTML += `
        <div class="container mx-auto mt-4">
        <div class="flex gap-4">
            <div class="w-1/2">
                <img id="productImage" src="${item.image}" alt="product" class="w-full h-96 object-cover rounded shadow">
            </div>
            <div class="w-1/2">
                <h1 id="productName" class="text-3xl font-bold">${item.title}</h1>
                <p>
                ${starRating(item.rating)} (${item.rating} reviews)
                </p>
                <p>  ${item.category.map((cat) => `<span class="text-gray-500">${cat}</span>`).join(', ')}</p>
                <p id="productPrice" class="text-2xl font-bold text-pink-500">Price: ${item.price}</p>
                <p>
                    ${
                        item.colors.map((color) => {
                            return `<span class="w-4 h-4 rounded-full inline-block m-px" style="background:${color};"></span>`
                        }).join('')
                    }
                </p>
                <p id="productDescription" class="text-lg mt-4">${item.description}</p>
                <p class="text-2xl font-bold text-pink-500">Stock :${item.stock}</p>
                <!-- increse product quantity plus and minus-->
                <div class="flex gap-4 mt-4">
                    <button id="decrease" class="px-4 py-2 bg-gray-500 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded ">-</button>
                    <input id="quantity" type="text" class="px-4 py-2 w-16 text-center border-2 border-gray-500 rounded" value="1">
                    <button id="increase" class="px-4 py-2 bg-gray-500 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded ">+</button>
                </div>

                <div class="flex gap-4 mt-4">
                    <button class="px-4 py-2 bg-blue-500 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded ">Add to Cart</button>
                    <button class="px-4 py-2 bg-pink-500 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded ">Buy Now</button>
                </div>
            </div>
        </div>
    </div>  
        `;
    }
    catch (error) {
        console.log(error)
    }  
};

await singleProduct();

//  increase and decrease product quantity
const quantity = document.querySelector('#quantity');
const increase = document.querySelector('#increase');
const decrease = document.querySelector('#decrease');
increase.addEventListener('click', () => {
    quantity.value = parseInt(quantity.value) + 1;
});
decrease.addEventListener('click', () => {
    if (parseInt(quantity.value) > 1) {
        quantity.value = parseInt(quantity.value) - 1;
    }
});
