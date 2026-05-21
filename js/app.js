/* ===== LOCK SCREEN ===== */
const PASSCODE = '0612'; // 기본 비밀번호 (변경 가능)
let lockBuffer = '';
let lockFailed = 0;

function lockInput(key) {
  if (lockBuffer.length >= 4) return;
  lockBuffer += key;
  updateDots();
  if (lockBuffer.length === 4) {
    setTimeout(checkPasscode, 120);
  }
}

function lockDelete() {
  lockBuffer = lockBuffer.slice(0, -1);
  updateDots();
  document.getElementById('lockError').textContent = '';
}

function updateDots() {
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById('dot' + i);
    dot.classList.remove('filled', 'error');
    if (i < lockBuffer.length) dot.classList.add('filled');
  }
}

function checkPasscode() {
  if (lockBuffer === PASSCODE) {
    // 성공: 잠금 해제
    sessionStorage.setItem('unlocked', '1');
    const screen = document.getElementById('lockScreen');
    screen.style.opacity = '0';
    screen.style.transition = 'opacity .4s ease';
    setTimeout(() => screen.classList.add('hidden'), 400);
  } else {
    // 실패: 흔들기 + 빨간 점
    lockFailed++;
    for (let i = 0; i < 4; i++) {
      document.getElementById('dot' + i).classList.add('error');
    }
    document.getElementById('lockBox').classList.add('shake');
    const msg = lockFailed >= 3
      ? `비밀번호가 틀렸습니다 (${lockFailed}회 오류)`
      : '비밀번호가 틀렸습니다';
    document.getElementById('lockError').textContent = msg;
    setTimeout(() => {
      lockBuffer = '';
      updateDots();
      document.getElementById('lockBox').classList.remove('shake');
    }, 500);
  }
}

// 숫자패드 키보드 지원
document.addEventListener('keydown', e => {
  const ls = document.getElementById('lockScreen');
  if (!ls || ls.classList.contains('hidden')) return;
  if (e.key >= '0' && e.key <= '9') lockInput(e.key);
  if (e.key === 'Backspace') lockDelete();
  if (e.key === '*') lockInput('*');
});

function initLockScreen() {
  // 세션 내 이미 해제했으면 바로 통과
  if (sessionStorage.getItem('unlocked') === '1') {
    document.getElementById('lockScreen').classList.add('hidden');
  }
}

/* ===== NAVIGATION ===== */
function showPage(pageId, el) {
  // 모든 페이지 숨기기
  document.querySelectorAll('.section-page').forEach(p => p.classList.remove('active'));
  // 선택 페이지 표시
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  // 네비 active 상태
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');

  // 모바일이면 사이드바 닫기
  if (window.innerWidth <= 900) closeSidebar();

  // 페이지별 초기화
  if (pageId === 'home') initHome();
}

/* ===== SIDEBAR MOBILE ===== */
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebarOverlay');
  sb.classList.toggle('open');
  ov.classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

/* ===== D-DAY COUNTER ===== */
function updateDDay() {
  const target = new Date('2026-06-12T06:00:00');
  const now = new Date();
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  const el = document.getElementById('ddayCount');
  if (!el) return;
  if (diff > 0) el.textContent = 'D-' + diff;
  else if (diff === 0) el.textContent = 'D-Day!';
  else el.textContent = '선교중 🙏';
}

/* ===== HOME INIT ===== */
function initHome() {
  const members = document.querySelectorAll('#teamGrid .member-card');
  const el = document.getElementById('memberCount');
  if (el) el.textContent = members.length;
}

/* ===== NOTICE ===== */
const noticeData = [
  {
    type: 'important', title: '여권 사본 및 보험 증서 제출 안내',
    date: '2026.05.20', author: '팀장',
    content: `안녕하세요, 팀원 여러분! 🙏\n\n출발 전 아래 두 가지 서류를 반드시 제출해 주시기 바랍니다.\n\n📌 제출 서류\n1. 여권 사본 (유효기간 6개월 이상 확인 필수)\n2. 해외여행자보험 가입 증서\n\n📌 제출 방법\n팀 단체 카카오톡 채팅방에 사진으로 업로드 또는 총무에게 직접 제출\n\n📌 마감일: 2026년 5월 31일 (금)\n\n기한 내 미제출 시 출발에 차질이 생길 수 있으니 반드시 기한을 지켜주세요. 감사합니다!`
  },
  {
    type: 'general', title: '선교 준비물 최종 체크리스트 공유',
    date: '2026.05.15', author: '총무',
    content: `팀원 여러분, 준비물 체크리스트를 최종 공유드립니다.\n\n✅ 필수 준비물\n- 여권 (유효기간 6개월 이상)\n- 여권 사본 2부\n- 여행자보험 증서\n- 현지 통화 (포린트) 또는 카드\n- 상비약 (해열제, 소화제, 지사제, 진통제)\n- 변환 플러그 (유럽형 C타입)\n\n✅ 선교 용품\n- 성경, 큐티 교재\n- 간증 자료 / 전도지\n- 한국 소개 자료 (문화 교류용)\n\n더 자세한 내용은 "준비 문서" 탭을 확인해 주세요!`
  },
  {
    type: 'general', title: '선교지 현지 교회 소개 및 협력 사역 개요',
    date: '2026.05.10', author: '선교부',
    content: `헝가리 현지에서 협력할 교회 및 사역 내용을 안내드립니다.\n\n🇭🇺 협력 교회\n부다페스트 소재 현지 한인 교회 및 현지인 교회와 연합하여 사역합니다.\n\n🤝 사역 내용\n1. 어린이 여름 성경학교 (VBS)\n2. 영어 회화 카페 (복음 나눔)\n3. 노숙인·취약계층 섬김 봉사\n4. 거리 전도 및 중보기도\n5. 찬양 & 간증 집회\n\n더 자세한 내용은 선교 오리엔테이션에서 안내드리겠습니다.`
  },
  {
    type: 'general', title: '헝가리 문화·예절 기본 안내',
    date: '2026.05.08', author: '선교부',
    content: `헝가리 방문 전 알아두면 좋은 문화와 예절을 안내드립니다.\n\n🇭🇺 헝가리 기본 정보\n- 수도: 부다페스트\n- 언어: 헝가리어 (Magyar)\n- 통화: 포린트 (HUF)\n- 시차: 한국보다 7시간 느림 (서머타임 기간)\n\n🤝 예절 및 문화\n- 악수가 일반적인 인사\n- 교회 방문 시 단정한 복장 필수\n- 음식을 남기는 것은 실례가 될 수 있음\n- 헝가리어로 인사하면 현지인들이 매우 좋아함\n  * 안녕하세요: "Jó napot kívánok" (요 너폿 키버녹)\n  * 감사합니다: "Köszönöm" (쾨쇠놈)\n\n현지에서 겸손하고 열린 마음으로 섬겨주세요! 🙏`
  }
];

function openNoticeModal(idx) {
  const all = [...noticeData, ...userNotices];
  const n = all[idx];
  if (!n) return;
  openModal(n.title, n.content.replace(/\n/g, '<br>'));
}

let userNotices = [];
function addNotice() {
  const title = document.getElementById('noticeTitle').value.trim();
  const content = document.getElementById('noticeContent').value.trim();
  const type = document.getElementById('noticeType').value;
  if (!title || !content) { alert('제목과 내용을 입력해 주세요.'); return; }

  const typeMap = { important: 'badge-important', new: 'badge-new', general: 'badge-general' };
  const labelMap = { important: '중요', new: 'NEW', general: '일반' };
  const idx = noticeData.length + userNotices.length;
  userNotices.push({ type, title, content, date: today(), author: '팀원' });

  const list = document.getElementById('noticeList');
  const li = document.createElement('li');
  li.className = 'notice-item';
  li.onclick = () => openNoticeModal(idx);
  li.innerHTML = `
    <span class="notice-badge ${typeMap[type]}">${labelMap[type]}</span>
    <div style="flex:1">
      <div class="notice-title">${escHtml(title)}</div>
      <div class="notice-date">${today()} · 팀원</div>
    </div>
    <span style="color:var(--text-muted);font-size:18px;">›</span>`;
  list.appendChild(li);

  document.getElementById('noticeTitle').value = '';
  document.getElementById('noticeContent').value = '';
  showToast('✅ 공지가 등록되었습니다!');
}

/* ===== PRAYER ===== */
let userPrayers = [];
function addPrayer() {
  const title   = document.getElementById('prayerTitle').value.trim();
  const content = document.getElementById('prayerContent').value.trim();
  const cat     = document.getElementById('prayerCategory').value;
  const verse   = document.getElementById('prayerVerse').value.trim();
  if (!title || !content) { alert('제목과 내용을 입력해 주세요.'); return; }

  userPrayers.push({ title, content, cat, verse });

  // 기도제목 탭 첫 번째 컬럼에 추가
  const col = document.querySelector('#page-prayer .grid-2 > div');
  const card = document.createElement('div');
  card.className = 'prayer-card';
  card.innerHTML = `
    <div class="prayer-category">🙏 ${escHtml(cat)}</div>
    <h3>${escHtml(title)}</h3>
    <p>${escHtml(content)}</p>
    ${verse ? `<div class="prayer-verse">📖 ${escHtml(verse)}</div>` : ''}`;
  col.appendChild(card);

  document.getElementById('prayerTitle').value = '';
  document.getElementById('prayerContent').value = '';
  document.getElementById('prayerVerse').value = '';
  showToast('🙏 기도제목이 등록되었습니다!');
}

/* ===== TEAM MEMBERS ===== */
const EMOJIS = ['😊','🙌','✨','🌟','💪','🎵','📸','🌿','🙏','🌍','🎉','💡'];
function addMember() {
  const name  = document.getElementById('memberName').value.trim();
  const role  = document.getElementById('memberRole').value.trim();
  const desc  = document.getElementById('memberDesc').value.trim();
  const pray  = document.getElementById('memberPray').value.trim();
  if (!name) { alert('이름을 입력해 주세요.'); return; }

  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  const grid  = document.getElementById('teamGrid');
  const card  = document.createElement('div');
  card.className = 'member-card';
  card.innerHTML = `
    <div class="member-avatar">${emoji}</div>
    <div class="member-name">${escHtml(name)}</div>
    <div class="member-role">${escHtml(role || '팀원')}</div>
    <div class="member-desc">${escHtml(desc || '')}</div>
    ${pray ? `<div class="member-pray"><strong>기도제목:</strong> ${escHtml(pray)}</div>` : ''}`;
  grid.appendChild(card);

  document.getElementById('memberName').value = '';
  document.getElementById('memberRole').value = '';
  document.getElementById('memberDesc').value = '';
  document.getElementById('memberPray').value = '';

  // 대시보드 팀원 수 업데이트
  const cnt = document.getElementById('memberCount');
  if (cnt) cnt.textContent = document.querySelectorAll('#teamGrid .member-card').length;

  showToast('👤 팀원이 추가되었습니다!');
}

/* ===== DOCUMENTS CHECKLIST ===== */
const CHECKLIST = [
  { cat: '여행 서류', items: ['여권 (유효기간 6개월↑)', '여권 사본 2부', '보험 증서', '비상 연락망 인쇄본'] },
  { cat: '의약품', items: ['해열제', '소화제', '지사제', '진통제', '연고·밴드'] },
  { cat: '전자기기', items: ['스마트폰 + 충전기', '변환 플러그 (C타입)', '보조배터리', '카메라 (선택)'] },
  { cat: '선교 용품', items: ['성경', '큐티 교재', '간증 자료', '전도지', '한국 문화 소개 자료'] },
  { cat: '의류', items: ['편한 활동복 7벌', '단정한 예배복', '우비 또는 우산', '운동화'] },
  { cat: '기타', items: ['현지 통화 / 카드', '소형 배낭', '세면도구', '간식'] },
];

function renderChecklist() {
  const grid = document.getElementById('checklistGrid');
  if (!grid) return;
  grid.innerHTML = '';
  CHECKLIST.forEach(group => {
    const col = document.createElement('div');
    col.innerHTML = `<div style="font-size:12px;font-weight:700;color:var(--primary);margin-bottom:8px;padding:4px 0;border-bottom:1px solid var(--border);">${group.cat}</div>`;
    group.items.forEach((item, i) => {
      const id = `chk-${group.cat}-${i}`;
      const row = document.createElement('label');
      row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:5px 0;cursor:pointer;font-size:13px;';
      row.innerHTML = `<input type="checkbox" id="${id}" style="accent-color:var(--primary);width:15px;height:15px;" /> ${escHtml(item)}`;
      col.appendChild(row);
    });
    grid.appendChild(col);
  });
}

function docAlert(e, name) {
  e.preventDefault();
  showToast(`📄 "${name}" 파일을 준비 중입니다. 곧 업로드됩니다!`);
}

/* ===== GALLERY ===== */
function filterGallery(cat) {
  const items = document.querySelectorAll('#galleryGrid .gallery-item');
  items.forEach(item => {
    if (cat === 'all' || item.dataset.category === cat) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
  // 버튼 상태
  document.querySelectorAll('[id^="filter-"]').forEach(btn => {
    btn.className = 'btn btn-secondary btn-sm';
  });
  const active = document.getElementById('filter-' + cat);
  if (active) active.className = 'btn btn-primary btn-sm';
}

function uploadPhotos(event) {
  const files = event.target.files;
  if (!files.length) return;
  const grid = document.getElementById('galleryGrid');
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.dataset.category = 'mission';
      item.innerHTML = `
        <img src="${e.target.result}" alt="${escHtml(file.name)}" />
        <div class="gallery-overlay">🔍 크게 보기</div>`;
      item.onclick = () => openModal('📸 ' + file.name, `<img src="${e.target.result}" alt="" style="width:100%;border-radius:8px;" />`);
      grid.appendChild(item);
    };
    reader.readAsDataURL(file);
  });
  showToast(`📸 사진 ${files.length}장이 업로드되었습니다!`);
}

function addVideo() {
  const title = document.getElementById('videoUrl').value.trim();
  if (!title) return;
  showToast(`🎬 "${title}" 영상 링크가 추가되었습니다!`);
  document.getElementById('videoUrl').value = '';
}

/* ===== SUPPORT ===== */
function updateSupport() {
  const goal   = parseInt(document.getElementById('goalInput').value) || 0;
  const raised = parseInt(document.getElementById('raisedInput').value) || 0;
  const pct    = goal > 0 ? Math.min(Math.round(raised / goal * 100), 100) : 0;
  const remain = Math.max(goal - raised, 0);

  document.getElementById('goalAmount').textContent   = goal.toLocaleString() + '원';
  document.getElementById('raisedAmount').textContent = raised.toLocaleString() + '원';
  document.getElementById('progressBar').style.width  = pct + '%';
  document.getElementById('progressPct').textContent  = pct + '% 달성';
  document.getElementById('remainAmount').textContent = remain.toLocaleString() + '원 남음';
  showToast('💰 후원 현황이 업데이트되었습니다!');
}

/* ===== REPORTS ===== */
const reportData = [
  {
    title: '📋 2026 헝가리 단기선교 최종 보고서',
    author: '팀장',
    type: '공식 보고서',
    content: '선교를 마치고 전체 여정과 사역 내용, 하나님께서 행하신 일들을 정리한 공식 보고서입니다.\n현지 교회와의 협력, 전도 결과, 팀원 간증 등이 담길 예정입니다.\n\n※ 선교 복귀 후 작성하여 업로드할 예정입니다.'
  }
];
let userReports = [];

function openReportModal(idx) {
  const all = [...reportData, ...userReports];
  const r = all[idx];
  if (!r) return;
  openModal(r.title, `
    <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
      <span style="font-size:12px;background:var(--bg);border:1px solid var(--border);border-radius:4px;padding:2px 8px;">${escHtml(r.type)}</span>
      <span style="font-size:12px;color:var(--text-muted);">작성: ${escHtml(r.author)}</span>
    </div>
    <div style="font-size:14px;line-height:1.8;white-space:pre-wrap;">${escHtml(r.content)}</div>`);
}

function addReport() {
  const title   = document.getElementById('reportTitle').value.trim();
  const author  = document.getElementById('reportAuthor').value.trim();
  const content = document.getElementById('reportContent').value.trim();
  const type    = document.getElementById('reportType').value;
  if (!title || !content) { alert('제목과 내용을 입력해 주세요.'); return; }

  const idx = reportData.length + userReports.length;
  userReports.push({ title, author: author || '익명', content, type });

  const list = document.getElementById('reportList');
  const card = document.createElement('div');
  card.className = 'report-card';
  card.onclick = () => openReportModal(idx);
  const preview = content.length > 120 ? content.slice(0, 120) + '...' : content;
  card.innerHTML = `
    <div class="report-header">
      <div>
        <div class="report-title">${escHtml(title)}</div>
        <div class="report-author">${escHtml(author || '익명')} · ${today()}</div>
      </div>
      <span style="color:var(--text-muted);font-size:20px;flex-shrink:0;">›</span>
    </div>
    <div class="report-preview">${escHtml(preview)}</div>
    <div class="report-tags"><span class="report-tag">${escHtml(type)}</span></div>`;
  list.insertBefore(card, list.firstChild);

  document.getElementById('reportTitle').value = '';
  document.getElementById('reportAuthor').value = '';
  document.getElementById('reportContent').value = '';
  showToast('✍️ 보고서/나눔글이 등록되었습니다!');
}

/* ===== MODAL ===== */
function openModal(title, body) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = body;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModalBtn();
}
function closeModalBtn() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ===== TOAST ===== */
let toastTimer;
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed;bottom:24px;right:24px;
      background:#1A1A2E;color:#fff;
      padding:12px 20px;border-radius:10px;
      font-size:14px;font-weight:500;
      box-shadow:0 4px 20px rgba(0,0,0,.2);
      z-index:999;opacity:0;
      transition:opacity .25s ease, transform .25s ease;
      transform:translateY(8px);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
  }, 2800);
}

/* ===== UTILS ===== */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function today() {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}

/* ===== KEYBOARD ===== */
document.addEventListener('keydown', e => {
  const ls = document.getElementById('lockScreen');
  const isLocked = ls && !ls.classList.contains('hidden');
  if (!isLocked && e.key === 'Escape') closeModalBtn();
});

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initLockScreen();
  updateDDay();
  setInterval(updateDDay, 60000);
  renderChecklist();
  initHome();
});
