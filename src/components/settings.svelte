<script lang="ts">
	import { settings } from '../stores/settings.store';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowRight, ArrowLeft } from '@steeze-ui/heroicons';
	import Slider from './slider.svelte';

	let isSidebarVisible = true;

	const randomCharacters = () => {
		$settings.characters = String.fromCharCode(
			...Array(15)
				.fill(0)
				.map(() => Math.floor(32 + Math.random() * 95))
		);
	};
	const resetCharacters = () => {
		$settings.characters = '@#W$8?äöao;:=+~-,. ';
	};
</script>

<aside
	class="w-64 fixed duration-300 {isSidebarVisible ? 'right-10' : '-right-64'}"
	aria-label="Sidebar"
>
	<div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 flex flex-col gap-4">
		<button
			class="absolute right-64 top-0 mr-1 w-9 p-2 rounded bg-gray-50 hover:bg-gray-100"
			on:click={() => (isSidebarVisible = !isSidebarVisible)}
		>
			<Icon src={isSidebarVisible ? ArrowRight : ArrowLeft} theme="solid" class="color-gray-900" />
		</button>
		<Slider name="Screensize" bind:value={$settings.screenSize} min={100} max={1020} step={10} />
		<Slider
			name="Resolution"
			bind:value={$settings.resolution}
			min={5}
			max={30}
			step={1}
			tooltip="determines the number of characters in one row. screenSize / resolution =
		n_characters_per_row"
		/>
		<Slider
			name="Charactersize"
			bind:value={$settings.characterSizeOffset}
			min={-20}
			max={20}
			step={1}
			tooltip="make the individual characters larger so that they overlap or experiment how it looks like when they are very small."
		/>

		<div>
			<label for="characters" data-tooltip-target="characters-tooltip">Characters </label>
			<div
				id="characters-tooltip"
				role="tooltip"
				class="absolute invisible p-2 text-white bg-gray-800 rounded-lg transition-opacity duration-300 tooltip"
			>
				Ascii characters ascending from dark to light.
				<div class="tooltip-arrow" data-popper-arrow />
			</div>
			<input id="characters" type="text" class="w-full" bind:value={$settings.characters} />
			<div class="mt-2 flex justify-between">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
					on:click={randomCharacters}>shuffle</button
				>
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
					on:click={resetCharacters}>reset</button
				>
			</div>
		</div>
	</div>
</aside>
