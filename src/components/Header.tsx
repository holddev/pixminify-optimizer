import { ThemeSwitcher } from './ThemeSwitcher'

export const Header = () => {

  return (
    <header className="flex justify-between items-center text-2xl py-3">
      <h2 className="text-light-text_primary dark:text-dark-text_primary
      font-arvo text-3xl font-extrabold tracking-wider">
        Pix<span className="text-primary">Minify</span>
      </h2>
      <ThemeSwitcher />
    </header>
  )
}