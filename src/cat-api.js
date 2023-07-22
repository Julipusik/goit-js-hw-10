import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';

axios.defaults.headers.common["x-api-key"] = "live_FRcDbYjg6Y4Kc922QIsJimpj1kTw2JBrlWOFAsU0yrWGfuUHObQ4YC0uBtbMTw7q";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

function fetchBreeds () {
  return axios
    .get(`breeds/`)
    .then(response => {
      return response.data;
    })
    .catch(() => {
        Report.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function fetchCatByBreed(breedId) {
    return axios
        .get(`/images/search?breed_ids=${breedId}`)
        .then(response => {
            return response.data[0];
    })
        .catch(() => {
        Report.failure('Oops! Something went wrong! Try reloading the page!');
    })
};

export { fetchBreeds, fetchCatByBreed };