<script lang="ts">
	import { onMount } from 'svelte';
	import type { Results } from '@mediapipe/hands';
	import pkg from '@mediapipe/hands';
	const { HAND_CONNECTIONS } = pkg;

	export let videoWidth: number;
	export let videoHeight: number;
	export let results: Results;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	onMount(() => {
		ctx = canvas.getContext('2d')!;
	});

	$: {
		if (results) {
			ctx.save();
			ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
			if (results.multiHandLandmarks && results.multiHandedness) {
				for (let index = 0; index < results.multiHandLandmarks.length; index++) {
					const points = results.multiHandLandmarks[index];

					const lines = HAND_CONNECTIONS.map((connection) => [
						points[connection[0]],
						points[connection[1]]
					]);

					for (const line of lines) {
						ctx.beginPath();
						ctx.moveTo(line[0].x * videoWidth, line[0].y * videoHeight);
						ctx.lineTo(line[1].x * videoWidth, line[1].y * videoHeight);
						ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue(
							'--hand-line'
						);
						ctx.lineWidth = 5;
						ctx.lineCap = 'round';
						ctx.stroke();
					}
				}
			}
			ctx.restore();
		}
	}
</script>

<canvas
	bind:this={canvas}
	width={videoWidth}
	height={videoHeight}
	style="--video-width: {videoWidth}px; --video-height: {videoHeight}px"
/>

<style lang="scss">
	canvas {
		display: block;
		border-radius: 16px;
		background: var(--primary-low-contrast-2);
		width: 100%;
		max-width: var(--video-height);
		height: 100%;
		max-height: var(--video-width);
	}
</style>
