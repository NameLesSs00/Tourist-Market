Implement **only the Products Cart page**. Do not modify anything outside its existing section folder.

First, briefly inspect the existing section files, then implement directly. Do not waste time on lengthy analysis or pixel-by-pixel explanations.

**References**
- Empty Cart: `C:\Users\DELL\Desktop\Tourist-Market\PromptsUi\empty-cart.png`
- Cart with Products: `C:\Users\DELL\Desktop\Tourist-Market\PromptsUi\Cart+payment.png`
- Remove Icon: `C:\Users\DELL\Desktop\Tourist-Market\public\remove.svg`

Both states must exist on the same page and switch dynamically depending on the actual cart data.

**General**
- Font: Poppins
- Background: #FFF8ED

**Products Cart**
- Title: Poppins | #083952 SemiBold
- Table header: #0E4A68 / SemiBold / #FFFFFF / 1px solid #888888
- Product row: #FFFFFF / 0.6px solid #888888 radius: 0.6px
- Product name: Medium #146188
- Price and Total: SemiBold #0E4A68
- Quantity controller: border: 0.3px solid #888888 Radius:3px background: #FFFFFF; icons-box-shadow: 0px 2px 5px 0px #00000033;
border: 1.6px solid #0E4A68

- Clear Cart button: background: #0E4A68; Radius:5px border: 0.25px solid #000000 text: Medium #FFFFFF

**Order Summary**
- Card: border: 0.5px solid #888888 Radius: 5px
- Header: background: #0E4A68;
- Product mini-card: border: 0.6px solid #888888 Radius: 6px #146188;
- **Subtotal :** : #0E4A68 Medium
- **Total :** : #0E4A68 SemiBold

**Contact Information Card**
- Card: 
box-shadow: 0px 1px 8px 1px #00000033;
border: 0.5px solid #888888 background: #FFFFFF;Radius: 8px
- Title: #0E4A68 SemiBold 
- Labels: #0E4A68 Medium
- Inputs: background: #FFFFFF;Radius :5px 
- Placeholder: #00000066;Regular


**Delivery Information Card**
as  **Contact Information Card**

**Empty State**
- Message: #0E4A68; SemiBold
- Hotel Deliveries button: border: 0.25px solid #000000 Radius:5px #FFFFFF; SemiBold

### Implementation Plan

Inspect the existing cart components, state management, APIs, and project structure first.

Create a concise implementation plan explaining how both states and all cards will be implemented.

Do not modify code yet.

Desktop first, mobile later. Preserve existing functionality, use real cart data, and avoid dummy data or unrelated changes.
