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
        </ul>
        <button class="delete-button" data-id=${this.id} onClick="deleteList()">Delete List</button>
        `
    }
}