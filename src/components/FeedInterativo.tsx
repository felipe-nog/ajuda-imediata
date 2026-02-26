// components/FeedInterativo.tsx
"use client";

import { useState } from "react";
import { resolverItem } from "../actions/doacao";
import CardItem from "./CardItem";
import { ItemComUsuario } from "@/types/itensTypes";
import { CiSearch } from "react-icons/ci";

export default function FeedInterativo({
  itensIniciais,
}: {
  itensIniciais: ItemComUsuario[]; 
}) {
  const [filtroTipo, setFiltroTipo] = useState<"TODOS" | "OFERTA" | "PEDIDO">("TODOS");
  const [filtroBairro, setFiltroBairro] = useState("");
  const [itemParaResolver, setItemParaResolver] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const itensFiltrados = itensIniciais.filter((item) => {
    const passaFiltroTipo = filtroTipo === "TODOS" || item.tipo_publicacao === filtroTipo;
    const passaFiltroBairro = item.usuario.bairro.toLowerCase().includes(filtroBairro.toLowerCase());
    return passaFiltroTipo && passaFiltroBairro;
  });

  async function handleResolver() {
    if (!itemParaResolver || !pin) return;
    
    setLoading(true);
    const res = await resolverItem(itemParaResolver, pin);
    setLoading(false);

    if (res.success) {
      alert("Marcado como resolvido! Muito obrigado pela ajuda.");
      setItemParaResolver(null);
      setPin("");
    } else {
      alert(res.message);
    }
  }

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col gap-4">
        <div className="flex md:items-center md:justify-center bg-gray-100 p-1 rounded-md overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setFiltroTipo("TODOS")}
            className={`px-4 py-2 rounded whitespace-nowrap transition-colors ${filtroTipo === "TODOS" ? "bg-white shadow text-blue-700 font-bold" : "text-gray-600 hover:bg-gray-200"}`}
          >
            Todos os Anúncios
          </button>
          <button
            onClick={() => setFiltroTipo("OFERTA")}
            className={`px-4 py-2 rounded whitespace-nowrap transition-colors ${filtroTipo === "OFERTA" ? "bg-green-500 shadow text-white font-bold" : "text-gray-600 hover:bg-gray-200"}`}
          >
            Doações
          </button>
          <button
            onClick={() => setFiltroTipo("PEDIDO")}
            className={`px-4 py-2 rounded whitespace-nowrap transition-colors ${filtroTipo === "PEDIDO" ? "bg-orange-500 shadow text-white font-bold" : "text-gray-600 hover:bg-gray-200"}`}
          >
            Pedidos de Ajuda
          </button>
        </div>

        <div className="">
          <CiSearch className="w-8 h-8 absolute self-center pl-2 text-gray-800" />
          <input
            type="text"
            placeholder="Filtrar por Bairro (ex: Benfica, Centro...)"
            value={filtroBairro}
            onChange={(e) => setFiltroBairro(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full pl-10"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {itensFiltrados.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">Nenhum registro encontrado com estes filtros.</p>
          </div>
        ) : (
          itensFiltrados.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <CardItem 
                item={item} 
                onResolveClick={() => setItemParaResolver(item.id)} 
              />

              {itemParaResolver === item.id && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex flex-col sm:flex-row gap-3 items-center justify-between animate-in fade-in slide-in-from-top-2">
                  <div className="text-sm text-blue-800 font-medium">
                    Digite o PIN de 4 dígitos criado no cadastro para remover este item.
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="PIN"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="p-2 w-20 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                      onClick={handleResolver}
                      disabled={loading || pin.length < 4}
                      className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900 transition-colors disabled:opacity-50 flex-1 sm:flex-none"
                    >
                      {loading ? "Aguarde..." : "Confirmar"}
                    </button>
                    <button
                      onClick={() => {
                        setItemParaResolver(null);
                        setPin("");
                      }}
                      className="text-gray-500 text-sm px-2 hover:text-gray-800"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}