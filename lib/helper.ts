import { DEFAULT_AVATAR_URL } from '@/configs/defaults'

/**
 * Check if the error is a unique constraint error
 * @param e - The error to check if it is a unique constraint error
 */
export function isUniqueConstraintError(e: unknown): e is Error {
  if (!(e instanceof Error)) return false
  const cause = (e as { cause?: unknown }).cause
  const causeCode =
    cause instanceof Error ? (cause as { code?: string }).code : undefined
  const causeMsg = cause instanceof Error ? cause.message : ''
  return (
    e.message.includes('UNIQUE constraint failed') ||
    causeCode === 'SQLITE_CONSTRAINT' ||
    causeMsg.includes('UNIQUE constraint failed')
  )
}

/**
 * Get the unique constraint message from the error
 * @param e - The error to get the unique constraint message from
 * @returns string
 */
export function uniqueConstraintMessage(e: Error): string {
  const cause = (e as { cause?: unknown }).cause
  const msg = (cause instanceof Error ? cause.message : '') || e.message
  if (msg.includes('contacts.phone')) return 'Phone number is already in use'
  if (msg.includes('contacts.email')) return 'Email address is already in use'
  return 'A contact with these details already exists'
}

/** Value from DB/API: data URL, legacy public path, or raw base64 payload. */
export function avatarDisplaySrc(avatar: string | null | undefined): string {
  if (avatar == null || avatar === '') return DEFAULT_AVATAR_URL
  if (
    avatar.startsWith('data:') ||
    avatar.startsWith('/') ||
    avatar.startsWith('http://') ||
    avatar.startsWith('https://')
  ) {
    return avatar
  }
  return `data:image/png;base64,${avatar}`
}

/**
 * Get the initials of the name
 * @param name
 * @returns string
 */
export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ''}${parts.at(-1)![0] ?? ''}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

/**
 * Check if the avatar is a custom avatar
 * @param avatar - The avatar to check if it is a custom avatar
 * @returns true | false
 */
export function isCustomAvatar(avatar: string | null | undefined): boolean {
  return Boolean(avatar && avatar !== DEFAULT_AVATAR_URL)
}
