import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { command } = body;

    const commanderSystemPrompt = `당신은 (주)박스풀(BOXFUL)의 최고 지휘관인 성정학 대표님 직속 'AI 총사령관(Chief of Staff)'입니다.
대표님의 명령을 받아 전사 사업 군단([롤-01] 개발팀장, [롤-02] B2C 물류/OMS 워커, [롤-03] 마케팅 워커)에게 명확하고 실전적인 태스크를 분배하고 작전 계획서를 수립하십시오.
형식은 매우 전문적이고 군더더기 없이 보고서 형식으로 작성하십시오.`;

    const commanderUserPrompt = `[대표님 최고 지휘 명령]:
"${command}"

위 명령에 대한 전사 작전 수행 계획서(Executive Action Report)를 다음 목차로 수립하여 보고하십시오:
1. 🎯 작전 목표 및 전략적 의도
2. 👥 부서별/워커별 업무 분배 (개발팀장 PM, B2C 물류/OMS, 마케팅/MD)
3. ⚠️ 핵심 리스크 및 방어 대책
4. ⏱️ 권장 실행 타임라인 및 대표님 최종 승인 체크리스트`;

    // 1. Anthropic Claude API 호출
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
            max_tokens: 3500,
            system: commanderSystemPrompt,
            messages: [{ role: "user", content: commanderUserPrompt }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.content?.[0]?.text;
          if (text) {
            return NextResponse.json({ report: text });
          }
        }
      } catch (e) {
        console.error("Commander Anthropic API call failed:", e);
      }
    }

    // 2. OpenAI API 호출
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
              { role: "system", content: commanderSystemPrompt },
              { role: "user", content: commanderUserPrompt },
            ],
            temperature: 0.5,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.choices?.[0]?.message?.content;
          if (text) {
            return NextResponse.json({ report: text });
          }
        }
      } catch (e) {
        console.error("Commander OpenAI API call failed:", e);
      }
    }

    // 3. Fallback 기본 지휘 보고서 (키 미등록 시)
    return NextResponse.json({
      report: `### 🫡 [Chief of Staff] 최고 지휘 명령 수신 및 작전 계획 보고

대표님께서 하달하신 명령을 전사 에이전트 군단에 즉각 전파하고 실행 체계를 가동했습니다.

---

#### 1. 🎯 작전 목표 및 전략 의도
* **핵심 지휘 내용**: "${command}"
* **작전 기본 방침**: 기존 운영 안정성을 100% 유지하면서, 업무 완료 속도를 극대화하는 자율 오케스트레이션 가동.

#### 2. 👥 부서별/워커별 업무 분배
| 담당 롤 | 엔진 / 담당자 | 하달된 핵심 임무 |
|---|---|---|
| **[롤-01] 개발팀장 PM** | Next.js / lam 등 | 프로덕션 배포 파이프라인 무중단 상태 점검 및 기술 검토 |
| **[롤-02] B2C 물류/OMS** | b2c-api / Node.js | 무인창고 도어락 및 예약/결제 트랜잭션 데이터 무결성 검증 |
| **[롤-03] 마케팅/MD** | Grok / SNS AI | 11월 프로모션 홍보 카피 및 고객 전환 유도 콘텐츠 제작 |

#### 3. ⚠️ 핵심 리스크 및 방어 대책
* **리스크**: 배포 중 예기치 않은 의존성 충돌 또는 API 지연
* **방어 대책**: Vercel의 Instant Rollback(즉시 롤백) 준비 및 격리된 샌드박스에서 선행 검증 완료.

#### 4. ⏱️ 권장 실행 타임라인
1. **D-Day 09:00**: 각 PM 에이전트 상세 기획안 제출 및 리서치 완료
2. **D-Day 14:00**: 프로토타입 및 초안 검증 완료
3. **D-Day 18:00**: 대표님 최종 검토 후 프로덕션 반영

*(💡 안내: Vercel 대시보드에서 \`ANTHROPIC_API_KEY\` 또는 \`OPENAI_API_KEY\`를 설정하시면 실시간 Claude 3.5 Sonnet / Opus 엔진으로 지휘 보고서가 즉시 동적 생성됩니다.)*`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "총사령관 보고서 생성 실패" },
      { status: 500 }
    );
  }
}
