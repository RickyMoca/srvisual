const url = "https://script.google.com/macros/s/AKfycbwiQ6HHR6gox7kQY92rdFWR53xIxZx20KNR4huI0YwETeoqAkbidKbZCVpDGNvLpb2w/exec?key=020225";

async function submitForm(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('[type="submit"]');
    const totalSelect = document.getElementById('total');
    const formData = new FormData(form);

    // Menampilkan data input di console
    console.log("Data yang akan dikirim:");
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    // Nonaktifkan tombol submit
    submitButton.disabled = true;
    submitButton.innerText = "Mengirim...";
    submitButton.classList.toggle("animate__bounceOut");

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        console.log("Data sedang dikirim"); // Debug respons setelah parsing

        if (result === "Data added successfully") {
            getData(); // Memanggil getData() untuk memperbarui data setelah berhasil submit
            form.reset();
            totalSelect.disabled = false;
            alert("Data berhasil dikirim!");
        } else {
            alert("Gagal mengirim data: " + result.data);
        }
    } catch (error) {
        console.error("Error:", error); // Debug error
        alert("Error: " + error.message);
    } finally {
        // Aktifkan kembali tombol submit
        submitButton.disabled = false;
        submitButton.innerText = "Submit";
        submitButton.classList.toggle("animate__pulse");
    }
}

document.getElementById('attendance').addEventListener('change', function () {
    const attendanceValue = this.value;
    const totalSelect = document.getElementById('total');
    const hiddenTotal = document.getElementById('hiddenTotal');

    if (attendanceValue === 'Hadir') {
        totalSelect.value = '1'; // Set default value ke 1
        totalSelect.disabled = false; // Aktifkan kembali dropdown
        hiddenTotal.value = totalSelect.value; // Set nilai input tersembunyi
    } else if (attendanceValue === 'Tidak Hadir') {
        totalSelect.value = '0'; // Set value ke 0
        totalSelect.disabled = true; // Nonaktifkan dropdown
        hiddenTotal.value = '0'; // Set nilai input tersembunyi ke 0
    }
});

// Perbarui nilai input tersembunyi saat dropdown diubah
document.getElementById('total').addEventListener('change', function () {
    var hiddenTotal = document.getElementById('hiddenTotal');
    hiddenTotal.value = this.value;
});




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
        const name = toTitleCase(item.Name);

        // Menggunakan template literal untuk menyusun HTML secara langsung
        const ucapanHTML = `

        <div class="card p-2 mt-2">
            <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row">
                    <img src="https://admirenabanza.com/wp-content/uploads/2024/09/Untitled-3-02.png" width="30" height="30" class="user-img rounded-circle mt-2 mr-2">
                    <span>
                    <small class="font-weight-bold nameo"><i class='konfrim bx ${item.Attendance === 'Hadir' ? 'bxs-badge-check text-success' : 'bxs-x-circle text-danger'}'></i>  ${name}</small> 
                    <br><div class="msg">"${item.Message}"</div>
                    </span>
                </div>
            </div>

            <div class="action d-flex justify-content-between mt-2 align-items-center">
                <div class="reply px-4">
                      <small><i class='bx bx-time' style="font-size:12px;"></i> ${formattedDate}</small>
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