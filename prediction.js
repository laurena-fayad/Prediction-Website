let inputName;
let property;
let dog_api = "https://dog.ceo/api/breeds/image/random"
let get_predictions_btn = document.getElementById("get-predictions-btn")
let first_name = document.getElementById("fname")


// Defining async function
async function getapi(url, pProperty) {
    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON and displaying it
    var data = await response.json();
    show(data, pProperty);
}

// Function to display fetched data
function show(data, pProperty) {
   if (pProperty == "country"){
        let count = 1;
        let country_obj = data[pProperty]
        //Clearing nationalities tags
        document.getElementById(pProperty+"-result1").innerHTML = " "
        document.getElementById(pProperty+"-result2").innerHTML = " "
        document.getElementById(pProperty+"-result3").innerHTML = " "

        //Displaying all the nationalities with respective probabilities
        for (let el = 0; el < country_obj.length; el++){    
            let nationality = country_obj[el].country_id
            let probability = (country_obj[el].probability)
            document.getElementById(pProperty+"-result"+count).innerHTML += (probability*100).toFixed(2) + "%" + " " + nationality
            count++
        }//Displaying dog images
    }else if (pProperty == 'message'){
        document.getElementById("dog-img").src = data.message
    }else{//Displaying age/gender
        document.getElementById(pProperty+"-result").innerHTML =`${data[pProperty]}`
    }
}

//Calling the dog pictures API
property = 'message';
getapi(dog_api, property);

//Storing the user's name 
window.addEventListener('keyup', function keyup(e) {
  inputName = e.target.value;
})

get_predictions_btn.addEventListener("click", function(){
    //On click, if user input is there, initiate api values accordingly
    if(inputName!=null){
        first_name.innerHTML = inputName;
        let gender_api_url = "https://api.genderize.io?name="+inputName;
        let age_api_url = "https://api.agify.io/?name="+inputName;
        let nationality_api_url = "https://api.nationalize.io/?name="+inputName;
    
        // Calling that async api functions
        property = 'gender'
        getapi(gender_api_url, property);  
        property = 'age';
        getapi(age_api_url, property);
        property = 'country' 
        getapi(nationality_api_url, property)

        //display the predictions section
        setTimeout(() => {
            document.getElementById("predictions-section").style.display = "block";
            location.href = "#footer"
        }, 1400);
    }
})