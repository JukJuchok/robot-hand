import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { mediapipeWorkaround } from './src/helpers/mediapipeWorkaround';

export default defineConfig({
	plugins: [
		mediapipeWorkaround(),
		sveltekit(),
		viteStaticCopy({
			targets: [
				{
					src: 'node_modules/@mediapipe/hands/hand_landmark_full.tflite',
					dest: './control'
				},
				{
					src: 'node_modules/@mediapipe/hands/hands_solution_packed_assets_loader.js',
					dest: './control'
				},
				{
					src: 'node_modules/@mediapipe/hands/hands_solution_simd_wasm_bin.js',
					dest: './control'
				},
				{
					src: 'node_modules/@mediapipe/hands/hands.binarypb',
					dest: './control'
				},
				{
					src: 'node_modules/@mediapipe/hands/hands_solution_packed_assets.data',
					dest: './control'
				},
				{
					src: 'node_modules/@mediapipe/hands/hands_solution_simd_wasm_bin.wasm',
					dest: './control'
				}
			]
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
