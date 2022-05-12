import type { User } from '$lib/models/user'
import type { Subscriber } from "svelte/store"

import { getUsersPage, type IMeta } from '$lib/services/api'
import { proxy, snapshot, subscribe, } from 'valtio/vanilla'
import { derive } from 'valtio/utils'

interface UserState {
  loaded: boolean,
  users: User[],
  meta: IMeta
}

const state = proxy<UserState>({
  loaded: false,
  users: [],
  meta: {
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 0
  }
})

const page = derive({
  hasPrev: (get) => get(state).meta.page > 1,
  hasNext: (get) => get(state).meta.page < get(state).meta.total_pages
})

export const fetchUsers = async () => {
  const { data, meta } = await getUsersPage()
  state.loaded = true
  state.users = data
  state.meta = meta
}

export async function fetchPrev() {
  if (page.hasPrev) {
    state.loaded = false
    const { data, meta } = await getUsersPage(state.meta.page - 1)
    state.loaded = true
    state.users = data
    state.meta = meta
  }
}

export async function fetchNext() {
  if (page.hasNext) {
    state.loaded = false
    const { data, meta } = await getUsersPage(state.meta.page + 1)
    state.loaded = true
    state.users = data
    state.meta = meta
  }
}


export const usersStore = {
  subscribe(fn: Subscriber<UserState>) {
    fn(snapshot(state) as UserState)
    return subscribe(state, () => fn(snapshot(state) as UserState))
  }
}

export const pageStore = {
  subscribe(fn: Subscriber<typeof page>) {
    fn(snapshot(page))
    return subscribe(page, () => fn(snapshot(page)))
  }
}