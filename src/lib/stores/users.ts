import type { User } from '$lib/models/user'

import { atom, action } from 'nanostores'
import { getUsers } from '$lib/services/api'

export const loaded = atom(false)
export const users = atom<User[]>([])

export const getUsersAction = action(users, 'getUsers', async (store) => {
  const res = await getUsers();
  store.set(res)
  loaded.set(true)
  return store.get()
})