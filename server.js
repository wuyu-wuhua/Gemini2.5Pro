require('dotenv').config(); // **IMPORTANT: Ensures .env variables are loaded first**

// DEBUG: Print environment variables to confirm they are loaded correctly
console.log("DEBUG ENV: GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
console.log("DEBUG ENV: GOOGLE_CLIENT_SECRET =", process.env.GOOGLE_CLIENT_SECRET ? "Loaded (not empty)" : "NOT LOADED or EMPTY");

const express = require('express');
const OpenAI = require('openai'); // 1. 引入 OpenAI 模块
const cors = require('cors'); // 引入 cors
const axios = require('axios'); // <<<< ADDED for text-to-image
const passport = require('passport'); // <<<< ADDED
const GoogleStrategy = require('passport-google-oauth20').Strategy; // <<<< ADDED
const session = require('express-session'); // <<<< ADDED

// 使用 .env 文件中的 PORT，如果未定义则默认为 3001
const port = process.env.PORT || 3001;
const app = express(); // Initialize Express app

app.use(cors({
    origin: 'http://localhost:3000', // MODIFIED to exactly match the frontend's origin
    credentials: true // Allow cookies to be sent
}));

// 1. 使用中间件来解析JSON格式的请求体
app.use(express.json());

// TODO: 配置会话中间件 (需要安装 express-session)
app.use(session({
    secret: process.env.SESSION_SECRET || 'a_very_strong_default_secret_key_12345', // Replace with a strong secret, ideally from .env
    resave: false,
    saveUninitialized: false, // Set to false, we don't want to save uninitialized sessions
    // cookie: { secure: process.env.NODE_ENV === 'production' } // Enable in production if using HTTPS
}));

// TODO: 初始化 Passport (需要安装 passport)
app.use(passport.initialize());
app.use(passport.session());

// TODO: 配置 Passport Google OAuth 2.0 策略
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback", // Relative to your base URL
    scope: ['profile', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    // In a real app, you would find or create a user in your database here
    // For this example, we'll just pass the Google profile directly
    console.log('Google Profile received:', JSON.stringify(profile, null, 2));
    // Construct a user object as you want to store it in the session
    const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
        avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
        provider: 'google' // Useful to know the auth provider
    };
    return cb(null, user);
  }
));

// TODO: 配置 Passport 序列化和反序列化用户
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user); // Store the whole user object in session for simplicity
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user); // Retrieve the whole user object from session
  });
});

// 2. 配置 OpenAI 实例
// 重要：请确保您的 API Key 已正确配置。
// 推荐使用环境变量 (process.env.DASHSCOPE_API_KEY)。
// 如果您没有设置环境变量，并且只是在本地测试，可以临时直接替换 apiKey 的值，
// 但请注意不要将包含真实 Key 的代码提交到版本控制系统。
const openai = new OpenAI({
    apiKey: process.env.DASHSCOPE_API_KEY, // 确保 .env 中 DASHSCOPE_API_KEY 是您的Key
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
});

// === Constants for Text-to-Image API ===
const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY; // Re-use the API key
const TEXT_TO_IMAGE_SUBMIT_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis";
const TASK_QUERY_BASE_URL = "https://dashscope.aliyuncs.com/api/v1/tasks/";
const MODEL_NAME_TEXT_TO_IMAGE = "wanx2.1-t2i-turbo";

// === Helper Functions for Text-to-Image ===

/**
 * Creates an image generation task with DashScope.
 * @param {object} options - Options for image generation (prompt, negative_prompt, size, n, seed, etc.)
 * @returns {Promise<string|null>} Task ID or null if failed.
 */
async function createImageGenerationTask(options) {
    const {
        prompt,
        negative_prompt = "",
        size = "1024*1024",
        n = 1,
        seed = null,
        prompt_extend = null,
        watermark = null
    } = options;

    if (!prompt) {
        console.error("[Text2Image] Error: 'prompt' is a required field.");
        return null;
    }

    const headers = {
        "Authorization": `Bearer ${DASHSCOPE_API_KEY}`,
        "Content-Type": "application/json",
        "X-DashScope-Async": "enable"
    };

    const payload = {
        model: MODEL_NAME_TEXT_TO_IMAGE,
        input: { prompt },
        parameters: { size, n }
    };

    if (negative_prompt) payload.input.negative_prompt = negative_prompt;
    if (seed !== null) payload.parameters.seed = seed;
    if (prompt_extend !== null) payload.parameters.prompt_extend = prompt_extend;
    if (watermark !== null) payload.parameters.watermark = watermark;

    console.log("[Text2Image] Submitting task to:", TEXT_TO_IMAGE_SUBMIT_URL);
    // console.log("[Text2Image] Payload:", JSON.stringify(payload, null, 2)); // Sensitive, avoid logging full payload with prompt in production

    try {
        const response = await axios.post(TEXT_TO_IMAGE_SUBMIT_URL, payload, { headers });
        // console.log("[Text2Image] Submission response data:", JSON.stringify(response.data, null, 2));
        if (response.data && response.data.output && response.data.output.task_id) {
            console.log(`[Text2Image] Task created successfully. Task ID: ${response.data.output.task_id}, Status: ${response.data.output.task_status}`);
            return response.data.output.task_id;
        } else if (response.data && response.data.code) {
            console.error(`[Text2Image] API Error: Code: ${response.data.code}, Message: ${response.data.message}, Request ID: ${response.data.request_id}`);
            return null;
        } else {
            console.error("[Text2Image] Failed to create task, unexpected response:", response.data);
            return null;
        }
    } catch (error) {
        if (error.response) {
            console.error("[Text2Image] API request error (server response):", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("[Text2Image] API request error (no response):", error.request);
        } else {
            console.error("[Text2Image] Error submitting task:", error.message);
        }
        return null;
    }
}

/**
 * Queries the status/result of an image generation task.
 * @param {string} taskId - The ID of the task to query.
 * @returns {Promise<object|null>} Task output or null if failed/not ready.
 */
async function getTaskResult(taskId) {
    const url = `${TASK_QUERY_BASE_URL}${taskId}`;
    const headers = { "Authorization": `Bearer ${DASHSCOPE_API_KEY}` };

    try {
        const response = await axios.get(url, { headers });
        // console.log(`[Text2Image] Querying task ${taskId}, Status: ${response.data?.output?.task_status}`);
        if (response.data && response.data.output) {
            const taskStatus = response.data.output.task_status;
            if (taskStatus === "SUCCEEDED" || taskStatus === "FAILED" || taskStatus === "CANCELED") {
                return response.data.output;
            } else if (taskStatus === "PENDING" || taskStatus === "RUNNING") {
                return { task_status: taskStatus }; // Indicate it's still processing
            } else {
                console.warn(`[Text2Image] Task ${taskId} has unknown status: ${taskStatus}, Request ID: ${response.data.request_id}`);
                return null;
            }
        } else if (response.data && response.data.code) {
            console.error(`[Text2Image] API Error querying task: Code: ${response.data.code}, Message: ${response.data.message}, Request ID: ${response.data.request_id}`);
            return null;
        } else {
            console.error(`[Text2Image] Failed to query task ${taskId}, unexpected response:`, response.data);
            return null;
        }
    } catch (error) {
        if (error.response && error.response.status !== 200) {
            console.error(`[Text2Image] API request error querying task (server response ${error.response.status}):`, error.response.data?.message || error.response.data);
        } else if (error.request) {
            console.error("[Text2Image] API request error querying task (no response):", error.request);
        } else if (error.response?.status !== 200) { // Avoid logging for non-error http status during polling
            console.error("[Text2Image] Error querying task:", error.message);
        }
        return null;
    }
}

// === Google OAuth 路由 ===

// 路由：用户点击"使用 Google 继续"后，前端会跳转到这里
// 这个路由的目的是将用户重定向到 Google 的 OAuth 授权页面
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 路由：Google OAuth 成功（或失败）后，会重定向到这个回调 URL
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failed', failureMessage: true }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('Google authentication successful, user:', req.user);
    res.redirect('http://localhost:3000/index.html'); // MODIFIED for consistency with CORS origin
  }
);

app.get('/login-failed', (req, res) => {
  const errorMessage = req.session.messages && req.session.messages.length > 0 ? req.session.messages.join(', ') : 'Login failed';
  console.error('Google Login Failed:', errorMessage);
  // You might want to redirect to a frontend page that displays the error
  res.status(401).send(`Google Login Failed: ${errorMessage}. <a href="http://127.0.0.1:3000/index.html">Try again</a>`);
});

app.get('/api/current-user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy((err) => {
      if (err) {
        console.log('Error : Failed to destroy the session during logout.', err);
        return next(err);
      }
      res.clearCookie('connect.sid'); // Default session cookie name
      console.log('User logged out successfully.');
      res.redirect('http://127.0.0.1:3000/index.html'); // Redirect to frontend home
    });
  });
});

// 3. 修改 /api/chat POST 路由以调用通义千问
app.post('/api/chat', async (req, res) => {
    console.log(`后端 (${port}) 收到 /api/chat 的POST请求`); // 添加端口信息以便调试
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: '请求体中必须包含 "message" 字段。' });
    }

    try {
        console.log(`后端向通义千问发送消息: ${userMessage}`);
        const completion = await openai.chat.completions.create({
            model: "qwen-plus",  
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userMessage }
            ],
        });

        const aiReply = completion.choices[0].message.content;
        console.log('后端收到通义千问的回复:', aiReply);

        res.json({
            reply: aiReply
        });

    } catch (error) {
        console.error('后端调用通义千问API时出错:', error.message);
        let errorMessage = '调用AI大模型服务失败，请稍后再试。';
        if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
            errorMessage = error.response.data.error.message;
        } else if (error.name === 'APIError' && error.status) {
             errorMessage = `API Error (${error.status}): ${error.message}`;
        } else if (error.message) {
            errorMessage = error.message; 
        }
        
        res.status(error.status || 500).json({ 
            error: '调用AI服务时出错', 
            details: errorMessage 
        });
    }
});

// === NEW: Text-to-Image API Route ===
app.post('/api/generate-image', async (req, res) => {
    console.log(`后端 (${port}) 收到 /api/generate-image POST请求`);
    const { prompt, negative_prompt, size, n, seed, prompt_extend, watermark } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: '请求体中必须包含 "prompt" 字段。' });
    }

    const generationOptions = {
        prompt,
        negative_prompt,
        size: size || "1024*1024", // Default if not provided
        n: n || 1,                 // Default if not provided
        seed,
        prompt_extend,
        watermark
    };

    try {
        const taskId = await createImageGenerationTask(generationOptions);

        if (!taskId) {
            return res.status(500).json({ error: '创建图像生成任务失败。请检查服务器日志。' });
        }

        console.log(`[Text2Image] 任务已提交，ID: ${taskId}. 开始轮询结果...`);
        const maxAttempts = 30; 
        const pollInterval = 6000; // 6 seconds

        for (let i = 0; i < maxAttempts; i++) {
            const taskOutput = await getTaskResult(taskId);
            if (taskOutput) {
                const currentStatus = taskOutput.task_status;
                console.log(`[Text2Image] 轮询 ${i + 1}/${maxAttempts}: 任务 ${taskId} 状态: ${currentStatus}`);

                if (currentStatus === "SUCCEEDED") {
                    console.log("[Text2Image] 图片生成成功！");
                    if (taskOutput.results && taskOutput.results.length > 0) {
                        return res.json({
                            message: "图片生成成功",
                            results: taskOutput.results, // Contains URLs and other info
                            task_id: taskId,
                            details: taskOutput
                        });
                    } else {
                        console.error("[Text2Image] 任务成功，但未在 results 中找到图片。详细输出:", taskOutput);
                        return res.status(500).json({ error: '任务成功但未返回图片结果。', task_id: taskId, details: taskOutput });
                    }
                } else if (currentStatus === "FAILED" || currentStatus === "CANCELED") {
                    console.error(`[Text2Image] 图片生成任务 ${currentStatus}. 详细信息:`, taskOutput.message || taskOutput);
                    return res.status(500).json({ 
                        error: `图片生成任务 ${currentStatus}`, 
                        message: taskOutput.message || '未知错误', 
                        task_id: taskId,
                        details: taskOutput 
                    });
                } else if (currentStatus === "PENDING" || currentStatus === "RUNNING") {
                    if (i < maxAttempts - 1) {
                        await new Promise(resolve => setTimeout(resolve, pollInterval));
                    } else {
                        console.error("[Text2Image] 轮询超时，任务未在预期时间内完成。");
                        return res.status(504).json({ error: '图像生成任务超时。', task_id: taskId });
                    }
                } else {
                     console.error(`[Text2Image] 任务查询返回未知状态 (${currentStatus}) 或错误，停止轮询。详细:`, taskOutput);
                     return res.status(500).json({ error: `任务查询返回未知状态: ${currentStatus}`, task_id: taskId, details: taskOutput });
                }
            } else { // getTaskResult returned null (error during query)
                if (i < maxAttempts - 1) {
                    console.log("[Text2Image] 查询任务状态时可能发生临时错误，稍后重试...");
                    await new Promise(resolve => setTimeout(resolve, pollInterval));
                } else {
                     console.error("[Text2Image] 多次查询任务状态失败，停止轮询。");
                     return res.status(500).json({ error: '多次查询任务状态失败。', task_id: taskId });
                }
            }
        }
    } catch (error) {
        console.error('[Text2Image] /api/generate-image 路由处理时发生意外错误:', error);
        res.status(500).json({ error: '处理图像生成请求时发生意外错误。' });
    }
});

// 4. 启动服务器
app.listen(port, () => {
    console.log(`后端API服务正在 http://localhost:${port} 上运行`);
    console.log(`前端的 fetch 请求应该发送到 http://localhost:${port}/api/chat`);
    if (!process.env.DASHSCOPE_API_KEY) {
        console.warn("警告：环境变量 DASHSCOPE_API_KEY 未设置或为空。请确保 .env 文件已正确配置并加载。");
    } else {
        // 为了安全，不在生产日志中打印部分KEY，但可以确认它已加载
        if (process.env.DASHSCOPE_API_KEY.startsWith("sk-")) {
            console.log("DASHSCOPE_API_KEY 已成功加载 (sk-开头)。");
        } else {
            console.warn("警告：DASHSCOPE_API_KEY 可能不是有效的sk-密钥格式。");
        }
    }
    console.log("提示：请确保在 .env 文件中配置 GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET 和 SESSION_SECRET 用于 Google OAuth 登录。");
}); 