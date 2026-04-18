import type { IconProps } from './icon-base'
import { IconSvg } from './icon-base'

export function IconArrowLeft({ className, ...props }: IconProps) {
  return (
    <IconSvg className={className} {...props}>
      <path
        d="M12 19.625L4.375 12L12 4.375L13.075 5.45L7.25 11.25H19.625V12.75H7.25L13.075 18.55L12 19.625Z"
        fill="currentColor"
      />
    </IconSvg>
  )
}
