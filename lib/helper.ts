import { DEFAULT_AVATAR_URL } from '@/configs/defaults'

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

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ''}${parts.at(-1)![0] ?? ''}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export function isCustomAvatar(avatar: string | null | undefined): boolean {
  return Boolean(avatar && avatar !== DEFAULT_AVATAR_URL)
}
