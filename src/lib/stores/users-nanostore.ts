import type { User } from '$lib/models/user'

import { atom, computed, onMount, task } from 'nanostores'
import { getUsersPage, type IMeta } from '$lib/services/api'

export const loaded = atom(false)
export const usersMeta = atom<IMeta>({
	page: 1,
	per_page: 0,
	total: 0,
	total_pages: 0
})
export const users = atom<User[]>([])
export const hasPrev = computed<boolean, typeof usersMeta>(usersMeta, (meta) => {
  return meta.page > 1
})
export const hasNext = computed<boolean,  typeof usersMeta>(usersMeta, (meta) => {
  return meta.page < meta.total_pages
})

onMount(users, () => {
	task(async () => {
		const { data, meta } = await getUsersPage(usersMeta.get().page)

		users.set(data)
		usersMeta.set(meta)
		loaded.set(true)
	})
})

export async function fetchPrev() {
	if (hasPrev.get()) {
		loaded.set(false)
		const { data, meta } = await getUsersPage(usersMeta.get().page - 1)
		users.set(data)
		usersMeta.set(meta)
		loaded.set(true)
	}
}

export async function fetchNext() {
	if (hasNext.get()) {
		loaded.set(false)
		const { data, meta } = await getUsersPage(usersMeta.get().page + 1)
		users.set(data)
		usersMeta.set(meta)
		loaded.set(true)
	}
}
