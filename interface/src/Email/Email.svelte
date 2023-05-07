<script>
    /* holds email. */

    let email = localStorage.getItem('address') ?? ''

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

    const handler = async () => {

        /* checks for valid input. */

        const checks = {
            'empty': {
                'result': email.length !== 0,
                'message': 'Email address is missing.',
            },
            'format': {
                'result': email.includes('@') && email.includes('.'),
                'message': 'Email address is not valid.'
            },
        }
            
        if (!(checks.empty.result && checks.format.result)) {
            notification.category = 'warning'
            notification.message = !checks.empty.result ? checks.empty.message : checks.format.message
            notification.show = true
         
            setTimeout(() => notification.show = false, 2500)

            return
        }

        localStorage.setItem('address', email)

        /* invoke 'parts.send'. */

        const status = await eel.send($store.letter.header, $store.letter.status, $store.letter.schema, $store.letter.message, $store.batch, email)()

        /* show error if email could not be sent. */
        
        if (status === false) {
            notification.category = 'error'
            notification.message = `Email could not be sent to ${email}.`
            notification.show = true

            setTimeout(() => notification.show = false, 2500)

            return
        }

        /* show confirmation if email was sent. */
        
        notification.category = 'success'
        notification.message = `Email was sent to ${email}.`
        notification.show = true

        setTimeout(() => notification.show = false, 2500)
    }

    import Button from '../Shared/Components/Button.svelte'
</script>

<input type = 'email' placeholder = 'Email Address' bind:value={email} required>

<Button title = {'Send Email'} on:next = {handler}/>

{#if notification.show}
    <Notification category = {notification.category} message = {notification.message}/>
{/if}

<style>
    input[type = 'email'] {
        margin-bottom: 5rem;
    }
</style>