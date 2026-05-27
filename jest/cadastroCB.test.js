const { validacoes, validacaoLogin } = require('../js/cadastro.js');


describe('Testes de validacoes() de Cadastro', () => {
    
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="nome" />
            <input id="email" />
            <input id="senha" />
        `;
    })


    test('Campo nome vazio', () => {
        const nomeInput = document.querySelector('#nome');
        nomeInput.value = '';

        const resultado = validacoes();

        expect(resultado).toBe(false);
    });


    test('Nome menor que 3 caracteres', () => {
        const nomeInput = document.querySelector('#nome');
        nomeInput.value = 'AB';

        const resultado = validacoes();

        expect(resultado).toBe(false);
    });
    
    
    test('Números no campo nome', () => {
        const nomeInput = document.querySelector('#nome');
        nomeInput.value = '123';

        const resultado = validacoes();

        expect(resultado).toBe(false);
    });

    
    test('Campo email vazio', () => {
        const emailInput = document.querySelector('#email');
        emailInput.value = '';

        const resultado = validacoes();

        expect(resultado).toBe(false);
    });

    
    test('Email fora do padrão', () => {
        const emailInput = document.querySelector('#email');
        emailInput.value = 'ana123';

        const resultado = validacoes();

        expect(resultado).toBe(false);
    });


    test('Campo senha vazio', () => {
        const senhaInput = document.querySelector('#senha');
        senhaInput.value = '';

        const resultado = validacoes();

        expect(resultado).toBe(false);
    });
    

    test('Senha fora do padrão', () => {
        const senhaInput = document.querySelector('#senha');
        senhaInput.value = 'abc123';

        const resultado = validacoes();

        expect(resultado).toBe(false);
    });
    

    test('Campos preenchidos corretamente', () => {
        const nomeInput = document.querySelector('#nome');
        nomeInput.value = 'Ana Carolina Souza';

        const emailInput = document.querySelector('#email');
        emailInput.value = 'anaCarol@gmail.com';

        const senhaInput = document.querySelector('#senha');
        senhaInput.value = 'AnaC@123';

        const resultado = validacoes();
        expect(resultado).toBe(true);
    });
});



describe('Testes de validacaoLogin() de Cadastro', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <input id="emailLogin" />
            <input id="senhaLogin" />
        `;
    })


    test('Campo email vazio', () => {
        const emailLogin = document.querySelector('#emailLogin');
        emailLogin.value = ' ';

        const resultadoLogin = validacaoLogin();
        expect(resultadoLogin).toBe(false);
    });


    test('Campo senha vazio', () => {
        const senhaLogin = document.querySelector('#senhaLogin');
        senhaLogin.value = ' ';

        const resultadoLogin = validacaoLogin();
        expect(resultadoLogin).toBe(false);
    });


    test('Campos para o login preenchidos', () => {
        const emailLogin = document.querySelector('#emailLogin');
        emailLogin.value = 'joao.com';

        const senhaLogin = document.querySelector('#senhaLogin');
        senhaLogin.value = 'Joao123';

        const resultadoLogin = validacaoLogin();
        expect(resultadoLogin).toBe(true);
    });
});