type IconProps = {
  className?: string
}

const BeatportIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox='0 0 32 32'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M20.5 14C16.9101 14 14 16.9101 14 20.5C14 24.0899 16.9101 27 20.5 27C24.0899 27 27 24.0899 27 20.5C27 16.9101 24.0899 14 20.5 14ZM12 20.5C12 15.8056 15.8056 12 20.5 12C25.1944 12 29 15.8056 29 20.5C29 25.1944 25.1944 29 20.5 29C15.8056 29 12 25.1944 12 20.5Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14 3C14.5523 3 15 3.44772 15 4V11.514C15 12.5516 14.5968 13.5487 13.8754 14.2946L6.71886 21.6952C6.33493 22.0922 5.70186 22.1028 5.30484 21.7189C4.90783 21.3349 4.89722 20.7019 5.28114 20.3048L12.4377 12.9043C12.7984 12.5313 13 12.0328 13 11.514V4C13 3.44772 13.4477 3 14 3Z'
    />
  </svg>
)

export default BeatportIcon
