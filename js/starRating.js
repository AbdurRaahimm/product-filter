const starRating = (rating) => {
   return Array.from({ length: 5 }, (_, i) => {
        let num = i + 0.5;
        if (rating >= i + 1) {
            return `<i class="bi bi-star-fill text-yellow-500"></i>`;
        }
        if (rating >= num) {
            return `<i class="bi bi-star-half text-yellow-500"></i>`;
        }
        return `<i class="bi bi-star text-yellow-500"></i>`;
    }).join('');
}
export { starRating };
