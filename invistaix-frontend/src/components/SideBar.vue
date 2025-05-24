<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { Menu, X, LayoutDashboard, CheckCircle, Home, Users, Briefcase, DollarSign, BarChart2, FileText, User } from 'lucide-vue-next';

const isSidebarOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 768);
const userPermissions = ref([
  'dashboard',
  'vistorias',
  'imoveis',
  'proprietarios',
  'gestores',
  'financeiro',
  'performance',
  'relatorios'
]);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function hasPermission(section: string) {
  return userPermissions.value.includes(section);
}

// Atualiza o estado da sidebar com base no tamanho da janela
function updateSidebarState() {
  const wasDesktop = isDesktop.value;
  isDesktop.value = window.innerWidth >= 768;
  if (!wasDesktop && isDesktop.value) {
    isSidebarOpen.value = true;
  } else if (wasDesktop && !isDesktop.value) {
    isSidebarOpen.value = false;
  }
}

const sidebarClasses = computed(() => ({
  'sidebar text-white w-64 min-h-screen p-4': true,
  'fixed top-0 left-0 h-full md:static': true,
  'sidebar-hidden': !isSidebarOpen.value && !isDesktop.value
}));

onMounted(() => {
  updateSidebarState();
  window.addEventListener('resize', updateSidebarState);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSidebarState);
});
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside :class="sidebarClasses" style="background-color: #000000;">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">InvistaIX</h2>
        <button @click="toggleSidebar" class="text-white focus:outline-none md:hidden">
          <X class="w-6 h-6" />
        </button>
      </div>
      <nav>
        <ul>
          <li v-if="hasPermission('dashboard')" class="mb-4">
            <a href="#" class="flex items-center p-2 bg-green-700 rounded">
              <LayoutDashboard class="w-5 h-5 mr-2" />
              Dashboard
            </a>
          </li>
          <li v-if="hasPermission('vistorias')" class="mb-4">
            <a href="#" class="flex items-center p-2 hover:bg-gray-700 rounded">
              <CheckCircle class="w-5 h-5 mr-2" />
              Vistorias
            </a>
          </li>
          <li v-if="hasPermission('imoveis')" class="mb-4">
            <a href="#" class="flex items-center p-2 hover:bg-gray-700 rounded">
              <Home class="w-5 h-5 mr-2" />
              Imóveis
            </a>
          </li>
          <li v-if="hasPermission('proprietarios')" class="mb-4">
            <a href="#" class="flex items-center p-2 hover:bg-gray-700 rounded">
              <Users class="w-5 h-5 mr-2" />
              Proprietários
            </a>
          </li>
          <li v-if="hasPermission('gestores')" class="mb-4">
            <a href="#" class="flex items-center p-2 hover:bg-gray-700 rounded">
              <Briefcase class="w-5 h-5 mr-2" />
              Gestores
            </a>
          </li>
          <li v-if="hasPermission('financeiro')" class="mb-4">
            <a href="#" class="flex items-center p-2 hover:bg-gray-700 rounded">
              <DollarSign class="w-5 h-5 mr-2" />
              Financeiro
            </a>
          </li>
          <li v-if="hasPermission('performance')" class="mb-4">
            <a href="#" class="flex items-center p-2 hover:bg-gray-700 rounded">
              <BarChart2 class="w-5 h-5 mr-2" />
              Performance
            </a>
          </li>
          <li v-if="hasPermission('relatorios')" class="mb-4">
            <a href="#" class="flex items-center p-2 hover:bg-gray-700 rounded">
              <FileText class="w-5 h-5 mr-2" />
              Relatórios
            </a>
          </li>
        </ul>
      </nav>
    </aside>

		<!-- Header -->
    <div class="flex-1 flex flex-col">
      <header class="p-4 flex justify-between items-center" style="background-color: #ffffff; color: #000000;">
        <button @click="toggleSidebar" class="focus:outline-none md:hidden">
          <Menu class="w-6 h-6" />
        </button>
        <div class="flex-1"></div>
        <button class="focus:outline-none">
          <User class="w-6 h-6" />
        </button>
      </header>

      <!-- Slot for content -->
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  transition: transform 0.3s ease-in-out;
}
.sidebar-hidden {
  transform: translateX(-100%);
}
header {
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
}
</style>