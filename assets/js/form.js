// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyDYJba0PDzmdCSSZ3CAqK3hf-6Rol7E7LM",
    authDomain: "moca-a257a.firebaseapp.com",
    databaseURL: "https://moca-a257a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "moca-a257a",
    storageBucket: "moca-a257a.firebasestorage.app",
    messagingSenderId: "646464864511",
    appId: "1:646464864511:web:c2dd9480ce29578042ccca",
    measurementId: "G-YFLP2BHKTP"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Fungsi untuk format Firestore Timestamp (seconds) ke format Indonesia
function formatTimestamp(timestamp) {
    // Mengonversi seconds dari Firestore Timestamp ke milidetik
    const date = new Date(timestamp.seconds * 1000); // Mengonversi seconds ke milidetik
  
    // Format tanggal (dd/mm/yyyy)
    const formattedDate = date.toLocaleDateString("id-ID");
  
    // Format waktu (hh:mm:ss)
    const formattedTime = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  
    return `${formattedDate} ${formattedTime}`;
  }
  
  
// Fungsi untuk menambahkan data RSVP ke Firestore
async function tambahRSVP(event) {
    event.preventDefault(); // Mencegah pengiriman form default agar data tetap diproses dengan JS
    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true; // Disable the button
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const attendance = document.getElementById("attendance").value;
    const total = document.getElementById("total").value;

    try {
        await addDoc(collection(db, "rsvp"), {
            datetime: new Date(),
            name: name,
            message: message,
            attendance: attendance,
            total: total
        });
        tampilkanRSVP();
        clearForm();
        pushNotify("success","RSVP berhasil dikirim!",'')
        
    } catch (error) {
        console.error("Error menambahkan RSVP: ", error);
        submitButton.disabled = false; // Disable the button
    }
}

// Fungsi untuk membaca data RSVP dari Firestore dan menampilkannya di halaman
async function tampilkanRSVP() {
    try {
        // Menyusun query untuk mengurutkan data berdasarkan datetime yang terbaru
        const rsvpQuery = query(collection(db, "rsvp"), orderBy("datetime", "desc"));
        const querySnapshot = await getDocs(rsvpQuery);

        const ucapanContainer = document.getElementById("ucapan"); // Mendapatkan elemen kontainer dari HTML
        ucapanContainer.innerHTML = ""; // Membersihkan kontainer sebelumnya

        // Iterasi melalui setiap dokumen dalam query
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Mengambil nilai yang akan digunakan
            const datetime = formatTimestamp(data.datetime) || "Tidak ada nama"; // Default jika Name kosong
            const name = toTitleCase(data.name) || "Tidak ada nama"; // Default jika Name kosong
            const message = data.message || "Tidak ada pesan"; // Default jika Message kosong
            const attendanceIcon = data.attendance === "Hadir"
                ? "bxs-badge-check text-success"
                : "bxs-x-circle text-danger";

            // Menyusun HTML menggunakan template literal
            const ucapanHTML = `
                <div class="card p-2 mt-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="user d-flex flex-row">
                            <img src="assets/img/img-bg/user.png" width="30" height="30" class="user-img rounded-circle mt-2 mr-2">
                            <span>
                                <small class="font-weight-bold nameo">
                                    <i class='konfrim bx ${attendanceIcon}'></i> ${name}
                                </small>
                                <br>
                                <div class="msg">"${message}"</div>
                            </span>
                        </div>
                    </div>
                    <div class="action d-flex justify-content-between mt-2 align-items-center">
                        <div class="reply px-4">
                            <small><i class='bx bx-time' style="font-size:12px;"></i> ${datetime}</small>
                        </div>
                    </div>
                </div>
            `;

            // Menambahkan HTML ke dalam kontainer
            ucapanContainer.innerHTML += ucapanHTML;
        });
    } catch (error) {
        console.error("Error saat menampilkan data RSVP:", error);
    }
}

function clearForm() {
    const formGroup = document.getElementById('frm-total');
    const submitButton = document.getElementById("submitButton");
    document.getElementById("name").value = '';       
    document.getElementById("message").value = '';    
    document.getElementById("attendance").value = 'Hadir'; 
    document.getElementById("total").value = '1';     
    submitButton.disabled = false; // Disable the button 
    document.getElementById("total").disabled = false;     
    formGroup.hidden = false; // Disable the button 
}

// Menambahkan event listener untuk menangani submit form
document.getElementById("rsvpForm").addEventListener("submit", tambahRSVP);

// Menambahkan event listener untuk menangani submit form
document.getElementById("btn-rsvp").addEventListener("click", tampilkanUcapan);

// Fungsi untuk menampilkan RSVP
function tampilkanUcapan() {
  const ucapanContainer = document.getElementById("ucapan"); // Mendapatkan elemen kontainer dari HTML

  if (!ucapanContainer || ucapanContainer.innerHTML.trim() === "") {
    tampilkanRSVP();
  } else {
    console.log("Data sudah ditampilkan");
  }
}