
let bar = document.getElementById('js-progressbar');
let fileInput = document.getElementById('file-upload');
let images = []

function convertToBase64(file) {
    const reader = new FileReader();
    reader.onloadend = function () {
        const img = new Image();
        img.onload = function () {
            
            // Resize the image to a maximum width/height while maintaining aspect ratio
            const maxWidth = 800; 
            const maxHeight = 600; 

            let width = img.width;
            let height = img.height;

            // Resize if the image is larger than the max dimensions
            if (width > maxWidth || height > maxHeight) {
                const aspectRatio = width / height;
                if (width > height) {
                    width = maxWidth;
                    height = Math.round(width / aspectRatio);
                } else {
                    height = maxHeight;
                    width = Math.round(height * aspectRatio);
                }
            }

            // Create a canvas to draw the resized image
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Convert the resized image to Base64
            const base64Image = canvas.toDataURL('image/jpeg', 0.7); // 0.7 is the quality (from 0 to 1)
            images.push(base64Image);
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file); // Converts file to Base64
}

fileInput.addEventListener('change', function () {
    const files = fileInput.files;

    // Check if more than 3 files are selected
    if (files.length > 3) {
        message('You can only upload up to 3 images!');
        fileInput.value = '';  // Reset the input
    } else {
        // Check each file for valid image type
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.startsWith('image/')) {
                message('Please select only image files!');
                fileInput.value = '';  // Reset the input
                images = [];
                break;
            } else {
                convertToBase64(files[i]);
            }
        }
    }
});



UIkit.upload('.js-upload', {
    url: '',
    multiple: true,
    loadStart: function (e) {
        bar.removeAttribute('hidden');
        bar.max = e.total;
        bar.value = e.loaded;
    },
    progress: function (e) {
        bar.max = e.total;
        bar.value = e.loaded;
    },
    loadEnd: function (e) {
        bar.max = e.total;
        bar.value = e.loaded;
    },
    completeAll: function () {
            if(images.length > 0){
                document.querySelector("input[name='images']").value = JSON.stringify(images); 
                document.querySelector(".upload-form").submit();
            }      
    }
});
    