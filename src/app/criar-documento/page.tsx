'use client'

import { useState } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'

export default function CriarDocumento() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', fileName)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('Documento criado com sucesso!')
        setFile(null)
        setFileName('')
      } else {
        alert('Erro ao criar documento')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao criar documento')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Criar Documento</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              Selecione um arquivo (PDF, Word ou Imagem)
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOCX, JPG, PNG (MAX. 10MB)</p>
                </div>
                <input id="file" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx,.jpg,.jpeg,.png" />
              </label>
            </div>
            {file && <p className="mt-2 text-sm text-gray-500">Arquivo selecionado: {file.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-2">
              Nome do arquivo
            </label>
            <input
              type="text"
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Criar documento
          </button>
        </form>
      </div>
    </div>
  )
}