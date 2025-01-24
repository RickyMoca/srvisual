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

    document.getElementById('attendance').addEventListener('change', function () {
        const attendanceValue = this.value;
        const totalSelect = document.getElementById('total');
        const hiddenTotal = document.getElementById('hiddenTotal');
        const formGroup = document.getElementById('frm-total');
    
        if (attendanceValue === 'Hadir') {
            totalSelect.value = '1'; // Set default value ke 1
            totalSelect.disabled = false; // Aktifkan kembali dropdown
            hiddenTotal.value = totalSelect.value; // Set nilai input tersembunyi
            formGroup.hidden = false; // Nonaktifkan dropdown
        } else if (attendanceValue === 'Tidak Hadir') {
            totalSelect.value = '0'; // Set value ke 0
            totalSelect.disabled = true; // Nonaktifkan dropdown
            formGroup.hidden = true; // Nonaktifkan dropdown
            hiddenTotal.value = '0'; // Set nilai input tersembunyi ke 0
        }
    });
    
    // Perbarui nilai input tersembunyi saat dropdown diubah
    document.getElementById('total').addEventListener('change', function () {
        var hiddenTotal = document.getElementById('hiddenTotal');
        hiddenTotal.value = this.value;
    });    
    
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
    var guestName2 = getQueryParameter('yth');
    
    // Menampilkan nama tamu jika ada parameter "to"
    if (guestName) {
        document.getElementById('eventDetail2').classList.add('d-none');
        document.getElementById('locDetail2').classList.add('d-none');
        document.getElementById('guestNameSlot').textContent = guestName;
    }else if(guestName2){
        document.getElementById('guestNameSlot').textContent = guestName2;
        document.getElementById('eventDetail').classList.add('d-none');
        document.getElementById('locDetail').classList.add('d-none');
    }else{
        document.getElementById('eventDetail2').classList.add('d-none');
        document.getElementById('locDetail2').classList.add('d-none');
    }


  function pushNotify(type,title,message) {
    new Notify({
      status: type,
      title: title,
      text: message,
      effect: 'fade',
      speed: 300,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 20,
      distance: 20,
      type: 'outline',
      position: 'right top'
    })
  }

