/**
 * ==============================================================================
 * VIDHI Backend Engine — Regulatory Knowledge Graph (Neo4j Semantic Model)
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

function getKnowledgeGraph() {
  return {
    graphName: "VIDHI Regulatory Semantic Knowledge Graph",
    schemaType: "Neo4j Labeled Property Graph (LPG)",
    nodes: [
      { id: "CIRCULAR_KYC_2026", type: "Circular", label: "DEMO/KYC/2026/001", authority: "Fictional Regulatory Test Authority" },
      { id: "CLAUSE_3_1", type: "Clause", label: "Clause 3.1: Date Tracking", modality: "MUST" },
      { id: "CLAUSE_3_2", type: "Clause", label: "Clause 3.2: 48h Task Router", modality: "MUST" },
      { id: "CLAUSE_3_3", type: "Clause", label: "Clause 3.3: Do Not Freeze Constraint", modality: "MUST NOT" },
      { id: "CLAUSE_4_3", type: "Clause", label: "Clause 4.3: WORM Audit", modality: "SHOULD" },
      { id: "CLAUSE_5_1", type: "Clause", label: "Clause 5.1: Effective Timeline", modality: "MUST" },
      { id: "POL_RETAIL_KYC", type: "Policy", label: "POL-RETAIL-KYC-v3", bankScope: "Retail Deposits" },
      { id: "RULE_KYC_DSL", type: "Rule", label: "RULE_KYC_AUDITABLE_REVIEW_2026", status: "CBS_SHADOW" }
    ],
    edges: [
      { from: "CIRCULAR_KYC_2026", to: "CLAUSE_3_1", relation: "CONTAINS_CLAUSE" },
      { from: "CIRCULAR_KYC_2026", to: "CLAUSE_3_2", relation: "CONTAINS_CLAUSE" },
      { from: "CIRCULAR_KYC_2026", to: "CLAUSE_3_3", relation: "CONTAINS_GUARDRAIL" },
      { from: "CIRCULAR_KYC_2026", to: "CLAUSE_4_3", relation: "CONTAINS_AUDIT_SPEC" },
      { from: "CIRCULAR_KYC_2026", to: "CLAUSE_5_1", relation: "CONTAINS_TIMELINE" },
      { from: "CLAUSE_3_2", to: "POL_RETAIL_KYC", relation: "REMEDIES_GAP" },
      { from: "CLAUSE_3_3", to: "RULE_KYC_DSL", relation: "COMPILES_GUARDRAIL_INTO" },
      { from: "RULE_KYC_DSL", to: "POL_RETAIL_KYC", relation: "MODERNIZES_POLICY" }
    ]
  };
}

module.exports = { getKnowledgeGraph };

