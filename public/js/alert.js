

window.addEventListener('DOMContentLoaded', (event) => {


    const params = new URLSearchParams(window.location.search);
    const message = params.get("alert") || document.querySelector(".message").value;

    if(!message)return;

    Swal.fire({
        icon: 'info', // Use 'type' dynamically, fallback to 'info' if not provided
        title: `<center><h3>${message}</h3></center>`,
        timer: 1000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
            popup: 'custom-swal-popup', // Add a custom class for styling
            title: 'custom-swal-title' // Style the title separately
        }
    });
    



})

