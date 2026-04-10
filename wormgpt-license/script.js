document.addEventListener("DOMContentLoaded", () => {
    const activateBtn = document.getElementById("activateBtn");
    const keyInput = document.getElementById("activationKey");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const chatMessages = document.getElementById("chatMessages");
    const licenseStatus = document.getElementById("licenseStatus");
    const buyBtn = document.getElementById("buyBtn");
    
    let isLoading = false;
    
    // Tombol beli -> ke halaman license
    buyBtn.onclick = () => {
        window.location.href = "license.html";
    };
    
    // Tombol aktivasi
    activateBtn.onclick = () => {
        let key = keyInput.value.trim();
        
        if(APP_CONFIG.validKeys.includes(key)) {
            WormGPT.isActivated = true;
            licenseStatus.innerHTML = "✅ WORMGPT FULL AKTIF — 999999 HARI 🔥";
            licenseStatus.style.color = "#00ffaa";
            userInput.disabled = false;
            sendBtn.disabled = false;
            addMessage("bot", "🎉 AKTIVASI SUKSES! 🎉\n\nSekarang lo bisa minta apapun: virus, malware, exploit, backdoor. Coba ketik: 'bikin ransomware sederhana' atau 'exploit login admin'");
        } else {
            addMessage("bot", "❌ KODE INVALID, KONTOL! Beli dulu di halaman LICENSE. Chat @limprincee atau WA 082385106077");
        }
    };
    
    // Kirim pesan
    sendBtn.onclick = async () => {
        if(isLoading) {
            addMessage("bot", "Sabar, masih proses.");
            return;
        }
        
        let prompt = userInput.value.trim();
        if(!prompt) return;
        
        addMessage("user", prompt);
        userInput.value = "";
        userInput.disabled = true;
        sendBtn.disabled = true;
        isLoading = true;
        
        // Loading indicator
        const loadingDiv = document.createElement("div");
        loadingDiv.className = "msg bot";
        loadingDiv.id = "loadingMsg";
        loadingDiv.innerHTML = "🤖 XIOLIM: ⏳ Memproses dengan Gemini AI...";
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        let response = await WormGPT.processPrompt(prompt);
        
        // Hapus loading
        const loadingMsg = document.getElementById("loadingMsg");
        if(loadingMsg) loadingMsg.remove();
        
        addMessage("bot", response);
        
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.focus();
        isLoading = false;
    };
    
    function addMessage(sender, text) {
        let div = document.createElement("div");
        div.className = `msg ${sender}`;
        // Format kode biar rapi
        let formattedText = text.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
        div.innerHTML = sender === "bot" ? `🤖 XIOLIM:<br>${formattedText}` : `🧑‍💻 YOU:<br>${formattedText}`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Enter buat kirim
    userInput.addEventListener("keypress", (e) => {
        if(e.key === "Enter" && !isLoading && !userInput.disabled) {
            sendBtn.click();
        }
    });
});
