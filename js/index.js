document.addEventListener("DOMContentLoaded", () => {
    const URL = 'https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo255';
    const submit = document.getElementById('submit');
    const contenedor = document.getElementById('contenedor');
    

    setInterval(() => {
        mostrarDatos();
    }, 1500);

    submit.addEventListener('click', async () => {
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let grupo = document.getElementById('grupo').value;
        let number = document.getElementById('numero').value;

        try {
            const response = await fetch(URL, {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: 'POST',
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    grupo: grupo,
                    number: number
                })
            });
            const data = await response.json();
            //console.log(data);
            mostrarDatos();
        } catch (error) {
            console.error("Error:", error);
        }
    });

    async function mostrarDatos() {
        contenedor.innerHTML = '';

        try {
            const response = await fetch(URL);
            const data = await response.json();

            let lista = document.createElement('ul');
            lista.classList.add('list-group', 'm-5');
            
            let array = data;

            array.forEach(i => {
                let contenedorxdato=document.createElement('div')
                contenedorxdato.classList.add('containerXDato');
                let li = document.createElement('li');
                let nombre = i.nombre;
                let apellido = i.apellido;
                let grupo = i.grupo;
                let number = i.number;
                let id = i._id;

                li.innerHTML = `
                    <li><strong>Nombre:</strong> ${nombre}</li>
                    <li><strong>Apellido:</strong> ${apellido}</li>
                    <li><strong>Grupo:</strong>${grupo}</li>
                    <li><strong>Nº Sala:</strong> ${number}</li>
                    <button id="${id}" class="eliminar"><span class="material-symbols-outlined">delete</span></i></button>
                    <br>`;
                
                contenedorxdato.appendChild(li)    
                lista.appendChild(contenedorxdato);
            });

            contenedor.appendChild(lista);

            const eliminarData = document.querySelectorAll(".eliminar");

            eliminarData.forEach(eliminar => {
                eliminar.addEventListener('click', async () => {
                    const id = eliminar.id;

                    try {
                        await fetch(URL + "/" + id, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            },
                        });
                    } catch (error) {
                        console.error("Error: ", error);
                    }
                });
            });
        } catch (error) {
            console.error("Error: ", error);
        }
    }
});
