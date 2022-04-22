import * as React from "react"
import { useAddonState } from "@storybook/api"
import { IconButton } from "@storybook/components"
import { addons } from "@storybook/addons"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { ADDON_ID, EVENTS } from "../../constants"

export const ColorModeTool = () => {
  const isDarkMode = localStorage.getItem("chakra-ui-color-mode") === "dark"
  const [darkMode, setDarkMode] = useAddonState(
    `${ADDON_ID}/dark-mode`,
    isDarkMode,
  )
  const channel = addons.getChannel()

  const toggleDarkMode = React.useCallback(() => {
    channel.emit(EVENTS.TOGGLE_COLOR_MODE, !darkMode ? "dark" : "light")
    setDarkMode(!darkMode)
  }, [channel, darkMode, setDarkMode])

  return (
    // @ts-expect-error TS2604: JSX element type 'IconButton' does not have any construct or call signatures.
    <IconButton
      active={darkMode}
      css
      title={`Set color mode to ${darkMode ? "light" : "dark"}`}
      onClick={toggleDarkMode}
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}