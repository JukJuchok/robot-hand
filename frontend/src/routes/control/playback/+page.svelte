<script>
	import Record from '$lib/feature/control/playback/Record/Record.svelte';
	import Mount from '$lib/shared/Mount.svelte';
	import { scale } from 'svelte/transition';

	const records = [
		{
			title: 'Record #1',
			data: [
				{ time: 0, positions: [0, 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 1000, positions: [90, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 2000, positions: [180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 3000, positions: [90, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 4000, positions: [0, 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
			]
		},
		{
			title: 'Record #2',
			data: [
				{ time: 0, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 1000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 2000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 3000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 4000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
			]
		},
		{
			title: 'Record #3',
			data: [
				{ time: 0, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 1000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 2000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 3000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 4000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
			]
		},
		{
			title: 'Record #4',
			data: [
				{ time: 0, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 1000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 2000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 3000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
				{ time: 4000, positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
			]
		}
	];
</script>

<svelte:head>
	<title>Playback</title>
</svelte:head>

<div class="records-list">
	{#each records as record, index}
		<Mount>
			<div
				class="record"
				in:scale={{
					delay: 800 + index * 100,
					duration: 400,
					start: 0.95
				}}
			>
				<span>{record.title}</span>
				<Record data={record.data} />
			</div>
		</Mount>
	{/each}
</div>

<style lang="scss">
	@import '../../../styles/text.scss';
	.records-list {
		display: flex;
		flex-direction: column;
		gap: 32px;

		.record {
			display: flex;
			flex-direction: column;
			gap: 12px;

			span {
				@include body-medium();
			}
		}
	}
</style>
