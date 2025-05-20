"use client"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FiX, FiCheck, FiAlertCircle, FiInfo } from "react-icons/fi"

// Toast context
import { createContext, useContext } from "react"

const ToastContext = createContext(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, ...toast }])

    if (toast.duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 5000)
    }

    return id
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const value = {
    toast: (props) => addToast({ ...props, type: "default" }),
    success: (props) => addToast({ ...props, type: "success" }),
    error: (props) => addToast({ ...props, type: "error" }),
    warning: (props) => addToast({ ...props, type: "warning" }),
    info: (props) => addToast({ ...props, type: "info" }),
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

// Toast component
export function Toaster({ toasts = [], removeToast }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) return null

  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  )
}

function Toast({ toast, onClose }) {
  const { title, description, type } = toast

  const variants = {
    initial: { opacity: 0, y: -20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FiCheck className="text-white" />
      case "error":
        return <FiX className="text-white" />
      case "warning":
        return <FiAlertCircle className="text-white" />
      case "info":
        return <FiInfo className="text-white" />
      default:
        return <FiInfo className="text-white" />
    }
  }

  const getColors = () => {
    switch (type) {
      case "success":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      case "warning":
        return "bg-amber-500"
      case "info":
        return "bg-blue-500"
      default:
        return "bg-gray-800"
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="flex items-start p-4">
        <div className={`flex-shrink-0 p-2 rounded-full ${getColors()}`}>{getIcon()}</div>
        <div className="ml-3 w-0 flex-1">
          {title && <h3 className="text-sm font-medium text-gray-900">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
        <button
          onClick={onClose}
          className="ml-4 flex-shrink-0 flex text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <FiX className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </motion.div>
  )
}
