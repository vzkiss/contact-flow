import { IconArrowLeft, IconLightMode } from '@/components/icons'
import ContactHeader from '@/features/contact-flow/contact-header'
import ContactBody from '@/features/contact-flow/contact-body'

export default function Page() {
  return (
    <div className="flex min-h-dvh w-full justify-center">
      <div className="flex h-dvh min-h-svh w-full max-w-[1248px] min-w-0 justify-center min-[900px]:justify-start">
        {/* left sidebar */}
        <aside className="hidden min-w-0 flex-1 border-r border-white/5 min-[900px]:block min-[900px]:max-w-[240px]">
          <div className="mt-24 flex items-center justify-end px-2">
            <div className="my-7 cursor-pointer p-2">
              <IconArrowLeft className="size-6" />
            </div>
          </div>
        </aside>

        <main className="flex w-full max-w-[768px] shrink-0 flex-col px-6 sm:pt-4 md:pt-24">
          <ContactHeader />
          <ContactBody />
        </main>

        {/* right sidebar */}
        <div className="hidden min-w-0 flex-1 border-l border-white/5 min-[900px]:block min-[900px]:max-w-[240px]">
          <div className="mt-24 flex items-center justify-start px-2">
            <div className="my-7 cursor-pointer p-2">
              <IconLightMode className="size-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
