# 🇭🇺 헝가리 단기선교 2026 — 빛트인교회

> 빛트인교회(Between Church) 단기선교팀 내부 자료 사이트

## 📅 일정
**2026년 6월 12일 (금) ~ 6월 19일 (금)**

## 🗂 구성
| 파일 | 내용 |
|------|------|
| `index.html` | 전체 페이지 (공지·일정·기도·팀원·문서·갤러리·후원·나눔글) |
| `css/style.css` | 디자인 스타일 |
| `js/app.js` | 기능 (비밀번호 잠금, 데이터 입력 등) |
| `images/` | 로고 등 이미지 |

## ✏️ 자주 수정하는 곳

### 비밀번호 변경 (`js/app.js` 1번째 줄)
```js
const PASSCODE = '0511'; // ← 여기 변경
```

### 팀원 추가 (`index.html` → `id="teamGrid"` 검색)
```html
<div class="member-card">
  <div class="member-avatar">😊</div>
  <div class="member-name">이름</div>
  <div class="member-role">역할</div>
  <div class="member-desc">소개</div>
  <div class="member-pray"><strong>기도제목:</strong> 내용</div>
</div>
```

### 공지 추가 (`js/app.js` → `noticeData` 배열)
```js
{
  type: 'important', // important | new | general
  title: '공지 제목',
  date: '2026.06.01',
  author: '팀장',
  content: `공지 내용`
}
```

## 🔐 접속 비밀번호
기본값: `0612` (출발일 기준)

## 🚀 로컬 실행
```bash
# Python 서버
python3 -m http.server 3000
# 브라우저에서 http://localhost:3000 접속
```
또는 `index.html` 파일을 브라우저로 바로 열어도 됩니다.
