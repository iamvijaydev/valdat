import valdat from '../lib';
import isEqual from 'lodash/isEqual';

describe('valdat.number()', () => {
    test('valdat.number: is defined', () => {
        expect(valdat.number).toBeDefined();
    });

    const schema = {
        age: valdat.number()
    }
    const schemaReq = {
        age: valdat.number().isRequired()
    }
    const empty = {}
    const incorrect = { age: '23' };
    const correct = { age: 23 };

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

describe('valdat.number().min()', () => {
    test('valdat.number().min: is defined', () => {
        expect(valdat.number().min).toBeDefined();
    });

    const schema = {
        name: valdat.number().min(4)
    }
    const schemaReq = {
        name: valdat.number().min(4).isRequired()
    }
    const empty = {}
    const incorrect = { name: 2 };
    const correct = { name: 23 };

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

describe('valdat.number().max()', () => {
    test('valdat.number().max: is defined', () => {
        expect(valdat.number().max).toBeDefined();
    });

    const schema = {
        name: valdat.number().max(25)
    }
    const schemaReq = {
        name: valdat.number().max(25).isRequired()
    }
    const empty = {}
    const incorrect = { name: 27 };
    const correct = { name: 23 };

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

describe('valdat.number().sameAs()', () => {
    const schema = {
        accountNo: valdat.number(),
        reAccountNo: valdat.number().sameAs('accountNo')
    };
    const empty = {};
    const incorrect = {
        accountNo: 123456,
        reAccountNo: 654321
    };
    const correct = {
        accountNo: 123456,
        reAccountNo: 123456
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