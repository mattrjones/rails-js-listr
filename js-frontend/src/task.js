class Task{
    constructor(data){
        this.id = id;
        this.label = label;
        this.list_id = data.list_id
        this.updated_at = data.updated_at 
        this.created_at = data.created_at
    }
}

function addTask(){
    const task = {
        //returns the task attributes
        label: document.getElementById('label').value, 
    }

    fetch("http://localhost:3000/tasks", {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    })
        .then(resp => resp.json())
        .then(task => {
            clearListsHtml()
            getLists()
        });
}

function renderTaskFormFields(listId){
    return `<label><strong>Task Name: </strong></label><br/>
    <input type="text" id="label" required><br/>
    <input type="hidden" id="task-listID" value="${listId}">
    <input class="submit-new-task" type="submit" value="Submit">
    `
}

function renderNewTaskForm(){
    let listId = this.getAttribute('id')
    this.style.display = "none"
    let tasksHtml = this.parentElement
    let taskForm = document.createElement('form')
    taskForm.setAttribute("onsubmit", "addItem(); return false;")
    taskForm.innerHTML = renderTaskFormFields(listId)
    tasksHtml.appendChild(taskForm)
}

function deleteTask(){
    let taskId = this.parentElement.getAttribute('data-task-id')

    fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
    })
        .then(resp => resp.json())
        .then(json => {
            let selectedTask = document.querySelector(`.card[data-task-id]="${taskId}"]`)
            selectedTask.remove()
        })
}

function addTasksClickListeners(){
    document.querySelectorAll('.view-tasks-list-button').forEach(element => {
        element.addEventListener('click', viewListTasks)
    })

    document.querySelectorAll('.add-task-button').forEach(element => {
        element.addEventListener('click', renderNewTaskForm)
    })

    document.querySelectorAll('.delete-task-button').forEach(element => {
        element.addEventListener("click", deleteTask)
    })
}

function viewListTasks() {
    List.newListForm()
    let listSelectedHtml = this.parentElement.querySelector('.items')
    toggleHideDisplay(listSelectedHtml)
}