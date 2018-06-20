import valdat from '../lib';

describe('valdat.array()', () => {
    test('valdat.array: is defined', () => {
        expect(valdat.array).toBeDefined();
    });

    const schema = {
        likes: valdat.array()
    }
    const schemaReq = {
        likes: valdat.array().isRequired()
    }
    const empty = {}
    const incorrect = { likes: 123 };
    const correct = { likes: ['Harry Potter', 'James Potter'] };

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

describe('valdat.array().notEmpty()', () => {
    test('valdat.array().notEmpty: is defined', () => {
        expect(valdat.array().notEmpty).toBeDefined();
    });

    const schema = {
        likes: valdat.array().notEmpty()
    }
    const schemaReq = {
        likes: valdat.array().notEmpty().isRequired()
    }
    const empty = {}
    const incorrect = { likes: 123 };
    const correct = { likes: ['Harry Potter', 'James Potter'] };

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

describe('valdat.array().ofType()', () => {
    test('valdat.array().ofType: is defined', () => {
        expect(valdat.array().ofType).toBeDefined();
    });

    const schema = {
        likes: valdat.array().ofType(valdat.string())
    }
    const schemaReq = {
        likes: valdat.array().ofType(valdat.string()).isRequired()
    }
    const empty = {}
    const incorrect = { likes: [123] };
    const correct = { likes: ['Harry Potter', 'James Potter'] };

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

describe('valdat.array().sameAs()', () => {
    const schema = {
        friends: valdat.array(),
        bestFriends: valdat.array().sameAs('friend')
    };
    const empty = {};
    const incorrect = {
        friend: ['Ron', 'Hermione', 'Ginny'],
        bestFriends: ['Ron', 'Hermione']
    };
    const correct = {
        friend: ['Ron', 'Hermione'],
        bestFriends: ['Ron', 'Hermione']
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