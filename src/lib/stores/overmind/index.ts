import { createOvermind, type IContext } from 'overmind'
import { createMixin } from 'overmind-svelte'

import { initialState } from './state'
import * as allActions from './actions'
import * as allEffects from './effects'

const config = {
	state: initialState,
	actions: allActions,
	effects: allEffects
}

const store = createMixin(createOvermind(config))

export type Context = IContext<typeof config>
export const state = store.state
export const actions: Context['actions'] = store.actions
