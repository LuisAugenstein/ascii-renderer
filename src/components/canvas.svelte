<script lang="ts">
	import P5 from 'p5-svelte';
    import type { Sketch, p5 } from 'p5-svelte/types';
    import { settings } from '../stores/settings.store';

	const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(920, 500);
		};

		p5.draw = () => {
			p5.ellipse(p5.width / 2, p5.height / 2, $settings.width, $settings.height);
		};
	};
</script>

<P5 {sketch} />
