# valdat

A modern-day validator for the masses, designed for ease of use. Its design is heavily influenced by [prop-type](https://github.com/facebook/prop-types) and [Joi](https://github.com/hapijs/joi). Although, not as exhaustive as Joi.

Let's explore an React example first:
```javascript
class User extends React.Component {
    state = {
        name: '',
        nameMessage: '',
        sex: '',
        sexMessage: '',
        age: '',
        ageMessage: '',
        languages: [],
        languagesMessage: '',
        preference: {},
        preferenceMessage: ''
    }

    onSubmit = () => {

        // create data object
        const {
            name,
            sex,
            age,
            languages,
            preference
        } = this.state;
        const data = {
            name,
            sex,
            age,
            languages,
            preference
        };

        // create schema object
        const schema = {
            name: valdat.string().isRequired(),
            sex: valdat.oneOf(['Male', 'Female', 'Other']),
            age: valdat.number().min(18).isRequired(),
            languages: valdat.array().notEmpty().ofType(valdat.string()),
            preference: valdat.object().shape({
                email: valdat.boolean().isRequired(),
                theme: valdat.string().isRequired()
            }).isRequired()
        };

        // check if data matches schema
        const {
            isValid,
            errors
        } = valdat.check(schema, data);

        // reduce the error messages and update error messages
        // this can also clear existing error messages
        const errorMsgs = Object.keys(errors)
            .reduce((msgs, key) => ({
                ...msgs,
                [`${key}Message`]: errors[key]
            }), {});
        this.setState({ ...errorMsgs });

        // if the data is okay
        if (isValid) {
            // call api to submit
        }
    }
}
```
That wasn't so bad was it? A similar flow can also be create for any of the popular frameworks.

## Features
-----------
1. Ability to curry (chain) multiple assertions
2. Assertions fails fast, meaning it will stop checking if one of them fails
3. Returned `errors` object has the same shape as schema, with/without an error message. Very easy to update UI without much hassle
4. Ability to add custom validator
5. Ability to register custom validator
6. Sufficient list of assertions (still growing)

## Installation
---------------
```shell
npm install valdat --save
```

## Usage
--------
```javascript
import valdat from 'valdat';
```

## API - utility methods
------------------------

## check
Check the data against the schema. It will return an object with `isValid: boolean` and `errors: <SchemaShape>{}`.
```javascript
const {
    isValid,
    errors
} = valdat.check(schema, data);
```

## custom
Use a totally custom assertion function. There is not `isRequired()` in this case. It can be implemented within the custom assertion.
```javascript
const schema = {
    password: valdat.custom((data, key) => {
        const regex = /^[\w&.-]+$/;
        const value = data[key];
        let error = false;
        let message = '';

        if (!regex.test(value)) {
            error = true;
            message = 'Should contain: minimum 8 letters, upper & lower letters, numbers, and special characters';
        }

        return {
            error,
            message
        }
    }),
}
```

## register
Imagine you reach a stage where your custom assertion requires its own currying, or it needs to be reused accross the application. then you can create a new `<Name>Validation` class that extends the base `Validation` class and register to `valdat` object literal. After that you can use your custom assertion anywhere.
```javascript
import valdat, { Validation } from 'valdat';

class CatValidation extends Validation {
    constructor() {
        super();
    }
    cat() {
        this.stack.push((data, key) => {
            const value = data[key]

            if (!value || !value.cat) {
                return {
                    error: true,
                    message: `${key} in data is not a cat.`
                }
            }

            return {
                error: false,
                message: ''
            }
        });

        // Important for currying
        return this;
    }
    isLazy() {
        this.stack.push((data, key) => {
            const value = data[key]

            if (value && !value.isLazy) {
                return {
                    error: true,
                    message: 'The cat is not lazy.'
                }
            }

            return {
                error: false,
                message: ''
            }
        });

        // Important for currying
        return this;
    }
};

valdat.register('cat', new CatValidation().cat);

const schema = {
    prickle: valdat.cat().isLazy().isRequired()
};
```

## API - assertion methods
--------------------------
Each of the following methods are from their own `<Name>Validation` classes, which extends a base `Validation` that provides `.isRequired()`. The following methods returns `this`, allowing us to curry through the additional methods. The methods are added to `valdat` object literal for correct sequence access.

## string
Checks if the value of the key in `data` is a string.
```javascript
const schema = {
    name: valdat.string().isRequired()
};
```
## string.hasLen
Checks if the string has a length of 5.
```javascript
const schema = {
    name: valdat.string().hasLen(5)
};
```
## string.matchRegex
Checks if the string matches the provided regex.
```javascript
const schema = {
    name: valdat.string().matchRegex(/^Solo$/)
};
```

## number
Checks if the value of the key in `data` is a number.
```javascript
const schema = {
    age: valdat.number().isRequired()
};
```
## number.min
Checks if the number has a minimum value of 18.
```javascript
const schema = {
    age: valdat.number().min(18)
};
```
## number.max
Checks if the number has a maximum value of 30.
```javascript
const schema = {
    age: valdat.number().max(30)
};
```

## boolean
Checks if the value of the key in `data` is a boolean.
```javascript
const schema = {
    publicAccess: valdat.boolean().isRequired()
};
```

## object
Checks if the value of the key in `data` is an object.
```javascript
const schema = {
    preference: valdat.object().isRequired()
};
```
## object.shape
Checks if the object has the exact shape as provided.
```javascript
const schema = {
    preference: valdat.object().shape({
        email: valdat.boolean().isRequired(),
        theme: valdat.string().isRequired()
    })
};
```

## array
Checks if the value of the key in `data` is an array.
```javascript
const schema = {
    languages: valdat.array().isRequired()
};
```
## array.notEmpty
Checks if the array is not empty.
```javascript
const schema = {
    languages: valdat.array().notEmpty()
};
```
## array.ofType
Checks if the array contains the specified type.
```javascript
const schema = {
    languages: valdat.array().ofType(valdat.string())
};
```

## oneOf (enum)
```javascript
const schema = {
    sex: valdat.oneOf(['Male', 'Female', 'Other'])
};
```
## oneOfType (enum)
```javascript
const schema = {
    nationality: valdat.oneOfType([
        valdat.string(),
        valdat.array()
    ])
};
```