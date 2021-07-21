//Importar
import { getRecipeAPI, nextPageAPI } from "./http-provider";

//Variables
const results = document.getElementById("_results");
let nextPageURL = "";
export let arrayURLs = [];

//Funcion
export const callAPI = (_ingredient, _diet, _health, _cuisine, _meal, _dish, _arrayRecipes) =>{
    getRecipeAPI(_ingredient, _diet, _health, _cuisine, _meal, _dish, _arrayPages).then(resp => {
        results.innerHTML = "";
        _arrayRecipes = [];
        if(Object.keys(resp._links).length !== 0) {
            console.log("Hay url", (resp._links).length)
            nextPageURL = resp._links.next.href;
            let iter = 0;
            fillArrayURL(iter, _arrayPages); //atun 4 paginas
        }
        console.log(_arrayPages);
        resp.hits.forEach(element => {
            _arrayRecipes.push(element["recipe"]);
        });
        _arrayRecipes.forEach(el =>{
            results.innerHTML += `<div class="card flex-row flex-wrap">
            <div class="card-header p-0 border-0 thumbs d-flex align-content-center justify-content-center">
                <img src="${el.image}" alt="" style="width: 7rem; object-fit: cover;">
            </div>
            <div class="card-block">
                <div class="row">
                    <h5 class="card-title ml-4">${!el.label?"":el.label}</h5>
                </div>
                <div class="row ml-2">
                    <div class="col-4">
                        <p class="card-text">${!el.mealType?"":el.mealType}</p>
                    </div>
                    <div class="col-4">
                        <p class="card-text">${!el.dishType?"":el.dishType}</p>
                    </div>
                    <div class="col-4">
                        <p class="card-text">${!el.cuisineType?"":el.cuisineType}</p>
                    </div>
                    <div class="col-4 mt-3">
                        <p class="card-text">${!el.cautions?"":el.cautions}</p>
                    </div>
                    <div class="col-4 mt-3">
                        <p class="card-text">${!el.dietLabels?"":el.dietLabels}</p>
                    </div>
                    <div class="col-4 mt-3">
                        <p class="card-text">${isNaN(parseInt(el.calories/el.yield))?"":parseInt(el.calories/el.yield)} kcal/person</p>
                    </div>
                </div>
            </div>
            <div class="card-footer w-100 text-muted p-1 d-flex justify-content-end">
                <a href="${el.url}" target="_blank" class="btn btn-primary">LINK</a>
            </div>
        </div>
        <br>`;
        });
    });
}

const fillArrayURL = (_iter ,_arrayPages) => {
    while (_iter < 2){
        console.log("Iteracion: ", iter)
        nextPageAPI(nextPageURL).then(resp => {
            console.log("Promesa: ",nextPageURL);
            nextPageURL = resp._links.next.href;
            _arrayPages.push(nextPageURL);
            _iter++;
        });
    }
}

export const nextPage = (_arrayRecipes, _urlArrayPages, _index) =>{
    nextPageAPI(_urlArrayPages[_index]).then(resp => {
        resp.hits.forEach(element => {
            _arrayRecipes.push(element["recipe"]);
        });
        results.innerHTML = "";
        _arrayRecipes.forEach(el =>{
            results.innerHTML += `<div class="card flex-row flex-wrap">
            <div class="card-header p-0 border-0 thumbs d-flex align-content-center justify-content-center">
                <img src="${el.image}" alt="" style="width: 7rem; object-fit: cover;">
            </div>
            <div class="card-block">
                <div class="row">
                    <h4 class="card-title ml-4">${!el.label?"":el.label}</h4>
                </div>
                <div class="row ml-2">
                    <div class="col-4">
                        <p class="card-text">${!el.mealType?"":el.mealType}</p>
                    </div>
                    <div class="col-4">
                        <p class="card-text">${!el.dishType?"":el.dishType}</p>
                    </div>
                    <div class="col-4">
                        <p class="card-text">${!el.cuisineType?"":el.cuisineType}</p>
                    </div>
                    <div class="col-4 mt-3">
                        <p class="card-text">${!el.cautions?"":el.cautions}</p>
                    </div>
                    <div class="col-4 mt-3">
                        <p class="card-text">${!el.dietLabels?"":el.dietLabels}</p>
                    </div>
                    <div class="col-4 mt-3">
                        <p class="card-text">${isNaN(parseInt(el.calories/el.yield))?"":parseInt(el.calories/el.yield)} kcal/person</p>
                    </div>
                </div>
            </div>
            <div class="card-footer w-100 text-muted p-1 d-flex justify-content-end">
                <a href="${el.url}" target="_blank" class="btn btn-primary">LINK</a>
            </div>
        </div>
        <br>`;
        });
    });
}