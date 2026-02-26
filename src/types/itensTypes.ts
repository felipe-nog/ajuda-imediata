export type ItemComUsuario = {
  id: string;
  tipo_publicacao: 'OFERTA' | 'PEDIDO';
  categoria: string;
  descricao: string | null; 
  criado_em: Date;
  usuario: {
    nome: string;
    telefone: string;
    bairro: string;
  };
};

export type ItemProps = {
  item: ItemComUsuario;
  onResolveClick?: () => void; 
};