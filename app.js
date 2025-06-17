const cardTask = document.querySelector(".cardTask"); /* DONDE VA CADA TARJETA */


function renderTask() {
    const arrayTasks = JSON.parse(localStorage.getItem("arrayTasks")) || [];

    cardTask.innerHTML = "";

    arrayTasks.array.forEach(element => {
        cardTask.innerHTML += `
            <div class="container">
                <h2></h2>
                <p></p>
                <p class="fecha"><i class="fa-solid fa-calendar-days"></i></p>
                <p></p>
                <div class="buttons">
                    <button><i class="fa-regular fa-trash-can trash"></i></button>
                    <button> <i class="fa-solid fa-pen edit"></i></button>
                </div>
                <i class="fa-solid fa-map-pin pin"></i>
            </div> 
        `;
        
    });
}