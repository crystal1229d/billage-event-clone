import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
          {/* footerTop  */}
          <div className={styles.footerTop}>
            {/* PC */}
            <div className={styles['not-mobile']}>
                (주)어플드제이 사업자 정보
                <br />
                <br />
                대표자 : 김윤정
                <br />
                사업자등록번호 : 663-88-02165
                <br />
                주소 : 서울특별시 마포구 월드컵북로5길 12, 3층(서교통, 도경빌딩)
                <br />
                이메일 : support@appdejay.co.kr
                <br />
                호스팅제공자 : 아마존웹서비스 
                <br />
                <br />
            </div>

            {/* Mobile */}
            <div className={styles.mobile}>
                (주)어플드제이 사업자 정보
                <br />
                <br />
                대표자 : 김윤정
                <br />
                사업자등록번호 : 663-88-02165
                <br />
                주소 : 서울특별시 마포구 월드컵북로5길 12, 3층(서교통, 도경빌딩)
                <br />
                이메일 : support@appdejay.co.kr
                <br />
                호스팅제공자 : 아마존웹서비스 
                <br />
                <br />
            </div>

            <div>
              (주)어플드제이는 통신판매중개자로 거래 당사자가 아니므로,
              <br className={styles.pc} />
              판매자가 등록한 상품정보 및 거래 등에 대해 책임을 지지 않습니다.
            </div>
          </div>
          
          {/* footerBottom  */}
          <div className={styles.footerBottom}>
            <div className={styles['not-mobile']}>©App de Jay Corp.</div>

            <div>
              <a href="/agreement">
                <strong>이용약관</strong>
              </a>
              <br className={styles.mobile} />
              <a href="/privacy-policy">
                <strong>개인정보처리방침</strong>
              </a>
            </div>

            <div className={styles.mobile}>
              <br />
              <br />
              ©App de Jay Corp.
            </div>
          </div>
      </div>
    </footer>
  );
}
