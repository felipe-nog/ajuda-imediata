import { ItemProps } from "@/types/itensTypes";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function CardItem({ item, onResolveClick }: ItemProps) {
  const isOferta = item.tipo_publicacao === 'OFERTA';
  const corBorda = isOferta ? 'border-green-500' : 'border-orange-500';
  const corFundoBadge = isOferta ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
  const textoBadge = isOferta ? 'Disponível para Doação' : 'Precisa de Ajuda';

  const numeroLimpo = item.usuario.telefone.replace(/\D/g, '');
  const linkWhatsapp = `https://wa.me/55${numeroLimpo}?text=Olá ${item.usuario.nome}, vi seu anúncio de ${item.tipo_publicacao} sobre itens de ${item.categoria} na plataforma Ajuda Imediata JF.`;

  return (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 ${corBorda} p-4 flex flex-col gap-3 transition-all hover:shadow-md`}>
      <div className="flex flex-wrap justify-between items-start">
        <div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${corFundoBadge}`}>
            {textoBadge}
          </span>
          <h3 className="text-lg font-semibold mt-2 text-gray-800">{item.categoria}</h3>
        </div>
        <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
          📍 {item.usuario.bairro}
        </span>
      </div>

      <p className="text-gray-600 text-sm border-b pb-3 border-gray-100">
        {item.descricao ? `"${item.descricao}"` : "Sem descrição adicional."}
      </p>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-1">
        <div className="text-sm text-gray-700">
          <p className="font-medium">{item.usuario.nome}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {new Date(item.criado_em).toLocaleDateString('pt-BR')}
            </span>
            {onResolveClick && (
              <>
                <span className="text-gray-300">•</span>
                <button 
                  onClick={onResolveClick}
                  className="text-xs text-gray-500 underline hover:text-gray-800 transition-colors"
                >
                  Já resolveu?
                </button>
              </>
            )}
          </div>
        </div>
        
        <Link 
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <FaWhatsapp className="w-5 h-5" />
          Chamar no WhatsApp
        </Link>
      </div>
    </div>
  );
}