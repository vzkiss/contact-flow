import { Button } from '@/components/ui/button'
import { IconAdd, IconSettings } from '@/components/icons'
import profilePic from '@/components/icons/icon-profile-pic.svg'
import Image from 'next/image'

/**
 * ContactHeader
 * @returns A header component for the contact flow page
 */
function ContactHeader() {
  return (
    <header className="flex items-center justify-between py-6">
      {/* left */}
      <h1 className="font-heading text-4xl">Contacts</h1>
      {/* right */}
      <div className="flex items-center space-x-6">
        {/* settings */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <IconSettings className="size-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Image src={profilePic} alt="Profile" width={24} height={24} />
          </Button>
        </div>
        {/* action button */}
        <Button variant="special">
          <IconAdd className="size-6" />
          Add new
        </Button>
      </div>
    </header>
  )
}

export default ContactHeader
