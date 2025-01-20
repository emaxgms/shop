document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    fetch('products.csv').then(response => response.text()).then(data => {
        const products = parseCSV(data);
        displayProducts(products);
    }).catch(error => console.error('Error loading products:', error));

    function parseCSV(csv) {
        const lines = csv.split('\n');
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
            const card = createProductCard(product);
            productContainer.appendChild(card);
        });
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.className = 'product-image';
        img.addEventListener('click', () => window.open(product.link, '_blank'));
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