'use client'

import { useRef, type ChangeEvent } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IconChange, IconDelete, IconAdd } from '@/components/icons'
import {
  avatarDisplaySrc,
  initialsFromName,
  isCustomAvatar,
} from '@/lib/helper'

export type AvatarUploadProps = {
  value: string
  onChange: (value: string) => void
  nameForInitials: string
}

function useAvatarUpload(value: string) {
  const hasCustomAvatar = isCustomAvatar(value)
  const avatarSrc = avatarDisplaySrc(value)
  const buttonLabel = hasCustomAvatar ? 'Change' : 'Add'
  const buttonIcon = hasCustomAvatar ? (
    <IconChange className="size-6" />
  ) : (
    <IconAdd className="size-6" />
  )
  const showDeleteButton = hasCustomAvatar

  return {
    avatarSrc,
    buttonLabel,
    buttonIcon,
    showDeleteButton,
  }
}

function AvatarUpload({ value, onChange, nameForInitials }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { avatarSrc, buttonLabel, buttonIcon, showDeleteButton } =
    useAvatarUpload(value)

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file?.type.startsWith('image/')) return
    if (file.size > MAX_FILE_SIZE) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') onChange(result)
    }
    reader.readAsDataURL(file)
  }

  const handleDelete = () => {
    onChange('')
  }

  return (
    <div className="flex h-22 w-full min-w-0 flex-nowrap items-center gap-4">
      {/* image * file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        tabIndex={-1}
        aria-hidden
        onChange={handleFileChange}
      />
      <Avatar className="size-22 shrink-0 overflow-hidden">
        <AvatarImage src={avatarSrc} alt="" />
        <AvatarFallback>{initialsFromName(nameForInitials)}</AvatarFallback>
      </Avatar>

      {/* buttons — flex-1 + min-w-0 (not w-full): avoids row min-width > dialog when beside fixed avatar */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Button
          variant="default"
          size="lg"
          type="button"
          onClick={handleUpload}
        >
          {buttonIcon as React.ReactNode}
          {buttonLabel} picture
        </Button>
        <Button
          variant="default"
          size="icon-lg"
          type="button"
          onClick={handleDelete}
          aria-hidden={!showDeleteButton}
          tabIndex={showDeleteButton ? undefined : -1}
          className={!showDeleteButton ? 'invisible' : undefined}
        >
          <IconDelete className="size-6" />
        </Button>
      </div>
    </div>
  )
}

export default AvatarUpload
