<script context="module" lang="ts">
	let current: Record;
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';
	import Range from '$lib/shared/Range.svelte';
	import { Record, type DataItem } from './Record';
	import ToggleIconButton from './ToggleIconButton.svelte';
	import playIcon from '../../../../../assets/icons/play.svg?raw';
	import pauseIcon from '../../../../../assets/icons/pause.svg?raw';
	import repeatIcon from '../../../../../assets/icons/repeat.svg?raw';
	import { robot } from '../../../../../stores/robotStore';

	export let data: DataItem[];

	let time = 0;
	let dragging: boolean;
	let playing = false;

	const record = new Record({
		data,
		send: (positions: number[]) => {
			if ($robot) {
				$robot.send(positions);
			}
		},
		onTimeUpdate: (value: number) => {
			time = value;
		},
		onPlayingChange: (value: boolean) => {
			playing = value;
		}
	});

	function stopOthers() {
		if (current && current !== record) current.pause();
		current = record;
	}

	function play() {
		record.play();
		stopOthers();
	}

	function onDragEnd() {
		if (record.playing) {
			play();
		}
	}

	function formatMilliseconds(milliseconds: number) {
		const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, milliseconds));
		const parts = [d.getUTCMinutes(), String(d.getUTCSeconds()).padStart(2, '0')];
		const formatted = parts.join(':');

		return formatted;
	}

	function toggleRepeat() {
		record.repeat = !record.repeat;
	}

	onDestroy(() => {
		record.destroy();
	});

	$: {
		if (dragging) {
			record.setTime(time);
		}
	}
</script>

<div class="record">
	<ToggleIconButton
		bind:toggled={playing}
		buttons={[
			{ icon: playIcon, onClick: play },
			{ icon: pauseIcon, onClick: record.pause.bind(record) }
		]}
	/>

	<div class="time">
		{formatMilliseconds(time)} / {formatMilliseconds(data[data.length - 1].time)}
	</div>
	<div class="timeline">
		<Range bind:value={time} min={0} max={data[data.length - 1].time} bind:dragging {onDragEnd} />
	</div>

	<button on:click={toggleRepeat} class:active={record.repeat}>
		{@html repeatIcon}
	</button>
</div>

<style lang="scss">
	.record {
		display: flex;
		align-items: center;
		padding: 16px 24px;
		gap: 16px;

		background: var(--primary-low-contrast-2);
		border-radius: 32px;

		.time {
			white-space: nowrap;
			width: 84px;
			display: flex;
			justify-content: center;
		}

		.timeline {
			width: 256px;
		}

		button {
			width: 32px;
			height: 32px;

			cursor: pointer;
			border: none;
			background: none;

			:global(svg) {
				width: 32px;
				height: 32px;
				fill: var(--text);
				transition: fill 0.4s;
			}
			&.active {
				:global(svg) {
					width: 32px;
					height: 32px;
					fill: var(--primary);
				}
			}
			&:focus {
				outline: none;
			}
		}
	}
</style>
