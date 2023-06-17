<script lang="ts">
	import { scale } from 'svelte/transition';
	import Navigation from '$lib/feature/control/Navigation.svelte';
	import { navigationHeight } from '../../stores/navigationHeightStore';
	import { browser } from '$app/environment';
	import { robot } from '../../stores/robotStore';
	import { goto } from '$app/navigation';

	export let data: { pathname: string };

	$: pathname = data.pathname;

	$: {
		if (browser && !$robot) {
			goto('/');
		}
	}
</script>

<div class="page">
	{#key pathname}
		<div
			style="--navigation-height: {$navigationHeight}px"
			transition:scale={{ delay: 0, duration: 800, start: 0.95 }}
		>
			<slot />
		</div>
	{/key}
</div>

<Navigation />

<style lang="scss">
	.page {
		width: 100%;
		min-width: min-content;
		height: 100%;

		div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 64px;
			padding-bottom: calc(var(--navigation-height) + 64px);
			min-height: 100%;
		}
	}
</style>
