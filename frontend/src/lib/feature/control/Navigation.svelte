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
	@import '../../../styles/text.scss';
	.navigation {
		display: flex;

		position: fixed;
		bottom: 0;
		column-gap: 64px;
		row-gap: 32px;
		flex-wrap: wrap;
		justify-content: center;
		z-index: 1;
		backdrop-filter: blur(8px);
		border-top: 2px solid var(--primary-low-contrast-2);
		background: var(--space-transparent);
		padding: 32px;

		width: 100%;

		a {
			@include body();
			animation-duration: 0.8s;
			animation-delay: calc(var(--index) * 0.1s);
			animation-fill-mode: both;

			animation-name: scale;

			transition: color 0.8s;

			color: var(--text);

			text-decoration: none;
			white-space: nowrap;

			&:hover {
				color: var(--primary);
			}

			&:focus {
				outline: none;
			}

			&.active {
				cursor: default;
				color: var(--primary);
			}
		}
	}

	@keyframes scale {
		0% {
			transform: scale(0.95);
			opacity: 0;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
