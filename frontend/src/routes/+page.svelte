<script lang="ts">
	import usbIcon from '../assets/icons/usb.svg?raw';
	import { goto } from '$app/navigation';
	import { robot } from '../stores/robotStore';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { Robot } from '$lib/feature/Robot';
	import Button from '$lib/feature/Button.svelte';

	function connect() {
		navigator.serial
			.requestPort({ filters: [] })
			.then((port: SerialPort) => {
				port
					.open({ baudRate: 9600 })
					.then(() => {
						robot.set(new Robot({port}));
						port.ondisconnect = () => {
							// $robot.destroy();
							robot.set(undefined);
							console.warn('oops... disconected');
							goto(`/`, { replaceState: true });
						};
						goto(`control/manual`, { replaceState: true });
					})
					.catch((e: Error) => {
						console.warn(e.message);
					});
			})
			.catch((e: Error) => {
				console.warn(e.message);
			});
	}

	let animate = false;

	onMount(() => {
		setTimeout(() => {
			animate = true;
		}, 200);
	});
</script>

<svelte:head>
	<title>Connecting</title>
</svelte:head>

<div class="page">
	{#if animate}
		<div in:fly={{ duration: 400, y: 32 }} out:fade={{ duration: 400 }}>
			<Button icon={usbIcon} on:click={connect}>Connect robot</Button>
		</div>
	{/if}
</div>

<style lang="scss">
	.page {
		width: 100%;
		min-width: min-content;
		height: 100%;
		min-height: 100%;

		padding: 32px 64px;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
