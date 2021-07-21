//Importar el CSS
import "./css/style.css"

//HTML
const ingredientInput = document.getElementById("_ingred");
const btnSearch = document.getElementById("_btnSearch");
const btnNext = document.getElementById("_next");
const btnPrevious = document.getElementById("_previous");

//Importar funciones y variables que necesitamos para que funcione la aplicación
import { callAPI, nextPage } from "./js/searchResults";
import { getDietType, getHealth, getCuisine, getMeal, getDish } from "./js/events"

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