import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

function ContactForm({
  open = false,
  onOpenChange = () => {
    console.log('open changed')
  },
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Form</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ContactForm
