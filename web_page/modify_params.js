const video_input = document.getElementById('file')

video_input.addEventListener('input', (event) => {
    const files = event.target.files
    const formData = new FormData();
    formData.append('video', file);
    output.textContent = Array.from(files).map(file => file.name).join('\n')
  })


  function uploadVideo() {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('video', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to upload video');
        }
        return response.text();
    })
    .then(data => {
        console.log('Video uploaded successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}