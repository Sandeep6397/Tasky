const taskContainer = document.querySelector(".task__container"); //to access  html parent element to add card



const newCard = ({
    id,
    imageUrl,
    taskTitle,
    taskType,
    taskDescription,
    }) => `<div class="col-md-6 col-lg-4" id = ${id}>
                    <div class="card ">
                        <div class="card-header d-flex justify-content-end gap-2">
                            <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
                            <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
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
};
