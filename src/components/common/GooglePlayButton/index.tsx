import Image from 'next/image'

export default function GooglePlayButton() {
  return (
    <button>
      <Image
        src={`/assets/images/googlePlayBtn.png`}
        width={162}
        height={50}
        alt="GooglePlay"
      />
    </button>
  )
}
