const taskContainer = document.querySelector(".task__container"); //to access  html parent element to add card
const openTaskModal = document.querySelector(".task__modal__body");

//global storage
let globalStore = [];

const newCard = ({
    id,
    imageUrl,
    taskTitle,
    taskType,
    taskDescription,
    }) => `<div class="col-md-6 col-lg-4  mb-4" id = ${id}>
                    <div class="card ">
                        <div class="card-header d-flex justify-content-end gap-2">
                            <button type="button"  id = ${id} class="btn btn-outline-success" onclick="editCard.apply(this, arguments)"><i onclick="editCard.apply(this, arguments)" class="fas fa-pencil-alt"  id = ${id}></i></button>
                            <button type="button" id = ${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)"><i onclick="deleteCard.apply(this, arguments)" class="fas fa-trash-alt" id = ${id}></i></button>
                        </div>
                        <div class="card-body ">
                            <img src="${imageUrl}" 
                            class="card-img-top rounded" alt="img">
                            <h5 class="card-title mt-3">${taskTitle}</h5>
                            <p class="card-text">${taskDescription}</p>
                            <span class="badge bg-primary">${taskType}</span>
                        </div>
                        <div class="card-footer text-muted d-flex justify-content-end gap-2">
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#showTask" id = ${id} onclick="openTask.apply(this, arguments)">Open Task</button>
                        </div>
                        
                    </div>
                </div>`;


const viewCard = ({ id, imageUrl, taskTitle, taskDescription, taskType }) => {
    return `<div id=${id}>
    <img
    src=${imageUrl}
    alt="bg image"
    class="img-fluid task__image__view mb-3"
    />
    <h2 class="my-3">${taskTitle}</h2>
    <p class="lead">${taskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>
   </div>`;               
};
    
const  loadInitialTaskCard = ()=> {
    //access localsorage
    const getInitialData = localStorage.getItem("tasky");
    if(!getInitialData)
        return;
    //convert string-object to object
    const {cards}= JSON.parse(getInitialData);
    
    //generate html cardobject and inject;
    cards.forEach((cardObject) => {
        const createNewCard = newCard(cardObject);
        taskContainer.insertAdjacentHTML("beforeend",createNewCard);
        globalStore.push(cardObject);
        
    });
   

};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, //unique number for created card
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };
    const createNewCard = newCard(taskData);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);

    globalStore.push(taskData);
    //using localstore API(Apllication Programming Interface) to store the card date
    updateLocalStorage();


    
};
const updateLocalStorage = () =>{
    localStorage.setItem("tasky", JSON.stringify({cards: globalStore})); //stringify-->object to string

};


const deleteCard = (event) => {
    // Get the ID
    event = window.event;
    const targetId = event.target.id;
    const tagname = event.target.tagName;
  
    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetId);
  
    updateLocalStorage();
  
    // Access DOM to remove card
    if (tagname === "BUTTON") {
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode
      );
    }
  
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );
  };

const editCard =(event) =>{
     //id of the card
     event = window.event;
     const targetID = event.target.id;
     const tagName = event.target.tagName; //Button

     let parentElement;
     if(tagName === "BUTTON")
     {
         parentElement = event.target.parentNode.parentNode;
     }
     else
     {
        parentElement = event.target.parentNode.parentNode.parentNode;  
     }
     

     let taskTitle = parentElement.childNodes[3].childNodes[3];
     let taskDescription = parentElement.childNodes[3].childNodes[5];
     let taskType = parentElement.childNodes[3].childNodes[7];
     let submitButton = parentElement.childNodes[5].childNodes[1];
     
    //setAttribute
    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
    submitButton.setAttribute("onclick","saveEditChanges.apply(this,arguments)");
    submitButton.innerHTML = "Save Changes";
 
};

const saveEditChanges = (event) =>{
    event = window.event;
    const targetID = event.target.id;
    const tagName = event.target.tagName; //Button
    

    let parentElement;
    if(tagName === "BUTTON")
    {
        parentElement = event.target.parentNode.parentNode;
    }
    else
    {
        parentElement = event.target.parentNode.parentNode.parentNode;  
    }
    let taskTitle = parentElement.childNodes[3].childNodes[3];
    let taskDescription = parentElement.childNodes[3].childNodes[5];
    let taskType = parentElement.childNodes[3].childNodes[7];
    let submitButton = parentElement.childNodes[5].childNodes[1];

    const updatedData ={
        taskTitle:taskTitle.innerHTML,
        taskDescription:taskDescription.innerHTML,
        taskType:taskType.innerHTML,
    };
    

    globalStore = globalStore.map((task) =>{
        if(task.id == targetID)
        {
            return {
                id: task.id,
                imageUrl: task.imageUrl,
                taskTitle: updatedData.taskTitle,
                taskType: updatedData.taskType,
                taskDescription: updatedData.taskDescription,

            };
        } 
        return task;
    })
    updateLocalStorage();

};

const openTask = (event) => {
    if (!event) {
      event = window.event;
    }
  
    const viewTask = globalStore.filter(({ id }) => id === event.target.id);
    openTaskModal.innerHTML = viewCard(viewTask[0]);
};
