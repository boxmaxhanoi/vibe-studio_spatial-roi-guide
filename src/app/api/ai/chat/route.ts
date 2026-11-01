import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { deptName, systemPrompt, prompt, fileContent, fileName } = body;

    const userPrompt = `
[부서]: ${deptName}
${fileName ? `[첨부 파일: ${fileName}]:\n${fileContent}\n` : ""}
[업무 요청 내용]:
${prompt}
`.trim();

    // 1. Anthropic Claude API 호출 (환경변수가 있을 경우)
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (anthropicKey) {
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 3000,
            system: systemPrompt,
            messages: [{ role: "user", content: userPrompt }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.content?.[0]?.text;
          if (text) {
            return NextResponse.json({ reply: text });
          }
        }
      } catch (e) {
        console.error("Anthropic API call failed, falling back:", e);
      }
    }

    // 2. OpenAI API 호출 (환경변수가 있을 경우)
    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.choices?.[0]?.message?.content;
          if (text) {
            return NextResponse.json({ reply: text });
          }
        }
      } catch (e) {
        console.error("OpenAI API call failed, falling back:", e);
      }
    }

    // 3. API 키 미등록 시 기본 사내 가이드 응답 (배포 초기 데모 및 가이드)
    return NextResponse.json({
      reply: `### 🏢 [${deptName}] 사내 표준 업무 처리 결과

요청하신 안건이 박스풀 사내 AI 시스템에 정상 접수되었습니다.

#### 📋 1. 요청 사항 핵심 요약
- **부서 구분**: ${deptName}
- **검토 내용**: ${prompt.slice(0, 100)}...
${fileName ? `- **참조 문서**: \`${fileName}\` (데이터 정상 로드됨)\n` : ""}

#### 💡 2. 사내 표준 가이드라인 및 조치안
1. **정합성 및 규정 검토**:
   - 박스풀 표준 운영 지침에 따라 처리 기준을 수립하였습니다.
   - 예외 사항이나 추가 결재가 필요한 항목은 사내 결재 라인을 통해 승인 후 반영을 권장합니다.

2. **추천 실행 문구 / 결과 양식**:
> *"고객 만족과 업무 효율을 극대화하기 위해 명시된 절차에 따라 즉각 조치하며, 관련 이력은 전사 데이터베이스에 안전하게 기록됩니다."*

*(💡 안내: Vercel 대시보드의 \`Environment Variables\`에 \`ANTHROPIC_API_KEY\` 또는 \`OPENAI_API_KEY\`를 등록하시면 최신 실시간 AI 엔진으로 즉시 자동 전환됩니다.)*`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "서버 내부 처리 오류" },
      { status: 500 }
    );
  }
}
