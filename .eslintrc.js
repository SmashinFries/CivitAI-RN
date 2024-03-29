module.exports = {
    env: {
        browser: true,
        es2021: true,
        es6: true,
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        // 'airbnb/hooks',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', 'react-native', '@typescript-eslint', 'prettier'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        'no-empty-function': 'off',
        'prettier/prettier': 'off',
        'no-empty-pattern': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
