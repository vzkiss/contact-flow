import { IconArrowLeft, IconLightMode } from '@/components/icons'
import ContactHeader from '@/features/contact-flow/contact-header'
import ContactBody from '@/features/contact-flow/contact-body'

export default function Page() {
  return (
    <div className="flex h-dvh min-h-svh justify-center">
      {/* left sidebar */}
      <aside className="hidden w-[240px] shrink-0 border-r border-white/5 md:block">
        <div className="mt-24 flex items-center justify-end">
          <div className="my-7 mr-6 cursor-pointer p-2">
            <IconArrowLeft className="size-6" />
          </div>
        </div>
      </aside>

      {/* main content */}
      <main className="flex w-full flex-col px-6 md:max-w-3xl md:pt-24">
        <ContactHeader />
        <ContactBody />
      </main>

      {/* right sidebar */}
      <div className="hidden w-[240px] shrink-0 border-l border-white/5 md:block">
        <div className="mt-24 flex items-center justify-start">
          <div className="my-7 ml-6 cursor-pointer p-2">
            <IconLightMode className="size-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
