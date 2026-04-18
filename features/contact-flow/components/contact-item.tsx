'use client'

import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  IconCall,
  IconDelete,
  IconFavourite,
  IconMore,
  IconMute,
  IconSettings,
} from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const defaultAvatar = '/assets/avatar-default.svg'

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ''}${parts.at(-1)![0] ?? ''}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

interface ContactItemProps {
  name: string
  phone: string
  avatar?: string
}

const menuItems = [
  {
    icon: <IconSettings className="size-5 text-text-secondary" />,
    label: 'Edit',
    onClick: () => {
      console.log('Edit')
    },
  },
  {
    icon: <IconFavourite className="size-5 text-text-secondary" />,
    label: 'Favourite',
    onClick: () => {
      console.log('Favourite')
    },
  },
  {
    icon: <IconDelete className="size-5 text-text-secondary" />,
    label: 'Remove',
    onClick: () => {
      console.log('Remove')
    },
  },
] as const

function ContactItem({
  name = 'Jamie Wright',
  phone = '+36 20 100 0001',
  avatar = defaultAvatar,
}: ContactItemProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="group my-2.5 flex h-10 items-center justify-between">
      {/* info */}
      <div className="flex space-x-4">
        <Avatar className="size-10 rounded-full">
          <AvatarImage src={avatar} alt="" />
          <AvatarFallback>{initialsFromName(name)}</AvatarFallback>
        </Avatar>
        {/* data */}
        <div className="flex flex-col justify-center">
          <h3 className="text-base">{name}</h3>
          <p className="text-xs text-text-secondary">{phone}</p>
        </div>
      </div>
      <div
        className={cn(
          'pointer-events-none flex h-full items-center space-x-2 opacity-0 transition-opacity duration-150',
          'group-focus-within:pointer-events-auto group-focus-within:opacity-100',
          'group-hover:pointer-events-auto group-hover:opacity-100',
          '[@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100',
          menuOpen && 'pointer-events-auto opacity-100'
        )}
      >
        <Button variant="ghost" size="icon">
          <IconMute className="size-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <IconCall className="size-6" />
        </Button>

        <DropdownMenu onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="m-0">
                <IconMore className="size-6" />
              </Button>
            }
          />
          <DropdownMenuContent
            align="start"
            className="w-[219px] border-none p-0"
          >
            {menuItems.map((item) => (
              <DropdownMenuItem
                className="cursor-pointer space-x-3 px-2.5 py-3"
                onClick={item.onClick}
              >
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default ContactItem
