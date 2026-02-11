
document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    window.location.href = 'index.html';
    return;
  }

  const form = document.getElementById('form-editar-producto');
  const selectCategoria = document.getElementById('categoria');
  const mensaje = document.getElementById('mensaje');
  const loading = document.getElementById('loading');

  async function cargarCategorias() {
    try {
      const res = await fetch('https://dummyjson.com/products/category-list');
      const categorias = await res.json();
      categorias.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        selectCategoria.appendChild(opt);
      });
    } catch (e) {
      console.error('Error categorías', e);
    }
  }

  async function cargarProducto() {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) throw new Error('Producto no encontrado');
      const producto = await res.json();

      document.getElementById('id-producto').value = producto.id;
      document.getElementById('titulo').value = producto.title;
      document.getElementById('precio').value = producto.price;
      document.getElementById('categoria').value = producto.category;
      document.getElementById('descripcion').value = producto.description;

      loading.classList.add('oculto');
      form.classList.remove('oculto');
    } catch (err) {
      mostrarMensaje('error', 'No se pudo cargar el producto');
      console.error(err);
    }
  }

  function mostrarMensaje(tipo, texto) {
    mensaje.className = `mensaje ${tipo}`;
    mensaje.textContent = texto;
    mensaje.classList.remove('oculto');
    setTimeout(() => mensaje.classList.add('oculto'), 5000);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const categoria = document.getElementById('categoria').value;
    const descripcion = document.getElementById('descripcion').value.trim();

    if (!titulo || !precio || !categoria || !descripcion) {
      mostrarMensaje('error', 'Completa todos los campos obligatorios');
      return;
    }

    const datosActualizados = { title: titulo, price: precio, category: categoria, description: descripcion };

    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados)
      });

      if (!res.ok) throw new Error('Error al actualizar');

      mostrarMensaje('exito', 'Producto actualizado con éxito');
      setTimeout(() => window.location.href = 'index.html', 1800);

    } catch (err) {
      mostrarMensaje('error', 'No se pudo actualizar el producto');
      console.error(err);
    }
  });

  // Inicio
  await cargarCategorias();
  await cargarProducto();
});