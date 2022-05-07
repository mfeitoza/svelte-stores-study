import type { User } from '$lib/models/user'
import { writable } from 'svelte/store'

import { getUsers } from '$lib/services/api'

export const loaded = writable(false)
export const users = writable<User[]>([])

export const fetchUsers = async () => {
  const res = await getUsers()
  loaded.set(true)
  users.set(res)
}


