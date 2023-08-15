import React from 'react'
import clsx from 'clsx'

interface SplitContainerProps {
  leftSide: React.ReactNode
  rightSide: React.ReactNode
  className?: string
  stickyLeft?: boolean
  narrow?: boolean
}

const SplitContainer: React.FC<SplitContainerProps> = ({
  leftSide,
  rightSide,
  className,
  stickyLeft = false,
  narrow = false,
}) => {
  return (
    <div
      className={clsx(
        'mx-auto grid max-w-max flex-grow xl:border-x xl:border-default',
        narrow ? 'xl:grid-cols-6' : 'xl:grid-cols-4',
        className
      )}
    >
      <div
        className={clsx(
          'col-span-full mx-auto w-full border-b border-default py-8 text-default xl:col-span-1 xl:border-b-0 xl:border-r xl:border-default xl:py-0'
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
      <div
        className={clsx(
          'col-span-full',
          narrow ? 'xl:col-span-5' : 'xl:col-span-3'
        )}
      >
        {rightSide}
      </div>
    </div>
  )
}

export default SplitContainer
