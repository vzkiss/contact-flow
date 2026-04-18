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
import { avatarDisplaySrc, initialsFromName } from '@/lib/helper'
import { cn } from '@/lib/utils'
import { contactDialogStore } from '@/stores/contact-dialog-store'
import { Contact } from '@/db/schema'

interface ContactItemProps {
  contact: Contact
}

function ContactItem({ contact }: ContactItemProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { name, phone, avatar } = contact
  const avatarSrc = avatarDisplaySrc(avatar)

  const menuItems = [
    {
      icon: <IconSettings className="size-5 text-text-secondary" />,
      label: 'Edit',
      onClick: () => contactDialogStore.getState().openEdit(contact),
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

  return (
    <div className="group my-2.5 flex h-10 items-center justify-between">
      {/* info */}
      <div className="flex space-x-4">
        <Avatar className="size-10 rounded-full">
          <AvatarImage src={avatarSrc} alt="" />
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
                key={item.label}
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
