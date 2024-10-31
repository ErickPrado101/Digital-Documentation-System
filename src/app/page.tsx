import Link from 'next/link'
import { DocumentIcon, MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Gerenciamento de Documentos Digitais</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/criar-documento" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <DocumentIcon className="h-12 w-12 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Criar Documento</h2>
            <p className="text-gray-600">Crie e salve documentos em PDF e Word, ou converta imagens em documentos.</p>
          </Link>
          <Link href="/assinar-documento" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <PencilSquareIcon className="h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Assinar Documento</h2>
            <p className="text-gray-600">Assine digitalmente documentos com seu nome completo e CPF.</p>
          </Link>
          <Link href="/consultar-documentos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <MagnifyingGlassIcon className="h-12 w-12 text-purple-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Consultar Documentos</h2>
            <p className="text-gray-600">Busque e filtre documentos por status e datas.</p>
          </Link>
        </div>
      </main>
    </div>
  )
}