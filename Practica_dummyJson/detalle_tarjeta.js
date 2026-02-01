const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const inputBusqueda = document.getElementById('input-busqueda');
const botonBuscar = document.getElementById('boton-buscar');

async function cargarProductos(textoBusqueda = '') {
  let url = 'https://dummyjson.com/products?limit=15';
  if (textoBusqueda) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(textoBusqueda)}&limit=15`;
  }

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    contenedorTarjetas.innerHTML = '';
    
    datos.products.forEach(producto => {
      const tarjeta = document.createElement('div');
      tarjeta.className = 'tarjeta-producto';

      tarjeta.innerHTML = `
        <img src="${producto.thumbnail}" alt="${producto.title}">
        <h3 class="producto-titulo">${producto.title}</h3>
        <p class="producto-categoria">${producto.category}</p>
        <p class="producto-precio">$${producto.price}</p>
        <p class="producto-rating">★ ${producto.rating}</p>
      `;

      tarjeta.addEventListener('click', () => {
        window.location.href = `pagina_producto.html?id=${producto.id}`;
      });

      contenedorTarjetas.appendChild(tarjeta);
    });
  } catch (error) {
    console.error('Error al cargar productos:', error);
    contenedorTarjetas.innerHTML = '<p style="color:red; font-size:1.2rem;">Error al cargar los productos</p>';
  }
}

botonBuscar.addEventListener('click', () => {
  cargarProductos(inputBusqueda.value.trim());
});

inputBusqueda.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    cargarProductos(inputBusqueda.value.trim());
  }
});