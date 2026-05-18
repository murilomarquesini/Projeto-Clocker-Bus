// document.body.innerHTML = `
//     <table id="manha"></table>
//     <table id="tarde"></table>
//     <table id="noite"></table>
// `;

// const funcoesItinerarios = require("../js/itinerarios.js");

// //--------------------------------------------------------------------------


// //para testar a lógica de salvar e excluir, foi necessário extrair uma parte de cada uma e criar uma função aqui

// function salvarItinerario(itinerario, usuariosCadastrados, usuarioLogado) {
//     const index = usuariosCadastrados.findIndex(u => u.email === usuarioLogado.email);
//     if(index === -1) return false;

//     if(!usuarioLogado.itinerariosSalvos.includes(itinerario.id)){
//         usuarioLogado.itinerariosSalvos.push(itinerario.id);
//         usuariosCadastrados[index].itinerariosSalvos.push(itinerario.id);
//     }

//     return true;
// }


// function excluirItinerario(id, usuariosCadastrados, usuarioLogado){
//     const itinerario = funcoesItinerarios.itinerariosValidos.find(i => i.id === id);
//     if(!itinerario) return false;

//     const index = usuariosCadastrados.findIndex(u => u.email === usuarioLogado.email);
//     if(index === -1) return false;


//     if(usuarioLogado.itinerariosSalvos.includes(itinerario.id)){

//         usuarioLogado.itinerariosSalvos = usuarioLogado.itinerariosSalvos.filter(i => i !== itinerario.id);
//         usuariosCadastrados[index].itinerariosSalvos = usuariosCadastrados[index].itinerariosSalvos.filter(i => i !== itinerario.id);
        
//         return true;
//     }

//     return false;
// }



// //--------------------------------------------------------------------------

// //testes para verificaExistencia()

// test('Retorna um itinerários existente', () => {
//     const resultado = funcoesItinerarios.verificaExistencia('Rua Santa Luzia, 310', 'Avenida Getúlio Vargas, 780');
//     expect(resultado.id).toBe(5);
// });


// test('Ignora a diferença entre maiúsculas e minúsculas, retornando um itinerário válido', () => {
//     const resultado = funcoesItinerarios.verificaExistencia('rua das acácias, 99', 'AVENIDA DOS ESTADOS, 1800');
//     expect(resultado.id).toBe(7);
// });


// test('Ignora espaços extras, retornando um itinerário válido', () => {
//     const resultado = funcoesItinerarios.verificaExistencia('   Avenida Paulista, 1500  ', '  Rua Augusta, 300        ');
//     expect(resultado.id).toBe(2);
// });


// test('Retorna null quando o itinerário não é encontrado', () => {
//     const resultado = funcoesItinerarios.verificaExistencia('Avenida Brasil', 'Liberdade');
//     expect(resultado).toBeNull();
// });



// //--------------------------------------------------------------------------

// //testes para periodo()

// test('07:00 é manhã', () =>{
//     expect(funcoesItinerarios.periodo('07:00', funcoesItinerarios.tabelaManha)).toBe(true);
// });


// test('13:00 é tarde', () =>{
//     expect(funcoesItinerarios.periodo('13:00', funcoesItinerarios.tabelaTarde)).toBe(true);
// });


// test('20:00 é noite', () =>{
//     expect(funcoesItinerarios.periodo('20:00', funcoesItinerarios.tabelaNoite)).toBe(true);
// });


// test('12:00 não é manhã', () =>{
//     expect(funcoesItinerarios.periodo('12:00', funcoesItinerarios.tabelaManha)).toBe(false);
// });


// test('12:00 é tarde', () =>{
//     expect(funcoesItinerarios.periodo('12:00', funcoesItinerarios.tabelaTarde)).toBe(true);
// });


// test('18:00 não é tarde', () =>{
//     expect(funcoesItinerarios.periodo('18:00', funcoesItinerarios.tabelaTarde)).toBe(false);
// });


// test('18:00 é noite', () =>{
//     expect(funcoesItinerarios.periodo('18:00', funcoesItinerarios.tabelaNoite)).toBe(true);
// });


// test('11:59 ainda é manhã', () =>{
//     expect(funcoesItinerarios.periodo('11:59', funcoesItinerarios.tabelaManha)).toBe(true);
// });


// test('08:30 não é tarde', () =>{
//     expect(funcoesItinerarios.periodo('08:30', funcoesItinerarios.tabelaTarde)).toBe(false);
// });


// test('Passando um horário que não possui itinerários, retorna falso', () =>{
//     expect(funcoesItinerarios.periodo('02:00', funcoesItinerarios.tabelaNoite)).toBe(false);
// });


// test('Passando uma tabelaque não existe, retorna falso', () =>{
//     expect(funcoesItinerarios.periodo('15:45', null)).toBe(false);
// });



// //--------------------------------------------------------------------------


// //testes para a lógica de salvar itinerários

// describe('salvarItinerario', () => {

//     test('Retorna falso quando o email não está na lista', () => {
//         const itinerario = {id: 1};
//         const cadastrados = [{email: 'anaCarolina@gmail.com', itinerariosSalvos: []}];
//         const logado = {email: 'ana@gmail.com', itinerariosSalvos: []};

//         const resultado = salvarItinerario(itinerario, cadastrados, logado);
//         expect(resultado).toBe(false);
//     });


//     test('Salva o itinerário com sucesso', () => {
//         const itinerario = {id: 8};
//         const cadastrados = [{email: 'bruno@gmail.com', itinerariosSalvos: []}];
//         const logado = {email: 'bruno@gmail.com', itinerariosSalvos: []};

//         const resultado = salvarItinerario(itinerario, cadastrados, logado);
        
//         expect(resultado).toBe(true);
//         expect(logado.itinerariosSalvos).toContain(8);
//     });


//     test('Não duplica se o itinerário já estiver salvo', () => {
//         const itinerario = {id: 3};
//         const cadastrados = [{email: 'carolina@gmail.com', itinerariosSalvos: [3]}];
//         const logado = {email: 'carolina@gmail.com', itinerariosSalvos: [3]};

//         salvarItinerario(itinerario, cadastrados, logado);

//         expect(logado.itinerariosSalvos).toContain(3);
//         expect(logado.itinerariosSalvos.length).toBe(1);
//     });

// });


// //--------------------------------------------------------------------------


// //testes para a lógica de excluir itinerários

// describe('excluirItinerario', () => {
    
//     test('Retorna falso quando o email não está na lista', () => {
//         const cadastrados = [{email: 'anaCarolina@gmail.com', itinerariosSalvos: []}];
//         const logado = {email: 'ana@gmail.com', itinerariosSalvos: []};

//         const resultado = excluirItinerario(1, cadastrados, logado);
//         expect(resultado).toBe(false);
//     });


//     test('Retorna falso quando o itinerário não está salvo pelo usuário', () => {
//         const cadastrados = [{email: 'joao@gmail.com', itinerariosSalvos: [6]}];
//         const logado = {email: 'joao@gmail.com', itinerariosSalvos: [6]};

//         const resultado = excluirItinerario(9, cadastrados, logado);
//         expect(resultado).toBe(false);
//     });


//     test('Remove o itinerário das listas', () => {
//         const cadastrados = [{email: 'bruno@gmail.com', itinerariosSalvos: [1, 4]}];
//         const logado = {email: 'bruno@gmail.com', itinerariosSalvos: [1, 4]};

//         const resultado = excluirItinerario(1, cadastrados, logado);
//         expect(resultado).toBe(true);

//         expect(logado.itinerariosSalvos).not.toContain(1);
//         expect(cadastrados[0].itinerariosSalvos).not.toContain(1);
//     });
// });