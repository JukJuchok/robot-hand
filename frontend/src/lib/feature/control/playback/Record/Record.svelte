<script lang="ts">
	import { onDestroy } from 'svelte';
	import Range from '$lib/shared/Range.svelte';
	import { Record, type DataItem } from './Record';
	import ToggleIconButton from './ToggleIconButton.svelte';

	import playIcon from '../../../../../assets/icons/play.svg?raw';
	import pauseIcon from '../../../../../assets/icons/pause.svg?raw';
	import { robot } from '../../../../../stores/robotStore';

	let time = 0;

	let dragging: boolean;

	let playing = false;

	export let data: DataItem[];

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

	$: {
		if (dragging) {
			record.setTime(time);
		}
	}

	function onDragEnd() {
		if (record.playing) {
			record.play();
		}
	}

	function formatMilliseconds(milliseconds: number) {
		const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, milliseconds));
		const parts = [d.getUTCMinutes(), String(d.getUTCSeconds()).padStart(2, '0')];
		const formatted = parts.join(':');

		return formatted;
	}

	onDestroy(() => {
		record.destroy();
	});
</script>

<div class="record">
	<ToggleIconButton
		bind:toggled={playing}
		buttons={[
			{ icon: playIcon, onClick: record.play.bind(record) },
			{ icon: pauseIcon, onClick: record.pause.bind(record) }
		]}
	/>

	<div class="time">
		{formatMilliseconds(time)} / {formatMilliseconds(data[data.length - 1].time)}
	</div>
	<div class="timeline">
		<Range bind:value={time} min={0} max={data[data.length - 1].time} bind:dragging {onDragEnd} />
	</div>
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
	}
</style>
