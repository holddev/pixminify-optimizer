import { Header } from "../components/Header"
import { GitHubIcon } from "../components/Icons"
import { UploadImage } from "../components/UploadImage"

export const Home = () => {
  return (
    <>
      <div className="relative max-w-5xl mx-auto min-h-screen pb-2">
        <Header />
        <UploadImage />
        <footer className="absolute bottom-2 flex gap-2 text-center text-sm text-light-text_primary dark:text-dark-text_primary">
          Desarrollado por
          <a
            href="https://github.com/holddev"
            target="_blank"
            title="Ir al perfil en Github"
            rel="noopener noreferrer"
            className="flex gap-1 items-center text-green-500 dark:text-primary font-semibold"
          >
            <GitHubIcon class="size-4" />
            holddev
          </a>
        </footer>
      </div>
    </>
  )
}