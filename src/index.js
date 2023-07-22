import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';


const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
    .then(data => {
        selectEl.innerHTML = data.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
        Loading.remove();
    })
    .catch(() => {
        Report.failure('Oops! Something went wrong! Try reloading the page!');
    })
    

selectEl.addEventListener('change', evt => {
    evt.preventDefault();
    Loading.circle('Loading data, please wait...');
    selectEl.classList.add("is-hidden");
    catInfo.classList.add("is-hidden");

    const breedSelectId = selectEl.value;
    fetchCatByBreed(breedSelectId)
        .then(cat => {
            Loading.remove();
            selectEl.classList.remove("is-hidden");
            catInfo.classList.remove("is-hidden");

            catInfo.innerHTML = `
            <div class='thumb-pic'><img src="${cat.url}" alt="${cat.id}" width=400></div>
		<div class='thumb'>
		<h2>${cat.breeds[0].name}</h2>
		<p>${cat.breeds[0].description}</p>
		<p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
		</div>`;
    })
    .catch(() => {
        Report.failure('Oops! Something went wrong! Try reloading the page!');
    })
})
