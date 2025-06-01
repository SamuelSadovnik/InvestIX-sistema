
import React from "react";
import { ClipboardCheck } from "lucide-react";

export default function Vistorias() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="flex items-center mb-4">
        <ClipboardCheck className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-bold text-black dark:text-white">Vistorias</h1>
      </div>
      <p className="max-w-md text-muted-foreground">
        Sua central de gerenciamento de inspeções e vistorias dos imóveis da plataforma. Organize, acompanhe, e registre cada etapa de maneira simples.
      </p>
      <div className="w-full max-w-xl mt-8 rounded-lg bg-white dark:bg-zinc-900 p-6 border border-primary/20 shadow transition hover:shadow-lg">
        <h2 className="text-xl font-semibold text-primary mb-2">Em breve</h2>
        <p>Recursos detalhados de vistorias estarão disponíveis aqui.</p>
      </div>
    </div>
  );
}
