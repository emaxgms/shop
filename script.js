document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
	const productTemplate = document.querySelector('[data-product-template]');
    fetch('prodotti.csv').then(response => response.text()).then(data => {
        const products = parseCSV(data);
        displayProducts(products);
    }).catch(error => console.error('Error loading products:', error));

    function parseCSV(csv) {
        const lines = csv.split('\n').filter((line) => line.trim() !== '');
        return lines.map(line => {
            const [title, description, price, image, link] = line.split(',');
            return {
                title,
                description,
                price,
                image,
                link
            };
        });
    }

    function displayProducts(products) {
        products.forEach(product => {
			const card = productTemplate.cloneNode(true); // Clona il template
			card.removeAttribute('hidden'); // Rendi visibile la card
			card.querySelector('.product-title').textContent = product.title;
			card.querySelector('.product-description').textContent = product.description;
			card.querySelector('.product-price').textContent = product.price;
			card.querySelector('.product-image').src = encodeURI(product.image);
			card.querySelector('.product-image').alt = product.title;
			card.querySelector('.product-info').href = product.link;

			productContainer.appendChild(card); // Aggiungi la card al contenitore
        });
    }

});