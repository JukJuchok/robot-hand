<script lang="ts">
	import Range from '$lib/shared/Range.svelte';

	export let value: number;
	export let min: number;
	export let max: number;
</script>

<div class="input-container">
	<slot />
	<Range bind:value {min} {max} />
</div>

<style lang="scss">
	.input-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
