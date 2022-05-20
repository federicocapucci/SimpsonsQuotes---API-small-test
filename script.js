let search = document.getElementById('search');
let personajes = [];


search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        busqueda().click();
    }
});



let randomquotes = async() => {
    for (let i = 0; i < 10; i++) {

        let found = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=30&character=" + search.value);
        let datos = await found.json();
        for (each of datos) {
            personajes.push(each);
        }
    }
    console.log(personajes);
}

randomquotes();



let busqueda = () => {
    let datacontainer = document.getElementsByClassName('data-container')[0];
    datacontainer.innerHTML = "";

    try {
        let personajeEscogido = [];

        let busquedaPalabra = capitalize(search.value);
        search.value = "";

        console.log(busquedaPalabra);

        for (each of personajes) {

            if (each.character.includes(busquedaPalabra)) {

                personajeEscogido.push(each);
            }
        }


        console.log(personajeEscogido);

        let simpsonCharContainer = document.createElement('div');
        let title = document.createElement('h3');
        let imgcontainer = document.createElement('img');
        title.innerHTML = personajeEscogido[0].character;
        imgcontainer.src = personajeEscogido[0].image;
        imgcontainer.alt = personajeEscogido[0].character;
        simpsonCharContainer.appendChild(title);
        simpsonCharContainer.appendChild(imgcontainer);
        let simpsonphrases = document.createElement('div');

        for (each of personajeEscogido) {
            let phrase = document.createElement('p');
            phrase.innerHTML = each.quote;
            simpsonphrases.appendChild(phrase);
        }

        simpsonCharContainer.classList.add('simpsonCharContainer');
        simpsonphrases.classList.add('phrases');
        datacontainer.appendChild(simpsonCharContainer);
        datacontainer.appendChild(simpsonphrases);
    } catch {

        let simpsonCharContainer = document.createElement('div');
        simpsonCharContainer.classList.add('error');
        datacontainer.appendChild(simpsonCharContainer).innerHTML = "The character was not found. Please check that the name is correct. only important characters!"

    }

}



let capitalize = (word) => {

    let newWord = ""

    newWord = word.substring(0, 1).toUpperCase() + word.substring(1, word.length).toLowerCase()

    return newWord
}