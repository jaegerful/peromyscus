<script>
    /* make 'eel' available to every component (for the sake of linter). */
    
    export let eel

    import {setContext} from 'svelte'
    setContext('eel', eel)

    /* define sequence of pages. */

    import Parameters from '../Parameters/Parameters.svelte'
    import Batch from '../Batch/Batch.svelte'
    import Email from '../Email/Email.svelte'

    const sequence = [Parameters, Batch, Email]
    let i = 0

    /* header always shown. */

    import Header from '../Header/Header.svelte'
</script>

<Header/>
<svelte:component this = {sequence[i]} on:next = {() => ++i}/>