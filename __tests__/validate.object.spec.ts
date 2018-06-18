import valdat from '../lib';
import isEqual from 'lodash/isEqual';

describe('valdat.object()', () => {
    test('valdat.object: is defined', () => {
        expect(valdat.object).toBeDefined();
    });

    const schema = {
        user: valdat.object()
    }
    const schemaReq = {
        user: valdat.object().isRequired()
    }
    const empty = {}
    const incorrect = { user: '' };
    const correct = { user: {} };

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

describe('valdat.object().shape()', () => {
    test('valdat.object().shape: is defined', () => {
        expect(valdat.object().shape).toBeDefined();
    });

    const schema = {
        user: valdat.object().shape({
            name: valdat.string().isRequired(),
            age: valdat.number().isRequired()
        })
    }
    const schemaReq = {
        user: valdat.object().shape({
            name: valdat.string().isRequired(),
            age: valdat.number().isRequired()
        }).isRequired()
    }
    const empty = {}
    const incorrect = {
        user: {
            username: 'somename',
            level: 'ADMIN'
        }
    };
    const correct = {
        user: {
            name: 'James',
            age: 23
        }
    };

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