'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Documento {
  id: string
  nome: string
  status: string
  dataCriacao: string
}

interface DocumentosResponse {
  documentos: Documento[]
  currentPage: number
  totalPages: number
  totalDocuments: number
}

export default function ConsultarDocumentos() {
  const [documentosData, setDocumentosData] = useState<DocumentosResponse | null>(null)
  const [filtroStatus, setFiltroStatus] = useState('')
  const [filtroDataInicio, setFiltroDataInicio] = useState('')
  const [filtroDataFim, setFiltroDataFim] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchDocumentos()
  }, [currentPage])

  const fetchDocumentos = async () => {
    try {
      const response = await fetch(`/api/documentos?page=${currentPage}&limit=10`)
      if (response.ok) {
        const data: DocumentosResponse = await response.json()
        setDocumentosData(data)
      } else {
        console.error('Erro ao buscar documentos')
      }
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  const filtrarDocumentos = () => {
    if (!documentosData) return []
    return documentosData.documentos.filter((doc) => {
      const statusMatch = filtroStatus === '' || doc.status === filtroStatus
      const dataMatch =
        (!filtroDataInicio || new Date(doc.dataCriacao) >= new Date(filtroDataInicio)) &&
        (!filtroDataFim || new Date(doc.dataCriacao) <= new Date(filtroDataFim))
      return statusMatch && dataMatch
    })
  }

  const alterarStatus = async (id: string, novoStatus: string) => {
    try {
      const response = await fetch(`/api/documentos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: novoStatus }),
      })

      if (response.ok) {
        fetchDocumentos()
      } else {
        console.error('Erro ao alterar status do documento')
      }
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Consultar Documentos</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="filtroStatus" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="filtroStatus"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="andamento">Em andamento</option>
                <option value="arquivado">Arquivado</option>
              </select>
            </div>
            <div>
              <label htmlFor="filtroDataInicio" className="block text-sm font-medium text-gray-700 mb-2">
                Data Início
              </label>
              <input
                type="date"
                id="filtroDataInicio"
                value={filtroDataInicio}
                onChange={(e) => setFiltroDataInicio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="filtroDataFim" className="block text-sm font-medium text-gray-700 mb-2">
                Data Fim
              </label>
              <input
                type="date"
                id="filtroDataFim"
                value={filtroDataFim}
                onChange={(e) => setFiltroDataFim(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={fetchDocumentos}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <MagnifyingGlassIcon className="w-5 h-5 inline-block mr-2" />
            Buscar
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Criação</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtrarDocumentos().map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{doc.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doc.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(doc.dataCriacao).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={doc.status}
                      onChange={(e) => alterarStatus(doc.id, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="andamento">Em andamento</option>
                      <option value="arquivado">Arquivado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {documentosData && (
          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando {(currentPage - 1) * 10 + 1} a {Math.min(currentPage * 10, documentosData.totalDocuments)} de{' '}
                {documentosData.totalDocuments} documentos
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, documentosData.totalPages))}
                disabled={currentPage === documentosData.totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}