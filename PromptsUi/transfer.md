Implement **only the Transfers page** to match the provided reference images exactly.

Do not change anything outside the Transfers section folder.

The folders are already created. Inspect their existing structure first, then work only on the Transfers page and its necessary files.

**References:**
- `C:\Users\DELL\Desktop\Tourist-Market\AGENTS.md`
- `C:\Users\DELL\Desktop\Tourist-Market\PromptsUi\transfer-one-way.png`
- `C:\Users\DELL\Desktop\Tourist-Market\PromptsUi\transfer-round trip.png`

**Assets:**
- `C:\Users\DELL\Desktop\Tourist-Market\public\transfer\`

## General Design

- Font: `Poppins`
- Page background: `#FFF8ED`
- Main title color: `#0E4A68`
- Subtitle color: `#52646B`

**Cards:**
- Background: `#FFFFFF`
- Border: `0.52px solid #888888`
- Box shadow: `0px 1.05px 8.38px 1.05px #00000033`
- Border radius: `8.38px`
- input feilds border radius: 5.24px border: 0.42px solid #00000066 background: #FFFFFF;
- placeholder: #00000066,Regular

## Hero Section
- Image: border-radius: 8px;

## Booking Form

- Background: `#FFFFFF`
- Text color: `#0E4A68`
- Border: `0.52px solid #888888`
- Border radius: `8.38px`
- **Share button:** 
- background: #F5F5F5;
- text color: #0E4A68;
- border: 0.52px solid #DDDDDD;
- border radius: 6.29px 
 
**Book Now button:**
- Background: `#0E4A68`
- Text color: `#FFFFFF`
- Border: `0.25px solid #000000`
- Border radius: `5.24px`

**Trip Type selector:**
- One Way radius: Top-left:5.24px, bottom-left:5.24px;
- Round Trip radius: Top-right:5.24px, bottom-right:5.24px;
- width:  877.8194580078125 height: 57.61345291137695 in desktop
- text color: #FFFFFF , #00000066 Medium;

## Vehicle and Price Card

- background: #EBF5FA;
- text color: #0E4A68 , #0E4A6880;
- border-radius: 8.74px
- border: 1px solid #0E4A68
- box-shadow: 0px 5px 20px 3px #0E4A6866;
 
## One Way Offer Banner

- background: #0E4A68;
- text color: #FFFFFF SemiBold;
- border-radius: 8.74px
- box-shadow: 0px 8.74px 21.84px 0px #0000004D;

## Round Trip Waiting Information
This section should appear according to the Round Trip reference and the selected trip type.
 
- background:  #EBF5FA;
- text color: #0E4A68;
- border-radius: 8.74px
- box-shadow: 0px 8.74px 21.84px 0px #0000004D;
**• 3 hours free waiting**
- background: #D9F0FC;
- border: 0.42px solid #00000066
- radius: 5.24px;
- text color: #206F97 Medium;
- leftside border: 0.42px solid #00000066;
- leftside border-top-left-radius: 5px;
- leftside border-bottom-left-radius: 5px;
- leftside background: #0E4A68;
- leftside width: 8px in desktop ;

## Booking Summary

- Background: #0E4A68;
- Border radius: 12.57px;
- text color: #FFFFFF , #F0C060;

**Offer strip:**
- background: #12647C;
- border-radius: 6.29px;
- text color: #FFFFFF;

## Submit Booking Button

- background: #0E4A68;
- border-radius: 8.38px;
- text color: #FFFFFF SemiBold;
- box-shadow: 0px 2.1px 8.38px 0px #00000033;

## Contact Us Section

- Background: `#F5F7F8`
- Border: `0.2px solid #888888`
- Main title color: #0E4A68 
- Subtitle color: #52646B
- Button backgrounds:
 #17DB55 border-radius:8.38px
 #F4F4F4 border: 0.5px solid #888888 border-radius:8.38px
 #1487B8 border-radius:8.38px

## Reviews Section
- Reuse the existing Reviews section implementation from the **Group Excursions Details** and **Private Excursions Details** pages.
- Inspect both pages and identify the shared Reviews components, styling, assets, and behavior.
- Reuse the existing implementation and adapt it only as necessary to fit the Transfers page reference.
- Do not rebuild the Reviews section from scratch or introduce a different design.
- Preserve the existing review cards, rating summary, rating bars, review form, avatars, icons, and responsive layout.
- Do not modify the Group Excursions Details or Private Excursions Details pages or their files.

## Icons and Assets
- First, reuse the existing icons and assets in the Transfers section.
- If any required icon is missing, inspect the existing **Group Excursions Details** and **Private Excursions Details** pages and reuse their icons and assets.
- Only use an alternative icon if the icon cannot be found in either page or the existing project assets.
- Keep icon sizes, colors, stroke widths, and alignment consistent with the Transfers reference design.

## Data and Functionality

- Use dummy data for now and keep the implementation ready for future backend integration.
- Keep the One Way and Round Trip states consistent with the reference images.
- Ensure the conditional sections, displayed prices, discounts, and waiting information match the selected trip type.
- Do not add content, controls, or sections that are not shown in the references.

## Final Restrictions

- Use the existing assets and project structure.
- Reuse existing shared components when appropriate.
- Do not redesign or modify anything outside the Transfers section folder.
- Preserve existing working functionality and avoid unrelated refactoring.
- Verify the final UI against both reference images, including dimensions, spacing, typography, colors, icons, and conditional states.
- Do not consider the task complete until both One Way and Round Trip layouts have been checked.

**The reference images are the source of truth. Do not invent missing design details; inspect the references and fill in the specified values before implementation.**