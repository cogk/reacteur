/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
	root: true,
	extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-prettier/skip-formatting"],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		"no-extra-parens": "off",
		"vue/max-attributes-per-line": [
			2,
			{
				singleline: 1,
				multiline: {
					max: 1,
					allowFirstLine: false,
				},
			},
		],
	},
}
