const { validacoes } = require('../js/conta.js');


describe('Testes de validacoes() de Conta', () => {
    const usuarioLogado = { senha: 'Abcd@123' };

    beforeEach(() => {
        localStorage.clear();

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify({
                senha: "Abcd@123"
            })
        );
    });


    function criarInput(value, patternMismatch = false) {
        return {value, validity: { patternMismatch }};
    }


    test('Nome fora dos padrões', () => {
        const nomeEdicao = criarInput('123Joao', true);
        const senhaAtual = criarInput('');
        const senhaNova = criarInput('');

        const resultadoEdicao = validacoes(nomeEdicao, senhaAtual, senhaNova);
        expect(resultadoEdicao).toBe(false);
    });


    test('Campo senha atual preenchido, mas campo nova senha vazio', () => {
        const nomeEdicao = criarInput('');
        const senhaAtual = criarInput('1234', true);
        const senhaNova = criarInput('');

        const resultadoEdicao = validacoes(nomeEdicao, senhaAtual, senhaNova);
        expect(resultadoEdicao).toBe(false);
    });


    test('Campo senha atual vazio, mas campo nova senha preenchido', () => {
        const nomeEdicao = criarInput('');
        const senhaAtual = criarInput('');
        const senhaNova = criarInput('1234', true);

        const resultadoEdicao = validacoes(nomeEdicao, senhaAtual, senhaNova);
        expect(resultadoEdicao).toBe(false);
    });


    test('Senha atual errada', () => {
        const nomeEdicao = criarInput('');
        const senhaAtual = criarInput('Abc123', true);
        const senhaNova = criarInput('Abcd1234@', true);

        const resultadoEdicao = validacoes(nomeEdicao, senhaAtual, senhaNova);
        expect(resultadoEdicao).toBe(false);
    });


    test('Nova senha fora dos padrões', () => {
        const nomeEdicao = criarInput('');
        const senhaAtual = criarInput('Abcd@123', true);
        const senhaNova = criarInput('123abc', true);

        const resultadoEdicao = validacoes(nomeEdicao, senhaAtual, senhaNova);
        expect(resultadoEdicao).toBe(false);
    });


    test('Nome dentro dos padrões para atualização', () => {
        const nomeEdicao = criarInput('Ana Luiza');
        const senhaAtual = criarInput('');
        const senhaNova = criarInput('');

        const resultadoEdicao = validacoes(nomeEdicao, senhaAtual, senhaNova);
        expect(resultadoEdicao).toEqual({senhaNova: '', novoNome: 'Ana Luiza'});
    });


    test('Senha atual correta e nova senha dentro dos padrões', () => {
        const nomeEdicao = criarInput('');
        const senhaAtual = criarInput('Abcd@123');
        const senhaNova = criarInput('Senha@123', false);

        const resultadoEdicao = validacoes(nomeEdicao, senhaAtual, senhaNova);
        expect(resultadoEdicao).toEqual({senhaNova: 'Senha@123', novoNome: ''});
    });


    test('Nova senha igual a senha atual', () => {
        const nomeEdicao = criarInput('');
        const senhaAtual = criarInput('Abcd@123');
        const senhaNova = criarInput('Abcd@123', false);

        const resultadoEdicao = validacoes(nomeEdicao, senhaAtual, senhaNova);
        expect(resultadoEdicao).toEqual({senhaNova: 'Abcd@123', novoNome: ''});
    });


    test('Nome dentro dos padrões, senha atual correta e nova senha dentro dos padrões', () => {
        const nomeEdicao = criarInput('Ana Luiza');
        const senhaAtual = criarInput('Abcd@123');
        const senhaNova = criarInput('Senha@123', false);

        const resultadoEdicao = validacoes(nomeEdicao, senhaAtual, senhaNova);
        expect(resultadoEdicao).toEqual({senhaNova: 'Senha@123', novoNome: 'Ana Luiza'});
    });
});