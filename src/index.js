import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';


const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
    .then(data => {
        selectEl.classList.add("is-hidden");
        Loading.circle('Loading data, please wait...');
        selectEl.innerHTML = data.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
    })
    .catch(() => {
        Report.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
        Loading.remove();
        selectEl.classList.remove("is-hidden");
    })
    

selectEl.addEventListener('change', evt => {
    Loading.circle('Loading data, please wait...');
    catInfo.classList.add("is-hidden");

    const breedSelectId = evt.target.value;
    fetchCatByBreed(breedSelectId)
        .then(cat => {
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
            catInfo.classList.add("is-hidden");
    })
    .finally(() => {
        Loading.remove();
    })
})
