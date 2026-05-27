document.body.innerHTML = `
    <div id="manha"></div>
    <div id="tarde"></div>
    <div id="noite"></div>
`;

const {periodo} = require("../js/itinerarios.js");


//--------------------------------------------------------------------------


describe('validação do período pelo horário', () => {
    const manha = document.querySelector('#manha');
    const tarde = document.querySelector('#tarde');
    const noite = document.querySelector('#noite');


    test('07:00 pertence à manhã', () => {
        expect(periodo('07:00', manha)).toBe(true);
    });

    test('11:59 ainda pertence à manhã', () => {
        expect(periodo('11:59', manha)).toBe(true);
    });

    test('12:00 não pertence à manhã', () => {
        expect(periodo('12:00', manha)).toBe(false);
    });

    test('12:00 pertence à tarde', () => {
        expect(periodo('12:00', tarde)).toBe(true);
    });

    test('15:30 pertence à tarde', () => {
        expect(periodo('15:30', tarde)).toBe(true);
    });

    test('17:59 ainda pertence à tarde', () => {
        expect(periodo('17:59', tarde)).toBe(true);
    });

    test('18:00 não pertence à tarde', () => {
        expect(periodo('18:00', tarde)).toBe(false);
    });

    test('18:00 pertence à noite', () => {
        expect(periodo('18:00', noite)).toBe(true);
    });

    test('19:40 pertence à noite', () => {
        expect(periodo('19:40', noite)).toBe(true);
    });
    
});