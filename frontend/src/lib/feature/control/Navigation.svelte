<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { navigationHeight } from '../../../stores/navigationHeightStore';

	let navigation: HTMLDivElement;

	const links = [
		{
			href: '/control/recognition',
			title: 'Recognition'
		},
		{
			href: '/control/manual',
			title: 'Manual controll'
		},
		{
			href: '/control/playback',
			title: 'Playback'
		}
	];

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				navigationHeight.set((entry.target as HTMLDivElement).offsetHeight);
			}
		});

		resizeObserver.observe(navigation);
	});
</script>

<div class="navigation" bind:this={navigation}>
	{#each links as link, index}
		<a
			style="--index: {index};"
			href={link.href}
			class:active={$page.url.pathname.includes(link.href)}>{link.title}</a
		>
	{/each}
</div>

<style lang="scss">
	.navigation {
		background: var(--space-transparent);
		border-top: 2px solid var(--primary-low-contrast-2);
		backdrop-filter: blur(8px);

		position: fixed;
		bottom: 0;
		z-index: 1;

		width: 100%;
		padding: 32px;

		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		column-gap: 64px;
		row-gap: 32px;

		width: 100%;

		a {
			white-space: nowrap;
			font-family: 'Inter';
			font-weight: 400;
			font-size: 16px;
			line-height: 19px;

			color: var(--text);

			text-decoration: none;

			transition: color 0.4s;

			animation-name: fly;
			animation-duration: 0.4s;
			animation-fill-mode: both;
			animation-delay: calc(var(--index) * 0.1s);

			&:hover {
				color: var(--primary);
			}

			&:focus {
				outline: none;
			}

			&.active {
				color: var(--primary);
				cursor: default;
			}
		}
	}

	@keyframes fly {
		0% {
			opacity: 0;
			transform: translateY(32px);
		}
		100% {
			opacity: 1;
			transform: translateY(0px);
		}
	}
</style>
