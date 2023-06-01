<script lang="ts">
	export let icon: string;
</script>

<button on:click>
	{@html icon}
	<slot />
</button>

<style lang="scss">
	button {
		cursor: pointer;
		white-space: nowrap;
		border: none;
		padding: 16px 32px 16px 24px;

		background: var(--primary);
		border-radius: 32px;

		font-weight: 700;
		font-size: 16px;
		line-height: 19px;

		display: flex;
		align-items: center;
		gap: 16px;

		color: var(--space);

		transition: background-color 0.4s;

		&:hover {
			background: var(--primary-active);
		}

		&:focus {
			outline: none;
		}

		:global(svg) {
			width: 32px;
			height: 32px;
			fill: var(--space);
		}
	}
</style>
