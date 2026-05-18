const { validacoes } = require('../js/conta.js');


describe('validacoes()', () => {

    //para não dar erro no alert

    global.alert = jest.fn(); 
    //objeto representando um usuário logado (vem do localStorage no código original)
    const usuarioLogado = { senha: 'Senha@123' };

    //um localStorage falso para teste 
    beforeEach(() => {
        localStorage.clear();

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify({
                senha: "Senha@123"
            })
        );
    });


    // Função auxiliar para criar inputs simulados (mocks de elementos HTML)
    function criarInput(value, patternMismatch = false) {
        return {
            value,
            validity: { patternMismatch },
        };
    }

    
    test('deve retornar { senhaNova: "", novoNome: "" } quando todos os campos estão vazios', () => {
        const nomePerfil = criarInput('');
        const senhaAtual = criarInput('');
        const novaSenha  = criarInput('');

        const resultado = validacoes(nomePerfil, senhaAtual, novaSenha);

        expect(resultado).toEqual({ senhaNova: '', novoNome: '' });
    });


    test('deve retornar o novoNome quando apenas o nome é preenchido corretamente', () => {
        const nomePerfil = criarInput('Maria', false);
        const senhaAtual = criarInput('');
        const novaSenha  = criarInput('');

        const resultado = validacoes(nomePerfil, senhaAtual, novaSenha);

        expect(resultado).toEqual({ senhaNova: '', novoNome: 'Maria' });
    });


    test('deve retornar false quando o nome possui caracteres inválidos (patternMismatch)', () => {
        const nomePerfil = criarInput('Maria123', true); // patternMismatch = true
        const senhaAtual = criarInput('');
        const novaSenha  = criarInput('');

        const resultado = validacoes(nomePerfil, senhaAtual, novaSenha);

        expect(resultado).toBe(false);
    });


    test('deve ignorar espaços em branco no início e fim do nome (trim)', () => {
        const nomePerfil = criarInput('  João  ', false);
        const senhaAtual = criarInput('');
        const novaSenha  = criarInput('');

        const resultado = validacoes(nomePerfil, senhaAtual, novaSenha);

        expect(resultado).toEqual({ senhaNova: '', novoNome: 'João' });
    });


    test('deve retornar false quando apenas a senha atual é preenchida (nova senha vazia)', () => {
        const nomePerfil = criarInput('');
        const senhaAtual = criarInput('Senha@123');
        const novaSenha  = criarInput('');

        const resultado = validacoes(nomePerfil, senhaAtual, novaSenha);

        expect(resultado).toBe(false);
    });


    test('deve retornar false quando apenas a nova senha é preenchida (senha atual vazia)', () => {
        const nomePerfil = criarInput('');
        const senhaAtual = criarInput('');
        const novaSenha  = criarInput('NovaSenha@1');

        const resultado = validacoes(nomePerfil, senhaAtual, novaSenha);

        expect(resultado).toBe(false);
    });


    test('deve retornar false quando a senha atual está incorreta', () => {
        const nomePerfil = criarInput('');
        const senhaAtual = criarInput('SenhaErrada');
        const novaSenha  = criarInput('NovaSenha@1');

        const resultado = validacoes(nomePerfil, senhaAtual, novaSenha);

        expect(resultado).toBe(false);
    });


    test('deve retornar false quando a nova senha não atende ao padrão (patternMismatch)', () => {
        const nomePerfil = criarInput('');
        const senhaAtual = criarInput('Senha@123');
        const novaSenha  = criarInput('fraca', true); // patternMismatch = true
        novaSenha.validity.patternMismatch = true;

        const resultado = validacoes(nomePerfil, senhaAtual, novaSenha);

        expect(resultado).toBe(false);
    });


    test('deve retornar a senhaNova quando a senha atual está correta e a nova é válida', () => {
        const nomePerfil = criarInput('');
        const senhaAtual = criarInput('Senha@123');
        const novaSenha  = criarInput('NovaSenha@1', false);

        const resultado = validacoes(nomePerfil, senhaAtual, novaSenha);

        expect(resultado).toEqual({ senhaNova: 'NovaSenha@1', novoNome: '' });
    });


    test('deve retornar tanto o novoNome quanto a senhaNova quando ambos são válidos', () => {
        const nomePerfil = criarInput('Carlos', false);
        const senhaAtual = criarInput('Senha@123');
        const novaSenha  = criarInput('NovaSenha@1', false);

        const resultado = validacoes(nomePerfil, senhaAtual, novaSenha);

        expect(resultado).toEqual({ senhaNova: 'NovaSenha@1', novoNome: 'Carlos' });
    });


    test('deve retornar false mesmo com senha correta se o nome tiver padrão inválido', () => {
        const nomePerfil = criarInput('Carlos999', true); // nome inválido
        const senhaAtual = criarInput('Senha@123');
        const novaSenha  = criarInput('NovaSenha@1', false);

        const resultado = validacoes(nomePerfil, senhaAtual, novaSenha);

        expect(resultado).toBe(false);
    });

});