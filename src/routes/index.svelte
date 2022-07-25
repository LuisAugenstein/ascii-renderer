<script lang="ts">
    import Canvas from "../components/canvas.svelte";
    import Settings from "../components/settings.svelte";
</script>

<svelte:head>
    <title>Ascii Renderer</title>
</svelte:head>
<h1 class="text-4xl text-center my-8 uppercase">Ascii Renderer</h1>
<main class="flex justify-center">
    <Canvas/>
    <Settings/>
</main>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>