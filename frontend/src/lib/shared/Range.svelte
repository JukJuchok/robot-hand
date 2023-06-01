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
	<div class="track" style="--value: {(value / (max - min)) * 100}%" />
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
		touch-action: none;
		user-select: none;
		width: 100%;

		.track {
			position: absolute;
			top: 6px;
			height: 4px;
			width: 100%;
			border-radius: 2px;
			background: linear-gradient(
				90deg,
				var(--primary) var(--value),
				var(--primary-low-contrast) var(--value)
			);
			transition: background-color 0.4s;
		}

		.thumb {
			height: 16px;
			width: 16px;
			border-radius: 8px;
			background: var(--primary);
			transition: background-color 0.4s;
		}

		&:hover,
		&.active {
			.track {
				background: linear-gradient(
					90deg,
					var(--primary-active) var(--value),
					var(--primary-low-contrast) var(--value)
				);
			}

			.thumb {
				background: var(--primary-active);
			}
		}
	}
</style>
