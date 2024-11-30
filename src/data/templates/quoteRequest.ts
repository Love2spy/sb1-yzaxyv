export const quoteRequestTemplates = [
  {
    id: 'quote-1',
    name: 'Standard Quote Request',
    category: 'quote_request',
    content: `# Request for Quote (RFQ)

## 1. Company Information
[Your Company Name]
[Address]
[Contact Information]

## 2. Project Overview
[Brief description of the project and requirements]

## 3. Scope of Work
### 3.1 Required Products/Services
- [Item/Service 1]
- [Item/Service 2]

### 3.2 Specifications
[Detailed technical specifications]

### 3.3 Deliverables
[List expected deliverables]

## 4. Timeline
- Quote Due Date: [Date]
- Delivery Required By: [Date]

## 5. Pricing Requirements
- Itemized pricing
- Include shipping/handling
- Payment terms

## 6. Additional Requirements
- Insurance requirements
- Certifications needed
- Compliance requirements

## 7. Submission Instructions
[How to submit the quote]

## 8. Evaluation Criteria
[How quotes will be evaluated]`,
    tags: ['rfq', 'quote', 'procurement']
  },
  {
    id: 'quote-2',
    name: 'Technical Quote Request',
    category: 'quote_request',
    content: `# Technical Quote Request

## 1. Background
[Project context and objectives]

## 2. Technical Requirements

### 2.1 Functional Requirements
- [Requirement 1]
- [Requirement 2]

### 2.2 Performance Requirements
- [Performance spec 1]
- [Performance spec 2]

### 2.3 Compatibility Requirements
- [Compatibility requirement 1]
- [Compatibility requirement 2]

## 3. Deliverables Matrix

| Deliverable | Specification | Timeline | Acceptance Criteria |
|------------|---------------|----------|-------------------|
| [Item 1] | [Spec] | [Date] | [Criteria] |
| [Item 2] | [Spec] | [Date] | [Criteria] |

## 4. Quality Requirements
- Quality standards
- Testing requirements
- Documentation needs

## 5. Support Requirements
- Warranty terms
- Maintenance requirements
- Technical support

## 6. Quote Format
[Specific format requirements for the quote]

## 7. Evaluation Process
[Technical evaluation criteria]`,
    tags: ['technical', 'requirements', 'specifications']
  }
];