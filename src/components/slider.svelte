<script lang="ts">
	export let name: string;
	export let value = 1;
	export let tooltip = '';
	export let min = 1;
	export let max = 10;
	export let step = 1;
</script>

<div>
	<div class="flex justify-between">
		{#if tooltip}
			<label for="{name}-input" data-tooltip-target="{name}-tooltip">{name} </label>
			<div
				id="{name}-tooltip"
				role="tooltip"
				class="absolute invisible p-2 text-white bg-gray-800 rounded-lg transition-opacity duration-300 tooltip"
			>
				{tooltip}
				<div class="tooltip-arrow" data-popper-arrow />
			</div>
		{:else}
			<label for="{name}-input">{name} </label>
		{/if}
		{value}
	</div>
	<input id="{name}-input" type="range" class="w-full" bind:value {min} {max} {step} />
</div>
