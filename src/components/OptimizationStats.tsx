import { Image } from "../types/types"
import { formatFileSize } from "../utils/utils";
import { Triangle } from "./Icons"

interface Props {
  image: Image
}
export const OptimizationStats = ({ image }: Props) => {
  if (!image.compressedImage) return null;

  const originalSize = image.image.size;
  const optimizedSize = image.compressedImage.size;
  const reductionPercent = 100 - (optimizedSize / originalSize) * 100;

  const fileSizes = [
    {
      label: "Original",
      value: originalSize,
      color: "text-red-400"
    },
    {
      label: "Optimizado",
      value: optimizedSize,
      color: "text-green-400"
    }
  ]

  const isReduction = reductionPercent >= 0;
  const displayPercent = Math.abs(reductionPercent).toFixed(1);
  const triangleRotation = isReduction ? "-rotate-180" : "rotate-0";
  const labelText = isReduction ? `${displayPercent}% menos` : `${displayPercent}% más`

  return (
    <div className="absolute left-0 bottom-0 -translate-y-[100px] w-64 bg-black text-white p-4 rounded-md z-10 ">
      <div className="grid grid-cols-2 gap-2 font-medium text-white/80">
        {
          fileSizes.map(({ label, value, color }) => (
            <div key={label} className="bg-white/10 p-2 rounded-lg flex flex-col items-center justify-center">
              <span className="text-xs uppercase">{label}</span>
              <span className={`text-sm font - bold ${color} `}>
                {formatFileSize(value)}
              </span>
            </div>
          ))
        }
      </div>

      <div className="relative mt-2 h-6 w-full rounded-full bg-primary/30 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-700"
          style={{
            width: `${isReduction ? reductionPercent.toFixed(2) : 0}% `,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
          <Triangle class={`size-3 -rotate-180 mr-1 ${triangleRotation}`} />
          {labelText}
        </div>
      </div>
    </div>
  );
}