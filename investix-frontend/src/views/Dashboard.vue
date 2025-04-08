<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const propertyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Property Sales',
    data: [65, 59, 80, 81, 56, 55],
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const stats = ref({
  totalProperties: 150,
  activeListings: 45,
  pendingSales: 12,
  monthlyRevenue: '$250,000'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
    
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle class="text-sm font-medium">Total Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-2xl font-bold">{{ stats.totalProperties }}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="text-sm font-medium">Active Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-2xl font-bold">{{ stats.activeListings }}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="text-sm font-medium">Pending Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-2xl font-bold">{{ stats.pendingSales }}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="text-sm font-medium">Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-2xl font-bold">{{ stats.monthlyRevenue }}</p>
        </CardContent>
      </Card>
    </div>
    
    <!-- Chart -->
    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent class="h-[400px]">
        <Line :data="propertyData" :options="chartOptions" />
      </CardContent>
    </Card>
  </div>
</template>