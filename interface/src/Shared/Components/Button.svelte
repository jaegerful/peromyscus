<script>
    export let title
    
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    const next = () => dispatch('next')
</script>

<button on:click = {next}>{title}</button>