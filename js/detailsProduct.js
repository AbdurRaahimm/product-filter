import { $ } from "./selectorBind.js";
const id = new URLSearchParams(window.location.search).get('id')

console.log(id)

let items = []
const detailsProduct = async(url)=>{
    try {
        let res = await fetch(url);
        let {products} = await res.json();
        items = products;
        let item = items.find(p => p.id == id);
        console.log(item);
        $('.productDetails').innerHTML += `
        <div class="details-img">
            <img src="${item.image}" alt="product">
        </div>
        <h2 class="title-product">${item.title}</h2>
        <div class="price-product">
            <p><del>${item.price}</del> ${item.discount}</p>
        </div>
        <div class="color-product">
            ${item.colors
            .map((color)=>{
                return `<span class="clr">${color}</span>`
            })
            .join(',')}
        </div>
        <div class="btn-details">
            <button class="btn btn-add-cart"><i class="bi bi-cart-plus"></i> Add to Cart</button>
        </div>
        <div class="details-info">
            <h4>Details</h4>
            <p>${item.description}</p>
        </div>
        <div class="details-info">
            
            <p>Stock : ${item.stock}</p>
        </div>
        <div class="details-info">
            <h4>Reviews</h4>
            <p>${item.rating}</p>
        </div>
        <div class="details-info">
    
        </div>
        `
    }
    catch (error) {
        console.log(error)
    }
}
detailsProduct(`./src/data/products.json`)