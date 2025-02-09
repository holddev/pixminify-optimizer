import { useRef, useState } from "react"
import { Arrow } from "./Icons"
import { PreviewImagesList } from "./PreviewImages"
import { Image, ImageID } from "../types/types"

export const UploadImage = () => {

  const [isDrag, setIsDrag] = useState<boolean>(false)
  const [images, setImages] = useState<Image[]>([])
  const [showImage, setShowImage] = useState<boolean>(false)
  const dragCounter = useRef(0);

  console.log(images)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.nativeEvent.dataTransfer!.files);

    const validFiles = files
      .filter(file => file.type.startsWith('image/'))
      .map((file) => {
        return {
          id: crypto.randomUUID(),
          image: file
        }
      })

    if (validFiles.length === 0) {
      alert('ingrese solo imagenes')
    }

    setImages(() => {
      return [...validFiles]
    })
    setShowImage(true)
    setIsDrag(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []

    const validFiles = files
      .filter(file => file.type.startsWith('image/'))
      .map((file) => { return { id: crypto.randomUUID(), image: file } })

    if (validFiles.length === 0) {
      alert('ingrese solo imagenes')
    }

    setImages(() => {
      return [...validFiles]
    })
    setShowImage(true)
  }

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleOnDragLeave = () => {
    dragCounter.current -= 1
    if (dragCounter.current === 0) setIsDrag(false)
  }

  const handleOnDragEnter = () => {
    dragCounter.current += 1
    setIsDrag(true)
  }

  const handleOnDelete = ({ id }: ImageID) => {
    const filteredImages = images.filter(image => image.id !== id)

    if (filteredImages.length === 0) setShowImage(false)
    setImages(filteredImages)
  }


  return (
    <main className="mb-12">
      <form className="text-light-text_primary dark:text-dark-text_primary pt-20" >
        <div
          className={`relative w-full h-[40vh] p-8 border-dashed border-[3px] rounded-full 
        text-center cursor-pointer flex items-center justify-center transition-colors duration-500
        ${isDrag ? 'bg-[#b5ff9031] border-white' : 'bg-gradient-to-b from-[#0000] to-[#b5ff901e] border-primary'}`}
          onClick={() => { }}
          onDrop={handleDrop}
          onDragEnter={handleOnDragEnter}
          onDragOver={handleOnDragOver}
          onDragLeave={handleOnDragLeave}
        >
          <pixel-canvas
            class="absolute top-0 left-0 rounded-full -z-10"
            data-gap="13"
            data-speed="40"
            data-colors="#4bff0a, #333333, #fef08a"
          />

          <label htmlFor="fileInput" className={`${isDrag && 'text-primary'}
        text-xl flex flex-col items-center justify-center cursor-pointer`}>
            {isDrag ?
              "Suelta aqui la imagen"
              : "Arrastra y suelta una imagen o haz clic para seleccionar"
            }
            <span className="pt-4 flex items-center justify-center gap-16">
              <Arrow class={`${isDrag ? 'text-white opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} rotate-180 transition-all duration-500`} />
              <svg viewBox="0 0 24 24" className={`size-24 transition-opacity duration-500 ${isDrag ? 'opacity-0' : 'opacity-100 '}`} fill="none">
                <path className="text-primary" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16c1.403-.234 3.637-.293 5.945.243M16 21c-1.704-2.768-4.427-4.148-7.055-4.757m0 0C10.895 13.985 14.558 12 21 12h1M8.5 7C8 7 7 7.3 7 8.5S8 10 8.5 10 10 9.7 10 8.5 9 7 8.5 7z" />
                <path className="text-primary" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m7 0v3m0 3V5m0 0h3m-3 0h-3" />
              </svg>
              <Arrow class={`${isDrag ? 'text-white opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}  transition-all duration-500`} />
            </span>
          </label>

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleChange}
          />
        </div>
      </form>
      {
        showImage && <PreviewImagesList images={images} handleOnDelete={handleOnDelete} />
      }
    </main>
  )
}
