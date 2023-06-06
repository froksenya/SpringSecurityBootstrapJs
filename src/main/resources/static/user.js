const url = "http://localhost:8090/api/user";

function userPage() {
    fetch(url).then(response => response.json()).then(user =>
        userInfoTable(user))
}

function userInfoTable(user) {
    let output = "";
        let roles = [];
        for (let role of user.roles) {
            roles.push(" " + role.name.substring(5))
        }
        output += ` <tr>
                            <th><p>${user.id}</p></th>
                            <th><p>${user.name}</p></th>
                            <th><p>${user.surname}</p></th>
                            <th><p>${user.city}</p></th>
                            <th><p>${user.age}</p></th>
                            <th><p>${roles}</p></th>

                     </tr> `
    document.getElementById("userInfo").innerHTML = output;
}

userPage();