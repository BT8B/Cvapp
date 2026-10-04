# CV Maker

Mobil öncelikli **CV hazırlama** programı (PWA).  
Özgeçmişini düzenle, A4 önizle, PDF indir — ilk yüklemeden sonra çevrimdışı da çalışır.

**Canlı demo:** [https://bt8b.github.io/Cvapp/](https://bt8b.github.io/Cvapp/)

**English:** [README.md](README.md)

---

## Özellikler

| Alan | Ne sunar |
|------|----------|
| **Düzenle / Önizle** | Form ile düzenleme + canlı CV önizlemesi |
| **Bölümler** | Kimlik, özet, deneyim, eğitim, yetkinlikler, sistemler, teknik, özel sidebar başlıkları |
| **Görünüm** | Renk, font, foto konumu/şekli, sayfa çerçevesi, sidebar stilleri, PDF sığdırma |
| **PDF** | Tek tıkla PDF indirme (html2canvas + jsPDF), tarayıcı yazdırma seçeneği |
| **Geri / İleri** | Geçmiş yığını ile güvenli düzenleme |
| **Depolama** | **IndexedDB** (asıl) + localStorage yedek; eski veri otomatik taşınır |
| **Çevrimdışı** | Service worker (`sw.js`) ilk ziyarette uygulamayı cache’ler |
| **Dil** | **TR / EN** arayüz anahtarı (üst bar) |
| **PWA** | Telefona “Ana ekrana ekle” ile kurulabilir |

---

## Nasıl kullanılır?

1. Canlı adresi aç (veya `index.html` dosyasını kendin yayınla).
2. **Düzenle** → Profesyonel / Sidebar / Görünüm sekmelerini doldur.
3. **Önizle** → − / + / Sığdır ile yakınlaştır.
4. **Kaydet** → Veri cihazında saklanır (IndexedDB).
5. **PDF** → A4 PDF indir.

Veriler **kullanıcının cihazında** kalır. Sunucuya yüklenmez.

---

## Dosyalar

```
index.html             Uygulama (arayüz + mantık)
sw.js                  Çevrimdışı service worker
manifest.webmanifest   PWA manifest
icon-192.png / icon-512.png
README.md              İngilizce
README.tr.md           Türkçe
LICENSE                MIT Lisansı
```

---

## Teknoloji

- Tek sayfa: HTML / CSS / Vanilla JS  
- Depolama: IndexedDB + localStorage yedek  
- PDF: html2canvas, jsPDF, html2pdf.js (CDN)  
- Fontlar: Google Fonts (Inter, Source Sans 3, Libre Baskerville)  
- Yayın: GitHub Pages  

---

## Dil (TR / EN)

Sağ üstteki **TR | EN** arayüz dilini değiştirir.  
Tercih `localStorage` içinde saklanır (`cv_app_lang`).  
CV *içeriği* (adın, iş metinlerin) otomatik çevrilmez — sadece program menüleri.

---

## Çevrimdışı notları

- İlk açılışta internet gerekir (uygulama + CDN’ler).  
- Sonraki açılışlar cache + IndexedDB ile offline olabilir.  
- Site verilerini silmek cache’i ve kayıtlı CV’yi siler.  
- GitHub yayınını kapatırsan *yeni* yüklemeler durur; kurulu PWA bir süre eski kopyayı tutabilir.

---

## Yerel kullanım / yayın

**Yerel:** `index.html` dosyasını tarayıcıda aç veya klasörü herhangi bir statik sunucu ile servis et.  
**GitHub Pages:** `main` (veya Pages dalına) push et; site genelde 1–2 dakikada güncellenir.

Güncellemeden sonra eski cache takılırsa sert yenile veya site verilerini temizle.

---

## Lisans

**MIT Lisansı** — ücretsiz kullan, kopyala, değiştir, birleştir, yayınla ve dağıt.

Tam metin için depodaki [LICENSE](LICENSE) dosyasına bak.

---

## Sürüm notları (son)

- Pro mobil kabuk (üst bar, segment sekmeler, renkli alt dock)
- IndexedDB depolama + localStorage geçişi
- Daha güçlü offline cache (`sw.js` v3)
- **TR / EN** arayüz dili
- PDF iyileştirmeleri (tek sayfa, foto konumu)
- Özel sidebar başlıkları (FAB), sırala / gizle / sil
- MIT lisansı
