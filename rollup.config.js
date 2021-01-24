import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import {getBabelOutputPlugin} from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import RollupCopy from 'rollup-plugin-copy'
import image from '@rollup/plugin-image';
import progress from 'rollup-plugin-progress'
import filesize from 'rollup-plugin-filesize';
import pkg from "./package.json";
import nodePath from 'path'

function getPath (dir) {
  return nodePath.join(__dirname, dir)
}

const indexRollupConfig = {
  input: getPath('src/index.ts'),
  output: [
    {
      file: getPath(pkg.module),
      format: 'es',
      sourcemap: true
    },
    {
      file: getPath(pkg.main),
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [
    image(),
    peerDepsExternal(),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    getBabelOutputPlugin({
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        '@babel/plugin-transform-spread',
        ['@babel/plugin-transform-runtime', { useESModules: false }],
        '@babel/plugin-proposal-export-default-from',
        [
          "import",
          {
            "libraryName": "antd",
            "libraryDirectory": "lib",
            "style": true
          }
        ]],
      runtimeHelpers: true,
    }),
    commonjs(),
    postcss({
      use: [
        [
          'less',
          {
            javascriptEnabled: true,
          },
        ],
      ],
      extensions: ['.css', '.less'],
    }),
    RollupCopy({
      targets: [
        {
          src: getPath('src/components/Icon/iconfont.js'),
          dest: getPath(`dist`),
        }
      ],
    }),
    terser(),
    progress(),
    filesize()]
}


export default [indexRollupConfig]