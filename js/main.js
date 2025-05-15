// DOM元素
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const scenarioButtons = document.querySelectorAll('.scenario-btn');
const reviewCards = document.querySelectorAll('.review-card');
const langOptions = document.querySelectorAll('.lang-option');
const currentLangSpan = document.querySelector('.current-lang');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const contentSections = document.querySelectorAll('.content-section');
const subPromptsContainer = document.getElementById('subPromptsContainer');
const sidebarContentHost = document.querySelector('.sidebar-content-host');

// New DOM elements for image preview
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreviewSrc = document.getElementById('imagePreviewSrc');
const removeImagePreviewBtn = document.getElementById('removeImagePreviewBtn');

// 用户头像
const userAvatar = 'https://placehold.co/40x40?text=U';

// Global variable for current chat messages being composed
let currentChatSessionMessages = [];
let currentChatIsDirty = false; // Tracks if the current chat has unsaved user changes
const MAX_HISTORY_ITEMS = 20; // Limit the number of history items
let currentSelectedFile = null; // <<<< ADDED: To store the currently selected image file

// Define sub-prompts for each scenario
const subPrompts = {
    'writing': ['subprompt-writing-1', 'subprompt-writing-2', 'subprompt-writing-3'],
    'learning': ['subprompt-learning-1', 'subprompt-learning-2', 'subprompt-learning-3'],
    'coding': ['subprompt-coding-1', 'subprompt-coding-2', 'subprompt-coding-3'],
    'travel': ['subprompt-travel-1', 'subprompt-travel-2', 'subprompt-travel-3'],
    'scriptwriting': ['subprompt-scriptwriting-1', 'subprompt-scriptwriting-2', 'subprompt-scriptwriting-3'],
    'summary': ['subprompt-summary-1', 'subprompt-summary-2', 'subprompt-summary-3'],
    'fiction': ['subprompt-fiction-1', 'subprompt-fiction-2', 'subprompt-fiction-3'],
    'ml': ['subprompt-ml-1', 'subprompt-ml-2', 'subprompt-ml-3'],
    'social': ['subprompt-social-1', 'subprompt-social-2', 'subprompt-social-3'],
    'text-to-image': ['subprompt-tti-1', 'subprompt-tti-2', 'subprompt-tti-3'],
    'image-to-image': ['subprompt-iti-1', 'subprompt-iti-2', 'subprompt-iti-3'],
    'image-analysis-detailed': ['subprompt-img-analyze-detail-1', 'subprompt-img-analyze-detail-2', 'subprompt-img-analyze-detail-3']
};

// New DOM elements for user authentication
const userAuthSection = document.getElementById('user-auth-section');
const loginButtonContainer = document.getElementById('login-button-container');

// Helper to get translations safely
function getSafeTranslations() {
    if (typeof translations !== 'undefined') {
        return translations;
    }
    console.warn("Translations object not found. Using fallback.");
    return {
        zh: { 'untitled-chat': '无标题对话', 'history-title': '历史对话', 'no-history': '暂无历史记录', 'welcome-message': '你好！我是 Gemini 2.5 Pro，有什么我可以帮助你的吗？' },
        en: { 'untitled-chat': 'Untitled Chat', 'history-title': 'Chat History', 'no-history': 'No history yet', 'welcome-message': "Hello! I'm Gemini 2.5 Pro, how can I help you?" }
    };
}

// Helper function to generate a title for the history item
function generateChatTitle(messages) {
    if (messages && messages.length > 0) {
        const firstUserMessage = messages.find(m => m.sender === 'user');
        if (firstUserMessage) {
            return firstUserMessage.text.substring(0, 30) + (firstUserMessage.text.length > 30 ? '...' : '');
        }
    }
    const trans = getSafeTranslations();
    const currentLang = localStorage.getItem('language') || 'zh';
    return trans[currentLang]['untitled-chat'] || 'Untitled Chat';
}

// Function to clear the image preview
function clearImagePreview() {
    if (imagePreviewContainer) {
        imagePreviewContainer.style.display = 'none';
    }
    if (imagePreviewSrc) {
        imagePreviewSrc.src = '#'; // Reset src
    }
    const imageUploadInput = document.getElementById('imageUploadInput');
    if (imageUploadInput) {
        imageUploadInput.value = ''; // Allow re-selection of the same file
    }
    currentSelectedFile = null;
    console.log("[ClearPreview] Image preview cleared.");
}

// 添加消息到聊天窗口 (Modified to apply class for AI multiline responses)
function addMessage(text, sender, isInitialOrHistory = false, optionalCssClass = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    if (optionalCssClass) {
        messageDiv.classList.add(optionalCssClass);
    }
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar';
    
    const avatarImg = document.createElement('img');
    avatarImg.src = sender === 'user' ? userAvatar : 'images/AI.png';
    avatarImg.alt = sender === 'user' ? '用户' : 'Gemini';
    avatarImg.onerror = function() {
        this.src = `https://placehold.co/40x40?text=${sender === 'user' ? 'U' : 'G'}`;
    };
    avatarDiv.appendChild(avatarImg);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const paragraph = document.createElement('p');
    paragraph.textContent = text; 

    // Apply multiline style only for actual AI responses (not thinking/error messages)
    if (sender === 'ai' && !optionalCssClass) { 
        paragraph.classList.add('ai-multiline-response');
    }
    
    contentDiv.appendChild(paragraph);

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Add only user messages to currentChatSessionMessages here.
    // Final successful AI responses are added in sendMessage after API call.
    if (sender === 'user' && !isInitialOrHistory) {
        currentChatSessionMessages.push({ text, sender, timestamp: new Date().toISOString() });
        currentChatIsDirty = true; // Mark chat as dirty on new user input
        console.log("[AddMessage-User] Chat marked as dirty.");
    }
    
    return messageDiv; // Return the created message element
}

// Function to save the current chat session to history
function saveCurrentChatToHistory() {
    if (currentChatSessionMessages.length === 0) {
        currentChatIsDirty = false; // Ensure flag is false for empty chats
        return false; // Nothing to save
    }

    const history = loadChatHistory();
    const newSession = {
        id: `chat-${new Date().getTime()}`,
        title: generateChatTitle(currentChatSessionMessages),
        messages: [...currentChatSessionMessages],
        timestamp: new Date().toISOString()
    };

    history.unshift(newSession);
    if (history.length > MAX_HISTORY_ITEMS) {
        history.length = MAX_HISTORY_ITEMS;
    }

    localStorage.setItem('chatHistory', JSON.stringify(history));
    currentChatIsDirty = false; // Reset dirty flag after successful save
    console.log("[SaveHistory] Chat session saved. Dirty flag reset.");
    return true; // Indicate that save happened
}

// Function to load chat history from localStorage
function loadChatHistory() {
    const history = localStorage.getItem('chatHistory');
    return history ? JSON.parse(history) : [];
}

// Function to display chat history in the sidebar
function displayChatHistoryList() {
    if (!sidebarContentHost) return;
    sidebarContentHost.innerHTML = ''; 

    const history = loadChatHistory();
    const trans = getSafeTranslations();
    const currentLang = localStorage.getItem('language') || 'zh';

    const headerDiv = document.createElement('div');
    headerDiv.style.display = 'flex';
    headerDiv.style.justifyContent = 'space-between';
    headerDiv.style.alignItems = 'center';
    headerDiv.style.padding = '1rem 1rem 0.5rem 1rem';

    const titleElement = document.createElement('h3');
    titleElement.textContent = trans[currentLang]['history-title'] || '历史对话';
    titleElement.style.color = '#fff';
    titleElement.style.fontSize = '1rem';
    titleElement.style.fontWeight = '500';
    titleElement.style.margin = '0'; // Remove default margin from h3

    headerDiv.appendChild(titleElement);

    // "Clear All" History Button
    if (history.length > 0) { // Only show if there's history
        const clearAllButton = document.createElement('button');
        clearAllButton.innerHTML = '&#x1F5D1;'; // Trash can icon (Unicode)
        // Or use text: clearAllButton.textContent = trans[currentLang]['clear-all-history-btn'] || 'Clear All';
        // You'll need to add 'clear-all-history-btn' to translations.js if using text
        clearAllButton.title = trans[currentLang]['clear-all-history-tooltip'] || '清空所有历史记录'; // Tooltip
        clearAllButton.style.color = '#ccc';
        clearAllButton.style.backgroundColor = 'transparent';
        clearAllButton.style.border = 'none';
        clearAllButton.style.fontSize = '0.9rem'; // Adjust icon size
        clearAllButton.style.padding = '0.2rem 0.4rem';
        clearAllButton.style.cursor = 'pointer';
        clearAllButton.style.lineHeight = '1';
        clearAllButton.onmouseover = () => clearAllButton.style.color = '#ff6b6b'; // Red on hover
        clearAllButton.onmouseout = () => clearAllButton.style.color = '#ccc';

        clearAllButton.addEventListener('click', () => {
            const confirmClear = confirm(trans[currentLang]['confirm-clear-all-history'] || '您确定要删除所有历史记录吗？此操作无法撤销。');
            if (confirmClear) {
                clearAllChatHistory();
            }
        });
        headerDiv.appendChild(clearAllButton);
    }
    sidebarContentHost.appendChild(headerDiv);

    const listElement = document.createElement('ul');
    listElement.style.padding = '0 0.5rem 1rem 0.5rem';
    listElement.style.margin = '0';
    listElement.style.listStyle = 'none';
    listElement.style.maxHeight = 'calc(100vh - 180px)'; // Adjusted max height due to headerDiv
    listElement.style.overflowY = 'auto';

    if (history.length === 0) {
        const noHistoryItem = document.createElement('li');
        noHistoryItem.textContent = trans[currentLang]['no-history'] || '暂无历史记录';
        noHistoryItem.style.padding = '0.75rem 0.5rem';
        noHistoryItem.style.color = '#888';
        noHistoryItem.style.textAlign = 'center'; // Center if no history
        listElement.appendChild(noHistoryItem);
    } else {
        history.forEach(session => {
            const listItem = document.createElement('li');
            listItem.style.display = 'flex';
            listItem.style.justifyContent = 'space-between';
            listItem.style.alignItems = 'center';
            listItem.style.padding = '0.6rem 0.75rem';
            listItem.style.marginBottom = '0.25rem';
            listItem.style.borderRadius = '6px';
            listItem.style.cursor = 'pointer';
            listItem.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            listItem.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            listItem.setAttribute('data-history-id', session.id);

            const textContentDiv = document.createElement('div');
            textContentDiv.style.display = 'flex';
            textContentDiv.style.flexDirection = 'column';
            textContentDiv.style.overflow = 'hidden';
            textContentDiv.style.marginRight = '8px';

            listItem.onmouseover = () => listItem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            listItem.onmouseout = () => {
                if (!listItem.classList.contains('active-history')) {
                     listItem.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }
            };

            const titleSpan = document.createElement('span');
            titleSpan.textContent = session.title;
            titleSpan.style.color = '#eee';
            titleSpan.style.fontWeight = '500';
            titleSpan.style.fontSize = '0.85rem';
            titleSpan.style.whiteSpace = 'nowrap';
            titleSpan.style.overflow = 'hidden';
            titleSpan.style.textOverflow = 'ellipsis';

            const dateSpan = document.createElement('span');
            dateSpan.textContent = new Date(session.timestamp).toLocaleDateString();
            dateSpan.style.color = '#aaa';
            dateSpan.style.fontSize = '0.7rem';
            dateSpan.style.marginTop = '0.2rem';

            textContentDiv.appendChild(titleSpan);
            textContentDiv.appendChild(dateSpan);
            listItem.appendChild(textContentDiv);

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '&times;';
            deleteButton.title = trans[currentLang]['delete-history-item-tooltip'] || '删除此条记录';
            deleteButton.style.color = '#ccc';
            deleteButton.style.backgroundColor = 'transparent';
            deleteButton.style.border = 'none';
            deleteButton.style.fontSize = '1.2rem';
            deleteButton.style.padding = '0 0.3rem';
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.lineHeight = '1';
            deleteButton.onmouseover = () => deleteButton.style.color = '#ff6b6b';
            deleteButton.onmouseout = () => deleteButton.style.color = '#ccc';
            
deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteChatHistoryItem(session.id, listItem);
            });
            listItem.appendChild(deleteButton);

            listItem.addEventListener('click', () => {
                if (listItem.classList.contains('active-history')) return;
                loadSpecificChat(session.id);
                document.querySelectorAll('.sidebar-content-host ul li').forEach(item => {
                    item.classList.remove('active-history');
                    item.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    item.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                });
                listItem.classList.add('active-history');
                listItem.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
                listItem.style.borderColor = 'rgba(255, 215, 0, 0.4)';
            });
            listElement.appendChild(listItem);
        });
    }
    sidebarContentHost.appendChild(listElement);
}

// Function to delete a specific chat history item
function deleteChatHistoryItem(sessionId, listItemElement) {
    const trans = getSafeTranslations();
    const currentLang = localStorage.getItem('language') || 'zh';
    const confirmDelete = confirm(trans[currentLang]['confirm-delete-history-item'] || '您确定要删除这条历史记录吗？');
    if (confirmDelete) {
    let history = loadChatHistory();
    history = history.filter(session => session.id !== sessionId);
        localStorage.setItem('chatHistory', JSON.stringify(history));
        
        // If the deleted chat was the one currently loaded, clear the chat window
        // You might need a way to track which chat is currently active
        // For now, let's assume if it's deleted, we clear the main chat.
        // A more robust way would be to check if `currentChatSessionMessages` corresponds to this `sessionId`.
        if (listItemElement && listItemElement.classList.contains('active-history')) {
            clearChat(false); // Don't save an empty session after deleting
            addMessage(trans[currentLang]['welcome-message'] || '你好！我是 Gemini 2.5 Pro，有什么我可以帮助你的吗？', 'ai', true);
        }
        displayChatHistoryList(); // Refresh the list
    }
}

// Function to load a specific chat session into the main chat window
function loadSpecificChat(sessionId) {
    const history = loadChatHistory();
    const sessionToLoad = history.find(session => session.id === sessionId);

    if (sessionToLoad) {
        clearChat(false); // Ensure current chat (if any) is cleared WITHOUT saving, and dirty flag is reset
        currentChatSessionMessages = [...sessionToLoad.messages]; // Load messages
        sessionToLoad.messages.forEach(msg => {
            if (msg.type === 'image' && msg.url && msg.sender === 'ai') { // AI generated image
                const imageMessageDiv = document.createElement('div');
                imageMessageDiv.className = 'message ai-message image-message-wrapper';
                const avatarDiv = document.createElement('div');
                avatarDiv.className = 'avatar';
                const avatarImg = document.createElement('img');
                avatarImg.src = 'images/AI.png'; 
                avatarImg.alt = 'Gemini';
                avatarImg.onerror = function() { this.src = 'https://placehold.co/40x40?text=G'; };
                avatarDiv.appendChild(avatarImg);
                const contentDiv = document.createElement('div');
                contentDiv.className = 'message-content';
                const imgContainer = document.createElement('div');
                imgContainer.className = 'image-result-container';
                const imgElement = document.createElement('img');
                imgElement.src = msg.url;
                imgElement.alt = msg.text; 
                imgElement.className = 'generated-image';
                imgContainer.appendChild(imgElement);
                contentDiv.appendChild(imgContainer);
                imageMessageDiv.appendChild(avatarDiv);
                imageMessageDiv.appendChild(contentDiv);
                chatMessages.appendChild(imageMessageDiv);
            } else if (msg.type === 'user-image' && msg.url && msg.sender === 'user') { // User uploaded image from HISTORY
                 const imageMessageDiv = document.createElement('div');
                imageMessageDiv.className = 'message user-message image-message-wrapper'; // Ensure user-message is present
                
                // Content div MUST be first for user-message with row-reverse
                const contentDiv = document.createElement('div');
                contentDiv.className = 'message-content';
                const imgContainer = document.createElement('div');
                imgContainer.className = 'image-result-container user-uploaded-image-container';
                const imgElement = document.createElement('img');
                imgElement.src = msg.url; 
                imgElement.alt = msg.originalName || '用户上传的图片';
                imgElement.className = 'generated-image';
                imgContainer.appendChild(imgElement);
                contentDiv.appendChild(imgContainer);

                // Avatar div MUST be second for user-message with row-reverse
                const avatarDiv = document.createElement('div');
                avatarDiv.className = 'avatar';
                const avatarImg = document.createElement('img');
                avatarImg.src = userAvatar; 
                avatarImg.alt = '用户';
                avatarImg.onerror = function() { this.src = 'https://placehold.co/40x40?text=U'; };
                avatarDiv.appendChild(avatarImg);
                
                imageMessageDiv.appendChild(contentDiv); // Content first
                imageMessageDiv.appendChild(avatarDiv);  // Avatar second (will appear right due to row-reverse)
                chatMessages.appendChild(imageMessageDiv);

                // If there was accompanying text for this user-image in the original session,
                // it would be a separate message object. The current structure assumes text and user-image are separate entries in history.
                // This might need refinement if you want them grouped more tightly in history.
            } else {
                // Regular text message or other type
                addMessage(msg.text, msg.sender, true, msg.optionalCssClass);
            }
        });
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom after loading
        // currentChatIsDirty is already false due to clearChat(false)
        console.log(`[LoadChat] Loaded session ${sessionId}. Dirty flag is ${currentChatIsDirty}.`);
        
        // Highlight the active history item
        document.querySelectorAll('.sidebar-content-host ul li').forEach(li => {
            li.classList.remove('active-history');
            li.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'; // Reset others
        });
        const activeLi = document.querySelector(`.sidebar-content-host ul li[data-history-id="${sessionId}"]`);
        if (activeLi) {
            activeLi.classList.add('active-history');
            activeLi.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'; // Highlight active
        }

    } else {
        console.warn("Session not found:", sessionId);
    }
}

// 清空聊天窗口
function clearChat(saveIfNeeded = false) { // Renamed parameter, added logic
    if (saveIfNeeded && currentChatIsDirty && currentChatSessionMessages.length > 0) {
        console.log("[ClearChat] Dirty chat detected, saving before clearing.");
        saveCurrentChatToHistory(); // This will reset currentChatIsDirty to false
    } else {
        console.log(`[ClearChat] Not saving. saveIfNeeded: ${saveIfNeeded}, currentChatIsDirty: ${currentChatIsDirty}, message count: ${currentChatSessionMessages.length}`);
    }
    chatMessages.innerHTML = ''; // 清空聊天记录显示
    currentChatSessionMessages = []; // 重置当前会话消息数组
    currentChatIsDirty = false; // Always reset dirty flag when chat is cleared
    clearImagePreview(); // <<<< ADDED: Clear image preview when chat is cleared
    console.log("[ClearChat] Chat cleared. Dirty flag reset.");
}

// 发送消息的函数 (核心修改在此)
async function sendMessage() {
    let isImageRequest = false; // <<<< ADDED: Initialize isImageRequest
    const messageText = userInput.value.trim();
    const localSelectedFile = currentSelectedFile; // Capture currentSelectedFile locally for this send operation
    const localSelectedFileDataUrl = imagePreviewSrc.src; // Capture the data URL from preview

    if (!messageText && !localSelectedFile) {
        console.log("No text and no image selected. Not sending.");
        return;
    }

    // --- Display user's message (text and/or image) ---
    let userMessageContentForHistory = [];

    if (localSelectedFile && localSelectedFileDataUrl !== '#' && localSelectedFileDataUrl.startsWith('data:image')) {
        // Create and display the image message from the user
        const imageMessageDiv = document.createElement('div');
        imageMessageDiv.className = 'message user-message image-message-wrapper'; // Ensure user-message is present

        // Content div MUST be first for user-message with row-reverse
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-result-container user-uploaded-image-container'; 
        const imgElement = document.createElement('img');
        imgElement.src = localSelectedFileDataUrl; 
        imgElement.alt = localSelectedFile.name;
        imgElement.className = 'generated-image'; 
        imgContainer.appendChild(imgElement);
        contentDiv.appendChild(imgContainer);
        
        // Avatar div MUST be second for user-message with row-reverse
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        const avatarImg = document.createElement('img');
        avatarImg.src = userAvatar; 
        avatarImg.alt = '用户';
        avatarImg.onerror = function() { this.src = 'https://placehold.co/40x40?text=U'; };
        avatarDiv.appendChild(avatarImg);
        
        imageMessageDiv.appendChild(contentDiv);  // Content first
        imageMessageDiv.appendChild(avatarDiv);   // Avatar second (will appear right due to row-reverse)
        chatMessages.appendChild(imageMessageDiv);

        userMessageContentForHistory.push({
            text: `[用户上传图片: ${localSelectedFile.name}]`,
            type: 'user-image', // Distinguish from AI image
            url: localSelectedFileDataUrl, // Store Data URL
            originalName: localSelectedFile.name,
            sender: 'user',
            timestamp: new Date().toISOString()
        });
    }

    if (messageText) {
        addMessage(messageText, 'user'); // This function already pushes to currentChatSessionMessages
        // If an image was also sent, the text was already added by addMessage.
        // If only text, this is the primary user content.
        // If image and text, addMessage handles the text part for history,
        // we already handled the image part above for history.
        // So, if only image and no text, the userMessageContentForHistory from image part is enough.
        // If only text, currentChatSessionMessages is handled by addMessage.
        // If both, both are handled.
    } else if (localSelectedFile && userMessageContentForHistory.length > 0) {
        // Only an image was "sent" by the user, push its representation to history
        currentChatSessionMessages.push(...userMessageContentForHistory);
        currentChatIsDirty = true; // Mark as dirty if only image
    }

    userInput.value = ''; // Clear input field
    clearImagePreview(); // Clear preview immediately after capturing its state

    // 显示"思考中"
    const thinkingMessageDiv = addMessage('AI正在思考中...', 'ai', false, 'thinking-message');

    let endpoint;
    let payload = {}; // Initialize payload as an object

    // --- Determine endpoint and payload ---
    const imageKeywords = ["生成", "画", "创作"];
    
    // Attach image data if a local file was selected for this send operation
    if (localSelectedFile) {
        // For now, we're sending the Data URL.
        // In a real scenario with backend processing, you'd likely send FormData with the File object.
        payload.imageData = localSelectedFileDataUrl; // Placeholder for backend to receive image
        payload.imageName = localSelectedFile.name;
        console.log("Image data (DataURL) included in payload for backend (placeholder).");
    }

    if (messageText && imageKeywords.some(keyword => messageText.toLowerCase().includes(keyword.toLowerCase())) && !localSelectedFile) {
        isImageRequest = true; // This is for AI text-to-image
        endpoint = '/api/generate-image';
        payload.prompt = messageText;
        payload.size = "1024*1024";
        payload.n = 1;
        console.log("Text-to-image generation request to:", endpoint, "with payload:", payload);
    } else if (messageText) { // If there's text, it's a chat (possibly with image context)
        endpoint = '/api/chat';
        payload.message = messageText; // Add text message to payload
        if (localSelectedFile) {
            console.log("Chat request WITH IMAGE to:", endpoint, "with payload:", payload);
        } else {
            console.log("Standard text chat request to:", endpoint, "with payload:", payload);
        }
    } else if (localSelectedFile && !messageText) {
        // Only image, no text. What should happen?
        // Option 1: Send to a specific image analysis endpoint (e.g., /api/analyze-image)
        // Option 2: For now, treat as an error or not-yet-supported action for API call.
        // We already displayed the user's image. Let's simulate an AI saying it can't process image-only yet.
        if (thinkingMessageDiv && thinkingMessageDiv.parentNode) {
            thinkingMessageDiv.parentNode.removeChild(thinkingMessageDiv);
        }
        addMessage("我当前还不能单独处理图片哦，请告诉我你想对这张图片做什么，或者输入一些文字指令。", 'ai', false, 'info-message');
        // currentChatSessionMessages.push({ text: "我当前还不能单独处理图片哦...", sender: 'ai', ... }); // Add to history
        // saveCurrentChatToHistory(); // Save this interaction
        // displayChatHistoryList();
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return; // Stop further API call for now
    } else {
        // Should not happen due to initial check, but as a fallback:
        if (thinkingMessageDiv && thinkingMessageDiv.parentNode) thinkingMessageDiv.parentNode.removeChild(thinkingMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return;
    }

    try {
        const backendBaseUrl = 'http://localhost:3001'; 
        const fullEndpointUrl = `${backendBaseUrl}${endpoint}`;
        console.log("Attempting to fetch from:", fullEndpointUrl, "Payload:", JSON.stringify(payload).substring(0, 200) + "...");

        const response = await fetch(fullEndpointUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
            });

        if (thinkingMessageDiv && thinkingMessageDiv.parentNode) {
            thinkingMessageDiv.parentNode.removeChild(thinkingMessageDiv);
        }

            if (!response.ok) {
            let errorData = {};
            try { errorData = await response.json(); } catch (e) { console.warn("Failed to parse error response as JSON:", e); }
            console.error('API request failed:', response.status, errorData);
            const displayErrorMessage = errorData.details?.message || errorData.message || errorData.error || `服务错误 (${response.status})`;
            addMessage(`请求错误: ${displayErrorMessage}`, 'ai', false, 'error-message');
            currentChatSessionMessages.push({ text: `请求错误: ${displayErrorMessage}`, sender: 'ai', timestamp: new Date().toISOString(), optionalCssClass: 'error-message' });
            return;
        }

                const data = await response.json();
        console.log('Received data from backend:', data);

        // --- Handle AI Response ---
        // (This part remains largely the same: handling AI text or AI generated image)
        if (isImageRequest && data.results && data.results.length > 0) { // AI generated image
            data.results.forEach(imgResult => {
                if (imgResult.url) {
                    const imageMessageDivAI = document.createElement('div');
                    imageMessageDivAI.className = 'message ai-message image-message-wrapper';
                    const avatarDivAI = document.createElement('div');
                    avatarDivAI.className = 'avatar';
                    const avatarImgAI = document.createElement('img');
                    avatarImgAI.src = 'images/AI.png'; 
                    avatarImgAI.alt = 'Gemini';
                    avatarImgAI.onerror = function() { this.src = 'https://placehold.co/40x40?text=G'; };
                    avatarDivAI.appendChild(avatarImgAI);
                    
                    const contentDivAI = document.createElement('div');
                    contentDivAI.className = 'message-content';
                    
                    const imgContainerAI = document.createElement('div');
                    imgContainerAI.className = 'image-result-container';
                    const imgElementAI = document.createElement('img');
                    imgElementAI.src = imgResult.url;
                    imgElementAI.alt = payload.prompt; 
                    imgElementAI.className = 'generated-image';
                    imgContainerAI.appendChild(imgElementAI);
                    contentDivAI.appendChild(imgContainerAI);
                    
                    imageMessageDivAI.appendChild(avatarDivAI);
                    imageMessageDivAI.appendChild(contentDivAI);
                    chatMessages.appendChild(imageMessageDivAI);
                    currentChatSessionMessages.push({ text: `[Image: ${imgResult.url}]`, type: 'image', url: imgResult.url, sender: 'ai', timestamp: new Date().toISOString() });
                }
            });
            if (data.details && data.details.actual_prompt && data.details.actual_prompt !== payload.prompt) {
                 addMessage(`(模型实际使用提示词: ${data.details.actual_prompt})`, 'ai');
                 currentChatSessionMessages.push({ text: `(模型实际使用提示词: ${data.details.actual_prompt})`, sender: 'ai', timestamp: new Date().toISOString()});
                    }
        } else if (data.reply) { // AI text reply
            addMessage(data.reply, 'ai'); // This already adds to currentChatSessionMessages
            currentChatSessionMessages.push({ text: data.reply, sender: 'ai', timestamp: new Date().toISOString() });
        } else if (isImageRequest) { // Text-to-image request but no results
             const aiResponseMessage = data.message || '图片生成成功，但未返回图片链接。';
             addMessage(aiResponseMessage, 'ai');
             currentChatSessionMessages.push({ text: aiResponseMessage, sender: 'ai', timestamp: new Date().toISOString() });
                }
        
        saveCurrentChatToHistory(); // Saves currentChatSessionMessages
        displayChatHistoryList(); 

        } catch (error) {
        console.error('Error sending message or processing response:', error);
        if (thinkingMessageDiv && thinkingMessageDiv.parentNode) {
            thinkingMessageDiv.parentNode.removeChild(thinkingMessageDiv);
        }
        addMessage('网络错误或无法连接到AI服务。', 'ai', false, 'error-message');
        currentChatSessionMessages.push({ text: '网络错误或无法连接到AI服务。', sender: 'ai', timestamp: new Date().toISOString(), optionalCssClass: 'error-message' });
            }
            chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 切换内容区域 (Modified switchTab)
function switchTab(tabId) {
    // Visually activate the correct sidebar item
    sidebarItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
    });

    // Manage main content sections and sidebar history host
    contentSections.forEach(section => section.classList.remove('active'));

    if (tabId === 'capabilities') {
        const capabilitiesSection = document.getElementById('capabilities-section');
        if (capabilitiesSection) capabilitiesSection.classList.add('active');
        if (sidebarContentHost) sidebarContentHost.style.display = 'none'; // Hide history pane
    } else if (tabId === 'chat' || tabId === 'history' || tabId === 'newchat') {
        const chatSection = document.getElementById('chat-section');
        if (chatSection) chatSection.classList.add('active');
        if (sidebarContentHost) sidebarContentHost.style.display = 'block'; // Show history pane

        if (tabId === 'history') {
            displayChatHistoryList(); // Refresh/show history list
        }
        // If 'newchat', specific logic is in its event listener (save, clear, etc.)
        // If 'chat', just ensure chat section and history pane are visible.
    }

    if ((tabId === 'chat' || tabId === 'newchat') && chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// 事件监听器 (sendButton, userInput as before)
if (sendButton) { sendButton.addEventListener('click', sendMessage); }
if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
}

// 侧边栏菜单事件 (Modified to correctly handle <a> tags and avoid interference with login link)
if (sidebarItems) {
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const tabId = item.getAttribute('data-tab');
            const isActive = item.classList.contains('active');

            // Handle clicks on actual <a> tags like login.html separately
            if (e.target.closest('a.sidebar-link')) {
                if (currentChatIsDirty && currentChatSessionMessages.length > 0) {
                    console.log("[LoginLinkClick] Current chat is dirty, saving before navigating.");
                    saveCurrentChatToHistory();
                    // displayChatHistoryList(); // Not needed, navigating away
                }
                return; // Allow default <a> tag behavior
            }

            // If clicking on a new sidebar item (not the already active one)
            // and the chat is dirty, save it before proceeding.
            // Exclude 'newchat' because it has specific save-then-clear logic.
            if (!isActive && tabId !== 'newchat' && currentChatIsDirty && currentChatSessionMessages.length > 0) {
                console.log(`[SidebarSwitchTo-${tabId}] Current chat is dirty, saving before switching.`);
                saveCurrentChatToHistory();
                displayChatHistoryList(); // Update history list as we are likely staying on the page or need it updated before nav
            }

            // Proceed with tab-specific actions
            if (tabId === 'capabilities') {
                // Save would have occurred above if relevant.
                window.location.href = 'capabilities.html';
            } else if (tabId === 'newchat') {
                console.log("[NewChatButton] Clicked.");
                // Specific logic for 'newchat': save if dirty, then clear for new chat.
                if (currentChatIsDirty && currentChatSessionMessages.length > 0) {
                    console.log("[NewChatButton] Current chat is dirty and has messages, saving it.");
                    saveCurrentChatToHistory();
                    displayChatHistoryList(); 
                } else {
                    console.log(`[NewChatButton] Current chat not saved. Dirty: ${currentChatIsDirty}, Msgs: ${currentChatSessionMessages.length}`);
                }
                clearChat(false); // Clear current chat content and reset dirty flag
                switchTab('chat'); // Switch to the chat view layout
                const trans = getSafeTranslations();
                const currentLang = localStorage.getItem('language') || 'zh';
                addMessage(trans[currentLang]['welcome-message'], 'ai', true); // Add welcome message
                console.log(`[NewChatButton] New chat started. Dirty flag is ${currentChatIsDirty}.`);
            } else if (tabId === 'chat' || tabId === 'history') {
                if (!isActive) { // Only switch if not already on this tab
                switchTab(tabId); 
                }
            } else {
                // Optional: handle unknown tabId or do nothing
                // console.log('Clicked on sidebar item with unhandled tabId:', tabId);
            }
        });
    });
}

// Helper function to check if we are on index.html (existing)
function isOnIndexPath() {
    return window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
}

// 场景按钮事件 (existing, ensure no conflicts)
if (scenarioButtons) {
    scenarioButtons.forEach(button => {
        // Ensure no duplicate listeners if this script runs multiple times (though it shouldn't)
        button.removeEventListener('click', handleScenarioButtonClick); 
        button.addEventListener('click', handleScenarioButtonClick);
    });
}

// 语言切换 (existing functions switchLanguage, applyTranslations)
function switchLanguage(lang) {
    if (lang && (lang === 'zh' || lang === 'en')) {
        localStorage.setItem('language', lang);
        if (currentLangSpan) {
            currentLangSpan.textContent = lang === 'zh' ? '中文' : 'English';
        }
        langOptions.forEach(option => {
            option.classList.toggle('active', option.getAttribute('data-lang') === lang);
        });
        applyTranslations(); // This is critical
        // Also re-display history list if it's visible, to update titles/dates if language-dependent
        if (sidebarContentHost && sidebarContentHost.style.display !== 'none') {
            displayChatHistoryList();
        }
         // Re-render welcome message if chat is showing only that
        if (chatMessages && chatMessages.children.length === 1 && chatMessages.children[0].classList.contains('ai-message')) {
            const trans = getSafeTranslations();
            const welcomeText = trans[lang]['welcome-message'];
            chatMessages.innerHTML = ''; // Clear old welcome
            addMessage(welcomeText, 'ai', true); // Add new translated welcome
        }
    }
}

// Apply translations (Modified to include new elements if necessary)
function applyTranslations() {
    const currentLang = localStorage.getItem('language') || 'zh';
    const trans = getSafeTranslations(); // Use safe getter
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (trans[currentLang] && trans[currentLang][key]) {
            if (el.classList.contains('scenario-btn')) return;
            el.textContent = trans[currentLang][key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (trans[currentLang] && trans[currentLang][key]) {
            el.placeholder = trans[currentLang][key];
        }
    });

    const pageTitleElement = document.querySelector('title');
    if (pageTitleElement) {
        const titleKey = pageTitleElement.getAttribute('data-i18n');
        if (titleKey && trans[currentLang] && trans[currentLang][titleKey]) {
            document.title = trans[currentLang][titleKey];
        } else {
            document.title = currentLang === 'zh' ? 
                "Gemini 2.5 Pro中文版" : "Gemini 2.5 Pro";
        }
    }
    // ... (rest of applyTranslations for sub-prompts etc.)
    if (subPromptsContainer) subPromptsContainer.innerHTML = ''; 
    if (scenarioButtons) scenarioButtons.forEach(btn => btn.classList.remove('active'));

    // Translate Google login button text
    const googleLoginSpan = loginButtonContainer?.querySelector('span[data-i18n="menu-login-google"]');
    if (googleLoginSpan && trans[currentLang] && trans[currentLang]['menu-login-google']) {
        googleLoginSpan.textContent = trans[currentLang]['menu-login-google'];
    }

    // Re-translate logout button text if user is logged in
    if (userAuthSection && userAuthSection.style.display !== 'none') {
        const logoutSpan = userAuthSection.querySelector('span[data-i18n="menu-logout"]');
        if (logoutSpan && trans[currentLang] && trans[currentLang]['menu-logout']) {
            logoutSpan.textContent = trans[currentLang]['menu-logout'];
        }
    }
}

// 页面加载完成后执行 (Modified DOMContentLoaded)
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch current user status
    try {
        const response = await fetch('/api/current-user');
        if (!response.ok) {
            console.error('Failed to fetch current user status', response.status);
            updateUserLoginUI(null); // Assume not logged in on error
        } else {
            const data = await response.json();
            updateUserLoginUI(data.user); 
        }
    } catch (error) {
        console.error('Error fetching current user:', error);
        updateUserLoginUI(null); // Assume not logged in on error
    }

    const savedLang = localStorage.getItem('language') || 'zh';
    switchLanguage(savedLang);

    // Default to 'chat' tab view only if on index.html
    // The switchTab function itself will set the .active class on the sidebar item.
    if (isOnIndexPath()) { 
        switchTab('chat'); // This will also display history list by default

        if (chatMessages && chatMessages.children.length === 0) { // If chat is empty (e.g. no history loaded to it)
            const trans = getSafeTranslations();
            const welcomeText = trans[savedLang]['welcome-message'];
            addMessage(welcomeText, 'ai', true); // true = isInitialOrHistory
        }
        // Ensure chat scrolls to bottom if it was the target of initialization on index.html
        if (document.getElementById('chat-section')?.classList.contains('active') && chatMessages) {
             chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    } 
    // If not on index.html (e.g., on capabilities.html), 
    // the inline script in that HTML file should handle setting the active tab.

    if (document.querySelector('.rating-summary')) { /* ... existing rating summary ... */ }
    setupMarquee();

    const uploadImageBtn = document.getElementById('uploadImageBtn');
    const imageUploadInput = document.getElementById('imageUploadInput');
    // const imagePreviewContainer = document.getElementById('imagePreviewContainer'); // Already defined globally
    // const imagePreviewSrc = document.getElementById('imagePreviewSrc'); // Already defined globally
    // const removeImagePreviewBtn = document.getElementById('removeImagePreviewBtn'); // Already defined globally

    if (uploadImageBtn && imageUploadInput && imagePreviewContainer && imagePreviewSrc && removeImagePreviewBtn) {
        uploadImageBtn.addEventListener('click', () => {
            imageUploadInput.click(); 
        });

        imageUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                if (file.type.startsWith('image/')) {
                    currentSelectedFile = file; // Store the file object
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        imagePreviewSrc.src = e.target.result;
                        imagePreviewContainer.style.display = 'flex'; // Use flex to align items if needed by CSS
                    }
                    reader.readAsDataURL(file);
                    console.log('Image selected for preview:', file.name);
                } else {
                    alert('请选择一个图片文件。');
                    imageUploadInput.value = ''; // Reset input
                    currentSelectedFile = null;
                }
            }
        });

        removeImagePreviewBtn.addEventListener('click', () => {
            clearImagePreview();
        });
    } else {
        console.warn("One or more image preview DOM elements not found. Preview functionality may be affected.");
    }

    // Add beforeunload event listener to save chat if dirty
    window.addEventListener('beforeunload', function (e) {
        if (currentChatIsDirty && currentChatSessionMessages.length > 0) {
            console.log("[BeforeUnload] Current chat is dirty, attempting to save.");
            saveCurrentChatToHistory();
            // Most modern browsers do not allow customizing the unload message,
            // and trying to prevent unload can be disruptive.
            // The main goal here is to silently save.
            }
        });
});

// (Make sure handleScenarioButtonClick, switchLanguage, updateScenarioPrompts (if used) are defined as before)
// updateScenarioPrompts function (if it was still in use, seems superseded by direct translation)
function updateScenarioPrompts() {
    // This function might be redundant if scenario prompts are handled by applyTranslations directly
    // or if their data-attributes are directly translated.
}

// handleScenarioButtonClick function (ensure it's present)
function handleScenarioButtonClick(event) {
    const clickedButton = event.currentTarget;
    const scenarioKey = clickedButton.getAttribute('data-scenario');

    scenarioButtons.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');

    subPromptsContainer.innerHTML = '';
    const promptKeys = subPrompts[scenarioKey];
    const trans = getSafeTranslations();
    if (promptKeys && trans) {
        const currentLang = localStorage.getItem('language') || 'zh';
        const langPrompts = trans[currentLang];

        if (langPrompts) {
            promptKeys.forEach(key => {
                const promptText = langPrompts[key];
                if (promptText) {
                    const subPromptButton = document.createElement('button');
                    subPromptButton.className = 'sub-prompt-btn';
                    subPromptButton.textContent = promptText;
                    subPromptButton.onclick = () => {
                        userInput.value = promptText; 
                        userInput.focus();
                    };
                    subPromptsContainer.appendChild(subPromptButton);
                }
            });
        }
    }
} 

// Marquee setup (ensure it's present)
function setupMarquee() {
    console.log('[Marquee] setupMarquee called');
    const marqueeRows = document.querySelectorAll('.marquee-row');
    console.log(`[Marquee] Found ${marqueeRows.length} marquee rows.`);

    if (!marqueeRows.length) return;

    marqueeRows.forEach((row, index) => {
        console.log(`[Marquee] Processing row #${row.id} (index ${index})`);
        const cards = Array.from(row.children);
        console.log(`[Marquee] Row #${row.id} initial card count: ${cards.length}`);

        if (cards.length === 0) {
            console.warn(`[Marquee] Row #${row.id} has no cards to duplicate.`);
            return;
        }

        // Duplicate cards for seamless looping
        const initialCardCount = cards.length;
        for (let i = 0; i < initialCardCount; i++) {
            const clone = cards[i].cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            row.appendChild(clone);
        }
        console.log(`[Marquee] Row #${row.id} new total child count: ${row.children.length}`);
    });
}
// Define scroll-left and scroll-right if not already in CSS
// @keyframes scroll-left { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
// @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
// These keyframes should be in your main.css

// Ensure langOptions event listeners are correctly set up
if (langOptions) {
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

// Function to clear all chat history
function clearAllChatHistory() {
    const trans = getSafeTranslations();
    const currentLang = localStorage.getItem('language') || 'zh';
    // Confirmation is now handled in the event listener for the button
    localStorage.removeItem('chatHistory');
    displayChatHistoryList(); // Refresh the list (will show "No history")
    clearChat(); // Clear the current chat window as well
    // Optionally, add a message to the chat window
    addMessage(trans[currentLang]['all-history-cleared-message'] || '所有历史记录已清空。', 'system-notification', true);
}

// Function to update UI based on user login status
function updateUserLoginUI(userData) {
    if (!userAuthSection || !loginButtonContainer) {
        console.warn('User auth UI elements not found.');
        return;
    }

    if (userData) { // User is logged in
        userAuthSection.innerHTML = `
            <img src="${userData.avatar || 'https://placehold.co/30x30?text=' + (userData.displayName ? userData.displayName[0] : 'U')}" alt="${userData.displayName || 'User'}" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
            <span style="flex-grow: 1; color: #fff; font-size: 0.9rem;">${userData.displayName || userData.email || '用户'}</span>
            <a href="/logout" id="logout-link" style="color: #ffd700; text-decoration: none; font-size: 0.9rem; margin-left: 10px;"><i class="fas fa-sign-out-alt"></i> <span data-i18n="menu-logout">登出</span></a>
        `;
        userAuthSection.style.display = 'flex'; // Make it visible and align items
        userAuthSection.style.alignItems = 'center';
        loginButtonContainer.style.display = 'none';

        // Add i18n to logout span if possible
        const logoutSpan = userAuthSection.querySelector('span[data-i18n="menu-logout"]');
        if (logoutSpan) {
            const trans = getSafeTranslations();
            const currentLang = localStorage.getItem('language') || 'zh';
            logoutSpan.textContent = trans[currentLang]['menu-logout'] || '登出';
        }

    } else { // User is not logged in
        userAuthSection.style.display = 'none';
        userAuthSection.innerHTML = '';
        loginButtonContainer.style.display = 'flex'; // Show the Google login button
    }
} 