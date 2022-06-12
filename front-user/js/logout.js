let logoutButton = document.getElementById('logout');


logoutButton.addEventListener('click',async ()=>{
    localStorage.removeItem("token");
    window.location = "./index.html"

})