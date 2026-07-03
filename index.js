document.addEventListener("DOMContentLoaded", () => {
    const btnScan = document.getElementById("btn-scan");
    const readerDiv = document.getElementById("reader");
    const inputArticulo = document.getElementById("input-articulo"); // El input de tu HTML reestructurado
    
    let html5QrcodeScanner = null;

    btnScan.addEventListener("click", () => {
        // Mostrar el contenedor de la cámara
        readerDiv.style.display = "block";

        // Si ya hay una instancia corriendo, la detenemos antes de crear otra
        if (html5QrcodeScanner) {
            html5QrcodeScanner.clear();
        }

        // Configuración del escáner
        // Agregamos formatos típicos de códigos de barra (EAN_13, EAN_8, CODE_128, etc.)
        html5QrcodeScanner = new Html5QrcodeScanner("reader", { 
            fps: 10, 
            qrbox: { width: 300, height: 100 }, // Caja de enfoque alargada para códigos de barra
            formatsToSupport: [ 
                Html5QrcodeSupportedFormats.EAN_13, 
                Html5QrcodeSupportedFormats.EAN_8, 
            ]
        }, /* verbose= */ false);

        // Inicializar el escáner pasando las funciones de éxito y error
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    });

    // Función que se ejecuta cuando detecta un código con éxito
    function onScanSuccess(decodedText, decodedResult) {
        // 1. Ponemos el código de barra detectado en el input de tu producto
        inputArticulo.value = decodedText;
        
        // 2. Detener la cámara y limpiar el escáner
        html5QrcodeScanner.clear().then(() => {
            readerDiv.style.display = "none"; // Ocultar el div de la cámara
            alert(`Código detectado con éxito: ${decodedText}`);
        }).catch(error => {
            console.error("Error al cerrar la cámara: ", error);
        });
    }

    // Función que se ejecuta continuamente mientras busca (opcional, normalmente se deja vacía)
    function onScanFailure(error) {
        // Puedes dejarlo vacío para que no llene la consola de alertas mientras busca
    }

    document.querySelectorAll('.CostPrice .BtnAdd').forEach(boton => {
        boton.addEventListener('click', () => {
            const contenedor = boton.parentElement;
            const input = contenedor.querySelector('.costin');
            let valorActual = parseFloat(input.value) || 0;
            const accion = boton.textContent.trim();
            if (accion === 'R') {
                input.value = Math.round(valorActual / 25) * 25;
            } else if (accion === '+25') {
                input.value = valorActual + 25;
            } else if (accion === '+100') {
                input.value = valorActual + 100;
            }
        });
    });
});