<script lang="ts">
	import { settings } from '../stores/settings.store';
	import {Icon} from '@steeze-ui/svelte-icon';
	import {ArrowRight, ArrowLeft} from '@steeze-ui/heroicons';

	let isSidebarVisible = true;
</script>


<aside class="w-64 fixed duration-300 {isSidebarVisible ? 'right-10' : '-right-64'}" aria-label="Sidebar">
	<div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 flex flex-col gap-4">
		<button class="absolute right-64 top-0 mr-1 w-9 p-2 rounded bg-gray-50 hover:bg-gray-100" on:click="{() => isSidebarVisible = !isSidebarVisible}">
			<Icon src={isSidebarVisible ? ArrowRight : ArrowLeft } theme='solid' class='color-gray-900'/>
		</button>
		<div>
			<div class="flex justify-between">
				<label for="width">Width: </label>
				{$settings.width}
			</div>
			<input
				id="width"
				type="range"
				class="w-full"
				bind:value={$settings.width}
				min="100"
				max="1000"
				step="0.01"
			/>
		</div>
		<div>
			<div class="flex justify-between">
				<label for="height">Height: </label>
				{$settings.height}
			</div>
			<input
				id="height"
				type="range"
				class="w-full"
				bind:value={$settings.height}
				min="100"
				max="1000"
				step="0.01"
			/>
		</div>
	</div>
</aside>
