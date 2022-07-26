<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch, p5 } from 'p5-svelte/types';
	import type { Image, Element } from 'p5';
	import { settings } from '../stores/settings.store';
	import { derived } from 'svelte/store';

	const height = (width: number) => Math.ceil(width * 0.6);

	const CANVAS_WIDTH = 1020;
	const CANVAS_HEIGHT = height(CANVAS_WIDTH);
	const N_COLUMNS = derived(settings, ($settings) => Math.ceil($settings.screenSize / $settings.resolution));
	const N_ROWS = derived(N_COLUMNS, ($N_COLUMNS) => height($N_COLUMNS));
	const charSize = derived(N_COLUMNS, ($N_COLUMNS) => Math.ceil(CANVAS_WIDTH / $N_COLUMNS));

	const sketch: Sketch = (p5: p5) => {
		let capture: any;

		p5.setup = () => {
			p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
			capture = p5.createCapture(p5.VIDEO);
			capture.size($N_COLUMNS, $N_ROWS);
			capture.hide();
		};

		p5.draw = () => {
			p5.background(200);
			p5.textSize(p5.max($charSize + $settings.characterSizeOffset, 1));

			if (capture.width !== $N_COLUMNS) {
				capture.size($N_COLUMNS, $N_ROWS);
			}

			const image: Image = capture.get();
			if(image.width === 0){
				return;
			}
			image.loadPixels();

			for (let i = 0; i < $N_ROWS; i++) {
				for (let j = 0; j < $N_COLUMNS; j++) {
					const pixelIndex = (i * $N_COLUMNS + j) * 4;
					const r = image.pixels[pixelIndex];
					const g = image.pixels[pixelIndex + 1];
					const b = image.pixels[pixelIndex + 2];
					const avg = (r + g + b) / 3;
					const charIndex = p5.floor(p5.map(avg, 0, 255, 0, $settings.characters.length));
					p5.text($settings.characters[charIndex], j * $charSize, (i + 1) * $charSize);
				}
			}
		};
	};
</script>

<P5
	{sketch}
	parentDivStyle="width: {$settings.screenSize}px; height: {$settings.screenSize * 0.6}px"
/>
