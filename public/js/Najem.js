document.getElementById("Najem").addEventListener("click", () => {
    const { accident_id, car_brand, car_model, car_model_year, description, damage_info, images, created_at } = najemData;
    let images_all = ""
    images.forEach(img => {
        images_all+= `<div><img  src="${img}" alt="Car image" /></div>`
    })

    // Format the damage areas as a list
    const damageAreas = damage_info.map(area => `${area}`).join(" , ");

    // Show SweetAlert with formatted Najem details
    Swal.fire({
        html: `
            <br>
            <h2>Najem System - Accident #${accident_id}</h2>
            <br>
            <div style="display:flex;gap:1rem;flex-wrap:wrap;text-align:center;justify-content:center;">
                <span>Car Brand: <strong style="font-weight:bold !important;">${car_brand}</strong> </span>
                <span>Car Model: <strong style="font-weight:bold !important;">${car_model}</strong></span>
                <span>Year: <strong style="font-weight:bold !important;">${car_model_year}</strong></span>
            </div>
            <p><strong style="font-weight:bold !important;">Description: </strong>${description || "N/A"}</p>
            <p><strong>Damage Info: <strong style="font-weight:bold !important;">${damageAreas}</strong></strong></p>
            <p><strong>Date: </strong> ${new Date(created_at).toLocaleString()}</p>
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