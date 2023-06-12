<script lang="ts">
	export let buttons: { icon: string; onClick: () => void }[];

	export let toggled: boolean = false;

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
		width: 32px;
		height: 32px;

		cursor: pointer;
		border: none;
		background: none;

		:global(svg) {
			width: 32px;
			height: 32px;
			fill: var(--text);
		}

		&:focus {
			outline: none;
		}
	}
</style>
