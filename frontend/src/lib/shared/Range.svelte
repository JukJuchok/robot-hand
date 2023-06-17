<script lang="ts">
	import { onMount } from 'svelte';
	import { map } from './map';

	export let value: number;
	export let min: number;
	export let max: number;

	export let dragging = false;

	export let onDragEnd: (() => void) | undefined = undefined;

	let input: HTMLDivElement;
	let thumb: HTMLDivElement;

	let inputWidth: number;
	let thumbWidth: number;

	let dragX: number;

	function jumpTo(e: MouseEvent) {
		dragX = thumbWidth / 2;
		dragging = true;

		moveThumb(e);
	}

	function startDrag(e: MouseEvent) {
		const thumbRect = thumb.getBoundingClientRect();

		dragX = e.clientX - thumbRect.x;
		dragging = true;
	}

	function stopDrag() {
		dragging = false;
		if (onDragEnd) {
			onDragEnd();
		}
	}

	function moveThumb(e: MouseEvent) {
		if (dragging) {
			const inputRect = input.getBoundingClientRect();

			let x;

			if (e.clientX <= inputRect.x + dragX) {
				x = 0;
			} else if (e.clientX >= inputRect.x + inputWidth - thumbWidth + dragX) {
				x = inputWidth - thumbWidth;
			} else {
				x = e.clientX - inputRect.x - dragX;
			}

			value = map(x, 0, inputWidth - thumbWidth, min, max);
		}
	}

	onMount(() => {
		const thumbRect = thumb.getBoundingClientRect();
		thumbWidth = thumbRect.width;

		const inputRect = input.getBoundingClientRect();
		inputWidth = inputRect.width;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				inputWidth = entry.contentBoxSize[0].inlineSize;
			}
		});

		resizeObserver.observe(input);
	});
</script>

<svelte:window on:pointermove={moveThumb} on:pointerup={stopDrag} on:pointerleave={stopDrag} />

<div class="input" class:active={dragging} bind:this={input} on:pointerdown={jumpTo}>
	<div class="track" />
	<div class="fill" style="--width: {(value / (max - min)) * 100}%" />
	<div
		class="thumb"
		style="transform: translateX({map(value, min, max, 0, inputWidth - thumbWidth)}px);"
		bind:this={thumb}
		on:pointerdown={startDrag}
	/>
</div>

<style lang="scss">
	.input {
		position: relative;
		width: 100%;
		touch-action: none;
		user-select: none;

		.track,
		.fill {
			position: absolute;
			top: 6px;
			border-radius: 2px;
			width: 100%;
			height: 4px;
		}
		.track {
			background: var(--primary-low-contrast);
		}
		.fill {
			transition: background-color 0.8s;
			background: var(--primary);
			width: var(--width);
		}

		.thumb {
			transition: background-color 0.8s;
			border-radius: 8px;
			background: var(--primary);
			width: 16px;
			height: 16px;
		}

		&:hover,
		&.active {
			.fill {
				background: var(--primary-active);
			}

			.thumb {
				background: var(--primary-active);
			}
		}
	}
</style>
