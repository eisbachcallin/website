import clsx from 'clsx'
import ResidentCard from '@/components/ResidentCard'
import { Artist } from '@/config/artists'

interface ResidentSectionProps {
  residents: Artist[]
  label: string
}

const ResidentSection = ({ residents, label }: ResidentSectionProps) => {
  return (
    <section className='flex flex-col gap-y-2 xl:grid xl:grid-cols-6'>
      <h2 className='text-sm font-light uppercase leading-none xl:col-span-1'>
        {label}
      </h2>
      <div
        className={
          'grid w-full gap-2 lg:grid-cols-2 xl:col-span-5 xl:grid-cols-1'
        }
      >
        {residents.map((resident) => (
          <ResidentCard key={resident.name} artist={resident} />
        ))}
      </div>
    </section>
  )
}

export default ResidentSection
