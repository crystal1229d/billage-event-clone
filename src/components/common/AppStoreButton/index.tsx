import Image from 'next/image'

export default function AppStoreButton() {
  return (
    <button>
      <Image
        src={`/assets/images/iosBtn.png`}
        width={158}
        height={50}
        alt="AppStore"
      />
    </button>
  )
}
