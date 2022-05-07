import type { User } from '$lib/models/user'
import type { Subscriber } from "svelte/store"

import create from 'zustand/vanilla'
import { getUsers } from '$lib/services/api'

interface UserState {
  loaded: boolean,
  users: User[]
  fetch: () => void
}

const store = create<UserState>((set) => ({
  loaded: false,
  users: [],
  fetch: async () => {
    const users = await getUsers()
    set({
      loaded: true,
      users
    })
  }
}))

export const usersStore = {
  subscribe(fn: Subscriber<UserState>) {
    fn(store.getState())
    const unsub = store.subscribe((value) => fn(value))
    return () => unsub()
  }
}
