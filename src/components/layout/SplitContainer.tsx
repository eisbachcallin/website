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
        'mx-auto grid max-w-max gap-4 p-2 xl:grid-cols-2',
        className
      )}
    >
      <div className='xl:grid-col-1 mx-auto w-full'>
        <div className={clsx('sm:py-16', { 'xl:sticky xl:top-0': stickyLeft })}>
          {leftSide}
        </div>
      </div>
      <div>{rightSide}</div>
    </div>
  )
}

export default SplitContainer
