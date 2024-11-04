'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon, FileText, PenTool, Search, Home } from 'lucide-react'

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/criar-documento', label: 'Criar Documento', icon: FileText },
    { href: '/assinar-documento', label: 'Assinar Documento', icon: PenTool },
    { href: '/consultar-documentos', label: 'Consultar Documentos', icon: Search },
  ]

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">SDD</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="ml-4 md:hidden">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu lateral para dispositivos móveis */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-40 bg-black bg-opacity-25" onClick={toggleMenu}></div>
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <span className="text-xl font-semibold text-gray-800 dark:text-white">Menu</span>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="mt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={toggleMenu}
                >
                  <item.icon className="mr-3" size={20} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar