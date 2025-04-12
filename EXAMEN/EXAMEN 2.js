const readline = require('readline-sync')
const fs = require('fs')
const chalk = require('chalk')


let catalogo = [];


function main() {
    console.log(chalk.bold.blue("\nBienvenido a 'El Rincón del Saber'"))
    console.log(chalk.blue("Sistema de Gestión de Libros\n"))

    let opcion
    do {
        mostrarMenu()
        opcion = readline.question("Seleccione una opción (1-8): ")

        switch(opcion) {
            case '1':
                agregarLibro()
                break
            case '2':
                mostrarCatalogo()
                break
            case '3':
                buscarLibroPorTitulo()
                break
            case '4':
                eliminarLibro()
                break
            case '5':
                verEstadisticas()
                break
            case '6':
                ordenarLibros()
                break
            case '7':
                editarLibro()
                break
            case '8':
                guardarCatalogo()
                console.log(chalk.yellow("\nGracias por usar nuestro sistema. ¡Hasta pronto!"))
                break
            default:
                console.log(chalk.red("\nOpción no válida. Por favor, seleccione una opción del 1 al 8."))
        }
    } while(opcion !== '8');
}


function mostrarMenu() {
    console.log(chalk.bold.green("\n=== MENÚ PRINCIPAL ==="))
    console.log("1. Agregar libro")
    console.log("2. Mostrar catálogo")
    console.log("3. Buscar libro por título")
    console.log("4. Eliminar libro")
    console.log("5. Ver estadísticas")
    console.log("6. Ordenar libros")
    console.log("7. Editar libro")
    console.log("8. Salir")
}


function agregarLibro() {
    console.log(chalk.bold.cyan("\n=== AGREGAR LIBRO ==="))
    
    const titulo = readline.question("Título: ")
    const autor = readline.question("Autor: ")
    
    let precio
    do {
        precio = parseFloat(readline.question("Precio: "))
        if(isNaN(precio) || precio <= 0) {
            console.log(chalk.red("Por favor, ingrese un precio válido (número positivo)."))
        }
    } while(isNaN(precio) || precio <= 0)
    
    let anio
    do {
        anio = parseInt(readline.question("Año de publicación: "))
        if(isNaN(anio) || anio <= 0 || anio > new Date().getFullYear()) {
            console.log(chalk.red(`Por favor, ingrese un año válido (entre 1 y ${new Date().getFullYear()}).`))
        }
    } while(isNaN(anio) || anio <= 0 || anio > new Date().getFullYear())
    
    const nuevoLibro = {
        titulo,
        autor,
        precio,
        anio
    };
    
    catalogo.push(nuevoLibro);
    console.log(chalk.green("\nLibro agregado con éxito!"))
}


function mostrarCatalogo() {
    console.log(chalk.bold.cyan("\n=== CATÁLOGO DE LIBROS ==="))
    
    if(catalogo.length === 0) {
        console.log(chalk.yellow("No hay libros en el catálogo."))
        return
    }
    
    catalogo.forEach((libro, index) => {
        console.log(chalk.bold(`\nLibro #${index + 1}`))
        console.log(`Título: ${libro.titulo}`)
        console.log(`Autor: ${libro.autor}`)
        console.log(`Precio: $${libro.precio.toFixed(2)}`)
        console.log(`Año: ${libro.anio}`)
    })
    
    console.log(chalk.bold(`\nTotal de libros: ${catalogo.length}`))
}


function buscarLibroPorTitulo() {
    console.log(chalk.bold.cyan("\n=== BUSCAR LIBRO POR TÍTULO ==="))
    
    if(catalogo.length === 0) {
        console.log(chalk.yellow("No hay libros en el catálogo para buscar."))
        return
    }
    
    const tituloBuscado = readline.question("Ingrese el título a buscar: ")
    const libroEncontrado = catalogo.find(libro => 
        libro.titulo.toLowerCase().includes(tituloBuscado.toLowerCase())
    )
    
    if(libroEncontrado) {
        console.log(chalk.green("\nLibro encontrado:"))
        console.log(`Título: ${libroEncontrado.titulo}`)
        console.log(`Autor: ${libroEncontrado.autor}`)
        console.log(`Precio: $${libroEncontrado.precio.toFixed(2)}`)
        console.log(`Año: ${libroEncontrado.anio}`)
    } else {
        console.log(chalk.red("\nLibro no encontrado."))
    }
}


function eliminarLibro() {
    console.log(chalk.bold.cyan("\n=== ELIMINAR LIBRO ==="))
    
    if(catalogo.length === 0) {
        console.log(chalk.yellow("No hay libros en el catálogo para eliminar."))
        return
    }
    
    const tituloEliminar = readline.question("Ingrese el título del libro a eliminar: ")
    const indice = catalogo.findIndex(libro => 
        libro.titulo.toLowerCase() === tituloEliminar.toLowerCase()
    );
    
    if(indice !== -1) {
        catalogo.splice(indice, 1);
        console.log(chalk.green("\nLibro eliminado con éxito."));
    } else {
        console.log(chalk.red("\nLibro no encontrado."))
    }
}


function verEstadisticas() {
    console.log(chalk.bold.cyan("\n=== ESTADÍSTICAS DEL CATÁLOGO ==="))
    
    if(catalogo.length === 0) {
        console.log(chalk.yellow("No hay libros en el catálogo para mostrar estadísticas."))
        return
    }
    

    console.log(chalk.bold(`\nCantidad total de libros: ${catalogo.length}`))
    

    const totalPrecios = catalogo.reduce((sum, libro) => sum + libro.precio, 0)
    const promedio = totalPrecios / catalogo.length
    console.log(`Precio promedio: $${promedio.toFixed(2)}`)
    

    const libroAntiguo = catalogo.reduce((antiguo, actual) => 
        actual.anio < antiguo.anio ? actual : antiguo
    );
    console.log(chalk.bold("\nLibro más antiguo:"))
    console.log(`Título: ${libroAntiguo.titulo}`)
    console.log(`Año: ${libroAntiguo.anio}`)
    

    const libroCaro = catalogo.reduce((caro, actual) => 
        actual.precio > caro.precio ? actual : caro
    )
    console.log(chalk.bold("\nLibro más caro:"))
    console.log(`Título: ${libroCaro.titulo}`)
    console.log(`Precio: $${libroCaro.precio.toFixed(2)}`)
    

    const autores = {}
    catalogo.forEach(libro => {
        autores[libro.autor] = (autores[libro.autor] || 0) + 1
    })
    
    console.log(chalk.bold("\nCantidad de libros por autor:"))
    for(const autor in autores) {
        console.log(`${autor}: ${autores[autor]}`)
    }
}


function ordenarLibros() {
    console.log(chalk.bold.cyan("\n=== ORDENAR LIBROS ==="))
    
    if(catalogo.length === 0) {
        console.log(chalk.yellow("No hay libros en el catálogo para ordenar."))
        return
    }
    
    console.log("1. Por precio (ascendente)")
    console.log("2. Por precio (descendente)")
    console.log("3. Por año de publicación (más antiguo primero)")
    console.log("4. Por año de publicación (más reciente primero)")
    console.log("5. Por título (A-Z)")
    console.log("6. Por título (Z-A)")
    
    const opcion = readline.question("Seleccione el criterio de ordenamiento (1-6): ")
    
    switch(opcion) {
        case '1':
            catalogo.sort((a, b) => a.precio - b.precio)
            console.log(chalk.green("\nLibros ordenados por precio (ascendente)."))
            break
        case '2':
            catalogo.sort((a, b) => b.precio - a.precio)
            console.log(chalk.green("\nLibros ordenados por precio (descendente)."))
            break
        case '3':
            catalogo.sort((a, b) => a.anio - b.anio)
            console.log(chalk.green("\nLibros ordenados por año (más antiguo primero)."))
            break
        case '4':
            catalogo.sort((a, b) => b.anio - a.anio)
            console.log(chalk.green("\nLibros ordenados por año (más reciente primero)."))
            break
        case '5':
            catalogo.sort((a, b) => a.titulo.localeCompare(b.titulo))
            console.log(chalk.green("\nLibros ordenados por título (A-Z)."))
            break
        case '6':
            catalogo.sort((a, b) => b.titulo.localeCompare(a.titulo))
            console.log(chalk.green("\nLibros ordenados por título (Z-A)."))
            break
        default:
            console.log(chalk.red("\nOpción no válida. No se realizó ningún ordenamiento."))
            return
    }
    
    mostrarCatalogo()
}


function editarLibro() {
    console.log(chalk.bold.cyan("\n=== EDITAR LIBRO ==="))
    
    if(catalogo.length === 0) {
        console.log(chalk.yellow("No hay libros en el catálogo para editar."))
        return
    }
    
    const tituloEditar = readline.question("Ingrese el título del libro a editar: ")
    const libro = catalogo.find(libro => 
        libro.titulo.toLowerCase() === tituloEditar.toLowerCase()
    )
    
    if(!libro) {
        console.log(chalk.red("\nLibro no encontrado."))
        return;
    }
    
    console.log(chalk.bold("\nDatos actuales del libro:"))
    console.log(`1. Título: ${libro.titulo}`);
    console.log(`2. Autor: ${libro.autor}`);
    console.log(`3. Precio: $${libro.precio.toFixed(2)}`)
    console.log(`4. Año: ${libro.anio}`);
    
    const campo = readline.question("\n¿Qué campo desea editar? (1-4): ")
    
    switch(campo) {
        case '1':
            libro.titulo = readline.question("Nuevo título: ")
            break
        case '2':
            libro.autor = readline.question("Nuevo autor: ")
            break
        case '3':
            do {
                libro.precio = parseFloat(readline.question("Nuevo precio: "))
                if(isNaN(libro.precio) || libro.precio <= 0) {
                    console.log(chalk.red("Por favor, ingrese un precio válido (número positivo)."))
                }
            } while(isNaN(libro.precio) || libro.precio <= 0)
            break
        case '4':
            do {
                libro.anio = parseInt(readline.question("Nuevo año de publicación: "))
                if(isNaN(libro.anio) || libro.anio <= 0 || libro.anio > new Date().getFullYear()) {
                    console.log(chalk.red(`Por favor, ingrese un año válido (entre 1 y ${new Date().getFullYear()}).`))
                }
            } while(isNaN(libro.anio) || libro.anio <= 0 || libro.anio > new Date().getFullYear())
            break
        default:
            console.log(chalk.red("Opción no válida. No se realizaron cambios."))
            return
    }
    
    console.log(chalk.green("\nLibro actualizado con éxito!"))
}


function guardarCatalogo() {
    try {
        fs.writeFileSync('catalogo_libreria.json', JSON.stringify(catalogo, null, 2))
        console.log(chalk.green("\nCatálogo guardado en 'catalogo_libreria.json'"))
    } catch (error) {
        console.log(chalk.red("\nError al guardar el catálogo: " + error.message))
    }
}


function cargarCatalogo() {
    try {
        if(fs.existsSync('catalogo_libreria.json')) {
            const data = fs.readFileSync('catalogo_libreria.json', 'utf8')
            catalogo = JSON.parse(data)
            console.log(chalk.green("Catálogo cargado desde archivo."))
        }
    } catch (error) {
        console.log(chalk.red("Error al cargar el catálogo: " + error.message))
    }
}


cargarCatalogo();
main();