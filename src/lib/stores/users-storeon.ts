import type { User } from '$lib/models/user'
import { createStoreon, type StoreonModule } from 'storeon'
import { getUsers } from '$lib/services/api'

export interface UsersState {
  users: User[],
  loaded: boolean
}

export interface UsersEvent {
  fetchUsers: undefined
  setUsers: User[]
}

const usersModule: StoreonModule<UsersState, UsersEvent> = (store) => {
  store.on('@init', () => ({ users: [], loaded: false }))
  store.on('fetchUsers', async (state) => {
    const res = await getUsers()
    store.dispatch('setUsers', res)
  })
  store.on('setUsers', (state, users) => {
    return {
      loaded: true,
      users
    }
  })
}

export const usersStore = createStoreon<UsersState, UsersEvent>([usersModule])