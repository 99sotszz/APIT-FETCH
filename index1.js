const getUsers = (url = "https://reqres.in/api/users?delay=3") => {
    let fechaCaducidad = localStorage.getItem("fechaCaducidad");
    if (Object.is(null, fechaCaducidad) || new Date().getTime() > fechaCaducidad) {
        console.log("Fetch");
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((users) => {
                localStorage.setItem("users", JSON.stringify(users.data));
                localStorage.setItem("fechaCaducidad", (new Date().getTime()) + 60_000);
                insertUsers(users.data);
            })
            .catch((error) => console.log(error));
    } else {
        insertUsers(JSON.parse(localStorage.getItem("users")));
        console.log("Datos locales");
    }
};

//Mostrar usuarios
function insertUsers(users) {
    let container = document.querySelector(".tbody");   
    container.innerHTML = "";
    localStorage.setItem("users", JSON.stringify(users));
    //console.log(users);
    for (let user of users) {
        const dom = document.createElement("tr");
        dom.classList.add("table-group-divider");
        dom.innerHTML = `
            <td class="table-info"><img src="${user.avatar}" class="rounded-circle" alt="profile picture"></td>
            <td class="table-success">${user.id}</td>
            <td class="table-danger">${user.first_name}</td>
            <td class="table-danger">${user.last_name}</td>
            <td  class="table-success">${user.email}</td>
            
            `
        container.appendChild(dom);
    }
}


