import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/app/Global/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
