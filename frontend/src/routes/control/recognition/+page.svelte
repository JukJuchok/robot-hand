<script lang="ts">
	import { Hands } from '@mediapipe/hands';
	import type { Results } from '@mediapipe/hands';
	import { onMount, onDestroy } from 'svelte';
	import { robot } from '../../../stores/robotStore';
	import { calcAngles } from '$lib/feature/control/recognition/calcAngles';
	import Connections2d from '$lib/feature/control/recognition/Connections2d.svelte';
	import Connections3d from '$lib/feature/control/recognition/Connections3d/Connections3d.svelte';

	let hands: Hands;
	let video: HTMLVideoElement;
	let requestId: number;
	let results: Results;
	let videoWidth = 640;
	let videoHeight = 480;

	function startWebCam() {
		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((stream) => {
					video.srcObject = stream;
					video.addEventListener('loadedmetadata', setDimensions);
					video.requestVideoFrameCallback(loop);
				})
				.catch((error) => console.warn(error));
		}
	}

	function setDimensions() {
		if (video) {
			videoWidth = video.videoWidth;
			videoHeight = video.videoHeight;
		}
	}

	async function loop() {
		await hands.send({
			image: video
		});
		requestId = video.requestVideoFrameCallback(loop);
	}

	function onResults(data: Results): void {
		results = data;

		if ($robot !== undefined) {
			if (results.multiHandWorldLandmarks) {
				if (results.multiHandWorldLandmarks[0]) {
					const angles = calcAngles(results.multiHandWorldLandmarks[0]);

					$robot.send(angles);
				}
			}
		}
	}

	onMount(() => {
		if ($robot) {
			hands = new Hands();

			hands.setOptions({
				selfieMode: true,
				maxNumHands: 1,
				modelComplexity: 1,
				minDetectionConfidence: 0.5,
				minTrackingConfidence: 0.5
			});

			hands.onResults(onResults);

			startWebCam();
		}
	});

	onDestroy(() => {
		if (hands) {
			hands.close();
		}
		if (requestId !== undefined) {
			video.cancelVideoFrameCallback(requestId);
		}
		if (video) {
			const stream = video.srcObject as MediaStream | null;
			if (stream) {
				const tracks = stream.getTracks();
				tracks.forEach((track) => track.stop());
				video.srcObject = null;
			}
		}
	});
</script>

<svelte:head>
	<title>Recognition</title>
</svelte:head>

<div>
	<Connections2d {videoWidth} {videoHeight} {results} />
	<Connections3d {videoWidth} {videoHeight} {results} />
</div>

<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={video} autoplay />

<style lang="scss">
	div {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 32px;
	}
	video {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
