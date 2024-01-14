<script lang="ts">
	import usbIcon from '../assets/icons/usb.svg?raw';
	import { goto } from '$app/navigation';
	import { robot } from '../stores/robotStore';
	import { scale } from 'svelte/transition';
	import { Robot } from '$lib/feature/Robot';
	import Button from '$lib/feature/Button.svelte';
	import Mount from '$lib/shared/Mount.svelte';

	function connect() {
		navigator.serial
			.requestPort({ filters: [] })
			.then((port: SerialPort) => {
				port
					.open({ baudRate: 9600 })
					.then(() => {
						robot.set(new Robot({ port }));
						port.ondisconnect = () => {
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
</script>

<svelte:head>
	<title>Connecting</title>
</svelte:head>

<div class="page">
	<Mount>
		<div transition:scale={{ duration: 800, start: 0.95 }}>
			<Button icon={usbIcon} on:click={connect}>Connect robot</Button>
		</div>
	</Mount>
</div>

<style lang="scss">
	.page {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 32px 64px;
		width: 100%;
		min-width: min-content;
		height: 100%;
		min-height: 100%;
	}
</style>
