import { Image, ImageID } from "../types/types"
import { formatFileSize } from "../utils/utils"
import { Trash } from "./Icons"

interface Props {
  item: Image
  onDelete: (id: ImageID) => void
}

export const PreviewImageItem: React.FC<Props> = ({ item, onDelete }) => {
  const { name, size } = item.image

  return (
    <>
      <li className=" rounded-md border-b-[1px] py-1 px-2 border-solid flex items-center hover:bg-primary/40">
        <div className="flex items-center justify-start gap-x-4 w-[70%] ">
          <img className="size-16 object-cover object-center" src={URL.createObjectURL(item.image)} alt={name} />
          <span className="text-start">{name}</span>
        </div>
        <div className="flex items-center justify-between w-[30%]">
          <span className=" font-semibold">{formatFileSize(size)}</span>
          <button
            className="px-4"
            onClick={() => { onDelete({ id: item.id }) }}
          >
            <Trash class="size-7 hover:text-red-500 transition-colors duration-300" />
          </button>
        </div>
      </li >
    </>
  )
}