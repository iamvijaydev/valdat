import valdat from '../valdat';

describe('valdat.check:', () => {
    test('To be defined', () => {
        expect(valdat.check).toBeDefined();
    });

    test('Called with no arguments pass validation', () => {
        expect(valdat.check(undefined, undefined)).toEqual({
            isValid: true,
            errors: {},
        });
    });
});

describe('valdat.register:', () => {
    test('To be defined', () => {
        expect(valdat.register).toBeDefined();
    });

    test('Throw error when name is NOT provided', () => {
        expect(() => {
            valdat.register(undefined, undefined);
        }).toThrow('Register expects');
    });

    test('Throw error when INCORRECT method is provided', () => {
        expect(() => {
            valdat.register('name', undefined);
        }).toThrow('Register expects');
    });

    test('Properly registers a method', () => {
        valdat.register('sayMyName', () => ({
            stack: [(data, key) => ({
                error: false,
                message: '',
            })],
            required: false,
        }));

        expect(valdat).toHaveProperty('sayMyName', expect.any(Function));
        expect({
            name: valdat.sayMyName(),
        }).toHaveProperty('name', expect.any(Object));
    });
});

describe('valdat.custom:', () => {
    test('To be defined', () => {
        expect(valdat.custom).toBeDefined();
    });

    test('Throw error when NO validator is provided', () => {
        expect(() => {
            valdat.custom(undefined);
        }).toThrow('Custom expects');
    });

    test('Throw error when INCORRECT validator is provided', () => {
        expect(() => {
            valdat.custom(undefined);
        }).toThrow('Custom expects');
    });

    test('Properly adds a custom validator', () => {
        const validator = (data, key) => {
            return {
                error: false,
                message: '',
            }
        };
        const schema = valdat.custom(validator);

        expect(schema).toHaveProperty('stack', expect.any(Array));
        expect(schema.stack[0]).toEqual(validator);
    });
})