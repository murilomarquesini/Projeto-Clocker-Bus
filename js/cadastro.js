//para a visualização da senha
function visualizarSenha(){
    const iconesOlho = document.querySelectorAll('.olho-senha');

    iconesOlho.forEach(olho => {
        olho.addEventListener('click', function(){
            const campoSenha = this.parentElement.querySelector('input');

            if(campoSenha.type === 'password'){
                campoSenha.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            
            } else {
                campoSenha.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
}

visualizarSenha();


//cadastro 

function validacoes(){
    const nome = document.querySelector('#nome');
    const email = document.querySelector('#email'); 
    const senha = document.querySelector('#senha');

    if(nome.value.length == 0){
        alert('O nome é obrigatório');
        return false;
    }
    if(nome.value.length < 5){
        alert('Nome deve ter pelo menos 5 caracteres');
        return false;
    } 
    if(nome.validity.patternMismatch){
        alert('Use apenas letras maiusculas ou minusculas no campo nome');
        return false;
    }


    if(email.value.length == 0){
        alert('Informe a o email para realizar o cadastro');
        return false;
    }
    if(email.validity.patternMismatch){
        alert('Campo email incorreto!'); 
        return false;
    } 


    if(senha.value.length == 0){
        alert('Informe a senha para o cadastro');
        return false;
    } 
    if(senha.validity.patternMismatch){
        alert('A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, número e símbolo.'); 
        return false;
    }

    return true;
}


function cadastroUsuario(){
    const nome = document.querySelector('#nome');
    const email = document.querySelector('#email'); 
    const senha = document.querySelector('#senha');

    let usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = {
        nome: nome.value.trim(),
        email: email.value.trim(),
        senha: senha.value.trim(),
        avatar: '/imagens/avatares/avatar0.png',
        itinerariosSalvos: [],
        historicoLinhas: [],
        linhasSalvas: []  //caso a parte me meus favoritos / linhas salvas seja implementada
    };

    usuariosCadastrados.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}


const formulario = document.querySelector('#formulario');

if(formulario){
    formulario.addEventListener('submit', function(e){
        e.preventDefault();


        if(validacoes()){
            let usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];

            let emailExiste = false;
            usuariosCadastrados.forEach(function(usuario){
                if(email.value == usuario.email){
                    emailExiste = true;
                }
            });

        
            if(emailExiste){
                alert('Não foi possível realizar o cadastro, pois este email já está cadastrado!');

                nome.value = '';
                email.value = '';
                senha.value = ''; 
            
            } else {                   
                cadastroUsuario();
                alert('Cadastro realizado com sucesso!');

                nome.value = '';
                email.value = '';
                senha.value = '';

                window.location.replace("../index.html");
            }
        }
    });
}


// ------------------------------------------------------------------------------


//login

function validacaoLogin(){
    const emailLogin = document.querySelector('#emailLogin');
    const senhaLogin = document.querySelector('#senhaLogin');


    if(emailLogin.value.length == 0){
        alert('Informe o email para o login');
        return false;
    }

    if(senhaLogin.value.length == 0){
        alert('Informe a senha para o login');
        return false;
    }

    return true;
}



const formLogin = document.querySelector('#formLogin');

if(formLogin){
    formLogin.addEventListener('submit', function(e){
        e.preventDefault();

        const emailLogin = document.querySelector('#emailLogin');
        const senhaLogin = document.querySelector('#senhaLogin');

        if(validacaoLogin()){
            let usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];
            
            let cadastroExiste = false;
            let usuarioLogado = null;

            for(let i = 0; i < usuariosCadastrados.length; i++){
                let usuario = usuariosCadastrados[i];

                if(emailLogin.value.trim() == usuario.email.trim() && senhaLogin.value.trim() == usuario.senha.trim()){
                    cadastroExiste = true;
                    usuarioLogado = usuario;
                    break;
                }
            }

            
            if(cadastroExiste){
                alert('Entrando...');
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
                window.location.replace("../index.html");
            
            } else {
                alert('Usuário e/ou senha incorreto(s)');

                emailLogin.value = '';
                senhaLogin.value = '';
            }
        }
    });
}



// --------------------------------------------------------------------------------------

// PARA OS TESTES USANDO JEST

if (typeof module !== 'undefined') {
    module.exports = { validacoes };
}