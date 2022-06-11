window.addEventListener('load',()=>{
    const token = localStorage.getItem("token") || null;

    if(token){
        window.location = "./pages/panel.html";
    }else{
        window.location = "./pages/login.html";
    }
})