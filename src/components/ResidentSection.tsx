import ResidentCard from '@/components/ResidentCard'
import { Resident } from '@/config/residents'

interface ResidentSectionProps {
  residents: Resident[]
  label: string
}

const ResidentSection = ({ residents, label }: ResidentSectionProps) => {
  return (
    <section className='flex flex-col gap-y-2'>
      <div className='flex'>
        <h2 className='bg-pink-500 p-[0.05rem] text-sm font-light uppercase leading-none  text-white'>
          {label}
        </h2>
      </div>
      <div
        className={
          'grid w-full gap-2 lg:grid-cols-2 xl:col-span-5 xl:grid-cols-1'
        }
      >
        {residents.map((resident) => (
          <ResidentCard key={resident.name} residents={resident} />
        ))}
      </div>
    </section>
  )
}

export default ResidentSection
