Implement Four Service Details Pages

Implement only these four Details pages to match their Figma reference images exactly:

VIP Airport Details
Real Estate Details
Tourist Services Details
Car Rental Details

Important: Do not modify anything outside these four sections' folders.

The folders already exist. Inspect the project structure first, then work only on the requested sections and their necessary files.

1. References
Project instructions: C:\Users\DELL\Desktop\Tourist-Market\AGENTS.md
VIP Airport: C:\Users\DELL\Desktop\Tourist-Market\PromptsUi\ServicesDetails\Vip airport.png
Real Estate: C:\Users\DELL\Desktop\Tourist-Market\PromptsUi\ServicesDetails\real estate.png
Tourist Services: C:\Users\DELL\Desktop\Tourist-Market\PromptsUi\ServicesDetails\tourist services.png
Car Rental: C:\Users\DELL\Desktop\Tourist-Market\PromptsUi\ServicesDetails\Car Rental – Mercedes Benz.png

2. Assets
Use the existing assets inside C:\Users\DELL\Desktop\Tourist-Market\public\Services.

3. General Design
Typography and Colors
Font: Poppins
Page background: #FFF8ED
Main title: #0E4A68
Subtitle: #646464
Card background: #FFFFFF
Card border: 0.5px solid #888888
Card radius: 8px
Card shadow: 0px 2px 20px 2px #00000033
Card title: #0E4A68, bold
Card description: #0E4A68, regular
Primary Button
Background: #165F84
Text: #FFFFFF
Font weight: Semibold
Border: 0.31px solid #000000
Radius: 5px
Shadow: 0px 2px 20px 2px #00000040
WhatsApp Button
Background: #17DB55
Text: #FFFFFF
Font weight: Semibold
Radius: 5px

4. Hero Section
bg : #DFE9F1
Implement the hero section for each page using its corresponding asset.

VIP Airport: public/Services/Vip-airport/hero.png
Real Estate: public/Services/RealEstate/hero.png
Tourist Services: public/Services/Touristservices/hero.jpg
Car Rental: public/Services/carServices/hero.jpg


Match the image dimensions, aspect ratio, cropping, positioning, and spacing shown in each reference.

5. Service Details Card

Reproduce the service information card exactly as shown in each reference.
Styling
Background: #FFFFFF
Text color: #0E4A68
Border: 0.5px solid #888888
Border radius: 8px


Preserve the exact service title, metadata, description, notes, price, billing period, and booking button.

Section-specific differences:

VIP Airport: Match the service information and numbered notes in Vip-airport.png.
Real Estate: Match the service information and numbered notes in Real Estate.png.
Tourist Services: Preserve the translator description, Available Languages list, Cost Services section, hourly pricing, and service-specific form fields.
Car Rental: Match the vehicle information, numbered notes, pricing, billing period, and booking button in Car-rent-card.png.

Do not add content or invent design details that are not shown in the references.

6. Booking Form

Reproduce the booking form on each page exactly as shown in its reference.

Background: #FFFFFF
Text color: #0E4A68
Border: 0.5px solid #888888
Border radius: 8px

Functionality
Match the exact field labels, placeholders, order, required indicators, dropdowns, and date pickers.
Keep each form specific to its service.
Preserve the translator-specific fields on Tourist Services.
Preserve the vehicle-related fields on Car Rental.
Do not add extra fields or controls.
Use dummy data where needed and keep the forms ready for backend integration.
Preserve existing APIs, imports, and data flow.

7. Contact Us Section

Match the Contact Us section shown in each reference.

- Background: `#F5F7F8`
- Border: `0.2px solid #888888`
- Main title color: #0E4A68 
- Subtitle color: #52646B
- Button backgrounds:
 #17DB55 border-radius:8.38px
 #F4F4F4 border: 0.5px solid #888888 border-radius:8.38px
 #1487B8 border-radius:8.38px

Reuse existing assets and keep contact actions functional.

8. Reviews Section

Reuse the existing Reviews implementation from the Group Excursions Details and Private Excursions Details pages.

Inspect both pages and identify the existing Reviews components, styles, assets, avatars, and icons.
Reuse the rating summary, rating bars, review cards, reviewer avatars, star ratings, review form, and responsive layout.
Adapt the existing implementation only as necessary to match the four reference images.
Do not rebuild the Reviews section from scratch.
Do not modify the Group Excursions Details or Private Excursions Details pages or their files.
Keep any required changes inside the four permitted section folders.

9. Icons and Assets
Reuse existing assets and icons in the four sections first.
If an icon is missing, inspect the Group Excursions Details and Private Excursions Details pages for reusable assets.
Use alternative icons only if the required assets cannot be found.
Match icon sizes, colors, stroke widths, and alignment to the references.
Do not introduce unnecessary dependencies or replace existing icons with emoji.

10. Data and Functionality
Use dummy data where backend data is unavailable.
Keep the implementation ready for future backend integration.
Preserve existing APIs, imports, routing, and data flow.
Keep forms, buttons, and navigation functional.
Maintain the unique content and layout of each page.
Do not introduce unrequested controls or functionality.

11. Restrictions
Modify only files inside the four permitted section folders.
Do not modify shared components or global styles.
Do not modify unrelated pages or existing Reviews implementations.
Do not change Group Excursions Details or Private Excursions Details.
Do not perform broad refactoring.
Do not change project configuration or install dependencies unless explicitly permitted.

If a required change would affect a file outside the permitted folders, find a local solution instead.

12. Validation

After implementation:

Build the project using its existing commands.
Check all four Details pages individually.
Compare each page with its corresponding reference image.
Verify hero images, card dimensions, typography, spacing, notes, and pricing.
Verify booking forms and button functionality.
Check Contact Us, Reviews, and footer sections.
Check responsive behavior and horizontal overflow.
Inspect the final diff and confirm that no files outside the four permitted folders were changed.
Fix any issues found before completion.

Final requirement: The Figma reference images are the single source of truth. Implement only the four requested Details pages, reuse existing assets and functionality, and do not redesign or modify anything outside the permitted scope.