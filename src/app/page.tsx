import FeedInterativo from "@/components/FeedInterativo"
import FormularioCadastro from "@/components/FormularioCadastro"
import { prisma } from "@/lib/prisma"


async function getItens() {
  return await prisma.item.findMany({
    where: {
      status: 'ABERTO',
    },
    include: {
      usuario: true
    },
    orderBy: {
      criado_em: 'desc'
    }
  })
}

export default async function Home() {
  const itens = await getItens()

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="text-center mb-8 bg-blue-900 text-white py-8 rounded-lg shadow-md">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
            Ajuda Imediata Juiz de Fora
          </h1>
          <p className="text-blue-100 px-4">
            Uma iniciativa para auxiliar aqueles afetados pelas fortes chuvas de Fevereiro.
          </p>
          <p className="text-blue-100 px-4">
            Conectando quem quer ajudar com quem mais precisa na nossa cidade.
          </p>
        </header>

        <p className="my-8 text-center">Conheça os pontos de coleta de doações de Juiz de Fora em: <a target="_blank" className="text-blue-600 hover:underline" href="https://www.sos-jf.online/">https://www.sos-jf.online/</a></p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Formulário */}
          <div className="lg:col-span-5">
            <div className="sticky top-4">
              <FormularioCadastro />
            </div>
          </div>

          {/* Feed */}
          <div className="lg:col-span-7">
            <FeedInterativo itensIniciais={itens} />
          </div>

        </div>
      </div>
    </main>
  )
}