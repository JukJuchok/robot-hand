<script lang="ts">
	import { onMount } from 'svelte';
	import { drawShape, type Point } from './drawShape';
	import { lerp } from './lerp';
	import type { Results } from '@mediapipe/hands';
	import pkg from '@mediapipe/hands';
	const { HAND_CONNECTIONS } = pkg;

	export let videoWidth: number;
	export let videoHeight: number;
	export let results: Results;

	let projectionCenterX = videoWidth / 2;
	let projectionCenterY = videoHeight / 2;
	let fieldOfView = videoWidth * 0.8;

	let scale = 3 * videoWidth;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let prevLandmarks: Point[] | undefined;

	// drag to rotate

	let angle = 0;
	let dragging = false;

	function startDrag() {
		dragging = true;
	}

	function drag(e: MouseEvent) {
		if (dragging) {
			angle -= e.movementX * 0.02;
		}
	}

	function stopDrag() {
		dragging = false;
	}

	//

	onMount(() => {
		ctx = canvas.getContext('2d')!;
	});

	function rotateY(shape: Point[], angle: number) {
		return shape.map((point) => {
			return {
				x: point.z * Math.sin(angle) + point.x * Math.cos(angle),
				y: point.y,
				z: point.z * Math.cos(angle) - point.x * Math.sin(angle)
			};
		});
	}

	$: {
		projectionCenterX = videoWidth / 2;
		projectionCenterY = videoHeight / 2;
		fieldOfView = videoWidth * 0.8;

		scale = 3 * videoWidth;
	}

	$: {
		if (results) {
			if (results.multiHandWorldLandmarks) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				if (results.multiHandWorldLandmarks[0]) {
					let landmarks = results.multiHandWorldLandmarks[0];

					landmarks = landmarks.map((point) => ({
						x: point.x * scale,
						y: point.y * scale,
						z: point.z * scale
					}));

					if (prevLandmarks !== undefined) {
						landmarks = landmarks.map((point, index) => ({
							x: lerp(prevLandmarks![index].x, point.x, 0.1),
							y: lerp(prevLandmarks![index].y, point.y, 0.1),
							z: lerp(prevLandmarks![index].z, point.z, 0.1)
						}));
					}

					prevLandmarks = landmarks;

					const rotatedLandmarks = rotateY(landmarks, angle);

					drawShape(
						ctx,
						rotatedLandmarks,
						HAND_CONNECTIONS,
						projectionCenterX,
						projectionCenterY,
						fieldOfView,
						getComputedStyle(document.documentElement).getPropertyValue('--primary'),
						5
					);
				}
			}
		}
	}
</script>

<svelte:window on:pointermove={drag} on:pointerup={stopDrag} on:pointerleave={stopDrag} />

<canvas
	bind:this={canvas}
	width={videoWidth}
	height={videoHeight}
	style="--video-width: {videoWidth}px; --video-height: {videoHeight}px"
	on:pointerdown={startDrag}
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
