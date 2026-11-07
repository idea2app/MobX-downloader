import { defineConfig } from 'tsdown';
import SWC from 'unplugin-swc';

const pluginSWC = SWC.rollup({
    tsconfigFile: false,
    include: /\.ts$/,
    exclude: ['**/*.d.ts', '**/*.d.mts', '**/*.d.cts'],
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
});
export default defineConfig({
    entry: ['source/index.ts'],
    format: ['esm', 'cjs'],
    platform: 'neutral',
    inputOptions: { platform: 'browser' },
    target: 'es2015',
    outDir: 'dist',
    fixedExtension: true,
    minify: true,
    dts: true,
    sourcemap: true,
    plugins: [pluginSWC]
});
