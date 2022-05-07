import type { User } from '$lib/models/user'

import { createAtom } from '@reatom/core'

import { getUsers } from '$lib/services/api'
import type { Subscriber } from 'svelte/store'

interface UserState {
  loaded: boolean,
  users: User[]
}


const initialState: UserState = {
  loaded: false,
  users: []
}

const state = createAtom(
  {
    fetchUsers: () => null
  },
  ({onAction}, state = initialState) => {
    onAction('fetchUsers', async () => {
      const res = await getUsers()
      state = {
        loaded: true,
        users: res
      }
      console.log('fetch', state)
      return state
    })
    console.log('red', state)
    return state
  }
)

export const usersStore = {
  subscribe(fn: Subscriber<UserState>) {
    fn(state.getState())
    return state.subscribe((s) => {
      console.log('sub', s)
      fn(s)
    })
  }
}

state.fetchUsers.dispatch()

export const fetchUsers = state.fetchUsers