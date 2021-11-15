const taskContainer = document.querySelector(".task__container");

let globalStore = [];

const generateNewCard = (taskData) => (`
  <div class="col-sm-12 col-md-6 col-lg-4">
    <div class="card mb-3">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success rounded-pill"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger rounded-pill" id=${taskData.id}onclick="deleteCard.apply(this,arguments)">
          <i class="fas fa-trash-alt"  id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i>
        </button>
      </div>
      <div class="card-body">
        <img class="card-img-top" src=${taskData.imageUrl} alt="...">
        <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-primary">${taskData.taskType}</a>
      </div>
    </div>
  </div>
`) //When there is `` we can't use curly brackets we need to use parenthesis or leave it

const loadInitialCardData = () => {
   // localStorage to get tasky card data
   const getCardData = localStorage.getItem("tasky"); //getItem returns data based on id

   //convert to normal object
   const {cards} = JSON.parse(getCardData); //{cards} is used for destructuring
   //parse is reverse of stringify


   //loop over those array of task object to create HTML card , inject it to document
   cards.map((cardObject) => { //map to iterate through object of objects
     taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
     //update our globalStore
     globalStore.push(cardObject);
   } );

};

// Delete Function
const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if(tagname === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};



// Save Function
const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, // ${} is used to be on safer side when we are inserting dynamic values inside it
    imageUrl: document.getElementById("imageurl").value,// .value is used to get only the value present inside that id
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value
  };


  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData)); //beforeend is used to insert the card at the end of task container similarly we have beforebegin,afterbegin,afterend
  globalStore.push(taskData);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));//stringify will help to convert the object of Objects in localStorage into array of Objects
};
// globalStore.push(taskData);//We can't directly push taskData(objects) directly into localStorage
// localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));//setting the 2nd parameter into your localStorage
// We convert into array of objects as local storage accepts only arrays of Objects
// Later we have to re-convert it into object of objects for performing rest tasks

// API - Application Programming Interface
// local storage - Accessing application via local storage
// Interface - It means middle man
