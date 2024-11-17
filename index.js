let form = document.getElementById("form")
let todoListInput = document.getElementById("todo-list")
let inputAlert = document.getElementById("input-alert")
let listOfTaskContainer = document.getElementById("list-of-task-container")


let todoTaskArray = []
form.addEventListener("submit", handleFormData)
function handleFormData(event){
    event.preventDefault()

    // collect and store data value 
    let todoList = todoListInput.value.trim()

    // validate form
    if(todoList === ""){
        inputAlert.textContent = "Field is empty, enter a task."
        todoListInput.style.border = "1px solid red";
        // Prevent further processing if input is empty
        return
    }else{
        inputAlert.innerText = ""
        todoListInput.style.border = "1px solid green"
    }

    // Store the data value in an object literal 
    const userTask = {
        userTaskList : todoList,
        completed : false 
    }
    // Push the object literal into an array 
    todoTaskArray.push(userTask)

    // Send the array to local storage 
    localStorage.setItem("usersTodoTask", JSON.stringify(todoTaskArray))
    form.reset()
    fetchItem()
}

// Validate form Function
todoListInput.addEventListener("keyup", function(){
    validateForm()
})
function validateForm(){
    let validatetodo = todoListInput.value
    if(validatetodo.length === 0){
        inputAlert.innerText = "Field is empty please Enter Task"
        todoListInput.style.border = "1px solid red"
    }else{
        inputAlert.innerText = ""
        todoListInput.style.border = "1px solid green"
    }
}

// fetch item from Local storage 
function fetchItem(){
    if(localStorage.getItem("usersTodoTask")){
       todoTaskArray = JSON.parse(localStorage.getItem("usersTodoTask"))
    }
    printToUi()
}
fetchItem()

// Display data to the UI 
function printToUi(){
    listOfTaskContainer.innerHTML = ""
    todoTaskArray.forEach(function(item){
        let userItem = item.userTaskList

        // Create element dynamically
        let trashIcon = document.createElement("i")
        trashIcon.classList.add("fa-solid", "fa-trash")
        trashIcon.setAttribute("onclick", `deleteItem('${userItem}')`)

        let editIcon = document.createElement("i")
        editIcon.classList.add("fa-solid", "fa-pen-to-square")
        editIcon.setAttribute("onclick", `editItem('${userItem}')`)

        let checkIcon = document.createElement("i")
        checkIcon.classList.add("fa-solid", "fa-circle-check")
        checkIcon.setAttribute("onclick", `checkItem('${userItem}')`)

        let taskIcon = document.createElement("div")
        taskIcon.classList.add("task-icons")
        taskIcon.append(checkIcon, editIcon, trashIcon)

        let taskText = document.createElement("p")
        taskText.textContent = userItem
        if(item.completed){
            taskText.classList.add("completed-task")
        }

        let listTaskText = document.createElement("div")
        listTaskText.append(taskText)

        let listTaskContainer = document.createElement("div")
        listTaskContainer.classList.add("list-task-container")
        listTaskContainer.append(listTaskText, taskIcon)

        listOfTaskContainer.append(listTaskContainer)

    })
}

// Delete an item from the list 
function deleteItem(userData){
    todoTaskArray.forEach(function(item, index){
        if(item.userTaskList === userData){
            todoTaskArray.splice(index, 1)
        }
    })
    // Re-render the UI with the updated version
    localStorage.setItem("usersTodoTask", JSON.stringify(todoTaskArray))
    fetchItem()
}

// Handle editing task 
function editItem(dataForUser){
    const newTask = prompt("Edit your task", dataForUser)
    if(newTask === null || newTask.trim() === ""){
        return
    }

    todoTaskArray.forEach(function(item){
        if(item.userTaskList === dataForUser){
            // Update the task with the new value 
            item.userTaskList = newTask
        }
    })
     // Re-render the UI with the updated version
     localStorage.setItem("usersTodoTask", JSON.stringify(todoTaskArray))
     fetchItem()
}

// Adding check as completed functionality 
function checkItem(checkData){
    todoTaskArray.forEach(function(item){
        if(item.userTaskList === checkData){
            item.completed = !item.completed
        }
    })

    // Re-render the UI with the updated version
    localStorage.setItem("usersTodoTask", JSON.stringify(todoTaskArray))
    fetchItem()
}


