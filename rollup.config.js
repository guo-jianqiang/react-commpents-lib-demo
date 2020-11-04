import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import pkg from "./package.json";

export default {
  input: "./src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    }
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [postcss({
    extract: false,
    modules: true,
    use: ['less'],
  }), typescript(), terser()],
};