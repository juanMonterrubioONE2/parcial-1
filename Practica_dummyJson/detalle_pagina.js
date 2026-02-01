const contenedorDetalle = document.getElementById('contenedor-detalle');
const botonVolver = document.getElementById('boton-volver');

const parametrosURL = new URLSearchParams(window.location.search);
const idProducto = parametrosURL.get('id');

if (!idProducto) {
  contenedorDetalle.innerHTML = '<p>No se encontró el producto.</p>';
} else {
  fetch(`https://dummyjson.com/products/${idProducto}`)
    .then(respuesta => respuesta.json())
    .then(producto => {
      contenedorDetalle.innerHTML = `
        <h2>${producto.title}</h2>
        <img src="${producto.thumbnail}" alt="${producto.title}">
        <p><strong>Precio:</strong> $${producto.price}</p>
        <p><strong>Marca:</strong> ${producto.brand || 'No especificada'}</p>
        <p><strong>Categoría:</strong> ${producto.category}</p>
        <p><strong>Valoración:</strong> ${producto.rating} ★</p>
        <p>${producto.description}</p>

        <h3>Opiniones (${producto.reviews.length})</h3>
        ${producto.reviews.map(opinion => `
          <div style="border-bottom:1px solid #eee; margin:10px 0; padding-bottom:10px;">
            <strong>${opinion.reviewerName}</strong> - ${opinion.rating} ★<br>
            <em>${opinion.comment}</em><br>
            <small>${new Date(opinion.date).toLocaleDateString()}</small>
          </div>
        `).join('')}
      `;
    })
    .catch(error => {
      console.error(error);
      contenedorDetalle.innerHTML = '<p>Error al cargar el detalle del producto.</p>';
    });
}

botonVolver.addEventListener('click', () => {
  window.location.href = 'index.html';
});