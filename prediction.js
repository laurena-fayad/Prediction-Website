let inputName;
  
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
    let tab = [`${data[pProperty]}`]
    // Setting innerHTML as tab variable
    document.getElementById(pProperty+"-result").innerHTML = tab
}
  
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
    
        // Calling that async function
        let property = 'gender'
        getapi(gender_api_url, property);  
        property = 'age';
        getapi(age_api_url, property);
        property = 'country' 
        getapi(nationality_api_url, property)
    }
})