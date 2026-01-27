
const urlApi = "https://69780b095b9c0aed1e87ec1e.mockapi.io/api/BiE/libros";

const cargarLibros = () => {
    fetch(urlApi)
        .then(respuesta => respuesta.json())
        .then(data => {
            const libros = data;
            console.log("Libros recibidos:", libros);
            mostrarLibros(libros);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error al cargar la biblioteca. Verifica la URL.");
        })
}

const mostrarLibros = (libros) => {
    const contenedor = document.getElementById("contenedor-libros");
    contenedor.innerHTML = "";

    libros.forEach(libro => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("libro-card");

        const colorEstado = libro.estado === "Disponible" ? "#27ae60" : "#c0392b"; 

        tarjeta.innerHTML = `
             <img src="${libro.portada}" alt="${libro.titulo}" width="100%" style="object-fit: contain; height: 300px;">
            <h3 class="libro-titulo">${libro.titulo}</h3>
            <p class="libro-autor"> ${libro.autor}</p>
            <p class="libro-estado" style="color: ${colorEstado}; font-weight: bold;">
                ${libro.estado}
            </p>
        `;
       
        contenedor.appendChild(tarjeta);
    })
}