import type { User } from '$lib/models/user'

import { createStore, withProps, select } from '@ngneat/elf'
import { createEffect, ofType, createAction, initEffects, registerEffects } from '@ngneat/effects'

import { from, iif, EMPTY, combineLatest } from 'rxjs'
import { tap, map, switchMap, take } from 'rxjs/operators'
import { getUsersPage, type IMeta } from '$lib/services/api'

interface UsersProps {
	loaded: boolean
	users: User[]
	meta: IMeta
}

const usersStore = createStore(
	{ name: 'users' },
	withProps<UsersProps>({
		loaded: false,
		users: [],
		meta: {
			page: 1,
			per_page: 0,
			total: 0,
			total_pages: 0
		}
	})
)

// initialize effects
initEffects()

export const users$ = usersStore.pipe(select((state) => state.users))
export const loaded$ = usersStore.pipe(select((state) => state.loaded))
export const meta$ = usersStore.pipe(select((state) => state.meta))
export const hasPrev$ = meta$.pipe(
	select((state) => state.page),
	map((page) => page > 1)
)
export const hasNext$ = meta$.pipe(
	select((state) => state),
	map((state) => state.page < state.total_pages)
)

function addUsers({ data, meta }: { data: User[]; meta: IMeta }) {
	usersStore.update((_) => ({
		users: data,
		loaded: true,
		meta: meta
	}))
}

export function fetchUsers() {
	return from(getUsersPage()).pipe(tap(addUsers))
}

// actions creator
export const fetchPrevAction = createAction('fetchPrev')
export const fetchNextAction = createAction('fetchNext')

// effects listeners to actions (side-effects)
const handlePrev = createEffect((actions) => {
	return actions.pipe(
		ofType(fetchPrevAction),
		switchMap(() =>
			combineLatest([meta$, hasPrev$]).pipe(
				take(1),
				switchMap(([meta, hasNext]) => iif(() => hasNext, from(getUsersPage(meta.page - 1)), EMPTY))
			)
		),
		tap(addUsers)
	)
})

const handleNext = createEffect((actions) => {
	return actions.pipe(
		ofType(fetchNextAction),
		switchMap(() =>
			combineLatest([meta$, hasNext$]).pipe(
				take(1),
				switchMap(([meta, hasNext]) => iif(() => hasNext, from(getUsersPage(meta.page + 1)), EMPTY))
			)
		),
		tap(addUsers)
	)
})

// register effects listeners
registerEffects([handlePrev, handleNext])
