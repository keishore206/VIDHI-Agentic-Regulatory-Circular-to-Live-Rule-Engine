/**
 * ==============================================================================
 * VIDHI Backend Engine — Statutory Obligation Data Model & Registry
 * Team Codexx (Keishore G & Rohit V)
 * ==============================================================================
 */

class StatutoryObligation {
  constructor({
    clause,
    circularRef,
    category,
    title,
    text,
    targetField,
    status,
    guardrail = false,
    modality = "MUST",
    effectiveDate = "2027-01-01"
  }) {
    this.id = `OBL-${circularRef.replace(/[^a-zA-Z0-9]/g, '_')}-C${clause}`;
    this.clause = clause;
    this.circularRef = circularRef;
    this.category = category;
    this.title = title;
    this.text = text;
    this.targetField = targetField;
    this.status = status;
    this.guardrail = guardrail;
    this.modality = modality;
    this.effectiveDate = effectiveDate;
    this.extractedAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      clause: this.clause,
      circularRef: this.circularRef,
      category: this.category,
      title: this.title,
      text: this.text,
      targetField: this.targetField,
      status: this.status,
      guardrail: this.guardrail,
      modality: this.modality,
      effectiveDate: this.effectiveDate,
      extractedAt: this.extractedAt
    };
  }
}

module.exports = { StatutoryObligation };

