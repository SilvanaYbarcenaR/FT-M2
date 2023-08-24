// Base URL
let url = "http://localhost:5000/amigos";

// Obtener amigos
let friendsHandler = () => {
    let lista = $("#lista");
    $.get(url, (data) => {
        lista.html("");
        //lista.empty();
        $("img").hide();
        data.forEach(amigo => {
            lista.append(`<li>${amigo.name}</li>`); 
        });
    })
}

// Buscar amigo
let searchHandler = () => {
    let amigoId = $("#input");
    let amigoContainer = $("#amigo");
    if(amigoId.val()) {
        $.get(`${url}/${amigoId.val()}`, (amigo) => {
            amigoContainer.html(amigo.name);
        }).fail( function() {
            amigoContainer.html("No pudimos encontrar a tu amigo.");
        });
        amigoId.val("");
    } else {
        amigoContainer.html("Ingresa un id.")
    }
}

// Eliminar amigo
let deleteHandler = () => {
    let amigoId = $("#inputDelete");
    let successContainer = $("#success");
    if(amigoId.val()) {
        $.ajax({
            method: "DELETE",
            url: `${url}/${amigoId.val()}`,
            success: () => {
                successContainer.html(`Tu amigo con id ${amigoId.val()} fue borrado con éxito.`);
                amigoId.val("");
                friendsHandler();
            }
        })
    } else {
        successContainer.html("Ingresa un id.")
    }
}

// Llamada a obtener amigos
$("#boton").on("click", friendsHandler);

// Llamada a buscar amigo
$("#search").on("click", searchHandler);

// Llamda a eliminar amigo
$("#delete").on("click", deleteHandler);