module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": "xo",
    "rules": {
        "semi": "off",
        "@typescript-eslint/semi": ["error", "always"],
        "indent": ["error", 4],
        "camelcase": "off",
        'no-negated-condition': 'off',
        'guard-for-in': 'off',
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "no-constructor-return": "off",
        "default-param-last": "off"
    }
};
