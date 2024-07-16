import Logo from '@/components/common/Logo';
import styles from './BottomBanner.module.css';

export default function BottomBanner() {
  return (
      <div className={`${styles['bottom-banner']}`}>
          <div>
            <div className={`${styles['banner-contents']}`}>
                  <Logo with_service_name={false} /> 
                  <h1>빌리쥐를 지금 시작해 보세요!</h1>
            </div>
          </div>
    </div>
  );
};
