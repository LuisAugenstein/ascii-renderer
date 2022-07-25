<script lang="ts">
	import P5 from 'p5-svelte';
	import type { Sketch, p5 } from 'p5-svelte/types';
	import type { Image } from 'p5';
	import { settings } from '../stores/settings.store';

	const density = '@#W$8?äöao;:=+~-,. ';

	const sketch: Sketch = (p5: p5) => {
		let camera: Image;
		const width = 100;
		const height = 100;

		p5.setup = () => {
			p5.createCanvas(width, height);
			camera = p5.loadImage('src/images/camera.png');
		};

		p5.draw = () => {
			p5.background(255);
			p5.image(camera, 0, 0, width, height);
		};
	};
</script>

<P5 {sketch} parentDivStyle="width: {$settings.displayWidth}px; height: {$settings.displayHeight}px" />

<style>
	:global(.p5Canvas) {
		width: 100% !important;
		height: 100% !important;
	}
</style>
