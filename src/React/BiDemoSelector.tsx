import { useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import SwiperCore from "swiper"
import "swiper/css"
import "swiper/css/autoplay"

interface Demo {
  title: string
  image: string
  embedUrl: string
}

interface Props {
  demos: Demo[]
}

export default function DemoSelector({ demos }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [embedIndex, setEmbedIndex] = useState<number>(0)
  const swiperRef = useRef<SwiperCore | null>(null)

  const handleImageClick = (idx: number) => {
    setEmbedIndex(idx)
    setSelectedIndex(idx)
    swiperRef.current?.slideToLoop(idx)
  }

  const goPrev = () => {
    swiperRef.current?.slidePrev()
  }

  const goNext = () => {
    swiperRef.current?.slideNext()
  }

  return (
    <div className='text-white'>
      <div className='relative'>
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay]}
          // onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className='mb-8'
        >
          {demos.map((demo, idx) => (
            <SwiperSlide key={idx}>
              <div
                onClick={() => handleImageClick(idx)}
                className={`cursor-pointer transition duration-300 ${
                  idx === embedIndex ? "opacity-100" : "opacity-50"
                }`}
              >
                <img
                  src={demo.image}
                  alt={demo.title}
                  className={`w-full aspect-video object-cover rounded-xl border ${
                    idx === embedIndex
                      ? "border-[#A476FF] ring-2 ring-[#A476FF]"
                      : "border-[#444]"
                  }`}
                />
                <h4 className='text-center mt-2 text-sm'>{demo.title}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botones de navegación */}
        <button
          onClick={goPrev}
          className='absolute left-2 top-1/2 -translate-y-1/2 bg-[#222] bg-opacity-70 text-white p-2 rounded-full z-10 hover:bg-opacity-90 transition'
        >
          ←
        </button>
        <button
          onClick={goNext}
          className='absolute right-2 top-1/2 -translate-y-1/2 bg-[#222] bg-opacity-70 text-white p-2 rounded-full z-10 hover:bg-opacity-90 transition'
        >
          →
        </button>
      </div>

      {/* Indicadores / Bolitas */}
      <div className='flex justify-center gap-2 mb-6'>
        {demos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              swiperRef.current?.slideToLoop(idx)
              setSelectedIndex(idx) // solo movemos el slide, no el embed
            }}
            className={`w-3 h-3 rounded-full ${
              idx === selectedIndex ? "bg-[#A476FF]" : "bg-[#555]"
            } transition duration-300`}
          />
        ))}
      </div>

      {/* Iframe con demo */}
      {embedIndex !== null && (
        <div
          className='w-full max-w-[1000px] mx-auto rounded-xl overflow-hidden border border-[#444] shadow-lg'
          style={{ aspectRatio: "3.7 / 2.3" }}
        >
          <iframe
            title={demos[embedIndex].title}
            src={demos[embedIndex].embedUrl}
            width='100%'
            height='100%'
            allowFullScreen
            frameBorder='0'
          ></iframe>
        </div>
      )}
    </div>
  )
}
