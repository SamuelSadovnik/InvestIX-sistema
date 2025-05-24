<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  try {
    const success = await authStore.login(email.value, password.value)
    if (success) {
      router.push('/dashboard')
    } else {
      error.value = 'credencial invalida'
    }
  } catch (e) {
    error.value = 'An error occurred'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <Card class="w-[400px]">
      <CardHeader>
        <CardTitle>InvistaIX</CardTitle>
        <CardDescription>Logue para acessar o dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="space-y-2">
            <label for="email">Email</label>
            <Input 
              id="email"
              v-model="email"
              type="email"
              placeholder="Insira seu email"
              required
            />
          </div>
          <div class="space-y-2">
            <label for="password">Senha</label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="Insira sua senha"
              required
            />
          </div>
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        </form>
      </CardContent>
      <CardFooter>
        <Button @click="handleLogin" class="w-full">Login</Button>
      </CardFooter>
    </Card>
  </div>
</template>