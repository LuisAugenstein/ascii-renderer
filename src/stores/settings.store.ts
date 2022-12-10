import { writable } from 'svelte/store';

export interface Settings {
    screenSize: number;
    resolution: number;
    characters: string;
};

export const settings = writable<Settings>({
    screenSize: 720,
    resolution: 10,
    characters: ' .~+X@'
});