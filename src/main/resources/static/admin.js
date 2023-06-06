"use strict";

const url = "http://localhost:8090/api/users";


function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            usersTable(data)
        })
}

function AdminPage() {
    fetch(url).then(response => response.json()).then(user =>
        usersTable(user))
}

function usersTable(listAllUsers) {
    let output = "";
    for (let user of listAllUsers) {
        let roles = [];
        for (let role of user.roles) {
            roles.push(" " + role.name.substring(5))
        }
        output += ` <tr> 
                            <th><p>${user.id}</p></th>
                            <th><p>${user.username}</p></th>
                            <th><p>${user.name}</p></th>
                            <th><p>${user.surname}</p></th>
                            <th><p>${user.city}</p></th>
                            <th><p>${user.age}</p></th>
                            <th><p>${roles}</p></th>
                            <th>
                               <p>
                                 <button type="button" class="btn btn-info" data-toggle="modal"
                                 data-target="#updateModal" 
                                 onclick="modalWindowForUpdate(${user.id})">
                                 Edit
                                 </button>
                               </p>
                            </th>
                            <th>
                               <p>
                                 <button type="button" class="btn btn-danger" data-toggle="modal"
                                 data-target="#deleteModal"
                                 onclick="modalWindowForDelete(${user.id})" >
                                 Delete
                                 </button>
                               </p>
                            </th>
                         </tr> `
    }
    document.getElementById("usersTableBody").innerHTML = output;
}

AdminPage();

function modalWindowForUpdate(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(userForUpdate => {

            document.getElementById('idUpdate').value = userForUpdate.id;
            document.getElementById('usernameUpdate').value = userForUpdate.username;
            document.getElementById('nameUpdate').value = userForUpdate.name;
            document.getElementById('surnameUpdate').value = userForUpdate.surname;
            document.getElementById('cityUpdate').value = userForUpdate.city;
            document.getElementById('ageUpdate').value = userForUpdate.age;
            document.getElementById('passwordUpdate').value = "";
            document.getElementById('roleUpdate').value = userForUpdate.roles;

        })
    });
}

async function updateUser() {
    const formForUpdate = document.getElementById('formForUpdate');
    let rolesList = [];
    for (let i = 0; i < formForUpdate.roles.options.length; i++) {
        if (formForUpdate.roles.options[i].selected) {
            let check = {};
            check["id"] = formForUpdate.roles.options[i].value
            rolesList.push(check);
        }
    }
    let user = {
        id: document.getElementById("idUpdate").value,
        username: document.getElementById("usernameUpdate").value,
        name: document.getElementById("nameUpdate").value,
        surname: document.getElementById("surnameUpdate").value,
        city: document.getElementById("cityUpdate").value,
        age: document.getElementById('ageUpdate').value,
        password: document.getElementById("passwordUpdate").value,
        roles: rolesList
    }
    await fetch(url + '/' + user.id, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    });
    getAllUsers()
}

function modalWindowForDelete(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(userForDelete => {
            document.getElementById('idDelete').value = userForDelete.id;
            document.getElementById('usernameDelete').value = userForDelete.username;
            document.getElementById('nameDelete').value = userForDelete.name;
            document.getElementById('surnameDelete').value = userForDelete.surname;
            document.getElementById('cityDelete').value = userForDelete.city;
            document.getElementById('ageDelete').value = userForDelete.age;
        })
    });
}

async function deleteUser() {
    const id = document.getElementById("idDelete").value
    console.log(id)
    let urlForDelete = url + "/" + id;
    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(urlForDelete, method).then(() => {
        getAllUsers()
    })
}

document.getElementById('newUserTab').addEventListener('submit', (e) => {
    e.preventDefault()
    let role = document.getElementById('selectedRole')
    let chosenRoles = []
    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            chosenRoles.push({id: role.options[i].value, name: 'ROLE_' + role.options[i].innerHTML})
        }
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: document.getElementById('usernameNew').value,
            name: document.getElementById('nameNew').value,
            surname: document.getElementById('surnameNew').value,
            city: document.getElementById('cityNew').value,
            age: document.getElementById('ageNew').value,
            password: document.getElementById('passwordNew').value,
            roles: chosenRoles
        })
    })
        .then((response) => {
            if (response.ok) {
                getAllUsers()
                document.getElementById("usersTableTab").click()
            }
        })
})

