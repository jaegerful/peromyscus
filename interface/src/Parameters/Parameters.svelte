<script>
    /* holds parameters for batch. */
    
    const parameters = {
        'stock': null,
        'size': null,
    }

    /* 'notification' object holds properties for 'Notification' component. */

    import Notification from '../Shared/Components/Notification.svelte'

    const notification = {
        'category': null,
        'message': null,
        'show': false,
    }

    /* handler executes when button pressed. */

    import {getContext} from 'svelte'
    const eel = getContext('eel')

    import store from '../Shared/Scripts/store'

    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    const handler = async () => {

        /* checks for valid input. */

        const checks = {
            'stock': {
                'result': parameters.stock !== null && parameters.stock.length !== 0,
                'message': 'Stock ID is missing.',
            },
            'size': {
                'result': parameters.size !== null && parameters.size > 0,
                'message': 'Number of pairs must be greater than or equal to 1.',
            },
        }

        /* if input invalid, show notification message. */

        if (!(checks.stock.result && checks.size.result)) {
            notification.category = 'warning'
            notification.message = !(checks.stock.result) ? checks.stock.message : checks.size.message
            notification.show = true
         
            setTimeout(() => notification.show = false, 2500)

            return
        }

        /* invoke 'parts.assemble'. */

        const results = await eel.assemble(parameters.stock, parameters.size)()

        /* if no pairs could be generated. */

        if (results.batch.length === 0) {
            notification.category = 'error'
            notification.message = `Could not generate any pairs for the stock: ${parameters.stock}.`
            notification.show = true
         
            setTimeout(() => notification.show = false, 2500)

            return
        }

        /* store results. */

        $store.stock = parameters.stock
        $store.size = parameters.size
        $store.batch = results.batch
        $store.unique_parents = results.unique_parents

        /* fire 'next' event. */

        dispatch('next')
    }

    import Button from '../Shared/Components/Button.svelte'
</script>

<input type = 'text' placeholder = 'Stock ID' bind:value={parameters.stock} required>
<input type = 'number' placeholder = 'Number of Pairs' bind:value={parameters.size} required>

<Button title = {'Generate Batch'} on:next = {handler}/>

{#if notification.show}
    <Notification category = {notification.category} message = {notification.message}/>
{/if}

<style>
    input[type = 'text'] {
        margin-bottom: 1.5rem;
    }

    input[type = 'number'] {
        margin-bottom: 5rem;
    }
</style>