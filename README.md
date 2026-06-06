# ⚡ Hamming Code Simülatörü

Bu çalışma, **Bursa Teknik Üniversitesi Bilgisayar Mühendisliği Bölümü, Bilgisayar Mimarisi dersi dönem projesi** kapsamında geliştirilmiştir. Veri iletimi ve bellekte hata denetimi konularında temel bir algoritma olan **Hamming Kodu (Hamming Code)** mekanizmasını görselleştirmeyi ve hatalı bit tespitini anlık olarak simüle etmeyi amaçlayan interaktif bir web uygulamasıdır.

### 🌐 Canlı Demo
Uygulamayı tarayıcınız üzerinden anında denemek için tıklayın: 
**[Simülatörü Çalıştır]( https://berfin-turan.github.io/hamming-code-simulator/)**

---
### 🧠 Hamming Kodu ve Çalışma Mantığı

Hamming kodu, veri iletimi sırasında oluşabilecek tek bitlik hataları **tespit eden** ve **otomatik olarak düzelten (Error Correction Code - ECC)** oldukça verimli bir hata düzeltme algoritmasıdır.

**Algoritmanın Çalışma Prensibi:**

1.  **Kontrol Bitlerinin Yerleşimi:** Veri bloğuna, 2'nin kuvvetleri olan pozisyonlara (1, 2, 4, 8, 16...) "Parite Bitleri" (Kontrol Bitleri) eklenir.
2.  **Parite Bitlerinin Sorumluluk Alanları:**
    * **P1 (1. bit):** 1, 3, 5, 7, 9, 11... gibi **1 ile başlayan** (tek sayılı) pozisyonlardaki bitleri kontrol eder.
    * **P2 (2. bit):** 2, 3, 6, 7, 10, 11... gibi **2. biti dahil eden** gruplardaki bitleri kontrol eder.
    * **P4 (4. bit):** 4, 5, 6, 7, 12, 13... gibi **4. biti dahil eden** gruplardaki bitleri kontrol eder.
    * *Bu mantık, diğer kontrol bitleri (P8, P16...) için de geçerlidir.*
3.  **Hata Tespiti (Sendrom):** Veri alıcıya ulaştığında, kontrol bitleri kendi sorumluluk alanlarındaki verilerle tekrar hesaplanır. Eğer bir uyuşmazlık varsa, hatalı parite toplamları birleşerek **"Sendrom"** değerini oluşturur.
4.  **Otomatik Düzeltme:**
    * Eğer Sendrom değeri `0` ise; hata yoktur, veri sağlamdır.
    * Eğer Sendrom değeri `0`'dan farklıysa; bu sayı doğrudan **hatalı olan bitin indeksini** işaret eder. Sistem, bu indeksteki biti otomatik olarak tersleyerek (0'ı 1, 1'i 0 yaparak) veriyi düzeltir.



*Projem, 8, 16 ve 32-bit uzunluğundaki veriler üzerinde bu süreci anlık olarak XOR mantığıyla işlemekte, hata oluştuğunda "Sendrom" değerini ve hatalı bitin noktasal yerini görselleştirmektedir.*

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
