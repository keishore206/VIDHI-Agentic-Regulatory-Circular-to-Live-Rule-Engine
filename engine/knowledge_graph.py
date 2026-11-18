"""
VIDHI - Regulatory Knowledge Graph & Bank Semantic Model
Team Codexx (Keishore G & Rohit V)
Neo4j Labeled Property Graph (LPG) Engine & Cypher Exporter
"""

from typing import Dict, List, Any
import json

class GraphNode:
    def __init__(self, node_id: str, label: str, properties: Dict[str, Any]):
        self.node_id = node_id
        self.label = label
        self.properties = properties

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.node_id,
            "label": self.label,
            **self.properties
        }

class GraphEdge:
    def __init__(self, from_node: str, to_node: str, relationship: str, properties: Dict[str, Any] = None):
        self.from_node = from_node
        self.to_node = to_node
        self.relationship = relationship
        self.properties = properties or {}

    def to_dict(self) -> Dict[str, Any]:
        return {
            "from": self.from_node,
            "to": self.to_node,
            "relation": self.relationship,
            **self.properties
        }

class RegulatoryKnowledgeGraph:
    """
    Constructs an institutional semantic graph linking:
    Circular -> Clauses -> Obligations -> Policies -> Rules -> Backtests -> Approvals.
    """

    def __init__(self):
        self.nodes: List[GraphNode] = []
        self.edges: List[GraphEdge] = []
        self._build_default_kyc_graph()

    def _build_default_kyc_graph(self):
        # 1. Circular Node
        self.nodes.append(GraphNode("CIRCULAR_KYC_2026", "Circular", {
            "ref": "DEMO/KYC/2026/001",
            "authority": "Fictional Regulatory Test Authority",
            "effectiveDate": "2027-01-01"
        }))

        # 2. Clause Nodes
        self.nodes.append(GraphNode("CLAUSE_3_1", "Clause", {"name": "Clause 3.1: Date Tracking", "modality": "MUST"}))
        self.nodes.append(GraphNode("CLAUSE_3_2", "Clause", {"name": "Clause 3.2: 48h Task Router", "modality": "MUST"}))
        self.nodes.append(GraphNode("CLAUSE_3_3", "Clause", {"name": "Clause 3.3: Do Not Freeze", "modality": "MUST NOT"}))
        self.nodes.append(GraphNode("CLAUSE_4_3", "Clause", {"name": "Clause 4.3: WORM Audit", "modality": "SHOULD"}))
        self.nodes.append(GraphNode("CLAUSE_5_1", "Clause", {"name": "Clause 5.1: Effective Timeline", "modality": "MUST"}))

        # 3. Bank Policy Node
        self.nodes.append(GraphNode("POL_RETAIL_KYC", "Policy", {
            "policyId": "POL-RETAIL-KYC-v3",
            "department": "Retail Deposit Operations"
        }))

        # 4. CBS Rule Node
        self.nodes.append(GraphNode("RULE_KYC_DSL", "Rule", {
            "ruleId": "RULE_KYC_AUDITABLE_REVIEW_2026",
            "status": "CBS_SHADOW"
        }))

        # Edges
        self.edges.append(GraphEdge("CIRCULAR_KYC_2026", "CLAUSE_3_1", "CONTAINS_CLAUSE"))
        self.edges.append(GraphEdge("CIRCULAR_KYC_2026", "CLAUSE_3_2", "CONTAINS_CLAUSE"))
        self.edges.append(GraphEdge("CIRCULAR_KYC_2026", "CLAUSE_3_3", "CONTAINS_GUARDRAIL"))
        self.edges.append(GraphEdge("CIRCULAR_KYC_2026", "CLAUSE_4_3", "CONTAINS_AUDIT_SPEC"))
        self.edges.append(GraphEdge("CIRCULAR_KYC_2026", "CLAUSE_5_1", "CONTAINS_TIMELINE"))
        self.edges.append(GraphEdge("CLAUSE_3_2", "POL_RETAIL_KYC", "REMEDIES_GAP"))
        self.edges.append(GraphEdge("CLAUSE_3_3", "RULE_KYC_DSL", "COMPILES_GUARDRAIL_INTO"))
        self.edges.append(GraphEdge("RULE_KYC_DSL", "POL_RETAIL_KYC", "MODERNIZES_POLICY"))

    def to_neo4j_cypher(self) -> str:
        """Generates executable Neo4j Cypher statements to initialize the graph database."""
        statements = []
        for node in self.nodes:
            props = ", ".join([f"{k}: '{v}'" for k, v in node.properties.items()])
            statements.append(f"MERGE (n:{node.label} {{id: '{node.node_id}', {props}}});")
        
        for edge in self.edges:
            statements.append(
                f"MATCH (a {{id: '{edge.from_node}'}}), (b {{id: '{edge.to_node}'}}) "
                f"MERGE (a)-[:{edge.relationship}]->(b);"
            )
        return "\n".join(statements)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "graphName": "VIDHI Regulatory Semantic Knowledge Graph",
            "schemaType": "Neo4j Labeled Property Graph (LPG)",
            "nodes": [n.to_dict() for n in self.nodes],
            "edges": [e.to_dict() for e in self.edges]
        }

if __name__ == "__main__":
    kg = RegulatoryKnowledgeGraph()
    print("=== NEO4J CYPHER DUMP ===")
    print(kg.to_neo4j_cypher())
