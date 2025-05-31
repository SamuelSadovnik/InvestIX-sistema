
import React from 'react';
import { Settings, Palette, Moon, Sun } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';

const Configuracoes = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Settings className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Personalize a aparência do sistema</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Aparência
            </CardTitle>
            <CardDescription>
              Configure o tema de cores do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-medium">Modo Escuro</Label>
                <div className="text-sm text-muted-foreground">
                  Alterne entre o tema claro e escuro do sistema
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={handleThemeChange}
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sobre o Sistema</CardTitle>
            <CardDescription>
              Informações sobre o InvistaIX
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Versão:</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Última atualização:</span>
                <span>30/05/2025</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configuracoes;
