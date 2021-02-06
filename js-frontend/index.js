document.addEventListener("DOMContentLoaded", () => {
    createForm();
    fetchLists();
})

const BASE_URL = "http://localhost:3000"

//read - fetch my lists index

function fetchLists(){
    fetch(`${BASE_URL}/lists`)
    .then(resp => resp.json())
    .then(lists => {
        for(const list of lists){
            let i = new List(list.id, list.name)
            i.renderList();
        }
    })
}

function createForm(){
    let listsForm = document.getElementById("lists-form")

    listsForm.innerHTML += 
    `
    <form>
        List Name: <input type="text" id="name"><br>
        <input type="submit" value="Create List">
    </form>
    `

    listsForm.addEventListener("submit", listFormSubmission)
}

function listFormSubmission(){
    debugger;
    event.preventDefault();
    let name = document.getElementById("name").value

    let list = {name: name}

    fetch(`${BASE_URL}/lists`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
    })
    .then(resp => resp.json())
    .then(list => {
        let i = new List(list.id, list.name)
        i.renderList();
    })
}

//delete - delete a list

function deleteList(){
    
    let listID = parseInt(event.target.dataset.id)

    fetch(`${BASE_URL}/lists/${listID}`, {
        method: "DELETE"
    })

    setTimeout(() => {this.location.reload();}, 10)
}