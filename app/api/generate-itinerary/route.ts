import { NextRequest, NextResponse } from "next/server";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export async function POST(req: NextRequest) {
  const { destination, days, budget } = await req.json();

  if (!DEEPSEEK_API_KEY) {
    return NextResponse.json(
      { error: "未配置 DEEPSEEK_API_KEY 环境变量" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "你是一个旅行规划专家。根据用户输入的目的地、天数和预算，生成一份详细的旅行行程。以严格的 JSON 格式返回，不要包含 markdown 标记。",
          },
          {
            role: "user",
            content: `请为以下旅行生成行程：\n目的地：${destination}\n天数：${days}\n预算：${budget || "不限"}\n\n请按照以下 JSON 结构返回：\n{\n  "destination": "目的地名称",\n  "itinerary": [\n    {\n      "day": 1,\n      "activities": [\n        { "name": "活动名称", "description": "简短描述", "image": "图片URL或空字符串" }\n      ]\n    }\n  ]\n}\n\n每天安排 2-3 个活动。`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: errData.error?.message || `API 返回错误 ${res.status}` },
        { status: res.status }
      );
    }

    const result = await res.json();
    const content = JSON.parse(result.choices[0].message.content);
    return NextResponse.json(content);
  } catch (err) {
    return NextResponse.json({ error: "API调用失败" }, { status: 500 });
  }
}
