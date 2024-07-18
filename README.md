<div align='center'>

  <div style="background-color:#2e3136; width:300px; padding:30px;border-radius:50%;">
     <img src='public/assets/images/logo_with_name.webp' alt='logo' width='250' />
  </div>
  <br />
 
  <h2>Next.js를 사용한 다이나믹 페이지 구현</h2>
  <br /><br />

  <div align="left">
    <p><b>Dejay React 세미나 4회차 과제</b></p>
    <p>기간 : 2024.07.12 - 2024.07.19</p>
    <p>강사 : 윤은미 책임님</p>
    <p>목적: <p>
    <ul>
        <li>Next는 react 기반으로 나오는 요즘 뜨고 있는 라이브로리중 하나입니다. react랑 거의 흡사하지만 부분적으로 다른 특징들이 있습니다 이부분을 찾으셨으면 좋겠습니다.</li>
        <li>그리고 FRONT 개발자는 기본적으로 퍼블릭싱 개념이 있어야 한다고 생각합니다, react에 styled-compnent로 작업이 되어있는경우는 css파일을 받아와 적용하기가 어렵기때문에 해당지식이 많을수록 더 도움이 된다고 생각합니다.</li>
    </ul>
    <p>과제 내용:</p>
    <ul>
        <li>
            NextJs를 이용해 이벤트 페이지 구현해보기 <br />
            - 이벤트 리스트페이지 https://bbillage.com/event <br />
            - 이벤트 상세페이지 https://bbillage.com/event/44
        </li>
        <li>
            proxy 개념을 파악해 api 연동 <br />
                - api 호출 <br />
                - 이벤트 상세 <br />
        </li>
        <li>
            화면 퍼블릭싱하기 <br />
            - 해당 이벤트 리스트의 화면을 보고 최대한 비슷하게 구현해보시길 바랍니다. <br />
            - 별도의 이미지가 들어가는 부분은 생략하면 됩니다. (ex:  구글스토어, 앱스토어 이동버튼)
        </li>
    </ul>
  </div>
</div>

<br />

## Preview / Features

### >> [mobflix.com](https://mobflix-wheat.vercel.app/)

<br />

<div align='center'>

<img src='/public/README/1.png' alt='preview' width='450' />
<p>메인 페이지</p>

<br />

<img src='/public/README/2.png' alt='preview' width='450' />
<img src='/public/README/2-1.png' alt='preview' width='170' />
<p>영화 페이지 - 영화 등록/삭제/수정</p>

</div>

## Features

- 라우팅
- 반응형
- ...

<br />

## TODO

- [refactor] UpperBanner 에서 Swiper 분리
- [fix] BottomBanner - 반응형 작업 (mobile, pc) Next.js 에서 mobile, pc 인식하는 방법 ?
- [feat] Navbar - 반응형 작업 (hamburger menu detail)

<br />

- [chore] favicon 을 Logo 이미지로 변경
- [doc] README 수정

<br />

## Built With

- [`React`](https://reactjs.org/)

- [`TypeScript`](https://www.typescriptlang.org/)

<br />

## How to Start

Use `yarn`

```
yarn

yarn start
```

Use `npm`

```
npm install

npm start
```
