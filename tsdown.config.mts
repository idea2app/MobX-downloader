import { defineConfig } from 'tsdown';
import swc from 'unplugin-swc';

export default defineConfig({
    entry: ['source/index.ts'],
    format: ['esm', 'cjs'],
    platform: 'neutral',
    inputOptions: {
        platform: 'browser'
    },
    target: 'es2015',
    outDir: 'dist',
    fixedExtension: true,
    dts: true,
    sourcemap: true,
    plugins: [
        swc.rollup({
            tsconfigFile: false,
            include: /\.ts$/,
            minify: true,
            jsc: {
                parser: {
                    syntax: 'typescript',
                    decorators: true
                },
                target: 'es5',
                transform: {
                    decoratorVersion: '2022-03'
                }
            }
        })
    ]
});
