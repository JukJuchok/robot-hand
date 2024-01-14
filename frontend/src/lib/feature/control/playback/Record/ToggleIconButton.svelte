<script lang="ts">
	export let buttons: { icon: string; onClick: () => void }[];

	export let toggled = false;

	function toggle() {
		if (toggled) {
			buttons[1].onClick();
		} else {
			buttons[0].onClick();
		}
		toggled = !toggled;
	}
</script>

<button on:click={toggle}>
	{#if toggled}
		{@html buttons[1].icon}
	{:else}
		{@html buttons[0].icon}
	{/if}
</button>

<style lang="scss">
	button {
		cursor: pointer;
		border: none;
		background: none;
		width: 32px;
		height: 32px;

		:global(svg) {
			fill: var(--text);
			width: 32px;
			height: 32px;
		}

		&:focus {
			outline: none;
		}
	}
</style>
