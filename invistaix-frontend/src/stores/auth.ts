import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  role: 'manager' | 'owner'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    isManager: (state) => state.user?.role === 'manager',
    isOwner: (state) => state.user?.role === 'owner'
  },
  
  actions: {
    async login(email: string, password: string) {
      // TODO: Replace with actual API call
      if (email === 'demo@example.com' && password === 'password') {
        this.user = {
          id: '1',
          name: 'Demo User',
          role: 'manager'
        }
        this.token = 'demo-token'
        return true
      }
      return false
    },
    
    logout() {
      this.user = null
      this.token = null
    }
  }
})