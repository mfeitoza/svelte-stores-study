import type { User } from '$lib/models/user'
import type { Subscriber } from "svelte/store"

import { getUsers } from '$lib/services/api'
import { proxy, snapshot, subscribe } from 'valtio/vanilla'

interface UserState {
  loaded: boolean,
  users: User[]
}

const state = proxy<UserState>({
  loaded: false,
  users: []
})

export const fetchUsers = async () => {
  const res = await getUsers()
  state.loaded = true
  state.users = res
}

export const usersStore = {
  subscribe(fn: Subscriber<UserState>) {
    fn(snapshot(state) as UserState)
    return subscribe(state, () => fn(snapshot(state) as UserState))
  }
}