module.exports = {
    $schema: "https://json.schemastore.org/eslintrc.json",
    root: true,
    env: {
        browser: true,
        es2021: true,
        commonjs: true,
        node: true,
    },
    extends: [
        "airbnb",
        "airbnb/hooks",
        "prettier",
        "next",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    plugins: [
        "import",
        "jsx-a11y",
        "react",
        "react-hooks",
        "prettier",
        "unused-imports",
        "@typescript-eslint",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        "import/extensions": [
            "error",
            {
                js: "ignorePackages",
                jsx: "ignorePackages",
                ts: "ignorePackages",
                tsx: "ignorePackages",
            },
        ],
        "import/no-unresolved": "off",
        "no-console": "off",
        "no-eval": "error",
        "react/jsx-filename-extension": [
            "warn",
            {
                extensions: [".tsx"],
            },
        ],
        "import/no-extraneous-dependencies": [
            "error",
            {
                devDependencies: true,
            },
        ],
        "@typescript-eslint/no-var-requires": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-indent": "off",
        "react/jsx-indent-props": "off",
        "react/jsx-one-expression-per-line": "off",
        indent: "off",
        "global-require": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "react/jsx-closing-bracket-location": ["error", "line-aligned"],
        "react-hooks/exhaustive-deps": "off",
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",
        "jsx-a11y/click-events-have-key-events": "warn",
        "jsx-a11y/interactive-supports-focus": "warn",
        "prettier/prettier": "warn",
        "no-unused-vars": "off",
        "unused-imports/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "warn",
        "object-curly-spacing": [2, "always"],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                args: "after-used",
                ignoreRestSiblings: false,
                argsIgnorePattern: "^_.*?$",
            },
        ],
        "no-unused-expressions": "warn",
        "import/order": [
            "warn",
            {
                groups: [
                    "type",
                    "builtin",
                    "object",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                ],
                pathGroups: [
                    {
                        pattern: "~/**",
                        group: "external",
                        position: "after",
                    },
                ],
                "newlines-between": "always",
            },
        ],
        "react/self-closing-comp": "warn",
        "react/jsx-sort-props": [
            "warn",
            {
                callbacksLast: true,
                shorthandFirst: true,
                noSortAlphabetically: false,
                reservedFirst: true,
            },
        ],
        "padding-line-between-statements": [
            "warn",
            {
                blankLine: "always",
                prev: "*",
                next: "return",
            },
            {
                blankLine: "always",
                prev: ["const", "let", "var"],
                next: "*",
            },
            {
                blankLine: "any",
                prev: ["const", "let", "var"],
                next: ["const", "let", "var"],
            },
        ],
        "no-shadow": "off",
        "react/require-default-props": "off",
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
        react: {
            version: "detect",
        },
    },
};
