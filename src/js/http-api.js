//HTML


//API
const httpProvider = (_ingredient, _id, _key) => `https://api.edamam.com/api/recipes/v2?type=public&q=${_ingredient}&app_id=${_id}&app_key=${_key}`;
const apiID = "Pon tu ID";
const apiKey = "Pon tu Key";


export const getRecipeAPI = async() => {
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
        const resp = await fetch(filteredHttp);
        if(!resp.ok) throw "Conection error";
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const nextPageAPI = async(_url) =>{
    try {
        let resp = await fetch(_url);
        if(!resp.ok) throw "Conection error";
        let data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}