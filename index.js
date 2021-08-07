const taskContainer = document.querySelector(".task__container"); //to access  html parent element to add card

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
                            <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
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
                            <button type="button" class="btn btn-outline-primary">Open Task</button>
                        </div>
                    </div>
                </div>`;
    
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
    // ((cardObject) => {
    //     const createNewCard = newCard(cardObject);
    //     taskContainer.insertAdjacentHTML("beforeend",createNewCard);
    //     globalStore.push(cardObject);
    // });

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
    localStorage.setItem("tasky", JSON.stringify({cards: globalStore})); //stringify-->object to string


    
};

const deleteCard = (event) => {
    //id of the card
    event = window.event;
    const targetID = event.target.id;
    const tagName = event.target.tagName; //Button

    //search in globalStore array,if matches delete the card
   const newUpdatedArray =  globalStore.filter((cardObject) => {
       cardObject.id !==targetID
   });
   globalStore = newUpdatedArray;
    //loop over the new global store and inject the updated card
   
    if(tagName === "BUTTON")
    {
        //task__container
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode //col-lg-4
        );
    }
    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode //col-lg-4
    );

};
