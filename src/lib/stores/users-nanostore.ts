import type { User } from '$lib/models/user'

import { atom, onMount, task } from 'nanostores'
import { getUsers } from '$lib/services/api'

export const loaded = atom(false)
export const users = atom<User[]>([])

onMount(users, () => {
  task(async () => {
    users.set(await getUsers())
    loaded.set(true)
  })
})