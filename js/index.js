document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded')
    // const monsterCon = document.getElementById("monster-container")
    renderMonsters()
    monsterForm() 

    const monFormSearch = document.getElementById("monster-form")

    monFormSearch.addEventListener("submit", (event) => {
        event.preventDefault()
        monsterPost(monsterFormData()) 
        //pass monsterFormData
        clearMonsterForm()
    })

    // WITH PAGE BUTTONS I MUST CHANGE WHICH MONSTERS ARE RENDERED - BY 50 *50- PAGE LEFT GO DOWN 50 MONSTERS||PAGE RIGHT GO UP 50 MONSTERS  50+. 
    // LOWER THAN 0 INDEX OR 1 ID ERROR MESSAGE

    const backButton = document.getElementById("back")
    const forwardButton = document.getElementById("forward")

    backButton.addEventListener("click", (event) => {
        
        console.log("back")
     
    })

    forwardButton.addEventListener("click", (event) => {

        console.log("forward")
    
    })



})

const monsterUrl = "http://localhost:3000/monsters"

function renderMonsters(){

    fetch(`${monsterUrl}/?_limit=50&_page=1`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {

        // console.log('Success:', data);
        data.forEach(element => {
        // console.log('Success:', element);
        // console.log('Success:', element.name);
        // console.log('Success:', element.age);
        // console.log('Success:', element.description);
        createMonsterCard(element)
        })

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function createMonsterCard(monsterInfo){
    let mondiv = document.createElement('div')
    let monh2 = document.createElement('h2')
    let monh4 = document.createElement('h4')
    let monp = document.createElement('p')
    monh2.innerHTML = `${monsterInfo.name}`
    monh4.innerHTML = `Age: ${monsterInfo.age}`
    monp.innerHTML = `Bio: ${monsterInfo.description}`
    mondiv.appendChild(monh2)
    mondiv.appendChild(monh4)
    mondiv.appendChild(monp)
    // console.log(mondiv)    
    // monsterCon.append(mondiv)

    document.querySelector('#monster-container').appendChild(mondiv)

}

function monsterForm(){
    let monForm = document.createElement("form")
    let monInput1 = document.createElement("input")
    let monInput2 = document.createElement("input")
    let monInput3 = document.createElement("input")
    let monButton = document.createElement("button")

    monForm.id = "monster-form"
    monInput1.id = "name"
    monInput2.id = "age"
    monInput3.id = "description"
   
    monInput1.placeholder = "Name..."
    monInput2.placeholder = "Age..."
    monInput3.placeholder = "Description..."

    monButton.innerHTML = "Create Monster !"

    monForm.appendChild(monInput1)
    monForm.appendChild(monInput2)
    monForm.appendChild(monInput3)
    monForm.appendChild(monButton)

    document.getElementById("create-monster").appendChild(monForm)

}

function clearMonsterForm(){
    document.querySelector('#monster-form').reset()
}

function monsterFormData(){

    let nameData = document.getElementById("name")
    let ageData = document.getElementById("age")
    let bioData = document.getElementById("description");
    
//    console.log( {name: nameData.value, age: parseFloat(ageData.value), description: bioData.value } )
   return {name: nameData.value, age: parseFloat(ageData.value), description: bioData.value}
}

// data||info { name: string, age: number, description: string }

function monsterPost(info){

    // console.log("KEEP GOING")
    
    fetch(monsterUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },

        body: JSON.stringify(info)
        

    })
    .then(response => response.json())
    .then(data => {

        console.log('Success:', data);
        

    })
    .catch((error) => {
        console.error('Error:', error);
    });

}