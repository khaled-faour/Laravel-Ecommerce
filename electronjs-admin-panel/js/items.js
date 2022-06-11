
window.addEventListener('load', ()=>{
    
    fetchData()
})

const token = localStorage.getItem('token');

// Defining The Request With Token
const request = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    headers: {
        'Authorization': `bearer ${token}`
    }
});

const tableList = document.getElementById('list');
    
console.log(localStorage.getItem("token"))

async function fetchData(){
    await request.get("/store/item").then(response=>{
        tableList.innerHTML = '';
        const items = [...response.data.items];
        console.log(items)
        items.map(item=>{
            tableList.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td> ${item.price.toFixed(2)}</td>
                <td class="action-buttons">
                    <a onclick="deleteItem(${item.id})" ><i class="fa-solid fa-trash"></i></a>
                    <a onclick="editItem(${item.id})" ><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
            </tr>
            `
        })
    })
}


function deleteItem(id){
    console.log("deleting: ", id)
}
function editItem(id){
    console.log("editing: ", id)
}