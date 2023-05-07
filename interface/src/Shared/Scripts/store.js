import {writable} from 'svelte/store'

export const store = writable({
    stock: null,
    size: null,
    batch: null,
    unique_parents: null,
    letter: null,
})

export default store