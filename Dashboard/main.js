
let paginaActual = 1;
const LIMITE = 10;
let totalProductos = 0;
let busqueda = '';
let categoria = '';
let orden = '';

const contenedor = document.getElementById('contenedor-productos');
const inputBusqueda = document.getElementById('input-busqueda');
const btnBuscar = document.getElementById('btn-buscar');
const selectCategoria = document.getElementById('select-categoria');
const selectOrden = document.getElementById('select-orden');
const btnAnterior = document.getElementById('btn-anterior');
const btnSiguiente = document.getElementById('btn-siguiente');
const infoPagina = document.getElementById('info-pagina');
const btnNuevo = document.getElementById('btn-nuevo');

async function cargarCategorias() {
  try {
    const res = await fetch('https://dummyjson.com/products/category-list');
    const cats = await res.json();
    cats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      selectCategoria.appendChild(opt);
    });
  } catch (e) {
    console.error("Error categorías", e);
  }
}

async function cargarProductos() {
  const skip = (paginaActual - 1) * LIMITE;
  let url = `https://dummyjson.com/products?limit=${LIMITE}&skip=${skip}`;

  if (busqueda) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(busqueda)}&limit=${LIMITE}&skip=${skip}`;
  } else if (categoria) {
    url = `https://dummyjson.com/products/category/${categoria}?limit=${LIMITE}&skip=${skip}`;
  }

  if (orden) {
    const [campo, direccion] = orden.split('-');
    url += `&sortBy=${campo}&order=${direccion}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    totalProductos = data.total;
    renderProductos(data.products);
    actualizarPaginacion();
  } catch (err) {
    contenedor.innerHTML = '<p style="color:red; text-align:center;">Error al cargar productos</p>';
  }
}

function renderProductos(productos) {
  contenedor.innerHTML = '';
  productos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'tarjeta-producto';
    div.innerHTML = `
      <img src="${p.thumbnail}" alt="${p.title}">
      <div class="info-producto">
        <h3>${p.title}</h3>
        <div class="categoria">${p.category}</div>
        <div class="precio">$${p.price.toFixed(2)}</div>
      </div>
      <div class="acciones">
        <button class="btn-editar" data-id="${p.id}">Editar</button>
        <button class="btn-eliminar" data-id="${p.id}">Eliminar</button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (!confirm('¿Eliminar este producto?')) return;

      try {
        await fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' });
        alert('Producto eliminado (simulado)');
        cargarProductos();
      } catch (e) {
        alert('Error al eliminar');
      }
    });
  });

  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      window.location.href = `editar.html?id=${id}`;
    });
  });
}

function actualizarPaginacion() {
  const totalPag = Math.ceil(totalProductos / LIMITE);
  infoPagina.textContent = `Página ${paginaActual} de ${totalPag || 1}`;
  btnAnterior.disabled = paginaActual <= 1;
  btnSiguiente.disabled = paginaActual >= totalPag;
}

// Eventos
btnBuscar.addEventListener('click', () => {
  busqueda = inputBusqueda.value.trim();
  paginaActual = 1;
  cargarProductos();
});

inputBusqueda.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    busqueda = inputBusqueda.value.trim();
    paginaActual = 1;
    cargarProductos();
  }
});

selectCategoria.addEventListener('change', () => {
  categoria = selectCategoria.value;
  paginaActual = 1;
  cargarProductos();
});

selectOrden.addEventListener('change', () => {
  orden = selectOrden.value;
  paginaActual = 1;
  cargarProductos();
});

btnAnterior.addEventListener('click', () => {
  if (paginaActual > 1) {
    paginaActual--;
    cargarProductos();
  }
});

btnSiguiente.addEventListener('click', () => {
  paginaActual++;
  cargarProductos();
});

btnNuevo.addEventListener('click', () => {
  window.location.href = 'agregar.html';
});

// Inicio
cargarCategorias();
cargarProductos();