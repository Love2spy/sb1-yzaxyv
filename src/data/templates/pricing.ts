export const pricingTemplates = [
  {
    id: 'price-1',
    name: 'Detailed Price Breakdown',
    category: 'pricing',
    content: `# Price Proposal

## 1. Labor Categories and Rates

| Labor Category | Rate | Hours | Total |
|---------------|------|-------|-------|
| [Category 1] | $[Rate] | [Hours] | $[Total] |
| [Category 2] | $[Rate] | [Hours] | $[Total] |

## 2. Materials and Equipment

| Item | Unit Cost | Quantity | Total |
|------|-----------|----------|-------|
| [Item 1] | $[Cost] | [Qty] | $[Total] |
| [Item 2] | $[Cost] | [Qty] | $[Total] |

## 3. Other Direct Costs
- Travel: $[Amount]
- Training: $[Amount]
- Supplies: $[Amount]

## 4. Indirect Rates
- Overhead: [%]
- G&A: [%]
- Profit: [%]

## 5. Total Price Summary
- Direct Costs: $[Amount]
- Indirect Costs: $[Amount]
- Total Price: $[Amount]`,
    tags: ['pricing', 'cost', 'breakdown']
  },
  {
    id: 'price-2',
    name: 'Price Narrative',
    category: 'pricing',
    content: `# Price Narrative

## 1. Pricing Methodology
[Describe the approach used to develop pricing]

## 2. Cost Elements

### 2.1 Direct Labor
- Basis of Estimates
- Labor Categories Justification
- Rate Development

### 2.2 Materials
- Pricing Sources
- Quantity Justification
- Vendor Quotes

### 2.3 Other Direct Costs
- Travel Requirements
- Equipment
- Supplies

### 2.4 Indirect Rates
- Rate Structure
- Historical Basis
- Forward Pricing

## 3. Cost Savings
[Describe any cost savings or efficiencies]

## 4. Price Reasonableness
[Justify price reasonableness]`,
    tags: ['narrative', 'justification', 'methodology']
  }
];