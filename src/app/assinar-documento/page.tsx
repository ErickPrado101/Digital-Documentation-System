'use client'

import { useState, useEffect } from 'react'
import { PencilSquareIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'

interface Documento {
  id: string
  nome: string
  status: string
}

export default function AssinarDocumento() {
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [selectedDocumento, setSelectedDocumento] = useState<string>('')
  const [assinatura, setAssinatura] = useState<File | null>(null)
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [cpf, setCpf] = useState('')

  useEffect(() => {
    fetchDocumentos()
  }, [])

  const fetchDocumentos = async () => {
    try {
      const response = await fetch('/api/documentos?format=pdf')
      if (response.ok) {
        const data = await response.json()
        setDocumentos(data.documentos)
      } else {
        console.error('Erro ao buscar documentos')
      }
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  const handleAssinaturaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAssinatura(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDocumento || !assinatura || !nomeCompleto || !cpf) {
      alert('Por favor, preencha todos os campos e selecione um documento.')
      return
    }

    const formData = new FormData()
    formData.append('documento', selectedDocumento)
    formData.append('assinatura', assinatura)
    formData.append('nomeCompleto', nomeCompleto)
    formData.append('cpf', cpf)

    try {
      const response = await fetch('/api/assinar', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('Documento assinado com sucesso!')
        setSelectedDocumento('')
        setAssinatura(null)
        setNomeCompleto('')
        setCpf('')
        fetchDocumentos()
      } else {
        alert('Erro ao assinar documento')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao assinar documento')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Assinar Documento</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-2">
              Selecione o documento para assinar
            </label>
            <select
              id="documento"
              value={selectedDocumento}
              onChange={(e) => setSelectedDocumento(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione um documento</option>
              {documentos.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.nome} - {doc.status}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="assinatura" className="block text-sm font-medium text-gray-700 mb-2">
              Upload da imagem de assinatura
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="assinatura"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (MAX. 2MB)</p>
                </div>
                <input id="assinatura" type="file" className="hidden" onChange={handleAssinaturaChange} accept=".png,.jpg,.jpeg" required />
              </label>
            </div>
            {assinatura && <p className="mt-2 text-sm text-gray-500">Arquivo selecionado: {assinatura.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              id="nomeCompleto"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <PencilSquareIcon className="w-5 h-5 inline-block mr-2" />
            Assinar documento
          </button>
        </form>
      </div>
    </div>
  )
}