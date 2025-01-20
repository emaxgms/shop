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
			card.querySelector('.product-link').href = product.link;

			productContainer.appendChild(card); // Aggiungi la card al contenitore
            // const card = createProductCard(product);
            // productContainer.appendChild(card);
        });
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
		console.log('RAW: ' + product.image);
		console.log('encodato: ' + encodeURI(product.image));
		const imgContainer = document.createElement("div");
		imgContainer.className = "product-image-container";
        const img = document.createElement('img');
        img.src = encodeURI(product.image);
        img.alt = product.title;
        img.className = 'product-image';
        img.addEventListener('click', () => window.open(product.link, '_blank'));
		imgContainer.appendChild(img);
        const info = document.createElement('div');
        info.className = 'product-info';
        const title = document.createElement('h2');
        title.className = 'product-title';
        title.textContent = product.title;
        const description = document.createElement('p');
        description.className = 'product-description';
        description.textContent = product.description;
        const price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = product.price;
        info.appendChild(title);
        info.appendChild(description);
        info.appendChild(price);
        card.appendChild(img);
        card.appendChild(info);
        return card;
    }
});