import ResidentCard from '@/components/ResidentCard'
import { Resident } from '@/config/residents'

interface ResidentSectionProps {
  residents: Resident[]
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
          <ResidentCard key={resident.name} residents={resident} />
        ))}
      </div>
    </section>
  )
}

export default ResidentSection
