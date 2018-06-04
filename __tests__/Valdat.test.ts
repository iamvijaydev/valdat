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
        Valdat.register('sayMyName', () => ({
            stack: [(data, key) => ({
                error: false,
                message: '',
            })],
            required: false,
        }));

        expect(Valdat).toHaveProperty('sayMyName', expect.any(Function));
        expect({
            name: Valdat.sayMyName(),
        }).toHaveProperty('name', expect.any(Object));
    });
});

describe('Valdat.custom:', () => {
    test('To be defined', () => {
        expect(Valdat.custom).toBeDefined();
    });

    test('Throw error when NO validator is provided', () => {
        expect(() => {
            Valdat.custom();
        }).toThrow('Custom expects');
    });

    test('Throw error when INCORRECT validator is provided', () => {
        expect(() => {
            Valdat.custom({});
        }).toThrow('Custom expects');
    });

    test('Properly adds a custom validator', () => {
        const validator = (data, key) => {
            return {
                error: false,
                message: '',
            }
        };
        const schema = Valdat.custom(validator);

        expect(schema).toHaveProperty('stack', expect.any(Array));
        expect(schema.stack[0]).toEqual(validator);
    });
})