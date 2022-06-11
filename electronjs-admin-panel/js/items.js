let items =[]

let addModal;
let addButton;
let addCloseButton;
let addSave;

let editModal;
let editCloseButton;
let editSave;


let deleteModal;
let cancelDelete;
let confirmDelete;

window.addEventListener('load', ()=>{
    addModal = document.getElementById("add-modal");
    addButton = document.getElementById("add-button");
    addCloseButton = document.getElementById("add-modal-close");
    addSave = document.getElementById("add-save");

    editModal = document.getElementById("edit-modal");
    editCloseButton = document.getElementById("edit-modal-close");
    editSave = document.getElementById("edit-save");

    // ADD ITEM LISTENERS
    addButton.addEventListener('click', ()=>{
        addModal.style.display = "block";
    })

    addCloseButton.addEventListener('click', ()=>{
        addModal.style.display = "none";
    })

    document.getElementById('add-img').addEventListener('change', (e) => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener('loadend', () => {
            console.log(reader.result)
            document.getElementById('add-img-view').src = reader.result
        })
    })
    document.getElementById('edit-img').addEventListener('change', (e) => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener('loadend', () => {
            console.log(reader.result)
            document.getElementById('edit-img-view').src = reader.result
        })
    })

    addSave.addEventListener('click', saveItem)


    // DELETE ITEM LISTENERS
    deleteModal = document.getElementById("delete-modal");
    cancelDelete = document.getElementById("delete-modal-close");
    confirmDelete = document.getElementById("delete-modal-confirm");

    // EDIT ITEM LISTENERS
    editCloseButton.addEventListener('click', ()=>{
        editModal.style.display = "none";
    })

    fetchItems()
    fetchCategories()
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
const addCategoriesList = document.getElementById('add-categories');
    

async function fetchItems(){
    await request.get("/store/item").then(response=>{
        tableList.innerHTML = '';
        items = [...response.data.items];
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
async function fetchCategories(){
    await request.get("/store/category").then(response=>{
        console.log(response.data)
        addCategoriesList.innerHTML = '';
        const categories = [...response.data.categories];
        categories.map(category=>{
            addCategoriesList.innerHTML += `
            <option value="${category.id}">${category.category}</option>
            `
        })
    })
}


function deleteItem(id){


    const deleteConfrim = async ()=>{
        await request.delete(`/admin/item/${id}`).then(response=>{
            if(response.data.status === "success"){
                deleteModal.style.display = "none";
                fetchItems();
            }
        })
    }

    confirmDelete.onclick = ()=>deleteConfrim().then(()=>confirmDelete.onclick = ()=>{})
    deleteModal.style.display = "block";
    

}
function editItem(id){
    editModal.style.display = "block"
    const item = items.find(item=>item.id === id)

    const name = document.getElementById('edit-name')
    const description = document.getElementById('edit-description')
    const price = document.getElementById('edit-price')
    const image = document.getElementById('edit-img-view');

    name.value = item.name
    description.value = item.description
    price.value = item.price
    image.src = `http://127.0.0.1:8000${item.image}`;

    const saveEdit = async ()=>{
        const newItem = {
            name: name.value,
            description: description.value,
            price: price.value,
            image: image.src
        }
        

        // newItem.append('name', name.value)
        // newItem.append('description', description.value)
        // newItem.append('price', price.value)
        // newItem.append('image', image.src)

        await request.put(`/admin/item/${id}`, newItem).then(response=>{
            if(response.data.status === "success"){
                editModal.style.display = "none"
                fetchItems();
            }
        })
    }

    editSave.onclick = ()=>saveEdit().then(()=>editSave.onclick=()=>{})
}

function saveItem(){
    
    const name = document.getElementById('add-name')
    const description = document.getElementById('add-description')
    const price = document.getElementById('add-price')
    const categories = document.getElementById('add-categories').selectedOptions
    const selectedCategories = Array.from(categories).map(option=>option.value)
    const image = document.getElementById('add-img-view');

    if(name.value === "" || description.value === "" || price.value === ""){
        alert("All fields are required");
        return
    }
    const item = new FormData();
    item.append('name', name.value)
    item.append('description', description.value)
    item.append('price', price.value)
    item.append('categories', selectedCategories)
    item.append('image', image.src)

    request.post('/admin/item', item).then(response=>{
        if(response.data.status === "success"){
            fetchItems()
            addModal.style.display = "none"
            name.value = ""
            description.value = ""
            price.value = ""
            categories.selectedOptions = []
            image.src = ""
        }
    });
}