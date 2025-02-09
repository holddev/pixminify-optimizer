import { useTheme } from "../hooks/useTheme"
import { Moon, MoonFilled, Sun, SunFilled } from "./Icons"

export const ThemeSwitcher = () => {
  const { theme, ToggleTheme } = useTheme()
  return (
    <div className="flex gap-2 items-center text-light-text_primary dark:text-dark-text_primary">
      {theme === 'light' ?
        <SunFilled class="size-4" /> :
        <Sun class="size-4" />
      }
      <button
        onClick={ToggleTheme}
        role="switch"
        title="cambiar tema"
        aria-label="cambiar tema"
        className={`flex w-14 rounded-full p-1 items-center transition-colors duration-500
              ${theme === 'light' ? 'bg-[#222222]' : 'bg-[#fefefe]'}
              `}
      >
        <span
          className={`size-4 rounded-full transition-transform duration-500
                ${theme === 'light' ? 'translate-x-0 bg-[#fefefe]' : 'translate-x-8 bg-[#222222]'}
                `}
        ></span>
      </button>
      {theme === 'dark' ?
        <MoonFilled class="size-4" /> :
        <Moon class="size-4" />
      }
    </div>
  )
}