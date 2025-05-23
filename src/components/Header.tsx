import { ThemeSwitcher } from './ThemeSwitcher'

export const Header = () => {

  return (
    <header className="w-full flex justify-between items-center text-2xl py-3 px-2 md:px-0">
      <h2 className="text-light-text_primary dark:text-dark-text_primary
      font-arvo text-2xl md:text-3xl font-extrabold tracking-wider">
        Pix<span className="text-primary">Minify</span>
      </h2>
      <ThemeSwitcher />
    </header>
  )
}