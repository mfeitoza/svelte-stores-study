import { getUsersPage } from '$lib/services/api'

export const fetchUsers = async (page = 1) => {
	return await getUsersPage(page)
}
