export const argErrorCodes = {
    'SAME_AS/INCORRECT_ARG': 'Incorrect/no `key` provided while declaring schema with `.sameAs`',
    'STRING/HAS_LENGTH/INCORRECT_ARG': 'Incorrect/no `length` provided while declaring schema with `string().hasLength`.',
    'STRING/MATCH_REGEX/INCORRECT_ARG': ''
}

export const defaultErrorCodes = {
    'SAME_AS/MISMATCH': (currentKey: string, otherKey: string) => `The value of ${currentKey} should be same as ${otherKey}`,

    'STRING/REQUIRED': (key: string) => `${key} is required, but its value is undefined`,
    'STRING/MISMATCH': (key: string, value: any) => `${key} should be string, recieved ${typeof value}`,

    'STRING/HAS_LENGTH/INCORRECT_TYPE': (key: string) => `${key} should be a string to check it's length`,
    'STRING/HAS_LENGTH/MISMATCH': (key: string, length: number) => `${key} should be of length ${length}.`,

    'STRING/MATCH_REGEX/INCORRECT_TYPE': (key: string) => `${key} should be a string to match regex.`,
    'STRING/MATCH_REGEX/MISMATCH': (key: string, regex: RegExp) => `${key} does not match the regex ${regex}.`,
}