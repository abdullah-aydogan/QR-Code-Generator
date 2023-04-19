// Değişkenler
var imgBox = document.getElementById("imgBox");
var qrImage = document.getElementById("qrImage");
var qrText = document.getElementById("qrText");
var download_btn = document.getElementById("download_btn");

// Uygulama açılırken indirme butonu gösterilmiyor.
download_btn.style.display = "none";

// QR Kod Oluşturma Fonksiyonu
function generateQR() {

    // Gelen verinin uzunluğu sıfırdan büyükse
    if (qrText.value.length > 0) {

        // Oluşturulan QR Kod img elementine atanıyor
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" 
            + qrText.value;

        // show-img class ekleniyor
        imgBox.classList.add("show-img");

        // İndirme butonu gösteriliyor
        download_btn.style.display = "block";
    }

    else {

        // error class ekleniyor (error class sallama animasyonu içeriyor)
        qrText.classList.add("error");

        setTimeout(() => {

            // 1000 ms sonra error class kaldırılıyor
            qrText.classList.remove("error");
        }, 1000);
    }
}

// QR Kod İndirme Fonksiyonu
function downloadQR() {

    fetch(qrImage.src).then(res => res.blob()).then(image => {

        // İndirme linki
        var tempURL = URL.createObjectURL(image);

        // a elementi oluşturma
        var a = document.createElement("a");

        // a elementine link atanıyor
        a.href = tempURL;

        // İndirilen dosya ismi
        a.download = "qr_code";

        // a elementi tıklanma olayı tetikleniyor
        a.click();
    });
}