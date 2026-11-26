from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder="..", static_url_path="")

@app.route("/")
def home():
    return send_from_directory("..", "index.html")

# Data 7 Bab Sejarah Nabi Muhammad SAW
SEJARAH_NABI = [
    {
        "id": 1,
        "judul": "1. Kelahiran Sang Nabi",
        "ikon": "🌙",
        "isi": "Nabi Muhammad SAW lahir di Kota Makkah pada hari Senin, 12 Rabiul Awal Tahun Gajah. Ayahnya bernama Abdullah dan ibunya bernama Aminah. Kelahiran beliau membawa cahaya rahmat bagi seluruh alam semesta."
    },
    {
        "id": 2,
        "judul": "2. Masa Kecil Nabi",
        "ikon": "🐑",
        "isi": "Sejak kecil Nabi Muhammad SAW sudah menjadi anak yatim piatu. Beliau diasuh oleh kakeknya Abdul Muthalib, lalu pamannya Abu Thalib. Sejak kecil beliau rajin membantu menggembalakan kambing dan dikenal sangat jujur."
    },
    {
        "id": 3,
        "judul": "3. Pemuda Al-Amin",
        "ikon": "🤝",
        "isi": "Saat beranjak dewasa, penduduk Makkah memberi beliau gelar 'Al-Amin' yang artinya orang yang dapat dipercaya. Beliau berdagang dengan jujur hingga ke negeri Syam dan sangat dicintai masyarakat."
    },
    {
        "id": 4,
        "judul": "4. Wahyu Pertama",
        "ikon": "📖",
        "isi": "Pada usia 40 tahun, saat menyendiri di Gua Hira, Malaikat Jibril datang menyampaikan wahyu pertama yaitu Surah Al-Alaq ayat 1–5 ('Iqra' yang artinya Bacalah). Sejak saat itu beliau resmi diangkat menjadi Nabi dan Rasul."
    },
    {
        "id": 5,
        "judul": "5. Dakwah Pertama (Sembunyi-sembunyi)",
        "ikon": "🤫",
        "isi": "Selama 3 tahun pertama, Nabi berdakwah secara sembunyi-sembunyi kepada keluarga dan sahabat terdekat. Orang-orang pertama yang masuk Islam disebut Assabiqunal Awwalun, seperti Khadijah, Ali bin Abi Thalib, dan Abu Bakar."
    },
    {
        "id": 6,
        "judul": "6. Dakwah Terang-terangan",
        "ikon": "📢",
        "isi": "Setelah turun perintah Allah SWT, Nabi mulai berdakwah secara terang-terangan di Bukit Shafa. Meski mendapat banyak ejekan dan rintangan dari kaum Quraisy, beliau tetap sabar dan tidak pernah membalas keburukan dengan keburukan."
    },
    {
        "id": 7,
        "judul": "7. Perjuangan Dakwah dan Hijrah",
        "ikon": "🐪",
        "isi": "Karena tekanan di Makkah semakin berat, Allah memerintahkan Nabi dan kaum Muslimin untuk hijrah (pindah) ke Kota Madinah. Di Madinah, beliau disambut hangat dengan syair Thala'al Badru dan membangun masyarakat Islam yang damai."
    }
]

# Data Soal Quiz untuk Kelas 3-4 SD
QUIZ_DATA = [
    {
        "tanya": "Apa arti gelar 'Al-Amin' yang diberikan kepada Nabi Muhammad SAW?",
        "pilihan": ["Orang yang kaya raya", "Orang yang dapat dipercaya", "Orang yang paling kuat", "Orang yang suka berpergian"],
        "jawaban": 1
    },
    {
        "tanya": "Di gua manakah Nabi Muhammad SAW menerima wahyu pertama?",
        "pilihan": ["Gua Tsur", "Gua Hira", "Gua Kahfi", "Gua Uhud"],
        "jawaban": 1
    },
    {
        "tanya": "Surah apa yang pertama kali diturunkan kepada Nabi Muhammad SAW?",
        "pilihan": ["Al-Fatihah", "Al-Ikhlas", "Al-Alaq ayat 1-5", "An-Nas"],
        "jawaban": 2
    },
    {
        "tanya": "Ke kota manakah Nabi Muhammad SAW dan umat Islam melakukan hijrah?",
        "pilihan": ["Mesir", "Syam", "Thaif", "Madinah"],
        "jawaban": 3
    },
    {
        "tanya": "Siapakah sahabat sekaligus paman yang mengasuh Nabi setelah kakeknya wafat?",
        "pilihan": ["Abu Lahab", "Abu Thalib", "Abu Jahal", "Hamzah"],
        "jawaban": 1
    }
]

@app.route("/api/sejarah", methods=["GET"])
def get_sejarah():
    return jsonify(SEJARAH_NABI)

@app.route("/api/quiz", methods=["GET"])
def get_quiz():
    return jsonify(QUIZ_DATA)

if __name__ == "__main__":
    app.run(debug=True)