import { Link, useLocation } from "react-router-dom";
import { Image } from "../types/types";
import { Exit, Triangle } from "../components/Icons";
import { useRef, useState } from "react";
import { MainGallery } from "../components/MainGallery";
import { TumbnailCarrousel } from "../components/TumbnailCarousel";

export const Optimize = () => {
  const location = useLocation();
  const images: Image[] = location.state || [];
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const galeryDialog = useRef<HTMLDialogElement>(null)


  const handleChangeImage = (direction: 'prev' | 'next') => {
    setCurrentIndex(prev => {
      if (direction === 'prev' && currentIndex > 0) return prev - 1
      if (direction === 'next' && currentIndex < images.length - 1) return prev + 1
      return prev
    })
  }

  const handleGoToImage = (index: number) => {
    setCurrentIndex(index)
  }


  return (
    <div className="w-full h-[100vh] overflow-hidden relative">
      <Link to={'/'} className="absolute z-10 top-4 left-4">
        <Exit class="size-8 hover:rotate-90 hover:scale-105 opacity-60 hover:opacity-100 transition-all duration-500" />
      </Link>

      <button
        onClick={() => handleChangeImage("prev")}
        className={`active:scale-110 absolute bg-primary p-2 rounded-full top-2/4 left-4 z-10 -translate-y-1/2 transition-transform duration-300
          ${currentIndex === 0 && 'opacity-50 cursor-not-allowed'}
        `}
        disabled={currentIndex === 0}
      >
        <Triangle class="size-12 -rotate-90" />
      </button>

      <button
        onClick={() => handleChangeImage("next")}
        className={`active:scale-110 absolute bg-primary p-2 rounded-full top-2/4 right-4 z-10 -translate-y-1/2 transition-transform duration-300
          ${currentIndex === images.length - 1 && 'opacity-50 cursor-not-allowed'}  
        `}
        disabled={currentIndex === images.length - 1}
      >
        <Triangle class="size-12 rotate-90" />
      </button>

      <button
        className="
          absolute top-4 right-4 z-10 py-2 px-4
          bg-black text-white font-semibold rounded-lg shadow-lg 
          hover:text-primary hover:shadow-xl active:scale-95 
          transition-all duration-300
        "
        onClick={() => { galeryDialog.current?.showModal() }}
      >
        Ver Imágenes
      </button>

      <dialog
        className="
    bg-white rounded-lg shadow-lg w-[90%] max-w-4xl 
    p-6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4
  "
        ref={galeryDialog}
      >
        <section>
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Galería de Imágenes</h2>
            <button
              className="text-red-500 hover:text-red-700 transition-colors"
              onClick={() => galeryDialog.current?.close()}
            >
              <Exit class="size-8 hover:rotate-90 hover:scale-105 opacity-60 hover:opacity-100 transition-all duration-500" />
            </button>
          </header>
          <ul className="grid grid-cols-8 gap-4" style={{ gridAutoFlow: 'dense' }}>
            {images.map((image, index) => {

              const gridStyles = {
                gridColumn: `span ${index % 2 === 0 ? 2 : 1}`,
                gridRow: `span ${index % 2 !== 0 ? 1 : 2}`,
              };

              return (
                <li
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-md"
                  style={gridStyles}
                >
                  <img
                    src={URL.createObjectURL(image.image)}
                    alt={image.image.name}
                    className="object-contain w-full h-full transition-transform duration-300"
                  />
                  <button
                    className="
                      absolute inset-0 bg-black/50 opacity-0 
                      flex items-center justify-center
                      hover:opacity-100 text-white font-bold rounded-lg
                      transition-opacity duration-300"
                    onClick={() => {
                      handleGoToImage(index)
                      galeryDialog.current?.close()
                    }}
                  >
                    Ver
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </dialog>


      <MainGallery
        images={images}
        currentIndex={currentIndex}
      />

      <TumbnailCarrousel
        images={images}
        currentIndex={currentIndex}
        onTumbnailClick={handleGoToImage}
      />

    </div >

  );
};
