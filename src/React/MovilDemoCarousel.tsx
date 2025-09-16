// src/components/FlutterDemoCarousel.tsx
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FlutterDemo {
  title: string
  folder: string
  description: string
}

interface Props {
  demos: FlutterDemo[]
}

export default function FlutterDemoCarousel({ demos }: Props) {
  const [selected, setSelected] = useState<FlutterDemo | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [pdfBase64, setPdfBase64] = useState<string | null>(null)

  // Seleccionar automáticamente la primera demo cuando se carga el componente
  useEffect(() => {
    if (demos.length > 0 && !selected) {
      setSelected(demos[0])
    }
  }, [demos, selected])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "pdf") {
        setPdfBase64(event.data.data)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  // Evitar que el scroll se propague al documento principal
  useEffect(() => {
    const handleIframeLoad = () => {
      if (iframeRef.current) {
        try {
          const iframeContent = iframeRef.current.contentWindow
          if (iframeContent) {
            // Manejar el evento wheel (para scroll con rueda del ratón)
            iframeContent.addEventListener(
              "wheel",
              (e: WheelEvent) => {
                const { scrollTop, scrollHeight, clientHeight } =
                  iframeContent.document.documentElement

                const isTop = scrollTop === 0
                const isBottom =
                  Math.abs(scrollHeight - clientHeight - scrollTop) < 1

                if ((e.deltaY < 0 && isTop) || (e.deltaY > 0 && isBottom)) {
                  e.preventDefault()
                }
              },
              { passive: false }
            )

            // Manejar el evento touchmove (para dispositivos táctiles)
            iframeContent.addEventListener(
              "touchmove",
              (e: TouchEvent) => {
                const { scrollTop, scrollHeight, clientHeight } =
                  iframeContent.document.documentElement

                const isTop = scrollTop === 0
                const isBottom =
                  Math.abs(scrollHeight - clientHeight - scrollTop) < 1

                if (isTop || isBottom) {
                  e.preventDefault()
                }
              },
              { passive: false }
            )
          }
        } catch (e) {
          console.log("No se puede acceder al contenido del iframe")
        }
      }
    }

    const iframe = iframeRef.current
    if (iframe) {
      iframe.addEventListener("load", handleIframeLoad)

      // Si el iframe ya está cargado (caché)
      if (
        iframe.contentDocument &&
        iframe.contentDocument.readyState === "complete"
      ) {
        handleIframeLoad()
      }
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleIframeLoad)
      }
    }
  }, [selected])

  return (
    <div className='flex flex-col md:flex-row gap-4 w-full text-white'>
      {/* Carrusel de demos */}
      <div className='flex md:flex-col gap-4 md:w-1/4 overflow-auto'>
        {demos.map((demo, idx) => (
          <div
            key={idx}
            className={`cursor-pointer border rounded-xl p-1 transition hover:scale-105 ${
              selected?.title === demo.title
                ? "border-[#A476FF]"
                : "border-[#444]"
            }`}
            onClick={() => setSelected(demo)}
          >
            <p className='text-center text-sm mt-2 mb-2'>{demo.title}</p>
          </div>
        ))}
      </div>
      {/* Visualización */}
      <div className='flex flex-col items-center justify-center w-full md:w-3/4'>
        {/* Descripción con animación, fuera del iframe */}
        <AnimatePresence mode='wait'>
          {selected && selected.description && (
            <motion.div
              key={selected.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className='mb-4 px-4 text-base md:text-lg text-center text-gray-200 font-medium'
            >
              {selected.description}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Iframe o mensaje de selección */}
        {selected ? (
          <div className='phone-frame'>
            <iframe
              ref={iframeRef}
              src={selected.folder}
              title={selected.title}
              allow='fullscreen; popups'
              frameBorder='0'
              sandbox='allow-scripts allow-same-origin allow-popups'
            ></iframe>
          </div>
        ) : (
          <div className='flex items-center justify-center w-full h-full text-gray-400'>
            Selecciona una demo
          </div>
        )}
      </div>

      {/* Visor del PDF */}
      {pdfBase64 && (
        <div
          className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
          onClick={() => setPdfBase64(null)} // clic en el fondo lo cierra
        >
          <div
            className='bg-white rounded-xl p-4 max-w-3xl w-full relative'
            onClick={(e) => e.stopPropagation()} // evita que el click se propague desde dentro
          >
            <button
              onClick={() => setPdfBase64(null)}
              className='absolute top-2 right-4 text-red-600 text-5xl'
            >
              &times;
            </button>
            <iframe
              src={`data:application/pdf;base64,${pdfBase64}`}
              className='w-full h-[80vh] rounded'
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}
