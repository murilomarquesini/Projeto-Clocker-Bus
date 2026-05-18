// visualizar senha
const olhos = document.querySelectorAll('.olho-senha');

olhos.forEach(olho => {
    olho.addEventListener('click', function(){
        const input = this.parentElement.querySelector('input');

        if(input.type === "password"){
            input.type = "text";
            this.classList.replace("fa-eye","fa-eye-slash");
        }else{
            input.type = "password";
            this.classList.replace("fa-eye-slash","fa-eye");
        }
    });
});


// LOGIN
const formLogin = document.querySelector('#formLogin');

if(formLogin){
    formLogin.addEventListener('submit', function(e){
        e.preventDefault();

        const emailLogin = document.querySelector('#emailLogin').value.trim();
        const senhaLogin = document.querySelector('#senhaLogin').value.trim();

        if(!emailLogin || !senhaLogin){
            alert("Preencha todos os campos!");
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuario = usuarios.find(u =>
            u.email === emailLogin && u.senha === senhaLogin
        );

        if(!usuario){
            alert("Usuário ou senha incorretos!");
            return;
        }

        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        // REDIRECIONAMENTO INTELIGENTE
        if(usuario.tipo === "motorista"){
            window.location.href = "../html/motorista/gerenciarRotas.html";
        }else{
            window.location.href = "../index.html";
        }
    });
}