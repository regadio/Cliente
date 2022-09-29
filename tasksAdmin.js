
const tasks = [];
function customOnSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.inputname.value;
    const relevan = event.target.elements.inputrelevan.value;
    const aa = {
        "name":name,
        "relevan":relevan,
    }
    tasks.push(aa);
    console.log(aa.name);
    console.log(aa.relevan);

    let crearli = document.createElement("li")
    crearli.innerHTML = aa.name;
    document.getElementById("persolista").append(crearli);
    
}
function customOnClick(event) {
    console.log("Clicaste en ordenar");
    const theList = document.getElementById("persolista");
    theList.innerHTML = ""; 
    tasks.sort((tasks1, tasks2) => tasks1.relevan - tasks2.relevan);
    tasks.reverse();
    for (const aa of tasks) {
        let aListItem = document.createElement("li");
        aListItem.innerHTML = aa.relevan;
        theList.append(aListItem);
    }
}
document.getElementById("sortButton").addEventListener("click", customOnClick);


document.getElementById("tasksform").addEventListener("submit", customOnSubmit);
