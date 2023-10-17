function getDataUser() {

    //1.get data localstorage
    const dataUser = localStorage.getItem('user')
    if(dataUser) {
           //2.Convert data ke object
    const conData = JSON.parse(dataUser)

    //3. display ke dom
    // Foto Profile
    const imgElm = document.getElementById('img_user')
    imgElm.src = conData.imgUrl

    //Full Name
    const fullNameElm = document.getElementById('fullName')
    fullNameElm.innerHTML = conData.fullName

    //username
    const usernameElm = document.getElementById('username')
    usernameElm.innerHTML = conData.username

    //JobTittle
    const jobElm = document.getElementById('job')
    jobElm.innerHTML = conData.job

    //Phone Number
    const phoneElm = document.getElementById('phone')
    phoneElm.innerHTML = conData.phone

    //Email Address
    const emailElm = document.getElementById('email')
    emailElm.innerHTML = conData.email

    //Location
    const locationElm = document.getElementById('location')
    locationElm.innerHTML = conData.location
    } else {
        window.location.href = 'index.html'
    }
 
}

getDataUser()


const taskInput = document.getElementById('taskInput')
const taskList = document.getElementById('taskList')

function addTask() {
    if(taskInput.value === '') {
        alert('Please input your task!')
    } else {
        let li = document.createElement('li')
        li.innerHTML = taskInput.value
        taskList.appendChild(li)
        let span = document.createElement('span')
        span.innerHTML = '\u00d7'
        li.appendChild(span)
        saveData()
    }
    taskInput.value = ''
    saveData()

}

taskList.addEventListener('click', function(e){
    if(e.target.tagName ==='LI'){
        e.target.classList.toggle("checked");
        saveData()    
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        saveData()
    }
})

function saveData() {
    localStorage.setItem('data', taskList.innerHTML ) 
}

function showTask() {
    taskList.innerHTML = localStorage.getItem('data')
}

showTask()



function onLogout() {
    //1. Delete data di local storage dengan key user
    //2. Pindah page ke login 

    localStorage.removeItem('user')
    window.location.href = 'index.html'
}



//tab
// Get the list of tabs and tab content
const tabList = document.getElementById('tab-list');
const tabContent = document.getElementById('tab-content');

// Add a click event listener to the tab list
tabList.addEventListener('click', (e) => {
  if (e.target && e.target.getAttribute('data-tab')) {
    const tabId = e.target.getAttribute('data-tab');

    // Remove the 'hidden' class from the selected tab content and add it to the others
    Array.from(tabContent.children).forEach((tab) => {
      if (tab.id === tabId) {
        tab.classList.remove('hidden');
      } else {
        tab.classList.add('hidden');
      }
    });

    // Add or remove classes to style the selected tab
    Array.from(tabList.children).forEach((tab) => {
      if (tab.getAttribute('data-tab') === tabId) {
        tab.classList.remove('bg-gray-200');
        tab.classList.add('bg-[#FF9C1B]');
      } else {
        tab.classList.remove('bg-[#FF9C1B]');
        tab.classList.add('bg-gray-200');
      }
    });
  }
});



//Notes 
const noteContainer = document.querySelector('.note-container')
const createBtn = document.querySelector('.createBtn')
let note = document.querySelectorAll('.input-box')

function showNotes(){
    noteContainer.innerHTML = localStorage.getItem('note')
}
showNotes()

function updateStorage() {
    localStorage.setItem('note', noteContainer.innerHTML)
}

createBtn.addEventListener('click', ()=>{
    let inputBox = document.createElement('p')
    let img = document.createElement('img')
    inputBox.className = 'input-box'
    inputBox.setAttribute('contenteditable', 'true')
    img.src = './assets/images/notes/delete.svg'
    noteContainer.appendChild(inputBox).appendChild(img)
})

noteContainer.addEventListener('click', function(e){
    if(e.target.tagName === 'IMG'){
        e.target.parentElement.remove()
        updateStorage()
    } else if(e.target.tagName === 'P'){
        note = document.querySelectorAll('.input-box')
        note.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage()
            }
        })
    }

})


document.getElementById('saveButton').addEventListener('click', function () {
    // Mendapatkan nilai dari input tanggal dan tipe jadwal
    const dateInput = document.getElementById('date');
    const scheduleTypeInput = document.getElementById('scheduleType');

    const date = dateInput.value;
    const scheduleType = scheduleTypeInput.value;

    // Validasi input
    if (date === '' || scheduleType === '') {
        alert('Mohon isi kedua kolom dengan benar.');
    } else {
        // Simpan jadwal di localStorage
        const schedule = {
            date: date,
            type: scheduleType,
        };

        const savedSchedules = JSON.parse(localStorage.getItem('schedules')) || [];
        savedSchedules.push(schedule);

        localStorage.setItem('schedules', JSON.stringify(savedSchedules));

        // Tampilkan jadwal yang disimpan di DOM
        displaySavedSchedules();
    }
});

function displaySavedSchedules() {
    const savedSchedules = JSON.parse(localStorage.getItem('schedules')) || [];
    const savedSchedulesList = document.getElementById('savedSchedules');

    savedSchedulesList.innerHTML = '';

    savedSchedules.forEach((schedule, index) => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = `<tr>
            <td>Reminder Date</td>
            <th>${schedule.date}</th>
            <td>Do</td>
            <th>${schedule.type}</th>
        </tr>`
        // `Schedule Reminder Date: ${schedule.date}, What to do? : ${schedule.type}  `;


        // Tambahkan tombol hapus
        const deleteButton = document.createElement('b');
        deleteButton.textContent = 'Hapus';
        deleteButton.addEventListener('click', () => {
            removeSchedule(index);
        });

        listItem.appendChild(deleteButton);
        savedSchedulesList.appendChild(listItem);
    });
}

function removeSchedule(index) {
    const savedSchedules = JSON.parse(localStorage.getItem('schedules')) || [];

    if (index >= 0 && index < savedSchedules.length) {
        savedSchedules.splice(index, 1);
        localStorage.setItem('schedules', JSON.stringify(savedSchedules));
        displaySavedSchedules();
    }
}

// Tampilkan jadwal yang disimpan saat halaman dimuat
displaySavedSchedules();























// // Membuat objek XMLHttpRequest
// let xhr = new XMLHttpRequest();

// // Mengatur jenis permintaan (GET) dan URL halaman yang akan diambil
// xhr.open('GET', 'todo.html', true);

// // Mengirim permintaan ke server
// xhr.send();

// // Menangani respons
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     // Respons berhasil diterima
//     let kontenHalamanLain = xhr.responseText;

//     // Memasukkan konten ke dalam elemen HTML di halaman Anda
//     let targetElement = document.getElementById('todo'); // Ganti dengan ID elemen target Anda
//     targetElement.innerHTML = kontenHalamanLain;
//   }
// };



// fetch('todo.html')
//     .then(response => response.text())
//     .then(data => {
//     // Memasukkan konten teks ke dalam elemen HTML di halaman Anda
//         const targetElement = document.getElementById('todo'); // Ganti dengan ID elemen target Anda
//         targetElement.innerHTML = data;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

//     fetch('js/todo.js')
//     .then(response => response.text())
//     .then(todoJs => {
//     // Memasukkan konten teks ke dalam elemen HTML di halaman Anda
//         const todoElement = document.getElementById('todoJs'); // Ganti dengan ID elemen target Anda
//         todoElement.innerHTML = todoJs;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });








// document.addEventListener('DOMContentLoaded', function () {
//     const taskInput = document.getElementById('taskInput');
//     const addTaskButton = document.getElementById('addTask');
//     const taskList = document.getElementById('taskList');

//     addTaskButton.addEventListener('click', function () {
//         const taskText = taskInput.value.trim();

//         if (taskText !== '') {
//             const listItem = document.createElement('li');
//             listItem.textContent = taskText;
//             listItem.classList.add('mb-2');

//             const deleteButton = document.createElement('button');
//             deleteButton.textContent = 'Hapus';
//             deleteButton.classList.add('bg-[#EC1B09]', 'hover:bg-gray-700', 'absolute', 'ml-10', 'text-white', 'py-1', 'px-2', 'rounded', 'ml-2');
//             deleteButton.addEventListener('click', function () {
//                 listItem.remove();
//             });

//             listItem.appendChild(deleteButton);
//             taskList.appendChild(listItem);

//             taskInput.value = '';
//         }
//     });
// });