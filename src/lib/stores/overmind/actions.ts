import type { Context } from './index'

export const onInitializeOvermind = async ({ actions }: Context) => {
	await actions.getUsers()
}

export const getUsers = async ({ state, effects }: Context) => {
	const { data, meta } = await effects.fetchUsers(state.meta.page)
	state.meta = meta
	state.users = data
	state.loaded = true
}

export const getPrevUsers = async ({ state, effects }: Context) => {
	if (state.hasPrev) {
		state.loaded = false
		const { data, meta } = await effects.fetchUsers(state.meta.page - 1)
		state.meta = meta
		state.users = data
		state.loaded = true
	}
}

export const getNextUsers = async ({ state, effects }: Context) => {
	if (state.hasNext) {
		state.loaded = false
		const { data, meta } = await effects.fetchUsers(state.meta.page + 1)
		state.meta = meta
		state.users = data
		state.loaded = true
	}
}
