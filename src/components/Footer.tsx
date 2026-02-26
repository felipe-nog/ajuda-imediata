import Link from 'next/link'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="text-neutral-900 border-t border-gray-300 pt-12 pb-6 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div>
          <h3 className="text-blue-600 font-bold mb-4 uppercase">
            Como participar?
          </h3>
          <p className="leading-relaxed mb-4 text-neutral-700">
            Preencha o formulário indicando se é um doador ou seu precisa de ajuda, em seguida, indique seu número de celular, seu bairro onde reside e por último, o tipo de suprimentos que está anunciando. Descrever os itens também é uma forma de facilitar o contato entre doador e necessitado.
            O PIN de segurança é uma forma de somente você ser capaz de fazer alterações no anúncio que criou.
          </p>
        </div>
        
        <div>
          <h3 className="text-blue-600 font-bold mb-4 uppercase">
            Ligue em Casos de Emergência
          </h3>
          <ul className="space-y-3 font-medium">
            <li className="flex justify-between border-b border-slate-400 pb-2">
              <span>Corpo de Bombeiros</span>
              <span className="font-bold text-blue-800">193</span>
            </li>
            <li className="flex justify-between border-b border-slate-400 pb-2">
              <span>SAMU</span>
              <span className="font-bold text-blue-800">192</span>
            </li>
            <li className="flex justify-between border-b border-slate-400 pb-2">
              <span>Polícia Militar</span>
              <span className="font-bold text-blue-800">190</span>
            </li>
            <li className="flex justify-between border-b border-slate-400 pb-2">
              <span>Defesa Civil</span>
              <span className="font-bold text-blue-800">199</span>
            </li>
            <li className="flex justify-between border-b border-slate-400 pb-2">
              <span>Prefeitura de JF</span>
              <span className="font-bold text-blue-800">156</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-blue-600 font-bold mb-4 uppercase">
            Quero fazer uma doação geral
          </h3>
          <p>
            Compareça a um dos pontos de coleta distribuídos pela cidade para deixar sua doação em boas mãos! <br /> <br />
            Confira os pontos de coleta de doações de Juiz de Fora em: <a target="_blank" className="text-blue-600 hover:underline" href="https://www.sos-jf.online/">https://www.sos-jf.online/</a>
          </p>
        </div>

        <div>
          <h3 className="text-blue-600 font-bold mb-4 uppercase">
            Desenvolvedor
          </h3>
          
          <div className="flex flex-col gap-3">
            <Link href="https://github.com/felipe-nog" className="flex items-center gap-2 hover:text-neutral-500 transition-colors">
              <FaGithub className="text-xl text-neutral-900" />
              <span>felipe-nog</span>
            </Link>
            <Link href="https://www.linkedin.com/in/felipe-lima-nogueira-27b544271/" className="flex items-center gap-2 hover:text-neutral-500 transition-colors">
              <FaLinkedin className="text-xl text-blue-500" />
              <span>LinkedIn</span>
            </Link>
            <Link href="mailto:felipenogueira.tec@gmail.com" className="flex items-center gap-2 hover:text-neutral-500 transition-colors">
              <FaEnvelope className="text-xl text-red-500" />
              <span>felipenogueira.tec@gmail.com</span>
            </Link>
          </div>
        </div>

      </div>

      {/* RODAPÉ INFERIOR */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-neutral-300 text-center text-xs text-neutral-600">
        <p>Juiz de Fora, Minas Gerais</p>
        <p className="mt-1">{new Date().getFullYear()} | Desenvolvido por Felipe Lima Nogueira — Site voluntário e informativo.</p>
      </div>
    </footer>
  )
}