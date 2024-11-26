import styles from './page.module.css'

interface Props {
  params: {
    productId: string
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId } = params

  return <div className={styles['product-wrap']}>{productId}</div>
}
