document.getElementById('searchBth').addEventListener('click', async () => {
    const keyword = document.getElementById('keyword').value;
    const response = await fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword })
    });

    if (response.ok) {
        const urls = await response.json();
        const urlList = document.getElementById('urls');
        urlList.innerHTML = '';
        urlList.forEach(url => {
            const li = document.createElement('li');
            li.textContent = url;
            li.onclick = () => {
                document.getElementById('downloadSection').style.display = 'block';
                document.getElementById("downloadStatus").innerText = (`Выбран URL: ${url}`)
;
                document.getElementById('downloadBtn').onclick = () => downloadContent(url);           
            };
            urlList.appendChild(li);
        });
    } else {
        alert('Ключевое слово не найдено');
    }
});
const downloadContent = async (url) => {
    const threadCount = document.getElementById('threadCount').value || 1;


    const response = await fetch('http://localhost:3000/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, threadCount })
    });


    const result = await response.json();
    document.getElementById('downloadStatus').innerText = result.status == 'completed' ? 'Загрузка завершена!' : result.error;
};