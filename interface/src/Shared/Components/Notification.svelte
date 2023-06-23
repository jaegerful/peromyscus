<script>
    export let category, message

    const titles = {
        'warning': 'Warning: ',
        'error': 'Error: ',
        'success': 'Success: ',
    }
    
    import {fade} from 'svelte/transition'
</script>

<div out:fade = {{duration: 250}} class = {category}><span>{titles[category]}</span>{message}</div>

<style>
    div {
        min-width: 50vw;
        border-radius: 0.65rem;

        background-color: var(--dark-gray);
        padding: 1rem 1.5rem;

        font-weight: 300;

        position: absolute;
        bottom: 15vh;

        z-index: 1;

        animation: pop 0.3s ease-in-out;
    }

    span {
        font-weight: 600;
    }

    @keyframes pop {
        0% {
            opacity: 0;
            bottom: 0;
        }

        70% {
            opacity: 0.5;
        }

        100% {
            opacity: 1;
            bottom: 15vh;
        }
    }

    /* styling for specific categories. */

    div.warning {
        box-shadow: 0.2rem 0.2rem var(--yellow);
    }

    div.warning > span {
        color: var(--yellow);
    }

    div.error {
        box-shadow: 0.2rem 0.2rem red;
    }

    div.error > span {
        color: red;
    }

    div.success {
        box-shadow: 0.2rem 0.2rem var(--green);
    }

    div.success > span {
        color: var(--green);
    }
</style>