# VIDHI — n8n Multi-Agent Regulatory Intelligence Workflow

This folder contains the complete, production-grade **n8n Multi-Agent Workflow** definition for VIDHI.

## Workflow File
* **`VIDHI_Multi_Agent_Regulatory_Intelligence.json`**

## Architecture & Agent Pipeline in n8n

```
[Webhook: /vidhi-circular-intake]
               │
               ▼
      [Normalize Circular]
               │
   ┌───────────┴───────────────────────────────┐
   ▼                                           ▼
[Agent 1: Applicability]            [Agent 2: Obligation Extraction]
(Urban Coop / Small Finance Banks)  (MUST, MUST NOT, MAY, SHOULD)
   │                                           │
   └───────────┬───────────────────────────────┘
               ▼
[Agent 3: Policy Alignment & Gap Auditor]
(Maps to internal bank policies: POL-RETAIL-KYC-v3)
               │
               ▼
[Agent 4: Typed Rule Synthesizer (CRCE)]
(Compiles typed CBS business rules with Clause 3.3 Guardrails)
               │
               ▼
[Agent 5: Transaction Sandbox Backtester]
(Replays 14,240 accounts, checks zero wrongful closures)
               │
               ▼
[Agent 6: Dual-Key Governance Dispatcher]
(A2A webhook alert to Compliance Officer Maker & System Admin Checker)
```

## How to Import & Run in n8n

1. Open your n8n instance (Cloud or self-hosted via `npx n8n` / Docker).
2. Go to **Workflows** -> click **Add Workflow** -> click the three dots (`...`) top right -> select **Import from File**.
3. Select `VIDHI_Multi_Agent_Regulatory_Intelligence.json`.
4. Configure your LLM API Key (OpenAI / OpenRouter / Anthropic) in the credential settings.
5. Click **Activate Workflow**.
6. The webhook will be live at:
   `POST https://<your-n8n-instance>/webhook/vidhi-circular-intake`
