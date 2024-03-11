import {$, $$} from './selectorBind.js';
const filterInput = $('.filter-search input');
const sortedd = $('.productListTop #sortedd');
const categoryList = $('.filter-category ul');
const colorList = $('.filter-color ul');

// console.log(categoryList);
// filterInput.oninput = () =>{
//     console.log(filterInput.value)
// }
let items =[];

const productFetch = async(url)=>{
    try {
        let res = await fetch(url)
        let {products} = await res.json()
        items = products
        // category append in ul 
        let categories = [...new Set(products.map(item => item.category).flat())];
        // console.log(categories);
        categories.map(cat=>{
            categoryList.innerHTML += `<li> ${cat}</li>`      
        })
        // color append in ul
        let colors = [...new Set(products.map(item => item.colors).flat())];
        // console.log(colors);
        colors.map(color=>{
            const li = document.createElement("li");
            li.innerText = color;
            // colorList.innerHTML += `<li> </li>`
            colorList.appendChild(li);
        })
        // console.log(products);
        items
        .filter(item =>{   
            return(
                item.title.toLowerCase().includes(filterInput.value.toLowerCase()) 
                // (item.category === categoryList.textContent) &&
                // (item.colors === colorList.textContent) 
            )
        })
        .sort((a,b)=>{
            if(sortedd.value == 'default'){
                return a.id - b.id
            }else if(sortedd.value == 'low'){
                return a.price - b.price
            }else if(sortedd.value == 'high'){
                return b.price - a.price
            }else if(sortedd.value == 'new'){
                return b.id - a.id
            }else if(sortedd.value == 'rating'){
                return b.rating - a.rating
            }
        })
        .forEach(item => {
            // console.log(item);
            $('.ProductList').innerHTML += `
            <div class="products">
            <div class="product">
                <div class="product-img">
                   <a href="detailsProduct.html?id=${item.id}"><img src="${item.image}" alt="product"></a>
                </div>
                <div class="btn-overlay">
                    <button class="btn btn-compare"><i class="bi bi-shuffle"></i></button>
                    <button class="btn btn-wishlist"><i class="bi bi-heart"></i></button>
                    <button class="btn btn-view"><i class="bi bi-arrows-fullscreen"></i></button>
                </div>
                <div class="btn-details">
                    <button class="btn btn-add-cart"><i class="bi bi-cart-plus"></i> Add to Cart</button>
                </div>
            </div>
            <div class="product-info">
                <h4>${item.title}</h4>
                <ul>${
                    item.category
                    .map((cat)=>{
                        return `<li style="list-style:none; display:inline-block;" >${cat}</li>`
                    }).join(' ,')
                }</ul>
                <p><del>${item.price}</del> ${item.discount}</p>
                <div class="stars">
                    <!-- <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star"></i> -->
                    (${item.rating} reviews)
                </div>
                <div class="color">
                    ${item.colors
                    .map((color)=>{
                        return `<span class="clr" style="background:${color}"></span>`
                    })
                    .join('')}

                </div>
            </div>
        </div>
        `;
        });
      } catch (error) {
        console.log(error)
      }
}

export default productFetch;

filterInput.onkeyup = (e) =>{
    e.preventDefault();
    $('.ProductList').innerHTML = '';
    productFetch('./src/data/products.json')

}
sortedd.onchange = (e) =>{
    e.preventDefault();
    $('.ProductList').innerHTML = '';
    productFetch('./src/data/products.json')
}
// categoryList.onclick = (e) =>{
//     e.preventDefault();
//     $('.ProductList').innerHTML = '';
//     productFetch('./src/data/products.json')
// }



const productssList = $$('.ProductsList .ProductList .products'),
btn = $$('.pagination button');

// console.log(productssList);