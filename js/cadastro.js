function showModal(mensagem, callback) {
    const overlay = document.querySelector('#modal-overlay');
    const texto   = document.querySelector('#modal-mensagem');
    const botao   = document.querySelector('#modal-fechar');

    if (!overlay || !texto || !botao) {
        return;
    }

    texto.textContent = mensagem;
    overlay.classList.add('ativo');

    // remove listener anterior para não acumular
    const novo = botao.cloneNode(true);
    botao.parentNode.replaceChild(novo, botao);

    novo.addEventListener('click', function () {
        overlay.classList.remove('ativo');
        if (typeof callback === 'function') callback();
    });
}



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

function validacoes(){  //1
    const nome = document.querySelector('#nome');  //1
    const email = document.querySelector('#email');  //1
    const senha = document.querySelector('#senha');  //1

    if (nome.value.length == 0) {  //2
        showModal('O nome é obrigatório');  //3
        return false;  //3
    }
    else if (nome.value.length < 3) {  //else é 4 e if 5
        showModal('Nome deve ter pelo menos 3 caracteres');  //6
        return false;  //6
    }
    else if (nome.validity.patternMismatch) {  //else é 7 e if é 8
        showModal('Use apenas letras maiúsculas ou minúsculas no campo nome');  //9
        return false;  //9
    }
    else if (email.value.length == 0) {  //else é 10 e if 11
        showModal('Informe o email para realizar o cadastro');  //12
        return false;  //12
    }
    else if (email.validity.patternMismatch) {  //else é 13 e if 14
        showModal('Campo email incorreto!');  //15
        return false;  //15
    }
    else if (senha.value.length == 0) {  //else é 16 e if 17
        showModal('Informe a senha para o cadastro');  //18
        return false;  //18
    }
    else if (senha.validity.patternMismatch) {  //else é 19 e if é 20
        showModal('A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, número e símbolo.');  //21
        return false;  //21
    } 

    return true;  //22
}  //1


function cadastroUsuario(tipoUsuario){
    const nome = document.querySelector('#nome');
    const email = document.querySelector('#email'); 
    const senha = document.querySelector('#senha');


    let usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = {
        nome: nome.value.trim(),
        email: email.value.trim(),
        senha: senha.value.trim(),
        tipoUser: tipoUsuario,
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

        const nome = document.querySelector('#nome');
        const email = document.querySelector('#email');
        const senha = document.querySelector('#senha');


        if(validacoes()){
            let usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];

            let emailExiste = false;
            usuariosCadastrados.forEach(function(usuario){
                if(email.value == usuario.email){
                    emailExiste = true;
                }
            });

        
            if(emailExiste){
                showModal('Não foi possível realizar o cadastro, pois este email já está cadastrado!');
                
                nome.value = '';
                email.value = '';
                senha.value = ''; 
            
            } else {       
                const usuarioSelecionado = document.querySelector('input[name="tipoUser"]:checked')?.value;

                if(usuarioSelecionado){
                    cadastroUsuario(usuarioSelecionado);

                    nome.value = '';
                    email.value = '';
                    senha.value = '';

                    showModal('Cadastro realizado com sucesso!', function () {
                        if(usuarioSelecionado == 'passageiro'){
                            window.location.replace("../index.html");
                        } else {
                            window.location.replace("../html/gerenciarRotas.html");
                        }
                    });

                } else {
                    showModal('Escolha uma opção de usuário para continuar o cadastro');
                }
            }
        }
    });
}


// ------------------------------------------------------------------------------


//login

function validacaoLogin(){  //1
    const emailLogin = document.querySelector('#emailLogin');  //1
    const senhaLogin = document.querySelector('#senhaLogin');  //1


    if(emailLogin.value.length == 0){  //2
        showModal('Informe o email para o login'); //3
        return false;  //3
    }
    else if(senhaLogin.value.length == 0){  //else é 4 e if é 5
        showModal('Informe a senha para o login');  //6
        return false;  //6
    }

    return true;  //7
}  //1



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
            let tipoUsuario = null;

            for(let i = 0; i < usuariosCadastrados.length; i++){
                let usuario = usuariosCadastrados[i];

                if(emailLogin.value.trim() == usuario.email.trim() && senhaLogin.value.trim() == usuario.senha.trim()){
                    cadastroExiste = true;
                    usuarioLogado = usuario;
                    tipoUsuario = usuario.tipoUser;
                    break;
                }
            }

            
            if(cadastroExiste){
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
                
                showModal('Entrando...', function () {
                    if (tipoUsuario == 'passageiro') {
                        window.location.replace("../index.html");
                    } else {
                        window.location.replace("../html/gerenciarRotas.html");
                    }
                });
        
            } else {
                showModal('Usuário e/ou senha incorreto(s)');

                emailLogin.value = '';
                senhaLogin.value = '';
            }
        }
    });
}



// --------------------------------------------------------------------------------------

// PARA OS TESTES USANDO JEST
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validacoes,
        validacaoLogin,
        visualizarSenha,
        showModal
    };
}