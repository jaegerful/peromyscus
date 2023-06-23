<script>
    import store from '../Shared/Scripts/store.js'
    import {onMount, getContext} from 'svelte'

    const eel = getContext('eel')

    onMount(async () => {
        const parameters = [$store.stock, $store.batch.length, $store.size, $store.batch, $store.unique_parents]
        const results = await eel.display(...parameters)()
        $store.letter = results
    })

    const batch = $store.batch

    import Button from '../Shared/Components/Button.svelte'
</script>

{#if $store.letter?.status}
    <h3>{$store.letter.status}</h3>
{/if}

<table>
    <thead>
        <tr>
            <th></th>
            {#each Object.keys(batch[0]) as column}
                <th>{column}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each batch as pair, index}
            <tr>
                <td>{index + 1}<span>:</span></td>
                {#each Object.values(pair) as cell}
                    <td>{cell}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<Button title = {'Continue'} on:next/>

<style>
    h3 {
        font-size: 1rem;
        font-weight: 300;

        margin-bottom: 2rem;
    }

    th:first-child {
        box-shadow: none;
        border: none;
        background-color: black;
    }
    
    td:first-child {
        background-color: transparent;
        
        font-size: 1.2rem;
        font-weight: 600;
    }

    td:first-child > span {
        font-weight: 300;
    }
</style>