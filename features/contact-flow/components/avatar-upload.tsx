import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IconChange, IconDelete, IconAdd } from '@/components/icons'
import { Contact } from '@/db/schema'
import { DEFAULT_AVATAR_URL } from '@/configs/defaults'
import { initialsFromName, isCustomAvatar } from '@/lib/helper'

function useAvatarUpload(contact: Contact | null) {
  const { avatar, name } = contact ?? {}

  const isEdit = contact != null
  const avatarSrc = avatar ?? DEFAULT_AVATAR_URL

  const buttonLabel = isEdit ? 'Change' : 'Add'
  const buttonIcon = isEdit ? (
    <IconChange className="size-6" />
  ) : (
    <IconAdd className="size-6" />
  )

  const showDeleteButton = isEdit && isCustomAvatar(avatar)

  return {
    avatarSrc,
    buttonLabel,
    buttonIcon,
    showDeleteButton,
  }
}

function AvatarUpload({ contact }: { contact: Contact | null }) {
  const { avatarSrc, buttonLabel, buttonIcon, showDeleteButton } =
    useAvatarUpload(contact)

  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-16 shrink-0 md:size-[88px]">
        <AvatarImage src={avatarSrc} alt="" />
        <AvatarFallback>{initialsFromName(contact?.name ?? '')}</AvatarFallback>
      </Avatar>

      {/* action buttons */}
      <div className="flex items-center gap-2">
        <Button variant="default" size="lg" type="button">
          {buttonIcon as React.ReactNode}
          {buttonLabel} picture
        </Button>
        {showDeleteButton && (
          <Button variant="default" size="icon-lg" type="button">
            <IconDelete className="size-6" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default AvatarUpload
