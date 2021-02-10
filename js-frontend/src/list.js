const listFormFields = `
    <label><strong>List Name: </strong></label><br/>
    <input type="text" id="name" required><br/>
    <label><strong>Description: </strong></label><br/>
    <textarea id="description" rows="3" columns="20" required></textarea><br/>
`;

class List {
    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    //render list instance method

    renderList(){
        let listsDiv = document.getElementById("lists-container")

        listsDiv.innerHTML += 
        `
        <ul>
        <h2>${this.name}:</h2>
        <div id="task-form">
        </div>
        </ul>
        <button class="task-button" onClick="taskForm()">Add A Task</button>
        <button class="delete-button" data-id=${this.id} onClick="deleteList()">Delete List</button>
        `

        // this.tasks.each do |task|
        //     listsDiv.innerHTML += 
        //     `
        //     <li>${task.label}</li>
        //     `
        // end 
    }

}