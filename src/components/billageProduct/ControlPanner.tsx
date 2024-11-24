import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import styles from './ControlPanner.module.css'

export default function ControlPanner() {
  return (
    <div className={styles['panner-wrapper']}>
      <div key="search" className={styles['search-wrapper']}>
        <button className={styles['btn-category']}>
          <Image
            src="/assets/images/category.webp"
            alt="카테고리 버튼"
            width={72}
            height={72}
            loading="lazy"
          />
        </button>
        <div className={styles['input-wrapper']}>
          <input type="text" placeholder="검색어를 입력해 주세요." />
          <button>
            <Image
              src="/assets/images/search.webp"
              alt="검색 버튼"
              width={72}
              height={72}
              loading="lazy"
            />
          </button>
        </div>
      </div>

      <div key="selectlist" className={styles['selectlist-wrapper']}>
        <div className={styles['select-wrapper']}>
          <select>
            <option value="0">지역 선택</option>
            <option value="강원특별자치도 강릉시">강원특별자치도 강릉시</option>
          </select>
          <span className={styles['icon-arrow']}>
            <FontAwesomeIcon icon={faAngleDown} height="1em" width="1em" />
          </span>
        </div>
        <div className={styles['select-wrapper']}>
          <select>
            <option value="0">동네 선택</option>
          </select>
          <span className={styles['icon-arrow']}>
            <FontAwesomeIcon icon={faAngleDown} height="1em" width="1em" />
          </span>
        </div>
        <div className={styles['select-wrapper']}>
          <select>
            <option value="0">카테고리 선택</option>
          </select>
          <span className={styles['icon-arrow']}>
            <FontAwesomeIcon icon={faAngleDown} height="1em" width="1em" />
          </span>
        </div>
      </div>
    </div>
  )
}
