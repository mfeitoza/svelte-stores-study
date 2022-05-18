import { derived } from 'overmind'

import type { IMeta } from '$lib/services/api'
import type { User } from '$lib/models/user'

type State = {
  loaded: boolean
  users: User[],
  meta: IMeta,
  hasPrev: boolean,
  hasNext: boolean
}

export const initialState: State = {
  loaded: false,
  users: [],
  meta: {
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 0
  },
  hasPrev: derived((state: State) => state.meta.page > 1),
  hasNext: derived((state: State) => state.meta.page < state.meta.total_pages)
}