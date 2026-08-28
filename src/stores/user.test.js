vi.mock('../services/api')

import { beforeEach, describe, it, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { fetchUser, saveUser } from '../services/api'
import { useUserStore } from './user'


beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
})
describe('User store tests', () => {
    it('loads user from API', async () => {
        const mockUser = { name: 'Anna Andersson', email: 'anna@example.com'}
        fetchUser.mockResolvedValue(mockUser)

        const store = useUserStore()
        await store.load()

        expect(fetchUser).toHaveBeenCalledOnce()
        expect(store.user).toEqual(mockUser)
        expect(store.loading).toBe(false)
    });

    it('keeps user null when load fails', async () => {
        fetchUser.mockRejectedValue(new Error('API error'))

        const store = useUserStore()
        await store.load()

        expect(store.user).toBe(null)
        expect(store.loading).toBe(false)
    });

    it('saves user via API', async() => {
        vi.stubGlobal('alert', vi.fn())

        const updatedUser = { name: 'Anna Larsson', email: 'anna@example.com'}
        saveUser.mockResolvedValue(updatedUser)

        const store = useUserStore()
        await store.save({name: 'Anna Larsson', email: 'anna@example.com'})

        expect(saveUser).toHaveBeenCalledWith({name: 'Anna Larsson', email: 'anna@example.com'})
        expect(store.user).toEqual(updatedUser)
        expect(alert).toHaveBeenCalledWith('Sparat!')
     
    })
})