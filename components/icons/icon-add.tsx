import type { IconProps } from './icon-base'
import { IconSvg } from './icon-base'

export function IconAdd({ className, ...props }: IconProps) {
  return (
    <IconSvg className={className} {...props}>
      <path
        d="M11.25 18.75V12.75H5.25V11.25H11.25V5.25H12.75V11.25H18.75V12.75H12.75V18.75H11.25Z"
        fill="currentColor"
      />
    </IconSvg>
  )
}
