module.exports = {
    'extends': 'eslint:recommended',
    'env': {
        'browser': true,
        'node': true
    },
    'globals': {
        'assert': false,
        'dizmo': false
    },
    'rules': {
        'indent': [2, 4],
        'linebreak-style': [2, 'unix'],
        'quotes': [2, 'single'],
        'semi': [2, 'always']
    }
};
