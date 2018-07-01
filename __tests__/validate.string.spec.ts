import valdat from '../lib';
import isEqual from 'lodash/isEqual';

describe('valdat.string()', () => {
    test('valdat.string: is defined', () => {
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

describe('valdat.string().length()', () => {
    test('valdat.string().length: is defined', () => {
        expect(valdat.string().length).toBeDefined();
    });

    const schema = {
        name: valdat.string().length(4)
    }
    const schemaReq = {
        name: valdat.string().length(4).isRequired()
    }
    const empty = {}
    const incorrect = { name: 123 };
    const correct = { name: 'Solo' };

    test('Fails validation with no data', () => {
        const { isValid } = valdat.check(schema, empty);

        expect(isValid).toBe(false);
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

describe('valdat.string().regex()', () => {
    test('valdat.string().regex: is defined', () => {
        expect(valdat.string().regex).toBeDefined();
    });

    const schema = {
        name: valdat.string().regex(/^Solo$/)
    }
    const schemaReq = {
        name: valdat.string().regex(/^Solo$/).isRequired()
    }
    const empty = {}
    const incorrect = { name: 123 };
    const correct = { name: 'Solo' };

    test('Fails validation with no data', () => {
        const { isValid } = valdat.check(schema, empty);

        expect(isValid).toBe(false);
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

describe('valdat.string().sameAs()', () => {
    const schema = {
        friend: valdat.string(),
        godFather: valdat.string().sameAs('friend')
    };
    const empty = {};
    const incorrect = {
        friend: 'Sirius',
        godFather: 'sniffles'
    };
    const correct = {
        friend: 'Sirius',
        godFather: 'Sirius'
    };

    test('Pass validation with no data', () => {
        const { isValid } = valdat.check(schema, empty);

        expect(isValid).toBe(true);
    });

    test('Pass validation with correct data', () => {
        const { isValid, errors } = valdat.check(schema, correct);

        expect(isValid).toBe(true);
    });

    test('Fail validation with incorrect data', () => {
        const { isValid } = valdat.check(schema, incorrect);

        expect(isValid).toBe(false);
    });
});