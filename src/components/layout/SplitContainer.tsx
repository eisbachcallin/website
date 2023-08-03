import React from 'react'
import clsx from 'clsx'

interface SplitContainerProps {
  leftSide: React.ReactNode
  rightSide: React.ReactNode
  className?: string
  stickyLeft?: boolean
}

const SplitContainer: React.FC<SplitContainerProps> = ({
  leftSide,
  rightSide,
  className,
  stickyLeft = false,
}) => {
  return (
    <div
      className={clsx(
        'mx-auto grid max-w-max flex-grow xl:grid-cols-3 xl:border-x xl:border-black',
        className
      )}
    >
      <div
        className={clsx(
          'col-span-full mx-auto w-full border-b border-black py-8 text-black xl:col-span-1 xl:border-b-0 xl:border-r xl:border-black xl:py-0'
        )}
      >
        <div
          className={clsx('p-2', {
            'xl:sticky xl:top-10': stickyLeft,
          })}
        >
          {leftSide}
        </div>
      </div>
      <div className='col-span-full xl:col-span-2'>{rightSide}</div>
    </div>
  )
}

export default SplitContainer
