// traernos API: https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital
// - name - flags - car - population - capital
// ponerlas en la pantalla -> name y flag
// al hacer click la info sale por encima
// ordenar por nombre
// botón para cerrar el flotante

const countriesList = document.getElementById('countries-list')
const info = document.getElementById('info')

async function getCountries() {
    try {
        // cada await es como un .then
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
        const data = await response.json();
        sortedCountries(data);
        return data;
    } catch (err) {
        console.log(err)
    }
}

// FUNCION PARA ORDENAR CUALQUIER COSA, en este caso ordena alfabeticamente
function sortedCountries(countries) {
    countries.sort((a, b) => {
        const nameA = a.name.common.toUpperCase();
        const nameB = b.name.common.toUpperCase();
        return nameA.localeCompare(nameB, 'es')
    })
}

getCountries().then(countries => {
    const allCountries = countries.map(country => {
        const {name:{common}, flags} = country
        const template = `
        <li class="card">
            <img src="${flags.png}" alt="${flags.alt}">
            <h2>${common}</h2>
        </li>
        `
        return template
    }).join('')
    countriesList.innerHTML = allCountries;

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            const country = countries[i];
            const { name:{common}, flags, car, population, capital } = country


            info.classList.add('visible')

            const template = `
            <section class="result">
                <div class="info-country">
                <div id="closed">X</div>
                    <h2>${common}</h2>
                    <p>Capital: ${capital[0]}</p>
                    <img src="${flags.png}" alt="${flags.alt}">
                    <p>Population: ${population}</p>
                    <p>Conducción: ${car.side}</p>
                </div>
            <section>
            `
        })
        info.innerHTML = template
    })
    info.addEventListener('click', (e) => {
        if(e.target.classList.contains('closed')) {
            info.classList.remove
        }
    })
})

