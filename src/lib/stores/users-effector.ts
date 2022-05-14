import type { User } from '$lib/models/user'
import { getUsers } from '$lib/services/api'

import { createStore, createEvent, createEffect, sample, forward } from 'effector'

const setUsers = createEvent<User[]>()
const setLoaded = createEvent<boolean>()

export const loaded = createStore<boolean>(false)
export const users = createStore<User[]>([])

export const fecthUsersFx = createEffect<void, User[]>(async () => {
  return await getUsers()
})

users.on(setUsers, (_, users) => users)
loaded.on(setLoaded, () => true)

sample({
  clock: fecthUsersFx.doneData,
  target: setUsers
})

sample({
  clock: fecthUsersFx.doneData,
  source: loaded,
  target: setLoaded
})

