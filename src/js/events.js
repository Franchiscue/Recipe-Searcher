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

export const getDietType = () =>{
    dietDrop.addEventListener("change", (e) => {
        strDiet = e.target.options[e.target.options.selectedIndex].value;
        return strDiet;
    });
    return strDiet;
}

export const getHealth = () =>{
    healthDrop.addEventListener("change", (e) =>{
        strHealth = e.target.options[e.target.options.selectedIndex].value;
    });
    return strHealth;
}

export const getCuisine = () =>{
    cuisineTypeDrop.addEventListener("change", (e) =>{
        strCuisine = e.target.options[e.target.options.selectedIndex].value;
    });
    return strCuisine;
}

export const getMeal = () =>{
    mealTypeDrop.addEventListener("change", (e) =>{
        strMeal = e.target.options[e.target.options.selectedIndex].value;
    });
    return strMeal;
}

export const getDish = () =>{
    dishTypeDrop.addEventListener("change", (e) =>{
        strDish = e.target.options[e.target.options.selectedIndex].value;
    });
    return strDish;
}