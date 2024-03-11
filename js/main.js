const gridList = document.querySelectorAll('.gridList i');
const product = document.querySelector('.product');
console.log(product);

gridList.forEach((grid) => {
    // check bi-grid-3x3-gap-fill this class then add class grid-cols-4 otherwise add class grid-cols-1
    grid.addEventListener('click', () => {
        if (grid.classList.contains('bi-grid-3x3-gap-fill')) {
            product.classList.add('grid-cols-3');
        } else {
        product.classList.remove('grid-cols-3');
        }
    });
});