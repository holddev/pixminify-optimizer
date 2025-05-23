import { useCallback, useEffect, useRef, useState } from "react"
import { Image } from "../types/types"
import { ArrowLeftRight } from "./Icons"

interface Props {
  item: Image
}
export const BeforeAfterImage = ({ item }: Props) => {
  const afterSrc = URL.createObjectURL(item.compressedImage || item.image)
  const beforeSrc = URL.createObjectURL(item.image)

  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    const x = clientX - left
    const newPos = Math.max(0, Math.min(100, (x / width) * 100))
    setSliderPos(newPos)
  }, [])

  // Eventos globales
  const handleMouseMoveGlobal = useCallback((e: MouseEvent) => {
    updateSliderPosition(e.clientX)
  }, [updateSliderPosition])

  const handleMouseUpGlobal = useCallback(() => {
    setIsDragging(false)
  }, [])


  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMoveGlobal)
      window.addEventListener("mouseup", handleMouseUpGlobal)
      document.body.style.userSelect = "none"
      document.body.style.cursor = "ew-resize"
    } else {
      window.removeEventListener("mousemove", handleMouseMoveGlobal)
      window.removeEventListener("mouseup", handleMouseUpGlobal)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveGlobal)
      window.removeEventListener("mouseup", handleMouseUpGlobal)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }
  }, [isDragging, handleMouseMoveGlobal, handleMouseUpGlobal])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
    >

      {/* Imagen del "después" (estática) */}
      <img
        src={afterSrc}
        alt={item.image.name}
        className="w-full h-full object-cover block select-none"
        draggable={false}
      />

      {/* Imagen del "antes" (superpuesta y recortada) */}
      <img
        src={beforeSrc}
        alt={item.image.name}
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none select-none"
        draggable={false}
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      />

      {/* Barra deslizadora */}
      <div
        className="absolute top-0 h-full w-1 bg-primary cursor-ew-resize"
        style={{
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
        }}
        onMouseDown={() => setIsDragging(true)}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          px-2 py-1 rounded-full bg-black/90
          border-2 border-white flex items-center gap-1 text-white text-xs font-medium"
        >
          <span>{sliderPos > 50 && 'Antes'}</span>
          <span><ArrowLeftRight class="size-4" /></span>
          <span>{sliderPos < 50 && 'Después'}</span>
        </div>
      </div>
    </div>
  )
}