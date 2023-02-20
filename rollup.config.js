
const devOutput = {
    file: "./dist/app.js",
    format: "iife",
    sourcemap: true
};

export default {
    input: ["./src/main.js"],
    output: devOutput,
    plugins: []
};
