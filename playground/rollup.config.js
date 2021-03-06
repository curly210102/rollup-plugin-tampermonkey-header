// rollup.config.js
import { defineConfig } from 'rollup'

import tmHeader from "../plugin.esm"

export default defineConfig({
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'iife'
  },
  plugins: [tmHeader()]
})
