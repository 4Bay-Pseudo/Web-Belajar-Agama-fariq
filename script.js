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

  currentStudent.nama = namaInput;
  currentStudent.kelas = kelasInput;
  errorMsg.textContent = '';

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
// DATA MATERI & QUIZ (SIAP PAKAI DI VERCEL)
// ==========================================
const DEFAULT_SEJARAH = [
  {
    id: 1,
    judul: "1. Kelahiran Sang Nabi",
    ikon: "🌙",
    isi: "Nabi Muhammad SAW lahir di Kota Makkah pada hari Senin, 12 Rabiul Awal Tahun Gajah. Ayahnya bernama Abdullah dan ibunya bernama Aminah. Kelahiran beliau membawa cahaya rahmat bagi seluruh alam semesta."
  },
  {
    id: 2,
    judul: "2. Masa Kecil Nabi",
    ikon: "🐑",
    isi: "Sejak kecil Nabi Muhammad SAW sudah menjadi anak yatim piatu. Beliau diasuh oleh kakeknya Abdul Muthalib, lalu pamannya Abu Thalib. Sejak kecil beliau rajin membantu menggembalakan kambing dan dikenal sangat jujur."
  },
  {
    id: 3,
    judul: "3. Pemuda Al-Amin",
    ikon: "🤝",
    isi: "Saat beranjak dewasa, penduduk Makkah memberi beliau gelar 'Al-Amin' yang artinya orang yang dapat dipercaya. Beliau berdagang dengan jujur hingga ke negeri Syam dan sangat dicintai masyarakat."
  },
  {
    id: 4,
    judul: "4. Wahyu Pertama",
    ikon: "📖",
    isi: "Pada usia 40 tahun, saat menyendiri di Gua Hira, Malaikat Jibril datang menyampaikan wahyu pertama yaitu Surah Al-Alaq ayat 1–5 ('Iqra' yang artinya Bacalah). Sejak saat itu beliau resmi diangkat menjadi Nabi dan Rasul."
  },
  {
    id: 5,
    judul: "5. Dakwah Pertama (Sembunyi-sembunyi)",
    ikon: "🤫",
    isi: "Selama 3 tahun pertama, Nabi berdakwah secara sembunyi-sembunyi kepada keluarga dan sahabat terdekat. Orang-orang pertama yang masuk Islam disebut Assabiqunal Awwalun, seperti Khadijah, Ali bin Abi Thalib, dan Abu Bakar."
  },
  {
    id: 6,
    judul: "6. Dakwah Terang-terangan",
    ikon: "📢",
    isi: "Setelah turun perintah Allah SWT, Nabi mulai berdakwah secara terang-terangan di Bukit Shafa. Meski mendapat banyak ejekan dan rintangan dari kaum Quraisy, beliau tetap sabar dan tidak pernah membalas keburukan dengan keburukan."
  },
  {
    id: 7,
    judul: "7. Perjuangan Dakwah dan Hijrah",
    ikon: "🐪",
    isi: "Karena tekanan di Makkah semakin berat, Allah memerintahkan Nabi dan kaum Muslimin untuk hijrah (pindah) ke Kota Madinah. Di Madinah, beliau disambut hangat dengan syair Thala'al Badru dan membangun masyarakat Islam yang damai."
  }
];

const DEFAULT_QUIZ = [
  {
    tanya: "Apa arti gelar 'Al-Amin' yang diberikan kepada Nabi Muhammad SAW?",
    pilihan: ["Orang yang kaya raya", "Orang yang dapat dipercaya", "Orang yang paling kuat", "Orang yang suka berpergian"],
    jawaban: 1
  },
  {
    tanya: "Di gua manakah Nabi Muhammad SAW menerima wahyu pertama?",
    pilihan: ["Gua Tsur", "Gua Hira", "Gua Kahfi", "Gua Uhud"],
    jawaban: 1
  },
  {
    tanya: "Surah apa yang pertama kali diturunkan kepada Nabi Muhammad SAW?",
    pilihan: ["Al-Fatihah", "Al-Ikhlas", "Al-Alaq ayat 1-5", "An-Nas"],
    jawaban: 2
  },
  {
    tanya: "Ke kota manakah Nabi Muhammad SAW dan umat Islam melakukan hijrah?",
    pilihan: ["Mesir", "Syam", "Thaif", "Madinah"],
    jawaban: 3
  },
  {
    tanya: "Siapakah sahabat sekaligus paman yang mengasuh Nabi setelah kakeknya wafat?",
    pilihan: ["Abu Lahab", "Abu Thalib", "Abu Jahal", "Hamzah"],
    jawaban: 1
  }
];

// ==========================================
// 1. SEJARAH NABI MUHAMMAD SAW
// ==========================================
let dataSejarah = [];

async function openSejarah() {
  goToScreen('screen-sejarah');
  const listContainer = document.getElementById('sejarah-list');

  if (dataSejarah.length === 0) {
    try {
      const response = await fetch('/api/sejarah');
      if (!response.ok) throw new Error('API tidak merespons');
      dataSejarah = await response.json();
    } catch (err) {
      // Gunakan data lokal jika API serverless tidak aktif
      dataSejarah = DEFAULT_SEJARAH;
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
// 2. QUIZ CERDAS CERMAT
// ==========================================
let quizList = [];
let currentQuizIdx = 0;
let quizScore = 0;

async function openQuiz() {
  goToScreen('screen-quiz');
  currentQuizIdx = 0;
  quizScore = 0;

  if (quizList.length === 0) {
    try {
      const res = await fetch('/api/quiz');
      if (!res.ok) throw new Error('API tidak merespons');
      quizList = await res.json();
    } catch (err) {
      // Gunakan soal quiz lokal jika API serverless tidak aktif
      quizList = DEFAULT_QUIZ;
    }
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
// 3. PERMAINAN EDUKATIF: TEBAK KATA ISLAMI (5 SOAL)
// ==========================================
const gameWords = [
  { word: "ALAMIN", clue: "Gelar Nabi Muhammad SAW yang artinya orang yang dapat dipercaya" },
  { word: "HIJRAH", clue: "Perpindahan Nabi Muhammad SAW dari Kota Makkah ke Madinah" },
  { word: "IQRA", clue: "Kata pertama dalam wahyu pertama yang artinya 'Bacalah'" },
  { word: "JIBRIL", clue: "Malaikat yang menyampaikan wahyu Allah kepada para Nabi" },
  { word: "MAKKAH", clue: "Kota tempat kelahiran Nabi Muhammad SAW" }
];

let wordIdx = 0;
let userGuess = [];

function openGame() {
  goToScreen('screen-game');
  wordIdx = 0;
  setupWord();
}

function setupWord() {
  const gameCard = document.querySelector('#screen-game .game-card');

  // Jika sudah menyelesaikan ke-5 soal, tampilkan layar selesai
  if (wordIdx >= gameWords.length) {
    gameCard.innerHTML = `
      <div style="text-align:center; padding: 20px 0;">
        <div style="font-size: 3.8rem;">🎊🌟🎮</div>
        <h3>MasyaAllah, Hebat Sekali ${currentStudent.nama} (${currentStudent.kelas})!</h3>
        <p style="font-size:1.15rem; margin: 14px 0;">Kamu telah berhasil menyelesaikan semua <strong>${gameWords.length} tantangan</strong> Tebak Kata Islami!</p>
        <button class="btn btn-primary" style="margin-top:12px;" onclick="restartGame()">Main Game Lagi 🔄</button>
      </div>
    `;
    return;
  }

  // Kembalikan struktur awal kartu game jika dimainkan ulang
  if (!document.getElementById('game-clue')) {
    gameCard.innerHTML = `
      <h2>🎮 Game Tebak Kata Islami</h2>
      <p>Susun huruf-huruf acak di bawah ini menjadi kata yang benar sesuai petunjuk!</p>
      <div class="game-clue-box">
        <strong>Soal ${wordIdx + 1} dari ${gameWords.length} — Petunjuk:</strong> <span id="game-clue"></span>
      </div>
      <div id="answer-slots" class="word-slots"></div>
      <div id="letter-bank" class="letter-buttons"></div>
      <p id="game-feedback" class="feedback-msg"></p>
      <div class="game-controls">
        <button class="btn btn-small" onclick="resetCurrentWord()">🔄 Ulangi Kata</button>
        <button class="btn btn-primary" onclick="nextWord()">Kata Berikutnya ➡️</button>
      </div>
    `;
  } else {
    document.querySelector('.game-clue-box strong').textContent = `Soal ${wordIdx + 1} dari ${gameWords.length} — Petunjuk:`;
  }

  const current = gameWords[wordIdx];
  userGuess = [];
  document.getElementById('game-clue').textContent = current.clue;
  document.getElementById('game-feedback').textContent = '';

  const slotsContainer = document.getElementById('answer-slots');
  slotsContainer.innerHTML = '';
  for (let i = 0; i < current.word.length; i++) {
    const div = document.createElement('div');
    div.className = 'slot';
    div.id = `slot-${i}`;
    slotsContainer.appendChild(div);
  }

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
      feedback.textContent = '🎉 MasyaAllah Benar! Klik Kata Berikutnya ya!';
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
  wordIdx++;
  setupWord();
}

function restartGame() {
  wordIdx = 0;
  setupWord();
}
