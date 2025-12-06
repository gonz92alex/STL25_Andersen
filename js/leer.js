function onScanSuccess(decodedText, decodedResult) {
  console.log(`Code matched = ${decodedText}`, decodedResult);
  document.getElementById('result').innerText = `Code matched = ${decodedText} - ${decodedResult}`
}

let config = {
  fps: 10,
  qrbox: {width: 150, height: 150},
  rememberLastUsedCamera: true,
  // Only support camera scan type.
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  showTorchButtonIfSupported: true
};

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader", config, verbose= false);
html5QrcodeScanner.render(onScanSuccess);