<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.error?.message}</title>
</svelte:head>

<div class="page">
	<div class="content">
		<h1>
			{$page.error?.message}
		</h1>
		<a href="/">Go home</a>
	</div>
</div>

<style lang="scss">
	@import '../styles/text.scss';
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		padding: 32px 64px;
		width: 100%;
		min-width: min-content;
		height: 100%;
		min-height: 100%;

		.content {
			display: flex;
			flex-direction: column;
			gap: 16px;

			h1 {
				@include header();
			}
			a {
				@include body();

				transition: color 0.8s;
				color: var(--primary);
				text-decoration: none;
				white-space: nowrap;

				&:hover {
					color: var(--primary-active);
				}

				&:focus {
					outline: none;
				}
			}
		}
	}
</style>
