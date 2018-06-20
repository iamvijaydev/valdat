import valdat from '../lib';

describe('valdat.boolean()', () => {
    test('valdat.boolean: is defined', () => {
        expect(valdat.boolean).toBeDefined();
    });

    const schema = {
        isAdmin: valdat.boolean()
    }
    const schemaReq = {
        isAdmin: valdat.boolean().isRequired()
    }
    const empty = {}
    const incorrect = { isAdmin: 123 };
    const correct = { isAdmin: true };

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

describe('valdat.boolean().sameAs()', () => {
    const schema = {
        isSuperAdmin: valdat.boolean(),
        isAdmin: valdat.boolean().sameAs('isSuperAdmin')
    };
    const empty = {};
    const incorrect = {
        isSuperAdmin: true,
        isAdmin: false
    };
    const correctTrue = {
        isSuperAdmin: true,
        isAdmin: true
    };
    const correctFalse = {
        isSuperAdmin: false,
        isAdmin: false
    };

    test('Pass validation with no data', () => {
        const { isValid } = valdat.check(schema, empty);

        expect(isValid).toBe(true);
    });

    test('Fail validation with incorrect data', () => {
        const { isValid } = valdat.check(schema, incorrect);

        expect(isValid).toBe(false);
    });

    test('Pass validation with correct data with "true', () => {
        const { isValid } = valdat.check(schema, correctTrue);

        expect(isValid).toBe(true);
    });

    test('Pass validation with correct data with "false', () => {
        const { isValid } = valdat.check(schema, correctFalse);

        expect(isValid).toBe(true);
    });
});