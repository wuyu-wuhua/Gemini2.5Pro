        // functions/api/chat.js
        
        // 临时：如果你还没有OpenAI的模块，先用这个模拟
        async function getDashScopeChatReply(userMessage, apiKey) {
            console.log(`[Cloudflare Function /api/chat] API Key available: ${!!apiKey}`);
            // 在实际应用中，这里你会用 apiKey 和 baseURL 初始化 OpenAI 客户端
            // const openai = new OpenAI({apiKey: apiKey, baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"});
            // const completion = await openai.chat.completions.create({ ... });
            // return completion.choices[0].message.content;
            return `AI Mock Reply from Cloudflare Function to: "${userMessage}"`;
        }

        export async function onRequestPost(context) {
            try {
                // context.request 是标准的 Fetch API Request 对象
                // context.env 包含环境变量
                // context.next() 调用下一个中间件 (如果使用 _middleware.js)
                // context.waitUntil() 用于延长函数执行时间处理异步任务

                const requestBody = await context.request.json();
                const userMessage = requestBody.message;

                if (!userMessage) {
                    return new Response(JSON.stringify({ error: "Message is required" }), {
                        status: 400,
                        headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'https://erlinmall.com' // 确保与你的前端源匹配
                        },
                    });
                }

                const apiKey = context.env.DASHSCOPE_API_KEY; 
                const aiReply = await getDashScopeChatReply(userMessage, apiKey);

                return new Response(JSON.stringify({ reply: aiReply }), {
                    status: 200,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'https://erlinmall.com' 
                    },
                });

            } catch (error) {
                console.error("Error in /api/chat POST function:", error.message, error.stack);
                return new Response(JSON.stringify({ error: error.message || 'Internal Server Error in function' }), {
                    status: 500,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'https://erlinmall.com'
                    },
                });
            }
        }

        // 对于 POST 请求，通常也需要 OPTIONS 预检请求
        export async function onRequestOptions(context) {
          return new Response(null, {
            headers: {
              'Access-Control-Allow-Origin': 'https://erlinmall.com', // 你的前端生产域名
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', // 明确列出允许的方法
              'Access-Control-Allow-Headers': 'Content-Type, Authorization', // 允许的请求头
              'Access-Control-Max-Age': '86400', // 预检请求结果的缓存时间（秒）
            },
          });
        }