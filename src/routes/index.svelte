<script lang="ts">
    import Canvas from "../components/canvas.svelte";
    import Settings from "../components/settings.svelte";
</script>

<svelte:head>
    <title>Ascii Renderer</title>
    <link rel="stylesheet" href="/src/styles.css">
</svelte:head>
<main class="min-w-min">
    <h1 class="text-4xl text-center my-5 uppercase">Ascii Renderer</h1>
    <div class="flex justify-center">
        <Canvas/>
        <Settings/>
    </div>
</main>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>