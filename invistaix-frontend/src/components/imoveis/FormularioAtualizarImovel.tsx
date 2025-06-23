import React from 'react';
import FormularioImovel from './FormularioImovel';
import { Imovel } from '@/hooks/useImoveis';

interface FormularioAtualizarImovelProps {
  imovel: Imovel;
  onSuccess: () => void;
}

const FormularioAtualizarImovel: React.FC<FormularioAtualizarImovelProps> = ({
  imovel,
  onSuccess,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Atualizar Imóvel</h2>
      <FormularioImovel
        imovel={imovel} // Passa o imóvel como prop para preencher os campos
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default FormularioAtualizarImovel;
