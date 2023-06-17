<script lang="ts">
	export let icon: string;
</script>

<button on:click>
	{@html icon}
	<slot />
</button>

<style lang="scss">
	@import '../../styles/text.scss';

	button {
		@include body-bold();

		display: flex;
		align-items: center;
		gap: 16px;

		transition: background-color 0.8s;

		cursor: pointer;

		border: none;
		border-radius: 32px;

		background: var(--primary);

		padding: 16px 32px 16px 24px;
		color: var(--space);
		white-space: nowrap;

		&:hover {
			background: var(--primary-active);
		}

		&:focus {
			outline: none;
		}

		:global(svg) {
			fill: var(--space);
			width: 32px;
			height: 32px;
		}
	}
</style>
