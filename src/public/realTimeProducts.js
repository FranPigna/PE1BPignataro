const socketClient = io();

const formAdd = document.getElementById('productFormAdd');
const formDel = document.getElementById('productFormDel');
const prodName = document.getElementById('name');
const prodPrice = document.getElementById('price');
const prodThumbnails = document.getElementById('thumbnails');
const prodIdToDelete = document.getElementById('productId');
const tableBody = document.getElementById('productTableBody');


formAdd.onsubmit = (e) => {
    e.preventDefault();

    const name = prodName.value;
    const price = prodPrice.value;
    const thumbnails = prodThumbnails.value;

    socketClient.emit('newProd', { name, price, thumbnails });
    formAdd.reset();
};

formDel.onsubmit = (e) => {
    e.preventDefault();

    const productId = prodIdToDelete.value;

    socketClient.emit('deleteProd', { id: productId });
    formDel.reset();
}

socketClient.on('updateProducts', (products) => {

    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.thumbnails}</td>
            
        `;

        tableBody.appendChild(row);
    });
});