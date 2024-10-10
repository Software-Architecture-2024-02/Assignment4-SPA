document.getElementById('listBtn').addEventListener('click', listFiles);
document.getElementById('uploadBtn').addEventListener('click', () => document.getElementById('fileInput').click());
document.getElementById('fileInput').addEventListener('change', uploadFile);

async function listFiles() {
    const response = await fetch('https://zf2nk9jw2c.execute-api.us-east-2.amazonaws.com/firstStage/files');
    const files = await response.json();
    const output = document.getElementById('output');
    output.innerHTML = '';
    files.forEach(file => {
        const fileLink = document.createElement('a');
        fileLink.href = `https://zf2nk9jw2c.execute-api.us-east-2.amazonaws.com/firstStage/files/${file}`;
        fileLink.textContent = file;
        fileLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const res = await fetch(fileLink.href);
            const content = await res.text();
            output.textContent = content;
        });
        output.appendChild(fileLink);
        output.appendChild(document.createElement('br'));
    });
}

async function uploadFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const response = await fetch(`https://zf2nk9jw2c.execute-api.us-east-2.amazonaws.com/firstStage/files?file=${file.name}`, {
        method: 'POST',
        headers: {
            'Content-Type': file.type
        },
        body: file
    });
    const result = await response.json();
    document.getElementById('output').textContent = JSON.stringify(result, null, 2);
}
