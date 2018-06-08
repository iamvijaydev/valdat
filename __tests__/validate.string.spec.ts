import valdat from '../lib';

describe('valdat.string:', () => {
    test('To be defined', () => {
        expect(valdat.string).toBeDefined();
    });

    const schema = {
        name: valdat.string()
    }
    const schemaReq = {
        name: valdat.string().isRequired()
    }
    const empty = {}
    const incorrect = { name: 123 };
    const correct = { name: 'Solo' };

    test('Pass validation with no data', () => {
        const { isValid } = valdat.check(schema, empty);

        expect(isValid).toBe(true);
    });

    test('Pass validation with correct data', () => {
        const { isValid } = valdat.check(schema, correct);

        expect(isValid).toBe(true);
    });

    test('Fail validation with incorrect data', () => {
        const { isValid } = valdat.check(schema, incorrect);

        expect(isValid).toBe(false);
    });

    test('Fail validation with no data and is required', () => {
        const { isValid } = valdat.check(schemaReq, empty);

        expect(isValid).toBe(false);
    });

    test('Fail validation with incorrect data and is required', () => {
        const { isValid } = valdat.check(schemaReq, incorrect);

        expect(isValid).toBe(false);
    });

    test('Pass validation with correct data and is required', () => {
        const { isValid } = valdat.check(schemaReq, correct);

        expect(isValid).toBe(true);
    });
});