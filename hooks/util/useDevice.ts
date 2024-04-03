import { useMediaQuery } from 'react-responsive'

export default function useDevice() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  })
  const isMobile = useMediaQuery({ query: '(max-width: 480)' })
  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  return {
    isMobile,
    isMiddleScreen,
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isPortrait,
    isRetina,
  }
}
