/**
 * ContactBody
 * @returns A body component for the contact flow page
 */
function ContactBody() {
  return (
    <div className="border-t border-white/5 py-6">
      <h2 className="font-heading text-2xl">Subtitle</h2>
      <hr className="my-6 border-white/5" />
      <h3 className="font-heading text-base">Headline 3</h3>
      <hr className="my-6 border-white/5" />

      <p className="text-sm">Body</p>
      <hr className="my-6 border-white/5" />
      <p className="text-xs">Message</p>
    </div>
  )
}

export default ContactBody
