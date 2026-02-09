

const crearproducto=()=>{
    //componentes con los que voy a interactuar
    const titulo=document.getElementById("titulo").value
    const precio=document.getElementById("precio").value
    const categoria=document.getElementById("categoria").value
    const descripcion=document.getElementById("descripcion").value
    const mensaje=document.getElementById("mensaje-exito")

    //validar que no esten vacios los campos requeridos 
    if(!titulo || !precio || !descripcion){
        alert("Complete los datos oblegatorios...")
        return
    }

    //creamos el objeto que se va a enviar 
    const producto={
        title:titulo,
        price:parseFloat(precio),
        category:categoria,
        description:descripcion,
        thumbnail:'https://dummyjson.com/image/400x200?type=webp&text='+titulo
    }

    //hacemos la peticion fetch con el metdo post 
    fetch("https://dummyjson.com/products/add",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(producto)
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log("Respuesta del API",data)
        mensaje.style.display='block'
        mensaje.innerHTML=`
        <strong>Producto Creado!!!</strong><br>
        el nombre del producto es : ${data.title} 

        `
    })
    .catch(error=>{
        mensaje.style.display='block'
        mensaje.innerHTML=`
        <strong>error al crear el producto!!!</strong><br>
        error presentado : ${error.mensaje} `
    })
}