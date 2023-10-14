module.exports = {
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'eslint:recommended',
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        'plugin:react/jsx-runtime',
        '@electron-toolkit/eslint-config-ts/recommended',
        '@electron-toolkit/eslint-config-prettier'
    ],
    "parser": "@typescript-eslint/parser",
    "rules": {
      "react/react-in-jsx-scope": "off",
      "no-underscore-dangle": "off",
      "import/prefer-default-export": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/function-component-definition": "off",
      "react/button-has-type": "off",
      "prettier/prettier": ["off", { "singleQuote": true }],
      "import/no-cycle": "off",
      "react/require-default-props": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "react/jsx-props-no-spreading": "off",
      "react/no-unescaped-entities": "off",
      "no-param-reassign": [
          "error",
          {
              "props": true,
              "ignorePropertyModificationsFor": ["state"]
          }
      ],
      "no-restricted-imports": [
          "error",
          {
              "paths": [
                  {
                      "name": "react",
                      "importNames": ["default"]
                  }
              ]
          }
      ]
  }
};
