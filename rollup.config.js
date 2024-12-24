import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import url from "@rollup/plugin-url";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/main.jsx", // Your component entry point
  output: {
    file: "dist/widget.js",
    format: "umd", // Universal Module Definition for compatibility
    name: "MyWidget", // Name of the global variable if used in <script>
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  },
  plugins: [
    peerDepsExternal(), // Exclude peer dependencies from the bundle
    resolve(), // Allow Rollup to find `node_modules` dependencies
    commonjs(), // Convert CommonJS modules to ES6
    babel({
      exclude: "node_modules/**", // Transpile only your source code
      babelHelpers: "bundled",
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }),
    json(), // Support for importing JSON files
    postcss({
      extract: true, // Extract CSS to a separate file
      minimize: true, // Minify the CSS
    }),
    url({
      include: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"], // Handle static assets
      limit: 8192, // Inline files smaller than 8KB as base64
      emitFiles: true, // Copy larger files to the output folder
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"), // Replace with the production value
      preventAssignment: true, // Required for Rollup v2+
    }),
  ],
  external: ["react", "react-dom"], // Mark these as external to avoid bundling
};
