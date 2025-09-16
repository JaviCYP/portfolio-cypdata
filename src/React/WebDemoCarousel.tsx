// src/components/GodotDemoCarousel.tsx
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface GodotDemo {
  title: string
  image: string
  folder: string
  description?: string
}

interface Props {
  demos: GodotDemo[]
}

export default function GodotDemoCarousel({ demos }: Props) {
  const [selected, setSelected] = useState<GodotDemo | null>(demos[0] || null)

  return (
    <div className='text-white max-w-full'>
      {/* Carrusel de previews */}
      <div className='flex flex-wrap justify-center gap-4 mb-8'>
        {demos.map((demo, idx) => (
          <div
            key={idx}
            className={`cursor-pointer transition duration-300 w-64 ${
              selected?.title === demo.title
                ? "opacity-100 border-[#A476FF] ring-2 ring-[#A476FF]"
                : "opacity-70 border-[#444]"
            } border rounded-xl overflow-hidden hover:scale-105`}
            onClick={() => setSelected(demo)}
          >
            <img
              src={demo.image}
              alt={demo.title}
              className='w-full h-32 object-cover'
            />
            <h4 className='text-center p-2 text-sm'>{demo.title}</h4>
          </div>
        ))}
      </div>

      {/* Descripción */}
      <AnimatePresence mode='wait'>
        {selected?.description && (
          <motion.div
            key={selected.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='mb-6 px-4 text-base md:text-lg text-center text-gray-200 font-medium'
          >
            {selected.description}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visualización */}
      <div className='flex items-center justify-center mb-4'>
        <div
          className='w-full max-w-[1200px] 
             h-[600px]    // 🟣 altura por defecto (mobile)
             sm:h-[700px] // 🟢 en sm (>=640px)
             md:h-[800px] // 🔵 en md (>=768px)
             lg:h-[850px] 
             xl:h-[700px] 
             mx-auto rounded-xl overflow-hidden border border-[#444] shadow-lg'
        >
          {selected ? (
            <iframe
              src={selected.folder}
              allow='fullscreen'
              className='w-full h-full'
              frameBorder='0'
            ></iframe>
          ) : (
            <div className='flex items-center justify-center w-full h-full text-gray-400'>
              Selecciona una demo
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
