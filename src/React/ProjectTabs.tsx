// src/components/ProjectTabs.tsx
import { useState } from "react"
import DemoSelector from "./BiDemoSelector"
import FlutterDemoCarousel from "./MovilDemoCarousel"
import GodotDemoCarousel from "./WebDemoCarousel"

interface Props {
  biDemos: any[]
  webDemos: any[]
  movilDemos: any[]
}

export default function ProjectTabs({ biDemos, webDemos, movilDemos }: Props) {
  const [activeTab, setActiveTab] = useState<"BI" | "Web" | "Mobile">("BI")

  return (
    <div className='text-white'>
      <div className='flex justify-center gap-4 mb-8'>
        <button
          className={`px-4 py-2 rounded transition font-medium text-sm md:text-base border border-[#444] hover:bg-[#A476FF] hover:text-black ${
            activeTab === "BI" ? "bg-[#A476FF] text-black" : "bg-[#1f1f1f]"
          }`}
          onClick={() => setActiveTab("BI")}
        >
          Power BI
        </button>
        <button
          className={`px-4 py-2 rounded transition font-medium text-sm md:text-base border border-[#444] hover:bg-[#A476FF] hover:text-black ${
            activeTab === "Web" ? "bg-[#A476FF] text-black" : "bg-[#1f1f1f]"
          }`}
          onClick={() => setActiveTab("Web")}
        >
          Web & Escritorio
        </button>
        <button
          className={`px-4 py-2 rounded transition font-medium text-sm md:text-base border border-[#444] hover:bg-[#A476FF] hover:text-black ${
            activeTab === "Mobile" ? "bg-[#A476FF] text-black" : "bg-[#1f1f1f]"
          }`}
          onClick={() => setActiveTab("Mobile")}
        >
          Móvil
        </button>
      </div>

      {activeTab === "BI" && <DemoSelector demos={biDemos} />}
      {activeTab === "Web" && <GodotDemoCarousel demos={webDemos} />}
      {activeTab === "Mobile" && <FlutterDemoCarousel demos={movilDemos} />}
    </div>
  )
}
