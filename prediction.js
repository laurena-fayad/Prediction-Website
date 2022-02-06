let inputName;
let property;
let dog_api =  "https://dog.ceo/api/breeds/image/random"

// Defining async function
async function getapi(url, pProperty) {
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    show(data, pProperty);
}

// Function to define innerHTML for HTML table
function show(data, pProperty) {
   if (pProperty == "country"){
        let count = 1;
        let country_obj = data[pProperty]
        document.getElementById(pProperty+"-result1").innerHTML = " "
        document.getElementById(pProperty+"-result2").innerHTML = " "
        document.getElementById(pProperty+"-result3").innerHTML = " "
        for (let el = 0; el < country_obj.length; el++){    
            let nationality = country_obj[el].country_id
            let probability = (country_obj[el].probability)
            console.log(probability)
            document.getElementById(pProperty+"-result"+count).innerHTML += (probability*100).toFixed(2) + "%" + " " + nationality
            count++
        }
    }else if (pProperty == 'message'){
        document.getElementById("dog-img").src = data.message
    }else{
        let tab = [`${data[pProperty]}`]
        // Setting innerHTML as tab variable
        document.getElementById(pProperty+"-result").innerHTML = tab    
    }
}

property = 'message';
getapi(dog_api, property);

window.onkeyup = keyup;
function keyup(e) {
  inputName = e.target.value;
}

document.getElementById("search-btn").addEventListener("click", function(){
    if(inputName!=null){
        document.getElementById("fname").innerHTML = inputName;
        let gender_api_url = "https://api.genderize.io?name="+inputName;
        let age_api_url = "https://api.agify.io/?name="+inputName;
        let nationality_api_url = "https://api.nationalize.io/?name="+inputName;
    
        // Calling that async functions
        property = 'gender'
        getapi(gender_api_url, property);  
        property = 'age';
        getapi(age_api_url, property);
        property = 'country' 
        getapi(nationality_api_url, property)
    }
})