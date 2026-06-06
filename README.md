# ⚡ Hamming Code Simülatörü

Bu çalışma, **Bursa Teknik Üniversitesi Bilgisayar Mühendisliği Bölümü, Bilgisayar Mimarisi dersi dönem projesi** kapsamında geliştirilmiştir. Veri iletimi ve bellekte hata denetimi konularında temel bir algoritma olan **Hamming Kodu (Hamming Code)** mekanizmasını görselleştirmeyi ve hatalı bit tespitini anlık olarak simüle etmeyi amaçlayan interaktif bir web uygulamasıdır.

### 🌐 Canlı Demo
Uygulamayı tarayıcınız üzerinden anında denemek için tıklayın: 
**[Simülatörü Çalıştır]( https://berfin-turan.github.io/hamming-code-simulator/)**

---

## 🚀 Özellikler

- **Dinamik Veri Boyutu:** 8-Bit, 16-Bit ve 32-Bit veri modları arasında tam uyumlu geçiş ve anlık parite (kontrol biti) hesaplaması.
- **İnteraktif Tuval (Canvas):** JavaScript HTML5 Canvas kullanılarak çizilen esnek yapı. Kullanıcılar herhangi bir veri veya kontrol bitinin üzerine tıklayarak yapay hata (noise) oluşturabilir.
- **Nokta Atışı Hata Tespiti:** Sendrom kelimesi (Syndrome Word) XOR mantığıyla anlık olarak hesaplanır ve sistem loglarına adım adım yansıtılır.
- **Sistem Logları:** Arka planda çalışan parite bölgesi eşleşmelerini ve tekli/çoklu hata çökmelerini anlık olarak terminal ekranına yansıtır.
- **Modern ve Esnek Arayüz:** Karanlık tema (Dark Mode), VS Code esintili yeşil renk paleti ve her ekrana uyumlu (responsive) tasarım.

## 🛠️ Kullanılan Teknolojiler

- **HTML5:** Sayfa iskeleti ve Canvas entegrasyonu.
- **CSS3:** Flexbox mimarisi ve responsive tasarım.
- **JavaScript (Vanilla JS):** Dinamik dizi yönetimi, XOR mantıksal operatörleri, Canvas API ile render işlemleri ve olay dinleyicileri.

---

## 👨‍💻 Geliştirici
**Berfin Turan** - Bilgisayar Mühendisliği (2. Sınıf)
