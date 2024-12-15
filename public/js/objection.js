
function objection(e){
    const aid = e.id;
    Swal.fire({
        html:'<br><h2>Objection Reason</h2>',
        input: 'textarea',
        inputLabel: 'Please explain the reason for your objection:',
        inputPlaceholder: 'Type your reason here...',
        inputAttributes: {
            'aria-label': 'Type your reason here',
            'style': 'text-align: left; resize: none; font-family: Arial, sans-serif;'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        customClass: {
            popup: 'swal2-popup-custom',
            title: 'swal2-title-custom',
            input: 'swal2-input-custom',
            actions: 'swal2-actions-custom',
            confirmButton: 'swal2-confirm-custom',
            cancelButton: 'swal2-cancel-custom'
        },
        background: '#FFFFFF',
        color: '#003B3E',
        buttonsStyling: false,
    }).then(async (result) => {
        if (result.isConfirmed) {
            const reason = result.value;
            if (reason) {
               
                const response = await fetch(`/main/${aid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ reason }),
                });
                console.log(response)
                if (response.ok) {
                    
                    Swal.fire({
                        title: 'Thank you!',
                        text: 'Your objection has been submitted.',
                        icon: 'success',
                        confirmButtonText: 'Close',
                        customClass: {
                            confirmButton: 'swal2-confirm-custom'
                        },
                        background: '#FFFFFF',
                        color: '#003B3E'
                    }).then(() => {
                        location.reload()
                    })
                    

                }else{
                    message("Somthing went wrong!");
                }
                
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'You must provide a reason for your objection.',
                    icon: 'error',
                    confirmButtonText: 'Close',
                    background: '#FFFFFF',
                    color: '#003B3E'
                });
            }
        }
    });


}