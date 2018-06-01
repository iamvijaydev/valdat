import Valdat from '../lib'

describe('Valdat.check:', () => {
    test('To be defined', () => {
        expect(Valdat.check).toBeDefined();
    });
    
    test('Called with no arguments pass validation', () => {
        expect(Valdat.check()).toEqual({
            isValid: true,
            errors: {},
        });
    });
});

describe('Valdat.register:', () => {
    test('To be defined', () => {
        expect(Valdat.register).toBeDefined();
    });
    
    test('Throw error when name is NOT provided', () => {
        expect(() => {
            Valdat.register();
        }).toThrow('Register expects');
    });
    
    test('Throw error when INCORRECT method is provided', () => {
        expect(() => {
            Valdat.register('name', {});
        }).toThrow('Register expects');
    });

    test('Properly registers a method', () => {
        Valdat.register('sayMyName', () => 'Heisenberg!');

        expect(Valdat).toHaveProperty('sayMyName', expect.any(Function));
    })
});