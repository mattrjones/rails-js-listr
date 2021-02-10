const listFormFields = `
    <label><strong>List Name: </strong></label><br/>
    <input type="text" id="name" required><br/>
    <label><strong>Description: </strong></label><br/>
    <textarea id="description" rows="3" columns="20" required></textarea><br/>
`;

class List {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.tasks = data.tasks.sort((a,b) => (a.updated_at < b.updated_at) ? 1 : ((b.updated_at) ? -1 : 0));
    }

    //static class-only methods
    static newListForm() {
        let newListFormDiv = document.getElementById('list-form')
        newListFormDiv.innerHTML = `
        <form onsubmit="createList(); return false;">` + 
            listFormFields + 
            `<input class="button" type="submit" value="Add New Category">
        </form>
        <br/>`
    }

    static editListForm(){
        let editListFormDiv = document.getElementById('list-form')
        editListFormDiv.innerHTML = `
        <form onsubmit="updateList(); return false;">` + 
            listFormFields + 
            `<input type="submit" value="Update Info">
        </form>
        <br/>`
    }

    // //render list instance method

    // renderList(){
    //     let listsDiv = document.getElementById("lists-container")

    //     listsDiv.innerHTML += 
    //     `
    //     <ul>
    //     <h2>${this.name}:</h2>
    //     <div id="task-form">
    //     </div>
    //     </ul>
    //     <button class="task-button" onClick="taskForm()">Add A Task</button>
    //     <button class="delete-button" data-id=${this.id} onClick="deleteList()">Delete List</button>
    //     `

    //     // this.tasks.each do |task|
    //     //     listsDiv.innerHTML += 
    //     //     `
    //     //     <li>${task.label}</li>
    //     //     `
    //     // end 
    // }

}

function getLists(){
    fetch("http://localhost:3000/lists")
        .then(resp => resp.json())
        .then(data => {
            renderListsHtml(data)
            addListsClickListeners()
            addTasksClickListeners()
        })
}

function createList(){
    const list = {
        title: document.getElementById('name').value, 
        description: document.getElementById('description').value,
    }

    fetch("http://localhost:3000/lists", {
        method: 'POST',
        body: JSON.stringify(list),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    })
        .then(resp => resp.json() )
        .then(list => {
            clearListsHtml()
            getLists()
            List.newListForm()
        });
}

function updateList() {
    let ListId = this.event.target.listID.value 

    const list = {
        title: document.getElementById('name').nodeValue,
        description: document.getElementById('description').nodeValue,
    }

    fetch(`http://localhost:3000/lists/${listID}`, {
        method: 'PATCH',
        body: JSON.stringify(list),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    })
        .then(resp => resp.json())
        .then(list => {
            clearListsHtml()
            getLists()
            List.newListForm()
        });
}

function editList(){
    let listId = this.parentElement.getAttribute('data-list-id')

    fetch(`http://localhost:3000/lists/${listId}`)
        .then(resp => resp.json())
        .then(data => {
            List.editListForm()
            let listForm = document.getElementById('list-form')
            listForm.querySelector('#name').value = data.name 
            listForm.querySelector('#listId').value = data.id 
            listForm.querySelector('#description').value = data.description 
        })
}

function deleteList(){
    let listId = this.parentElement.getAttribute('data-list-id')
    
    fetch(`http://localhost:3000/lists/${listId}`, {
        method: 'DELETE'
    })
        .then(resp => resp.json())
        .then(json => {
            let selectedList = document.querySelector(`.card[data-list-id="${listId}`)
            selectedList.remove()
        })
}

function addListsClickListeners(){
    document.querySelectorAll('.edit-list-button').forEach(element => {
        element.addEventListener("click", editList)
    })

    document.querySelectorAll('.delete-list-button').forEach(element => {
        element.addEventListener("click", deleteList)
    })
}

function clearListsHtml(){
    let listsIndex = document.getElementById("lists-list")
    listsIndex.innerHTML = ''
}

List.prototype.listTasksHtml = function (){
    let listTasks = this.tasks.map(task => {
        let date = parseDate(task.updated_at)

        return (`
        <div class="card" data-task-id="${task.id}" >
        <strong><i>Last Update: </i></strong>${date} <br/>
        <strong>Task Name: </strong>${task.label} <br/>
        
        <button class="delete-task-button" style="background-color:red">Delete Task</button>
        </div>
        `)
    }).join('')

    return (listTasks)
}