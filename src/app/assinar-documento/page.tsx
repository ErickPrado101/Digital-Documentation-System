'use client'

import { useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

export default function AssinarDocumento() {
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [cpf, setCpf] = useState('')
  const [documento, setDocumento] = useState<File | null>(null)

  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumento(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!documento) return

    const formData = new FormData()
    formData.append('documento', documento)
    formData.append('nomeCompleto', nomeCompleto)
    formData.append('cpf', cpf)

    try {
      const response = await fetch('/api/assinar', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('Documento assinado com sucesso!')
        setNomeCompleto('')
        setCpf('')
        setDocumento(null)
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
          <div className="mb-4">
            <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-2">
              Selecione o documento para assinar (PDF)
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="documento"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <PencilSquareIcon className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Clique para selecionar o documento</span>
                  </p>
                  <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
                </div>
                <input id="documento" type="file" className="hidden" onChange={handleDocumentoChange} accept=".pdf" />
              </label>
            </div>
            {documento && <p className="mt-2 text-sm text-gray-500">Documento selecionado: {documento.name}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Assinar Documento
          </button>
        </form>
      </div>
    </div>
  )
}