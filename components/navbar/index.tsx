import clsx from 'clsx'

export default function Navbar() {
  return (
    <div
      className={clsx(
        'text-xl items-center font-semibold backdrop-blur-md z-[999]',
        'hidden md:flex absolute top-0 left-0 px-4 py-8 w-full',
        'h-[56px] border-b-[1px] border-slate-200',
      )}
    >
      自定義財產規劃
    </div>
  )
}
