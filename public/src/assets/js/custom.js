const url = "https://script.google.com/macros/s/AKfycbwiQ6HHR6gox7kQY92rdFWR53xIxZx20KNR4huI0YwETeoqAkbidKbZCVpDGNvLpb2w/exec?key=020225";

async function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        console.log("Data sedang dikirim"); // Debug respons setelah parsing

        if (result === "Data added successfully") {
            alert("Data berhasil dikirim!");
            event.target.reset();
            getData(); // Memanggil getData() untuk memperbarui data setelah berhasil submit
        } else {
            alert("Gagal mengirim data: " + result.data);
        }
    } catch (error) {
        console.error("Error:", error); // Debug error
        alert("Error: " + error.message);
    }
}

async function getData() {  
    try {
        // Melakukan request ke API menggunakan fetch
        const response = await fetch(url);
  
        // Cek jika response berhasil
        if (response.ok) {
            const data = await response.json(); // Parsing response ke JSON
            console.log("Data berhasil diambil"); // Menampilkan data di console (untuk debugging)
            displayData(data);
        } else {
            throw new Error("Gagal mendapatkan data: " + response.statusText);
        }
    } catch (error) {
        console.error("Error:", error); // Menampilkan error jika terjadi masalah
        alert("Error: " + error.message);
    }
}

function displayData(data) {
    const ucapanContainer = document.getElementById("ucapan"); // Mendapatkan elemen kontainer yang ada di HTML
    // Kosongkan kontainer terlebih dahulu agar data tidak double
    ucapanContainer.innerHTML = ''; // Menghapus semua konten lama sebelum menambahkan yang baru
    // Membalikkan urutan data untuk menampilkan yang terbaru terlebih dahulu
    data.reverse();
    // Loop untuk setiap item data
    data.forEach(item => {
        // Mengubah format Date_time menjadi lebih mudah dibaca
        const dateObj = new Date(item.Date_time);
        const formattedDate = dateObj.toLocaleString('id-ID', { 
             year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
        });

        // Menggunakan template literal untuk menyusun HTML secara langsung
        const ucapanHTML = `
        <div class="card">
            <div class="card-body">
                <div class="card-title font-weight-bold">`+toTitleCase(`${item.Name}`)+` <span class="badge ${item.Attendance === 'Hadir' ? 'badge-success' : 'badge-danger'}" style="font-size: 0.6rem;">${item.Attendance}</span></div>
                <p class="card-text">${item.Message}</p>
                <div class="card-subtitle text-muted font-weight-light"> 
                    <i class='bx bx-time' style="font-size: 0.6rem;"></i> 
                    <span style="font-size: 0.7rem;">${formattedDate}</span><br>
                </div>
            </div>
        </div>
        `;

        // Menambahkan HTML yang sudah disusun ke dalam kontainer
        ucapanContainer.innerHTML += ucapanHTML;
    });
}


function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(function(word, index) {
            // Jika kata adalah kata yang seharusnya dikapitalisasi, kapitalisasi huruf pertama
            if (index === 0 || ['and', 'or', 'the', 'a', 'in', 'on', 'at', 'for', 'to'].indexOf(word) === -1) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            } else {
                return word;
            }
        })
        .join(' ');
    }
    
    // Fungsi untuk mendapatkan parameter URL secara manual
    function getQueryParameter(param) {
        // Ambil query string dari URL
        var queryString = window.location.search.substring(1);
        var params = queryString.split("&");
        
        // Loop melalui semua parameter
        for (var i = 0; i < params.length; i++) {
            var paramPair = params[i].split("=");
            
            // Jika nama parameter cocok, kembalikan nilainya setelah didekode
            if (paramPair[0] === param) {
                return decodeURIComponent(paramPair[1]);
            }
        }
        // Jika parameter tidak ditemukan, kembalikan null
        return null;
    }
    
    // Ambil parameter "to" dari URL
    var guestName = getQueryParameter('to');
    
    // Menampilkan nama tamu jika ada parameter "to"
    if (guestName) {
        document.getElementById('guestNameSlot').textContent = toTitleCase(guestName);
    }

//   getData();

