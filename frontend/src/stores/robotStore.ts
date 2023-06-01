import { writable } from 'svelte/store';
import type { Robot } from '$lib/feature/Robot';

export const robot = writable<Robot | undefined>();
