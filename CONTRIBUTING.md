<html>
<body>
<hr>
<h1>Contributing Guidelines</h1>
<p><code inline="">FortuneMon</code> 프로젝트에 기여해주셔서 감사합니다. 이 문서는 개발 시 지켜야 할 규칙들을 설명합니다. 협업의 원활함을 위해 반드시 아래 규칙들을 따라주세요.</p>
<hr>
<h2>1. Issus-이슈 기반 작업 프로세스</h2>
<p>모든 개발 작업은 반드시 GitHub 이슈를 생성한 뒤에 시작합니다.<br>
이슈가 생성되면 자동으로 고유한 번호가 부여되며, <strong>해당 번호를 기준으로 브랜치명, 커밋 메시지, PR 제목을 작성</strong>합니다.</p>
<p>예시:</p>
<pre><code>#35 루틴 수행여부 기능 버그 수정
</code></pre>
<hr>
<h2>2. Git 브랜치 규칙</h2>
<p>브랜치 이름은 다음 형식을 따릅니다:</p>
<pre><code>#{커밋 메시지 컨벤션 타입입}- {이슈번호} - {간단한설명}
</code></pre>
<p>예시:</p>
<pre>
<code>feat : #9 로그인 UI 개발
refactor :#42 운세페이지_리팩토링
hotfix: #50 배포 후 https 요청 오류 수정
</code></pre>
<hr>
<h2>3. Git 커밋 메시지 컨벤션</h2>
<p>커밋 메시지는 다음 형식을 지켜주세요</p>
<p>Git branch 규칙과 유사하나 내용의 상세 정도의 차이가 있습니다</p>
<pre><code>{타입}: #{이슈번호} {내용}
</code></pre>
<h3>✅ 타입 목록</h3>

| 타입     | 설명                                       |
| -------- | ------------------------------------------ |
| feat     | 새로운 기능 추가                           |
| fix      | 버그 수정                                  |
| refactor | 코드 리팩토링                              |
| style    | 코드 포맷팅, 세미콜론 누락, 코드 변경 없음 |
| docs     | 문서 수정                                  |
| chore    | 기타 변경사항 (빌드 스크립트 수정 등)      |
| test     | 테스트 관련 코드 추가/수정                 |
| perf     | 성능 향상                                  |

<h3>✅ 커밋 메시지 예시</h3>
<pre><code>feat: #35 루틴 미수행 시 경고 메시지 추가
fix: #35 루틴 수행 여부 체크 버그 수정
docs: #40 README 업데이트
refactor: #42 포켓몬 뽑기기 결과 컴포넌트 구조 개선
</code></pre>
<hr>
<h2>4. Pull Request (PR) 작성 규칙</h2>
<p>PR 제목도 <strong>이슈 번호 기반으로</strong> 작성합니다</p>
<p>Git branch 전략을 따라왔다면 자동적으로 제목이 생성됩니다</p>
<p>PR 본문에서는 보다 자세한 설명을 작성해주세요. 이미지나 코드에 대한 설명을 적어주시면 원활한 소통이 가능합니다</p>
<pre><code>#{이슈번호} {변경 요약}
</code></pre>
<p>예시:</p>
<pre><code>fix : #35 루틴 미수행 기능 관련 버그 수정
refactor : #42 포켓몬 뽑기 결과 페이지 UI 개선
</code></pre>
<h3>📋 PR 본문 예시</h3>
<pre><code class="language-md">💡 작업 개요
- 루틴 수행 여부 체크 로직에서 null 체크가 누락되어 발생하던 버그를 수정했습니다.

## ✅ 변경 사항

- 루틴 완료 여부 판단 로직 수정
- 경고 메시지 추가
- 관련 유닛 테스트 추가

## 🔗 관련 이슈

- Closes #35
</code></pre>
<br>
<blockquote>
<p>작성자: <code inline="">FortuneMon</code>협업의 기술<br>
업데이트: 2025-06-11</p>
</blockquote>
<hr>
</body>
</html>
