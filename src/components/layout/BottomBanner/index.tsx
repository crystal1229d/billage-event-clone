import Logo from '@/components/common/Logo';
import styles from './BottomBanner.module.css';
import Image from 'next/image';

export default function BottomBanner() {
  return (
      <div className={`${styles['bottom-banner']}`}>
          <div>
            <div className={`${styles['banner-contents']}`}>
                  <Logo with_service_name={false} /> 
                  <h1>빌리쥐를 지금 시작해 보세요!</h1>
            </div>
            <div className={`${styles['btn-box']}`}>
                <button style={{ marginRight: '10px' }}>
                  <Image src={`/assets/images/googlePlayBtn.png`} width={162} height={50} alt="GooglePlay" />
                </button>
                <button>
                  <Image src={`/assets/images/iosBtn.png`} width={158} height={50} alt="AppStore" />
                </button>
            </div>
          </div>
    </div>
  );
};
