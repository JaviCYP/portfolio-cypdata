import { useState, useRef, useEffect } from "react"

interface Props {
  title: string
  id: string
  icon: string
  children: React.ReactNode
  defaultOpen?: boolean // Add defaultOpen as an optional property
}

export default function CollapsibleSection({ title, children }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState("0px")

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`)
    } else {
      setHeight("0px")
    }
  }, [isOpen])

  return (
    <section className='py-6 border-t border-[#ffffff10] text-[var(--white)]'>
      <div className='max-w-5xl mx-auto'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='w-full text-left text-2xl md:text-4xl font-medium mb-4 flex items-center justify-between'
        >
          {title}
          <span className='text-xl'>{isOpen ? "−" : "+"}</span>
        </button>

        <div
          ref={contentRef}
          style={{
            maxHeight: height,
            overflow: "hidden",
            transition: "max-height 0.5s ease, opacity 0.5s ease",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className='pt-4'>{children}</div>
        </div>
      </div>
    </section>
  )
}
