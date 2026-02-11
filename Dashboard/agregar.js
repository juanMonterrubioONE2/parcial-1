document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-nuevo-producto');
  const selectCategoria = document.getElementById('categoria');
  const mensaje = document.getElementById('mensaje');

  async function cargarCategorias() {
    try {
      const res = await fetch('https://dummyjson.com/products/category-list');
      if (!res.ok) throw new Error('No se pudieron cargar categorías');
      const categorias = await res.json();

      categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        selectCategoria.appendChild(option);
      });
    } catch (err) {
      mostrarMensaje('error', 'No se pudieron cargar las categorías');
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
    const marca = document.getElementById('marca').value.trim();

    if (!titulo || !precio || !categoria || !descripcion) {
      mostrarMensaje('error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const nuevoProducto = {
      title: titulo,
      price: precio,
      category: categoria,
      description: descripcion,
      brand: marca || undefined,
      thumbnail: `https://dummyjson.com/image/400?type=webp&text=${encodeURIComponent(titulo.substring(0, 30))}`
    };

    try {
      const res = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });

      if (!res.ok) throw new Error('Error al crear el producto');

      const data = await res.json();
      mostrarMensaje('exito', `Producto creado con éxito: ${data.title} (ID: ${data.id})`);

      form.reset();
      selectCategoria.value = '';

    } catch (err) {
      mostrarMensaje('error', 'No se pudo crear el producto. Intenta nuevamente.');
      console.error(err);
    }
  });

  // Inicio
  cargarCategorias();
});