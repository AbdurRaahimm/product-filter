import displayProducts from './displayProducts.js';
const gridList = document.querySelectorAll('.gridList i');
const productContainer = document.querySelector('.productContainer');
const inputFilter = document.querySelector('#inputFilter input');
const sortFilter = document.querySelector('#sortFilter');
const showPerItem = document.querySelector('#showPerItem');
const category = document.querySelector('#category ul');
// console.log(sortFilter);

// grid view and list view
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


let items = [];
// dynamic product fethcing 
const productFetch = async () => {
    const response = await fetch('./data/products.json');
    const { products } = await response.json();
    items = products;
    // category append in ul
    let categories = [...new Set(products.map(item => item.category).flat())];
    categories.map(cat => {
        const li = document.createElement('li');
        li.innerText = cat + `(${products.filter(item => item.category.includes(cat)).length})`;
        li.addEventListener('click', () => filterItemsByCategory(cat));
        li.classList.add('py-1', 'hover:text-pink-500', 'cursor-pointer');
        category.appendChild(li);
        // category.innerHTML += `<li  class="py-1 hover:text-pink-500 cursor-pointer"> ${cat}</li>`;
    });

    // Display all products initially
    items.forEach((product) => {
        displayProducts(product);
    });
};
await productFetch();



// input filter product if not found then show empty message 
inputFilter.addEventListener('keyup', (e) => {
    const value = e.target.value;
    const filterProduct = items.filter((product) => {
        return product.title.toLowerCase().includes(value.toLowerCase());
    });
    productContainer.innerHTML = '';
    if (filterProduct.length === 0) {
        productContainer.innerHTML = `<h1 class="text-2xl text-center">Product not found</h1>`;
    } else {
        filterProduct.forEach((product) => {
            displayProducts(product);
        });
    }
});

// sort product
sortFilter.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value === 'low') {
        items.sort((a, b) => a.price - b.price);
    } else if (value === 'high') {
        items.sort((a, b) => b.price - a.price);
    } else if (value === 'rating') {
        items.sort((a, b) => b.rating - a.rating);
    } else if (value === 'new') {
        items.sort((a, b) => b.id - a.id);
    } else {
        items.sort((a, b) => a.id - b.id);
    }
    productContainer.innerHTML = '';
    items.forEach((product) => {
        displayProducts(product);
    });
});

// show per item product from items product 
showPerItem.addEventListener('change', (e) => {
    const value = e.target.value;
    productContainer.innerHTML = '';
    items.slice(0, value).forEach((product) => {
        displayProducts(product);
    });
});


// filter product by category
const filterItemsByCategory = (category) => {
    const filterProduct = items.filter((product) => {
        return product.category.includes(category);
    });
    productContainer.innerHTML = '';
    if (filterProduct.length === 0) {
        productContainer.innerHTML = `<h1 class="text-2xl text-center">Product not found</h1>`;
    } else {
        filterProduct.forEach((product) => {
            displayProducts(product);
        });
    }
};


