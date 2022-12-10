<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch, p5 } from 'p5-svelte/types';
	import type { Image } from 'p5';
	import { settings } from '../stores/settings.store';
	import { derived } from 'svelte/store';

	const height = (width: number) => Math.floor(width * 0.60009765625);

	const CANVAS_WIDTH = 1020;
	const LINE_HEIGHT_MULTIPLIER = 1.2;
	const CANVAS_HEIGHT = height(CANVAS_WIDTH);
	const N_COLUMNS = derived(settings, ($settings) =>
		Math.floor($settings.screenSize / $settings.resolution)
	);
	const CHAR_WIDTH = derived(N_COLUMNS, ($N_COLUMNS) => Math.floor(CANVAS_WIDTH / $N_COLUMNS));
	const CHAR_HEIGHT = derived(CHAR_WIDTH, ($CHAR_WIDTH) => Math.floor($CHAR_WIDTH / 0.6));
	const N_ROWS = derived(CHAR_HEIGHT, ($CHAR_HEIGHT) =>
		Math.floor((CANVAS_HEIGHT / $CHAR_HEIGHT) * LINE_HEIGHT_MULTIPLIER)
	);

	const sketch: Sketch = (p5: p5) => {
		let capture: any;
		let min = 255;
		let max = 0;

		p5.setup = () => {
			p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
			p5.textFont('Courier');
			p5.textAlign(p5.CENTER, p5.CENTER);
			capture = p5.createCapture(p5.VIDEO);
			capture.hide();
			p5.fill(255);
		};

		p5.draw = () => {
			p5.background(50);
			p5.textSize($CHAR_HEIGHT);
			p5.textLeading(Math.floor($CHAR_HEIGHT) / LINE_HEIGHT_MULTIPLIER);

			if (capture?.width !== $N_COLUMNS) {
				capture.size($N_COLUMNS, $N_ROWS);
				min = 255;
				max = 0;
			}

			const image: Image = capture.get();
			if (image.width === 0 || image.height === 0) {
				return;
			}
			image.loadPixels();
			if (image.pixels.slice(0, 10).every((v) => v === 0)) {
				return;
			}
			if (min === 255 && max === 0) {
				for (let i = 0; i < Math.min(1000, image.pixels.length / 4); i++) {
					const pixelIndex = i * 4;
					const r = image.pixels[pixelIndex];
					const g = image.pixels[pixelIndex + 1];
					const b = image.pixels[pixelIndex + 2];
					const brightness = p5.brightness([r, g, b]);
					min = min < brightness ? min : brightness;
					max = max > brightness ? max : brightness;
				}
			}
			let text = '';
			for (let i = 0; i < $N_ROWS; i++) {
				for (let j = 0; j < $N_COLUMNS; j++) {
					const pixelIndex = (i * $N_COLUMNS + j) * 4;
					const r = image.pixels[pixelIndex];
					const g = image.pixels[pixelIndex + 1];
					const b = image.pixels[pixelIndex + 2];
					const brightness = p5.brightness([r, g, b]);
					let charIndex = p5.floor(p5.map(brightness, min, max, 0, $settings.characters.length));
					charIndex = charIndex < 0 ? 0 : charIndex;
					charIndex =
						charIndex >= $settings.characters.length ? $settings.characters.length - 1 : charIndex;
					text += $settings.characters[charIndex];
				}
				if (i !== $N_ROWS - 1) {
					text += '\n';
				}
			}
			p5.text(text, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		};
	};
</script>

<P5
	{sketch}
	parentDivStyle="width: {$settings.screenSize}px; height: {$settings.screenSize * 0.6}px"
/>
