"use client";

import { useRef, useState } from "react";
import { registrarItem } from "../actions/doacao";

export default function FormularioCadastro() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const [telefone, setTelefone] = useState("");
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value;
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
    setTelefone(valor);
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await registrarItem(formData);

    if (result.success) {
      setMensagem(result.message);
      formRef.current?.reset();
    } else {
      setMensagem("Erro ao registrar. Tente novamente.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
      <h2 className="text-2xl font-bold mb-6 text-neutral-900">
        Iniciativa de Doações
      </h2>

      {mensagem && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md font-medium">
          {mensagem}
        </div>
      )}

      <form ref={formRef} action={handleSubmit} className="space-y-4">
        {/* Tipo de usuário */}
        <div className="flex space-x-4 mb-4 bg-gray-50 p-3 rounded-md">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tipo_publicacao"
              value="OFERTA"
              required
              className="text-blue-600 w-5 h-5"
            />
            <span className="font-medium text-gray-700">Quero Doar</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="tipo_publicacao"
              value="PEDIDO"
              required
              className="text-orange-500 w-5 h-5"
            />
            <span className="font-medium text-gray-700">Preciso de Ajuda</span>
          </label>
        </div>

        {/* Dados Pessoais */}
        <input
          type="text"
          name="nome"
          placeholder="Seu Nome *"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="tel"
          name="telefone"
          placeholder="WhatsApp *"
          required
          value={telefone}
          onChange={handleTelefoneChange}
          maxLength={15}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="text"
          name="bairro"
          placeholder="Seu Bairro (ex: Benfica, Cascatinha) *"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Dados do Item */}
        <label>Selecione o que precisa ou o que pretende doar:</label>
        <select
          name="categoria"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="Agua">Água Potável</option>
          <option value="Alimentos">Alimentos Não Perecíveis</option>
          <option value="Roupas">Roupas e Agasalhos</option>
          <option value="Limpeza">Material de Limpeza / Higiene</option>
          <option value="Moveis">Móveis / Colchões</option>
          <option value="Outros">Outros</option>
        </select>

        <textarea
          name="descricao"
          rows={3}
          placeholder="Descreva os itens (ex: 2 fardos de água, preciso de um colchão de solteiro, etc.)"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        ></textarea>

        {/* Campo de PIN */}
        <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
          <label className="block text-sm text-blue-800 font-medium mb-1">
            Crie um PIN de segurança (4 números)
          </label>
          <p className="text-xs text-blue-600 mb-2">
            Você usará este código para remover o anúncio quando for resolvido.
          </p>
          <input
            type="password"
            name="pin_seguranca"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            placeholder="Ex: 1234"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-center tracking-[0.5em] text-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 text-lg shadow-md"
        >
          {loading ? "Enviando..." : "Publicar seu Anúncio"}
        </button>
      </form>
    </div>
  );
}
