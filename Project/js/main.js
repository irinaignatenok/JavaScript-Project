//URL
let arrayOfAgent = [];
// logo
let logo = document.createElement('div');
logo.id = 'logoId';
let logoImg = document.createElement('img');
logoImg.src = 'images/logo.jpeg';
logoImg.alt = 'Logo';
logo.appendChild(logoImg);
const container = document.getElementById("container");
container.appendChild(logo);

// usefull finctions
let getId = (id) => document.getElementById(id);
let createElem = (elem)=> document.createElement(elem);

// Create button

const button = createElem('button');
button.id = "startGame";
let buttonDiv = createElem('div');
buttonDiv.id = 'buttonId';
container.appendChild(buttonDiv);
buttonDiv.appendChild(button);

button.textContent = "Start";
let button1; 
// Button Terrorist
let btn1 =createElem('button');
btn1.id = "btnTerrorist";
let btnTerrorist;
btn1.innerHTML = "Terrorist";

// Button counter-terrorist
btn2 = createElem('button');
btn2.id = "btnCounterTer";
let btnCounterTer;
btn2.innerHTML = "Counter Terrorist";
// Button auto fill
btn3 = createElem('button');
btn3.id = "autoFill"
let autoFill;
 btn3.textContent = "Auto Fill";
 let h1 = createElem('h1');

// create form
let userContainer = createElem('div');
userContainer.id = "username-form-container"

let label = createElem('label');
label.textContent = "Choose your name: ";
let span = createElem('span');
span.setAttribute('class','text-name');
let input = createElem('input');
input.id = 'textInput';
const NAME_PATTERN =/^[a-zA-Z]+(?:\s+[a-zA-Z]+)?(?:\s+[a-zA-Z]+)?$/;
let parag = createElem('p');
let userName;

// button add username
let addName = createElem('button');
addName.textContent = "Add Name";
addName.id = "setName";

// render a team 
class Agent {
    constructor(name, image, team){
        this.name = name;
        this.image = image;
        this.team = team;
    }
    getAgentCard(){
        const agentCard = createElem('div');
        agentCard.classList.add('card');

        const agentImage = createElem('img');
        agentImage.src = this.image;
        agentImage.alt = this.name;

        const agentName = createElem('h3');
        agentName.textContent = this.name;

        const agentdescription = createElem('p')
        agentdescription.textContent = this.team;

        agentCard.appendChild(agentImage);
        agentCard.appendChild(agentName);
        agentCard.appendChild(agentdescription)
        
       return agentCard;

    }
}
// let weaponContainer = createElem('div')
// let weaponType = createElem('div');// div for Weapon type
// container.appendChild(weaponContainer);

// weaponContainer.id = "weapon";
// Weapon
let balance = 9000;
class Weapon {
    constructor(name, type, image,category){
        this.name = name;
        this.type = type;
        this.image = image;
        this.category = category;
    }
    displayType(){
        console.log`${this.category}`
    }
    getWeaponType(){
        const weaponTypeBtn = createElem('button');
        weaponType.textContent = this.category
        weaponType.id = this.category;
        weaponType.classList.add = "weaponButton";
        weaponType.appendChild(weaponTypeBtn)
    }

}


// function to display team selection
function teamSelection(selectedTeam){
    if(btnTerrorist.innerHTML ===selectedTeam){
        h1.textContent  = "Choose an agent - " + selectedTeam;
        addAgentInfo("Terrorist");
    }else{
        h1.textContent  = "Choose an agent - " + selectedTeam; 
        addAgentInfo("Counter-Terrorist");
    }
}

// create first Button
function firstBtn(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            button.addEventListener("click", threeBtn)
            resolve();
        },0000);
    })
}
// function three Button

function threeBtn(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            //Clear the container
            container.innerHTML ="";
            
            // btn1 Terrorist
            container.appendChild(btn1);
            btnTerrorist = getId("btnTerrorist");
            btnTerrorist.addEventListener("click", handleSelection)
            // button Counter Terrorist
            container.appendChild(btn2);
            btnCounterTer = getId("btnCounterTer")
            btnCounterTer.addEventListener("click", handleSelection);
            // button Auto Fill
            container.appendChild(btn3);
            autoFill = getId("autoFill")
            autoFill.addEventListener("click", handleAutoFill)
            resolve();
        }, 0);
    })
}
// function handle Selection Terrorist
function handleSelection(event){
    container.innerHTML ="";
    let selectedTeam = event.target.textContent;
    container.appendChild(h1)
// function to display team selection
    teamSelection(selectedTeam)
   
    container.appendChild(userContainer)
    userContainer.appendChild(addName);
let btnUsername = getId("setName");
console.log(btnUsername)
    userContainer.insertBefore(input,addName);
    userContainer.insertBefore(label,input)
 
    label.appendChild(span)
    
   
    btnUsername.addEventListener("click", setUsername)
    // setUsername()
    console.log("selected Team", selectedTeam)
    // I'll add the code later on
}
function setUsername(){
    let isValid;
    let userInput = getId("textInput");
    let inputValue = userInput.value.trim();
    if (!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(inputValue)) {
        alert("Name must have 1 to 2 words and contain only letters.")
        userInput.value = "";
        span.textContent = ""; // Clear the span content
        isValid = false;
    } else if (inputValue.length > 20) {
        alert("Name must not exceed 20 characters.")
        userInput.value = "";
        span.textContent = ""; // Clear the span content
        isValid = false;
    } else {
        span.textContent = inputValue; // Set the span content to the input value
        userName = inputValue; // Assign the input value to the userName variable
        console.log(userName)
        userInput.value = "";
        isValid = true; // Mark as valid input
    }
    return isValid;
}


// function handleAutoFill
function handleAutoFill(e){
   
let teams = ["Terrorist", "Counter-Terrorist", "Auto Select"]
let randomTeam = teams[Math.floor(Math.random() * teams.length)]
teamSelection(randomTeam)
handleSelection(randomTeam);
// I'll add the code here
}
let agentData = [];
function addAgentInfo(teamName) {
    fetch('https://bymykel.github.io/CSGO-API/api/en/agents.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        const terroristAgents = data.map(agent => {
          // Check if the agent's team is "Terrorist"
          if (agent.team.name === teamName) {
            agentData = new Agent(agent.name, agent.image, agent.team.name)
            return agentData
          }
        }).filter(agent => agent);
  
        terroristAgents.forEach(agent => {
          const agentCard = agent.getAgentCard()
          agentList.appendChild(agentCard);
        //   Add event listener for each agent
        agentCard.addEventListener('click', () => getInfoOfAgent(agent, teamName))
        });
      })
      .catch(error => {
        console.error("There is a problem:", error);
      });
      let agentList = createElem('div');
      container.appendChild(agentList);
      agentList.id = "agents";
      agentList.className = "agent-list";
      console.log(agentList);
  }
//   div contains Type of weapon and all weapons
  let div = createElem('div');
  

  function getInfoOfAgent(teamName){
    arrayOfAgent.push(agentData);
    container.innerHTML ="";
   
    div.id = "weapon-div"
    let h1 = createElem('h1');
    h1.textContent = "Choose Weapon and Gears - " + teamName.team;
    h1.id = "headerWeapon";
    let h1Balance = createElem('h1');
    h1Balance.id = "balance"
    h1Balance.textContent = "Balance: $" + balance;
    container.appendChild(div)
    div.appendChild(h1);
    div.appendChild(h1Balance)
    let titleWeapon = getId("headerWeapon");
    let weaponDiv = getId("weapon-div")
    let balanceId = getId("balance")
// div render a types of weapon and render weapon
    let weaponContainer = createElem('div')
    weaponContainer.id = "weapon";
    container.appendChild(weaponContainer);
    let containerWeapon = getId("weapon");
    //  div for type of Weapons

weaponType.id = "typeWeapon";
let renderWeapon = createElem('div');
renderWeapon.id = "weaponRender"
// weaponContainer.appendChild(weaponType) 
weaponContainer.appendChild(renderWeapon) 
let typeWeapon = getId("typeWeapon");
let weaponRender = getId("weaponRender");
// addWeaponAgent(teamName);
loadTypes(teamName);

  }

// ----------------------------
let weaponContainer = createElem('div');
let weaponType = createElem('div'); // div for Weapon type
let renderWeapon = createElem('div');
weaponContainer.appendChild(weaponType);
weaponContainer.appendChild(renderWeapon);
weaponContainer.id = "weaponContainer";
document.body.appendChild(weaponContainer); // Append weaponContainer to the body of the document

let typesList = [];
let activeType = "";
let storeBtnTypes = [];
let allInfo = [];

const WEAPON_URL = "https://bymykel.github.io/CSGO-API/api/en/skins.json";

function loadTypes(teamName) {
  if(teamName){
    fetch(WEAPON_URL)
    .then((response) => response.json())
    .then((res) => {
        typesList = res.reduce((uniqueList, currentItem) => {
          
            // Check if the category name is already in the uniqueList
            const existingItem = uniqueList.find(
              (item) => item.category.name === currentItem.category.name
            );
            
            // I
            if (!existingItem) {
              uniqueList.push(currentItem);
            }
            return uniqueList;
          }, []);
      
        for (let weaponType of typesList) {
            createTypeButton(weaponType);
        }
        renderButtons();
    })
    .catch((err) => console.log(err))
  }
}

function createTypeButton(type) {
  if (type.category.name !== null) {
    let button = createElem('button');
    button.id = type.category.name;
    button.className = "typeButton";
    button.textContent = type.category.name;
    button.addEventListener("click", function() {
      // Remove active class from previous button
      for (let btn of storeBtnTypes) {
        btn.classList.remove("active");
      }
      // Add active class to clicked button
      button.classList.add("active");
      activeType = type.category.name;
      secondChoose(type.category.name);
      allInfo.push(type);
      console.log("all Info" + allInfo)
    });
    storeBtnTypes.push(button);
    storeBtnTypes = storeBtnTypes.filter(item => item.id !== null);
  }
}

function renderButtons() {
  let weaponTypeContainer = document.getElementById("weaponType");

  // Get the weaponTypeContainer
  if (!weaponTypeContainer) {
    weaponTypeContainer = createElem('div'); 
    weaponTypeContainer.id = "weaponType";
    weaponContainer.appendChild(weaponTypeContainer); 
  }
  for (let button of storeBtnTypes) {
    if (button) {
      weaponTypeContainer.appendChild(button);
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  loadTypes();
});

let gearContainer = [];
let selectedWeapon = null;
let weaponList = createElem('div');
const SKIN_URL = 'https://bymykel.github.io/CSGO-API/api/en/skins.json';

function secondChoose(categoryName) {
  fetch(SKIN_URL)
    .then((response) => response.json())
    .then((skins) => {
      let uniqueSkins = {}; // Using an object to track unique skins
      
      const filteredSkins = skins.filter((skin) => {
        if (skin.category && skin.category.name === categoryName && skin.weapon && skin.weapon.name) {
          // Check if the skin is unique based on weapon name
          if (!uniqueSkins[skin.weapon.name]) {
            uniqueSkins[skin.weapon.name] = true;
            return true;
          }
        }
        return false;
      });
      
      // Clear existing skin button
      gearContainer = [];
      clearSkinButton();
      weaponList.innerHTML = '';

      if(selectedWeapon){
        createSkinButton(selectedWeapon)
      }

      for (let skin of filteredSkins) {
        createSkinButton(skin);
      }
      renderSkinButtons();
    })
    .catch((err) => console.error('Error fetching skins:', err));
}

// function getWeaponType
let selectedWeapons = {
  pistols: null,
  smgs: null,
  rifles: null,
  heavy: null,
  knives: null,
  gloves: null
};

function createSkinButton(skin) {
  // if (skin.weapon.name !== null) {
    let button = createElem('button');
    button.id = skin.weapon.name;
    button.className = "skinButton";
    button.textContent = skin.weapon.name;
    button.addEventListener('click', () => {
      let weaponCategory = getWeaponType(skin.weapon.name);
      let existingWeapon = selectedWeapons[weaponCategory]
      if(existingWeapon === null){
        selectedWeapons[weaponCategory] = skin;
      }else if ( existingWeapon !== skin){
        let previousChoice = gearContainer.find(item => item.id ===existingWeapon.weapon.name)
        if (previousChoice ) {
          previousChoice .classList.remove("active");
        }
        selectedWeapons[weaponCategory] = skin;
        console.log( selectedWeapons)
        button.classList.add("active");
      }else {
          alert("You are already selected a weapon of this type")
          return;
        }

        
      activeType = skin.category.name;
      selectedWeapon = skin;
      updateBalance();
      getImageOfWeapon(skin);
      

      // if(checkSelected()){
      //   showChosenOption()
      // }else{
      //   alert("Please select at least one weapon of each type.")
      // }
      
    });
    
    gearContainer.push(button);
  }
  function submitSelection(){
    for(weaponType in selectedWeapons){
      if(selectedWeapons[weaponType] === null){
        alert("Please select at least one weapon of each type.")
        return false;
      }
    }
    showChosenOption()
    return true
  }
// checkSelected() 

// getWeaponType 

function getWeaponType(weaponName){
  if (weaponName.includes("Five-SeveN") || weaponName.includes("Glock-18") || weaponName.includes("Dual Berettas") || weaponName.includes("Desert Eagle") || weaponName.includes("Tec-9") || weaponName.includes("CZ75-Auto") || weaponName.includes("P2000")|| weaponName.includes("R8 Revolver") || weaponName.includes("P250")|| weaponName.includes("USP-S")) {
    return "pistols";
  } else if (weaponName.includes("MP9") || weaponName.includes("PP-Bizon") || weaponName.includes("MAC-10") || weaponName.includes("P90")|| weaponName.includes("MP5-SD")||weaponName.includes("UMP-45")||weaponName.includes("MP7")) {
    return "smgs";
  } else if (weaponName.includes("AK-47") || weaponName.includes("M4A1-S") || weaponName.includes("Galil AR") || weaponName.includes("AUG") || weaponName.includes("M4A4") || weaponName.includes("AWP")|| weaponName.includes("SCAR-20")|| weaponName.includes("FAMAS") || weaponName.includes("SG 553")||weaponName.includes("G3SG1")|| weaponName.includes("SSG 08") ) {
    return "rifles";
  } else if (weaponName.includes("Negev") || weaponName.includes("M249") || weaponName.includes("MAG-7")|| weaponName.includes("XM1014")||weaponName.includes("Nova")|| weaponName.includes("Sawed-Off")) {
    return "heavy";
  } else if (weaponName.includes("Classic Knife") || weaponName.includes("Bayonet") || weaponName.includes("Gut Knife")|| weaponName.includes("Flip Knife")|| weaponName.includes("Karambit")|| weaponName.includes("Butterfly Knife")|| weaponName.includes("Navaja Knife")|| weaponName.includes("Kukri Knife")|| weaponName.includes("Bowie Knife") ||weaponName.includes("Ursus Knife")||weaponName.includes("Skeleton Knife")||weaponName.includes("Falchion Knife")|| weaponName.includes("Survival Knife")||weaponName.includes("Talon Knife")|| weaponName.includes("Huntsman Knife") || weaponName.includes("Paracord Knife")||weaponName.includes("Stiletto Knife")||weaponName.includes("M9 Bayonet")|| weaponName.includes("Shadow Daggers" || weaponName.includes("Nomad Knife"))) {
    return "knives";
  } else if (weaponName.includes("Hydra Gloves") || weaponName.includes("Sport Gloves") || weaponName.includes("Moto Gloves") ||weaponName.includes("Broken Fang Gloves")|| weaponName.includes("Bloodhound Gloves")|| weaponName.includes("Specialist Gloves")|| weaponName.includes("Driver Gloves")|| weaponName.includes("Hand Wraps")) {
    return "gloves";
  } else {
    return "";
  }
}

// Creat submit Button for Weapons and render a sreen of selected Items
let divSubmitBtn = createElem('div');
      divSubmitBtn.id = 'divSubmitBtn';
let submitBtn = createElem('button');
submitBtn.id = "submit";
submitBtn.innerHTML = "Submit"


// Render Skin Buttons 

function renderSkinButtons() {
  let weaponSkinContainer = document.getElementById("weaponContainer");
  let skinTypeContainer = document.getElementById("skinType");
  if (!skinTypeContainer) {
    skinTypeContainer = createElem('div'); 
    skinTypeContainer.id = "skinType";
    weaponSkinContainer.appendChild(skinTypeContainer);
    skinTypeContainer.innerHTML = ""; 
    
  }
  for (let button of gearContainer) {
    if(button){
      skinTypeContainer.appendChild(button);
     
    }
  }
  // append submit Button 
  weaponContainer.appendChild(divSubmitBtn)
divSubmitBtn.appendChild(submitBtn);
let submit = getId("submit");
submit.addEventListener("click", submitSelection)
}



function clearSkinButton(){
  let weaponSkinContainer = getId("skinType");
  // let weaponContainer = getId("weaponContainer")
  if(weaponSkinContainer){
    while(weaponSkinContainer.firstChild){
      weaponSkinContainer.removeChild(weaponSkinContainer.firstChild)

    }
  }
}

// Calculate Price

function calculatePrice(weaponName){
  let price = 0;
  switch(getWeaponType(weaponName)){
    case "pistols":
      price = getRandomInt(200, 700);
      console.log(price)
      break;
    case "smgs":
      price = getRandomInt(1000, 1500);
      break;
      case "rifles":
        price = getRandomInt(1500, 3500);
        break;
      case "heavy":
        price = getRandomInt(2500, 4500);
        break;
      case "knives":
        price = getRandomInt(100, 500);
        break;
      case "gloves":
        price = getRandomInt(100, 500);
        break;
        default:
          price = 0;
  }
  price = Math.round(price / 50) * 50;
  return price;
}

// generate Random Int 

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) ;
}

//  Update Balance

function updateBalance(){
  let count = 0;
  for(let weapon in selectedWeapons){
    if(selectedWeapons[weapon] !== null){
      count +=calculatePrice(selectedWeapons[weapon].weapon.name)
    }
  }
  let remainBalance = balance - count;
  let balanceId = getId("balance")
  balanceId.textContent = "Balance: $" + remainBalance;
  console.log("Remaining Balance:", remainBalance)
}
// Class WeaponType 

class WeaponType{
  constructor(name, image){
    this.name = name;
    this.image = image;
  }
  getWeaponCard(){
    const weaponCard = createElem('div');
    weaponCard.classList.add('card-weapon');

    const weaponImage = createElem('img');
  weaponImage.src = this.image;
  weaponImage.alt = this.name;

  const agentdescription = createElem('p')
  agentdescription.textContent = this.name;

  weaponCard.appendChild(weaponImage);
  weaponCard.appendChild(agentdescription)

 
  return weaponCard
  }
}
let weaponSkinType =[];

// Reder a weapon image getImageOfWeapon(skin);
function getImageOfWeapon(skin, category){
  weaponList.innerHTML = '';
fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json")
.then((res)=>res.json())
.then((res)=>{
weaponSkinType = res.map(item => {
if(item.weapon.name === skin.weapon.name && item.image){
  // item.category.name === skin.category.name && 

return new WeaponType(item.name, item.image)
}
}).filter(item => item)
clearWeapon()

weaponSkinType.forEach(item => {
const weaponCard = item.getWeaponCard();
weaponList.appendChild(weaponCard);

  weaponCard.addEventListener('click', () => getInfoOfWeapon(skin, category))
  });
})

.catch(error => {
  console.error("There is a problem:", error);
});

let weaponTypeContainer = getId("weaponContainer")
weaponTypeContainer.appendChild(weaponList)
weaponList.id = "weaponImage";
weaponList.className = "weapon-list";
console.log(weaponList);
}

// Event Listener of the Weapon
function getInfoOfWeapon(skin, category){
  let weaponCategory = getWeaponType(skin.weapon.name);
selectedWeapons[weaponCategory] = skin;
console.log(selectedWeapons)

let selectedItems = getId("selectedItems");

if (!selectedItems) {
  selectedItems = createElem('div');
  selectedItems.id = "selectedItems";
  weaponContainer.appendChild(selectedItems);
}
selectedItems.innerHTML = ''
let descriptionOfSelectedItems = createElem('p');
descriptionOfSelectedItems.innerHTML = "Selected Weapons:";
 for(category in selectedWeapons){
  let value = selectedWeapons[category]
if(value){
  let weaponName = value.weapon.name;
  let itemInfo = createElem('p');
      itemInfo.textContent = `${category}: ${weaponName}`;
      selectedItems.appendChild(itemInfo);
}

 }
   // Description of selected items

   selectedItems.appendChild(descriptionOfSelectedItems)
 
 
}



function clearWeapon() {
  let weaponList = getId("weaponImage");
  let weaponTypeContainer = getId("weaponContainer");
  if (weaponList) {
    while (weaponList.firstChild) {
      weaponList.removeChild(weaponList.firstChild);
    }
  }
}

// Screen number 5 
// showChosenOption()
function showChosenOption(){
  container.innerHTML = "";
  weaponContainer.innerHTML = "";

  let createTeamHeader = getId("headerAgentName");
if(!createTeamHeader){
  let divHeaderName = createElem('div');
  let agentName = createElem('h1');
  agentName.id = "agent-header";
  agentName.innerHTML = userName
  divHeaderName.id = "divHeaderName";
  container.appendChild(divHeaderName);
  divHeaderName.appendChild(agentName)
}

renderSelectedPlayer();
teamName();

}
 function renderSelectedPlayer(){
  let divSelectedAgent = createElem('div')
divSelectedAgent.id = "divSelectedAgent";
  let agentPhoto = arrayOfAgent[0].image;
const agentImage = createElem('img');
agentImage.id = "agentImage";
agentImage.src = agentPhoto;
divSelectedAgent.appendChild(agentImage)

for (let weaponCategory in selectedWeapons){
  if(selectedWeapons.hasOwnProperty(weaponCategory)){
    let weaponCard = createElem('div');
    weaponCard.classList.add('card');

  let imgSelectedeWeapon = createElem('img'); 
  imgSelectedeWeapon.id = "imgSelectedeWeapon";
  imgSelectedeWeapon.src = selectedWeapons[weaponCategory].image;
// Add description to the weapon
  imgSelectedeWeapon.addEventListener("click", ()=>{
    let detailOfWeapon = createElem('p');
    let value = selectedWeapons[weaponCategory].name;
    console.log(value)
    detailOfWeapon.textContent = `${value}`
        imgSelectedeWeapon.appendChild(detailOfWeapon)
      });
    weaponCard.appendChild(imgSelectedeWeapon);
    divSelectedAgent.appendChild(imgSelectedeWeapon)
    // weaponCard.id = "weaponCard";
  }
}
console.log("Finally we are here")
container.appendChild(divSelectedAgent)
}

function teamName(){
  let teamNameDiv = createElem('div');
  teamNameDiv.id = "teamNameDiv";
  let labelTeam = createElem('label');
  labelTeam.textContent = "Team Name ";
  let spanTeamName = createElem('span');
  spanTeamName.id = "spanTeam"
  let inputTeamName = createElem('input');
  inputTeamName.id = 'inputTeamName';
  let btnTeamName = createElem('button');
  container.appendChild(teamNameDiv);
  btnTeamName.id = "btnTeamName";
  btnTeamName.textContent = "Create Team";
let btnTeam = getId('btnTeamName');

btnTeamName.addEventListener("click",validationTeamName);
teamNameDiv.appendChild(btnTeamName);
  teamNameDiv.insertBefore(inputTeamName, btnTeamName);
  teamNameDiv.insertBefore(labelTeam, inputTeamName);
  labelTeam.appendChild(spanTeamName);
  
  
}
let createTeamName =null;
function validationTeamName(){
  let isValid;
  let inputTeam = getId('inputTeamName')
  let spanTeam = getId("spanTeam");
  let inputValue = inputTeam.value.trim();
  console.log(inputValue);
  const pattern = /^[a-zA-Z]+$/;
  if(!pattern.test(inputValue)){
    alert("Enter a single word of alphabetical characters(symbols/numbers are not allowed)");
    inputTeam.value = "";
    spanTeam.textContent = "";
    isValid = false
  }else{
    spanTeam.textContent = inputTeam.value;
    inputTeam.value = "";
    isValid = true;
    createTeamName =inputTeam.value;
    createTeam();
  }
return isValid;


}
function createTeam() {
  container.innerHTML = "";

  let divTeamHeader = getId("divTeamHeader");
  if (!divTeamHeader) {
    divTeamHeader = createElem("div");
    divTeamHeader.id = "divTeamHeader";

    let h1Name = createElem("h1");
    h1Name.id = "TeamNameHeader";
    h1Name.textContent = createTeamName;

    divTeamHeader.appendChild(h1Name);
    container.appendChild(divTeamHeader);
  } else {
    let h1Name = getId("TeamNameHeader");
    h1Name.textContent = createTeamName;
  }
}

function weaponRetrieving(type){
    console.log("hi there")
    if(type.category.name && team.name){
    let gearTypeContainer = document.getElementById("gearType");
    console.log()
    // Get the weaponTypeContainer
    if (!gearTypeContainer) {
        gearTypeContainer = createElem('div'); 
        gearTypeContainer.id = "gearType";
        weaponContainer.appendChild(gearTypeContainer); 
    }
    for (let button of storeBtnTypes) {
        if (button) {
            gearTypeContainer.appendChild(button);
            console.log(storeBtnTypes)
        }
    }
}
}
function result(){
    return new Promise((resolve) =>{
        setTimeout(() =>{
            console.log("works")
            resolve();
        }, 0)
    })
}
firstBtn()
.then(()=>result())
.catch((err)=>console.log(err))

function validateUsername(e) {
    // container.appendChild(userContainer)
    
    
}

