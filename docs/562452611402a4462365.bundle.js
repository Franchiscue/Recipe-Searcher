/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/http-provider.js
//API
"&health=alcohol-free&cuisineType=Nordic&mealType=Dinner&dishType=Side%20dish&imageSize=SMALL"
const httpProvider = (_ingredient, _id, _key) => `https://api.edamam.com/api/recipes/v2?type=public&q=${_ingredient}&app_id=${_id}&app_key=${_key}`;
const apiID = "78340058";
const apiKey = "78c40de5ea0d2fabd55e3a111d673262";


const getRecipeAPI = async(_ingredient,_diet, _health, _cuisine, _meal, _dish, _arrayURL) => {
    try {
        let filteredHttp = httpProvider(_ingredient.value, apiID,apiKey);
        if (_diet !== ""){
            filteredHttp += `&diet=${_diet}`;
        }
        if(_health !== ""){
            filteredHttp += `&health=${_health}`;
        }
        if (_cuisine !== ""){
            filteredHttp += `cuisineType=${_cuisine}`;
        }
        if (_meal !== ""){
            filteredHttp += `&mealType=${_meal}`
        }
        if(_dish){
            filteredHttp += `&dishType=${_dish}`
        }
        _arrayURL.splice(0, _arrayURL.length);
        _arrayURL = filteredHttp;
        const resp = await fetch(filteredHttp);
        if(!resp.ok) throw "Conection error";
        const data = await resp.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

const nextPageAPI = async(_url) =>{
    try {
        let resp = await fetch(_url);
        if(!resp.ok) throw "Conection error";
        let data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
;// CONCATENATED MODULE: ./src/js/searchResults.js
//Importar


//Variables
const results = document.getElementById("_results");
let nextPageURL = "";
let arrayURLs = (/* unused pure expression or super */ null && ([]));

//Funcion
const callAPI = (_ingredient, _diet, _health, _cuisine, _meal, _dish, _arrayRecipes) =>{
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

const nextPage = (_arrayRecipes, _urlArrayPages, _index) =>{
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
;// CONCATENATED MODULE: ./src/js/events.js
//HTML
const dietDrop = document.getElementById("_diet");
const healthDrop = document.getElementById("_health");
const cuisineTypeDrop = document.getElementById("_cuisineType");
const mealTypeDrop = document.getElementById("_mealType");
const dishTypeDrop = document.getElementById("_dishType");

//Variables
let strDiet = "";
let strHealth = "";
let strCuisine = "";
let strMeal = "";
let strDish = "";

const getDietType = () =>{
    dietDrop.addEventListener("change", (e) => {
        strDiet = e.target.options[e.target.options.selectedIndex].value;
        return strDiet;
    });
    return strDiet;
}

const getHealth = () =>{
    healthDrop.addEventListener("change", (e) =>{
        strHealth = e.target.options[e.target.options.selectedIndex].value;
    });
    return strHealth;
}

const getCuisine = () =>{
    cuisineTypeDrop.addEventListener("change", (e) =>{
        strCuisine = e.target.options[e.target.options.selectedIndex].value;
    });
    return strCuisine;
}

const getMeal = () =>{
    mealTypeDrop.addEventListener("change", (e) =>{
        strMeal = e.target.options[e.target.options.selectedIndex].value;
    });
    return strMeal;
}

const getDish = () =>{
    dishTypeDrop.addEventListener("change", (e) =>{
        strDish = e.target.options[e.target.options.selectedIndex].value;
    });
    return strDish;
}
;// CONCATENATED MODULE: ./src/index.js
//Importar el CSS


//HTML
const ingredientInput = document.getElementById("_ingred");
const btnSearch = document.getElementById("_btnSearch");
const btnNext = document.getElementById("_next");
const btnPrevious = document.getElementById("_previous");

//Importar funciones y variables que necesitamos para que funcione la aplicación



//Llamadas de funciones
getDietType();
getHealth();
getCuisine();
getMeal();
getDish();

//Variables
let recipeArray = [];
let urlArray = [];
let index = 0;
//Eventos
ingredientInput.addEventListener("keyup", (e)=>{
    if (e.key === "Enter"){
        if (ingredientInput.value !== ""){
            callAPI(ingredientInput, getDietType(), getHealth(), getCuisine(), getMeal(), getDish(), recipeArray, urlArray);
            btnNext.parentElement.parentElement.removeAttribute("hidden");
        } else {
            alert("It is mandatory to type an ingredient");
        }
    }
});

btnSearch.addEventListener("click", () =>{
    if (ingredientInput.value !== ""){
        btnSearch.disabled = true;
        callAPI(ingredientInput, getDietType(), getHealth(), getCuisine(), getMeal(), getDish(), recipeArray, urlArray)
        btnSearch.disabled = false;
        btnNext.parentElement.parentElement.removeAttribute("hidden");
    }else {
        alert("It is mandatory to type an ingredient");
    }
});

btnNext.addEventListener("click", () =>{
    index++;
    nextPage(recipeArray, index);
})
/******/ })()
;
//# sourceMappingURL=562452611402a4462365.bundle.js.map