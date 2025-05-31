
import React from "react";
import { FileText } from "lucide-react";

export default function Relatorios() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="flex items-center mb-4">
        <FileText className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-bold text-black dark:text-white">Relatórios</h1>
      </div>
      <p className="max-w-md text-muted-foreground">
        Geração de relatórios detalhados sobre ativos, ocupação, rendimento, histórico e informações financeiras.
      </p>
      <div className="w-full max-w-xl mt-8 rounded-lg bg-white dark:bg-zinc-900 p-6 border border-primary/20 shadow transition hover:shadow-lg">
        <h2 className="text-xl font-semibold text-primary mb-2">Em breve</h2>
        <p>Painel de relatórios completos estará disponível futuramente.</p>
      </div>
    </div>
  );
}
