import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardProvider } from "@/contexts/DashboardContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import DetalhesImovel from "./pages/DetalhesImovel";
import Imoveis from "./pages/Imoveis";
import Proprietarios from "./pages/Proprietarios";
import Gestores from "./pages/Gestores";
import Financeiro from "./pages/Financeiro";
import Performance from "./pages/Performance";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="invistaix-ui-theme">
        <AuthProvider>
          <DashboardProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="imoveis" element={<Imoveis />} />
                  <Route path="imoveis/:id" element={<DetalhesImovel />} />                  <Route path="proprietarios" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'GESTOR']}>
                      <Proprietarios />
                    </ProtectedRoute>
                  } />
                  <Route path="gestores" element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <Gestores />
                    </ProtectedRoute>
                  } />
                  <Route path="financeiro" element={<Financeiro />} />
                  <Route path="performance" element={<Performance />} />
                  <Route path="configuracoes" element={<Configuracoes />} />
                </Route>                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
          </DashboardProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
