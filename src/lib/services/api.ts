import ky from 'ky'

import type { IUser } from '$lib/models/user'
import { User } from '$lib/models/user'

const BASE_URL = 'https://reqres.in/api'

const api = ky.create({
  prefixUrl: BASE_URL
})

interface RGetUsers {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: IUser[]
}

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get('users?delay=1.5').json<RGetUsers>()
  return data.map((user) => new User(user))
}