module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
    },
    env: {
        node: true,
    },
    // extends: ["plugin:vue/essential", "@vue/prettier"],
    extends: ["plugin:vue/strongly-recommended", "@vue/prettier"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    }
}