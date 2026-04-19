'use client'

import { Button } from '@/components/ui/button'
import { IconAdd, IconSettings } from '@/components/icons'
import profilePic from '@/components/icons/icon-profile-pic.svg'
import Image from 'next/image'
import { contactDialogStore } from '@/stores/contact-dialog-store'

/**
 * ContactHeader
 * @returns A header component for the contact flow page
 */
function ContactHeader() {
  return (
    <header className="flex items-center justify-between py-6">
      <h1 className="font-heading text-4xl">Contacts</h1>

      <div className="flex h-10 items-center gap-2 md:space-x-6">
        {/* settings */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Settings">
            <IconSettings className="size-6" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Profile">
            <Image src={profilePic} alt="" width={24} height={24} />
          </Button>
        </div>
        {/* action button */}
        <Button
          variant="special"
          className="max-md:gap-0 max-md:px-3"
          onClick={() => contactDialogStore.getState().openAdd()}
        >
          <IconAdd className="size-6" />
          <span className="hidden md:inline">Add new</span>
        </Button>
      </div>
    </header>
  )
}

export default ContactHeader
