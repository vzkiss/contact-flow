'use client'

import ContactItem from './contact-item'

/**
 * ContactList
 * @returns A list of contacts
 */
function ContactList() {
  return (
    <div className="flex flex-col">
      <ContactItem
        name="Timothy Lewis"
        phone="+36 20 100 0001"
        avatar="/assets/Timothy.png"
      />
      <ContactItem
        name="Sarah Wright"
        phone="+36 20 100 0002"
        avatar="/assets/Sarah.png"
      />
      <ContactItem
        name="Lucy Jones"
        phone="+36 20 100 0003"
        avatar="/assets/Lucy.png"
      />
      <ContactItem
        name="Jake Perez"
        phone="+36 20 100 0004"
        avatar="/assets/Jake.png"
      />
      <ContactItem
        name="Adebayo Rodriguez"
        phone="+36 20 100 0005"
        avatar="/assets/Adebayo.png"
      />
      <ContactItem name="Jamie Wright" phone="+36 20 100 0006" />
    </div>
  )
}

export default ContactList
