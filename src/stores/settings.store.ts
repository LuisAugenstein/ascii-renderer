import { writable } from 'svelte/store';

export interface Settings {
    width: number;
    height: number;
};

export const settings = writable<Settings>({
    width: 100,
    height: 100
});