import { writable } from 'svelte/store';

export interface Settings {
    screenSize: number;
    resolution: number;
    characters: string;
    characterSizeOffset: number;
};

export const settings = writable<Settings>({
    screenSize: 720,
    resolution: 10,
    characterSizeOffset: 0,
    characters: '@#W$8?äöao;:=+~-,. '
});