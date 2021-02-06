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
        <h3>${this.name}</h3>
        </ul>
        `
    }
}