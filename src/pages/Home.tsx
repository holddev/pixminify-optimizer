import { Header } from "../components/Header"
import { UploadImage } from "../components/UploadImage"

export const Home = () => {
  return (
    <>
      <div className="max-w-5xl mx-auto h-[100vh]">
        <Header />
        <UploadImage />
      </div>
    </>
  )
}