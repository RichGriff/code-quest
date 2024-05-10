import { CheckCircle, MoveRight, X } from "lucide-react";

export default function Notification() {
  return (
    <>
      {/*
        Make sure you add some bottom padding to pages that include a sticky banner like this to prevent
        your content from being obscured when the user scrolls to the bottom of the page.
      */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:px-6 sm:pb-5 lg:px-8">
        <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-emerald-500 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <p className="text-sm leading-6 text-white">
            <a href="/stats" className="flex justify-start items-center">
              <strong className="font-semibold flex justify-start items-center"><CheckCircle className="w-4 h-4 mr-2"/> Looks like you have already completed this quiz!</strong>
              <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <span className="flex justify-start items-center gap-2">Check out your stats here <MoveRight className="w-4 h-4" /></span>
            </a>
          </p>
          <button type="button" className="-m-3 flex-none p-3 focus-visible:outline-offset-[-4px]">
            <span className="sr-only">Dismiss</span>
            <X className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  )
}
