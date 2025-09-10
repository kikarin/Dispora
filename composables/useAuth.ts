import { ref, readonly } from 'vue'

export const useAuth = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:8000/api'

  const user = ref<any>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)

  const initAuth = () => {
    if (process.client) {
      const savedToken = localStorage.getItem('auth_token')
      const savedUser = localStorage.getItem('auth_user')

      console.log('🔐 initAuth - Saved token:', savedToken ? 'EXISTS' : 'NULL')
      console.log('🔐 initAuth - Saved user:', savedUser ? 'EXISTS' : 'NULL')

      if (savedToken && savedUser) {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
        isAuthenticated.value = true
      } else {
        console.log('❌ No saved auth data found')
        // Check if we're on login page, if not redirect
        if (window.location.pathname !== '/login') {
          console.log('🔄 Redirecting to login...')
          window.location.href = '/login'
        }
      }
    }
  }

  const login = async (credentials: { email: string; password: string }) => {
    try {
      isLoading.value = true

      // 1. Ambil CSRF cookie
      await $fetch('/sanctum/csrf-cookie', {
        baseURL: String(baseURL).replace('/api', ''),
        credentials: 'include',
      })

      // 2. Kirim login
      const response = await $fetch<{
        status: string
        message: string
        data: {
          user: any
          token: string
          token_type: string
        }
      }>('/auth/login', {
        baseURL: String(baseURL),
        method: 'POST',
        credentials: 'include',
        body: {
          email: credentials.email,
          password: credentials.password,
          device_name: 'Dispora Mobile App',
        },
      })

      if (response.status === 'success') {
        token.value = response.data.token
        user.value = response.data.user
        isAuthenticated.value = true

        if (process.client) {
          localStorage.setItem('auth_token', response.data.token)
          localStorage.setItem('auth_user', JSON.stringify(response.data.user))
        }

        return { success: true, message: response.message }
      } else {
        throw new Error(response.message || 'Login gagal')
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      console.log('Starting logout process...')

      if (token.value) {
        await $fetch('/auth/logout', {
          baseURL: String(baseURL),
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
      }
    } catch (error) {
      console.error('❌ Logout API error:', error)
    } finally {
      // Clear state
      token.value = null
      user.value = null
      isAuthenticated.value = false

      // Clear localStorage
      if (process.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        console.log('🧹 Auth data cleared from localStorage')
      }

      console.log('✅ Logout completed')
    }
  }

  const fetchUser = async () => {
    try {
      if (!token.value) {
        throw new Error('Token tidak tersedia')
      }

      const response = await $fetch<{
        status: string
        data: {
          user: any
        }
      }>('/auth/profile', {
        baseURL: String(baseURL),
        headers: {
          Authorization: `Bearer ${token.value}`,
          Accept: 'application/json',
        },
      })

      if (response.status === 'success') {
        user.value = response.data.user
        if (process.client) {
          localStorage.setItem('auth_user', JSON.stringify(response.data.user))
        }
        return response.data.user
      }
    } catch (error: any) {
      console.error('❌ Fetch user error:', error)
      if (error.status === 401) {
        await logout()
      }
      throw error
    }
  }

  const checkAuth = () => {
    const isValid = isAuthenticated.value && !!token.value
    console.log('🔍 Auth check:', {
      isAuthenticated: isAuthenticated.value,
      hasToken: !!token.value,
      isValid,
    })
    return isValid
  }

  const getAuthHeaders = () => {
    if (!token.value) {
      console.log('❌ No token available in getAuthHeaders')
      return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer null', // Fallback untuk TypeScript
      }
    }

    console.log('✅ Token available:', token.value.substring(0, 20) + '...')
    return {
      Authorization: `Bearer ${token.value}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    login,
    logout,
    fetchUser,
    checkAuth,
    getAuthHeaders,
    initAuth,
  }
}
