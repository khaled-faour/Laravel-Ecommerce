window.addEventListener('load', ()=>{

    const token = localStorage.getItem('token') || null;
    console.log(window.location)
    if(token && window.location.pathname !== '/home.html'){
        window.location = './home.html';
    }else if(!token && window.location.pathname !== '/login.html'){
        window.location = './login.html';
    }
})