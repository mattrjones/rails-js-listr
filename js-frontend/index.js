document.addEventListener("DOMContentLoaded", () => {
    createForm();
    fetchLists();
})

const BASE_URL = "http://localhost:3000"

//read - fetch my lists index

function fetchLists(){
    fetch(`${BASE_URL}/lists`)
    .then(resp => resp.json())
    .then(users => {
        for(const list of lists){
            let i = new List(list.name)
            i.renderList();
        }
    })
}