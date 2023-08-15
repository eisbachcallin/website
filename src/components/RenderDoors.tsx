import React from 'react'

interface DoorsProps {
  timeDoors: string
  price: string
  before?: {
    timeBefore: string
    priceBefore: string
  }
}

const RenderDoors: React.FC<DoorsProps> = ({ timeDoors, price, before }) => {
  return (
    <div className='flex space-x-1 font-mono uppercase'>
      <div>Doors {timeDoors}h</div>
      <div className='text-accent'>/</div>
      <div className='font-medium'>{price}€</div>
      {before && (
        <>
          <div className='text-accent'>/</div>
          <div>
            {before.priceBefore}€ before {before.timeBefore}
          </div>
        </>
      )}
    </div>
  )
}

export default RenderDoors
