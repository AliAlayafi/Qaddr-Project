async function generatePDF(jsonData, accident_id) {
    const { jsPDF } = window.jspdf;

    jsonData = JSON.parse(jsonData);

    const totalPrice = jsonData.reduce((sum, item) => sum + item.price, 0);

    const doc = new jsPDF();

    const logoUrl = "/logo/png/logo-black-removebg-preview.png";
    const logoDimensions = { x: 10, y: 10, width: 30, height: 30 };

    try {
        const logoImage = await loadImage(logoUrl);
        doc.addImage(logoImage, 'PNG', logoDimensions.x, logoDimensions.y, logoDimensions.width, logoDimensions.height);
    } catch (error) {
        console.error("Error loading logo image:", error);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Repair Report", 10, 50);

    const date = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${date}`, 10, 60);
    doc.text(`Accident ID: ${accident_id}`, 10, 70);

    // Add table with parts and prices
    doc.autoTable({
        startY: 80,
        head: [['Part', 'Price']],
        body: jsonData.map(item => [item.part, `$${item.price.toFixed(2)}`]),
        theme: 'grid',
        styles: { font: "helvetica", fontSize: 10 },
        headStyles: { fillColor: [0, 59, 62], textColor: [255, 255, 255] },
        bodyStyles: { textColor: [0, 0, 0] },
    });

    // Add the total price
    const finalY = doc.lastAutoTable.finalY || 80; // Fallback to avoid undefined
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Total Price: $${totalPrice.toFixed(2)}`, 10, finalY + 10);

    // Save the PDF file
    doc.save(`Repair_Report_${accident_id}.pdf`);
}

// Helper function to load an image
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}
