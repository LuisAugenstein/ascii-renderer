import { writable } from 'svelte/store';

export interface Settings {
    displayWidth: number;
    displayHeight: number;
};

export const settings = writable<Settings>({
    displayWidth: 920,
    displayHeight: 500
});