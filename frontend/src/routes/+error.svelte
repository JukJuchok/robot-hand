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
	.page {
		width: 100%;
		min-width: min-content;
		height: 100%;
		min-height: 100%;

		padding: 32px 64px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.content {
			display: flex;
			flex-direction: column;
			gap: 16px;
			a {
				white-space: nowrap;
				font-family: 'Inter';
				font-weight: 400;
				font-size: 16px;
				line-height: 19px;

				color: var(--primary);

				text-decoration: none;

				transition: color 0.4s;

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
