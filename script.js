// ==========================================
// 0. SISTEM ABSENSI / LOGIN MURID
// ==========================================
let currentStudent = {
  nama: "Sahabat Cilik",
  kelas: "Kelas 3 SD"
};

function handleLogin(event) {
  event.preventDefault();

  const namaInput = document.getElementById('nama-murid').value.trim();
  const kelasInput = document.getElementById('kelas-murid').value;
  const errorMsg = document.getElementById('login-error');

  if (!namaInput || !kelasInput) {
    errorMsg.textContent = '😅 Yuk isi nama dan pilih kelasmu dulu ya!';
    return;
  }

  // Simpan nama & kelas murid ke memori sementara
  currentStudent.nama = namaInput;
  currentStudent.kelas = kelasInput;
  errorMsg.textContent = '';

  // Tampilkan sapaan personal di halaman sambutan & header
  document.getElementById('welcome-title').textContent = `Assalamu'alaikum, ${currentStudent.nama}!`;
  document.getElementById('welcome-badge').textContent = `🎒 ${currentStudent.kelas}`;
  
  const headerInfo = document.getElementById('header-student-info');
  if (headerInfo) {
    headerInfo.textContent = `${currentStudent.nama} (${currentStudent.kelas})`;
  }

  goToScreen('screen-welcome');
}

function logout() {
  document.getElementById('nama-murid').value = '';
  document.getElementById('kelas-murid').value = '';
  document.getElementById('login-error').textContent = '';
  goToScreen('screen-login');
}

// Navigasi Antar Halaman
function goToScreen(screenId) {
  document.querySelectorAll('.screen').forEach(sec => sec.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}

// ==========================================
// 1. SEJARAH NABI MUHAMMAD SAW (Ambil dari Python API)
// ==========================================
let dataSejarah = [];

async function openSejarah() {
  goToScreen('screen-sejarah');
  const listContainer = document.getElementById('sejarah-list');

  if (dataSejarah.length === 0) {
    try {
      const response = await fetch('/api/sejarah');
      dataSejarah = await response.json();
    } catch (err) {
      listContainer.innerHTML = '<p>Gagal memuat materi dari server.</p>';
      return;
    }
  }

  listContainer.innerHTML = '';
  dataSejarah.forEach((bab, index) => {
    const btn = document.createElement('button');
    btn.className = 'bab-btn';
    btn.innerHTML = `${bab.ikon} ${bab.judul}`;
    btn.onclick = () => showBabDetail(index, btn);
    listContainer.appendChild(btn);
  });
}

function showBabDetail(index, clickedBtn) {
  document.querySelectorAll('.bab-btn').forEach(b => b.classList.remove('selected'));
  clickedBtn.classList.add('selected');

  const bab = dataSejarah[index];
  document.getElementById('reader-icon').textContent = bab.ikon;
  document.getElementById('reader-title').textContent = bab.judul;
  document.getElementById('reader-content').textContent = bab.isi;
  document.getElementById('sejarah-reader').classList.remove('hidden');
}

// ==========================================
// 2. QUIZ CERDAS CERMAT (Ambil dari Python API)
// ==========================================
let quizList = [];
let currentQuizIdx = 0;
let quizScore = 0;

async function openQuiz() {
  goToScreen('screen-quiz');
  currentQuizIdx = 0;
  quizScore = 0;

  if (quizList.length === 0) {
    const res = await fetch('/api/quiz');
    quizList = await res.json();
  }
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-container');
  if (currentQuizIdx >= quizList.length) {
    const nilai = Math.round((quizScore / quizList.length) * 100);
    container.innerHTML = `
      <div style="text-align:center; padding: 20px 0;">
        <div style="font-size: 3.5rem;">🎉🌟🏆</div>
        <h3>MasyaAllah, Hebat Sekali ${currentStudent.nama} (${currentStudent.kelas})!</h3>
        <p style="font-size:1.2rem; margin: 12px 0;">Kamu menjawab benar <strong>${quizScore} dari ${quizList.length}</strong> soal.</p>
        <p style="font-size:1.5rem; font-weight:800; color:#2e7d32;">Nilai Kamu: ${nilai}</p>
        <button class="btn btn-primary" style="margin-top:16px;" onclick="openQuiz()">Main Quiz Lagi 🔄</button>
      </div>
    `;
    return;
  }

  const q = quizList[currentQuizIdx];
  let optionsHtml = q.pilihan.map((opt, idx) => `
    <button class="quiz-option" onclick="submitQuizAnswer(${idx})">${String.fromCharCode(65 + idx)}. ${opt}</button>
  `).join('');

  container.innerHTML = `
    <p style="color:#607d8b; font-weight:700;">Soal ${currentQuizIdx + 1} dari ${quizList.length}</p>
    <p class="quiz-question">${q.tanya}</p>
    <div>${optionsHtml}</div>
  `;
}

function submitQuizAnswer(selectedIdx) {
  if (selectedIdx === quizList[currentQuizIdx].jawaban) {
    quizScore++;
  }
  currentQuizIdx++;
  renderQuizQuestion();
}

// ==========================================
// 3. PERMAINAN EDUKATIF: TEBAK KATA ISLAMI
// ==========================================
const gameWords = [
  { word: "ALAMIN", clue: "Gelar Nabi Muhammad SAW yang artinya orang yang dapat dipercaya" },
  { word: "HIJRAH", clue: "Perpindahan Nabi Muhammad SAW dari Kota Makkah ke Madinah" },
  { word: "IQRA", clue: "Kata pertama dalam wahyu pertama yang artinya 'Bacalah'" },
  { word: "JIBRIL", clue: "Malaikat yang menyampaikan wahyu Allah kepada para Nabi" }
];

let wordIdx = 0;
let userGuess = [];

function openGame() {
  goToScreen('screen-game');
  wordIdx = 0;
  setupWord();
}

function setupWord() {
  const current = gameWords[wordIdx];
  userGuess = [];
  document.getElementById('game-clue').textContent = current.clue;
  document.getElementById('game-feedback').textContent = '';

  // Buat kotak kosong sesuai jumlah huruf
  const slotsContainer = document.getElementById('answer-slots');
  slotsContainer.innerHTML = '';
  for (let i = 0; i < current.word.length; i++) {
    const div = document.createElement('div');
    div.className = 'slot';
    div.id = `slot-${i}`;
    slotsContainer.appendChild(div);
  }

  // Acak huruf
  const shuffled = current.word.split('').sort(() => Math.random() - 0.5);
  const bank = document.getElementById('letter-bank');
  bank.innerHTML = '';
  shuffled.forEach((char) => {
    const btn = document.createElement('button');
    btn.className = 'letter-btn';
    btn.textContent = char;
    btn.onclick = () => pickLetter(char, btn);
    bank.appendChild(btn);
  });
}

function pickLetter(char, btn) {
  const targetWord = gameWords[wordIdx].word;
  if (userGuess.length >= targetWord.length) return;

  document.getElementById(`slot-${userGuess.length}`).textContent = char;
  userGuess.push(char);
  btn.disabled = true;

  if (userGuess.length === targetWord.length) {
    const feedback = document.getElementById('game-feedback');
    if (userGuess.join('') === targetWord) {
      feedback.style.color = '#2e7d32';
      feedback.textContent = '🎉 MasyaAllah Benar! Kamu Pintar Sekali!';
    } else {
      feedback.style.color = '#c62828';
      feedback.textContent = '😅 Ups, susunannya belum tepat. Klik Ulangi Kata ya!';
    }
  }
}

function resetCurrentWord() {
  setupWord();
}

function nextWord() {
  wordIdx = (wordIdx + 1) % gameWords.length;
  setupWord();
}