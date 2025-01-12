document.getElementById("Ai").addEventListener("click", () => {

    let images_all = ""
    AiData.forEach(img => {
        images_all+= `<div><img  src="${img}" alt="Car image" /></div>`
    })

    // Show SweetAlert with formatted Najem details
    Swal.fire({
        html: `
            <br>
            <h2>AI System</h2>
            <br>
            <center>

                <div class="photos" style="width: 80% !important">
                    <div class="slider uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: none">
                        <div class="uk-slideshow-items">
                            ${images_all}
                        </div>
                
                        <!-- Navigation Arrows (Always Visible) -->
                        <a class="uk-position-center-left uk-position-small" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
                        <a class="uk-position-center-right uk-position-small" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
                
                        <!-- Pagination Dots -->
                        <ul class="uk-slideshow-nav uk-dotnav uk-position-bottom-center uk-margin"></ul>
                    </div>
                </div>


            </center>
            
        `,
        confirmButtonText: "Close",
        confirmButtonColor: '#01DC82',
        width: 600,
        customClass: {
            popup: 'custom-swal-popup',
        },
        background: "#ffffff", // Matches your white theme
    });
});