import { Link, useLocation } from "react-router-dom";
import { CompressionSettings, Image } from "../types/types";
import { Download, Exit, ImageIcon, Triangle } from "../components/Icons";
import { useRef, useState } from "react";
import { MainGallery } from "../components/MainGallery";
import { TumbnailCarrousel } from "../components/TumbnailCarousel";
import { EditControls } from "../components/EditControls";
import { compressImage } from "../lib/ImageCompression";
import { OptimizationStats } from "../components/OptimizationStats";
import JSZip from "jszip";


export const Optimize = () => {
  const location = useLocation();
  const [images, setImages] = useState<Image[]>(location.state || [])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const galeryDialog = useRef<HTMLDialogElement>(null)
  const currentItem = images[currentIndex]


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

  const handleEditImage = async ({ format, saveMetadata }: CompressionSettings) => {
    const imageCompressed = await compressImage(
      {
        imageFile: currentItem.image,
        settings: {
          format,
          saveMetadata
        }
      }
    );
    const currentImage = {
      id: currentItem.id,
      image: currentItem.image,
      compressedImage: imageCompressed
    }
    const compressed = currentImage.compressedImage
    if (!compressed) return

    setImages(prevImages => {
      const updatedImages = [...prevImages];
      const updatedImage = { ...updatedImages[currentIndex] };

      updatedImage.settings = {
        ...updatedImage.settings,
        format,
        saveMetadata,
      };


      const newExtension = compressed.type.split('/')[1]
      const lastDotIndex = compressed.name.lastIndexOf(".");
      const baseName = lastDotIndex !== -1 ? compressed.name.substring(0, lastDotIndex) : compressed.name;

      const renamedFileImage = new File(
        [compressed],
        `${baseName}.${newExtension}`,
        { type: compressed.type }
      );

      updatedImage.compressedImage = renamedFileImage;

      updatedImages[currentIndex] = updatedImage;

      return updatedImages;
    });

  }

  const handleDownloadAllImages = async () => {
    const zip = new JSZip()
    images.forEach((image) => {
      if (!image.compressedImage) return
      zip.file(image.compressedImage?.name, image.compressedImage);
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });

    const zipUrl = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = zipUrl;
    a.download = "images-pixminify.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(zipUrl);
  }

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <Link to={'/'} className="absolute z-10 top-4 left-4">
        <Exit class="size-8 hover:rotate-90 hover:scale-105 opacity-60 hover:opacity-100 transition-all duration-500" />
      </Link>

      <button
        onClick={() => handleChangeImage("prev")}
        className={`active:scale-110 absolute bg-[#fefefe] text-primary/70 border border-primary 
          p-2 rounded-full shadow-md top-1/4 left-4 z-10 translate-y-full cursor-pointer
          transition-transform duration-300 hover:bg-primary/70 hover:text-[#fefefe]
          ${currentIndex === 0 && 'opacity-50 cursor-not-allowed'}
        `}
        disabled={currentIndex === 0}
      >
        <Triangle class="size-12 -rotate-90 -translate-x-[2px]" />
      </button>

      <button
        onClick={() => handleChangeImage("next")}
        className={`active:scale-110 absolute bg-[#fefefe] text-primary/70 border border-primary 
          p-2 rounded-full shadow-md top-1/4 right-4 z-10 translate-y-full cursor-pointer
          transition-transform duration-300 hover:bg-primary/70 hover:text-[#fefefe]
          ${currentIndex === images.length - 1 && 'opacity-50 cursor-not-allowed'}
        `}
        disabled={currentIndex === images.length - 1}
      >
        <Triangle class="size-12 rotate-90" />
      </button>

      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          className="
          py-2 px-4 flex gap-1 items-center
          bg-black text-white font-semibold rounded-lg shadow-lg 
          hover:text-primary hover:shadow-xl active:scale-95 
          transition-all duration-300
        "
          onClick={() => { galeryDialog.current?.showModal() }}
        >
          <ImageIcon class="size-4" /> Ver todo
        </button>
        <button
          className="
          py-2 px-4 flex gap-1 items-center
          bg-black text-white font-semibold rounded-lg shadow-lg 
          hover:text-primary hover:shadow-xl active:scale-95 
          transition-all duration-300
        "
          onClick={handleDownloadAllImages}
        >
          <Download class="size-4" />
          Guardar todo
        </button>
      </div>

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

      <OptimizationStats
        image={currentItem}
      />

      <EditControls
        image={currentItem}
        onApply={handleEditImage}
      />

      <div className="h-full flex flex-col">
        <MainGallery
          images={images}
          currentIndex={currentIndex}
        />

        <TumbnailCarrousel
          images={images}
          currentIndex={currentIndex}
          onTumbnailClick={handleGoToImage}
        />
      </div>

    </div >

  );
};
