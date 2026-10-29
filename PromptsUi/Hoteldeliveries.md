Implement **only the Hotel Deliveries page**. Do not modify anything outside its existing section folder.

First, briefly inspect the existing section files, then implement directly. Do not waste time on lengthy analysis or pixel-by-pixel explanations.

**References**
- `C:\Users\DELL\Desktop\Tourist-Market\AGENTS.md`
- `C:\Users\DELL\Desktop\Tourist-Market\PromptsUi\Hoteldeliveries.png`
- `C:\Users\DELL\Desktop\Tourist-Market\PromptsUi\Hoteldeliveriesresponsive.png`

**Assets**
- Desktop: `C:\Users\DELL\Desktop\Tourist-Market\public\Hoteldeliveries`
- Mobile: `C:\Users\DELL\Desktop\Tourist-Market\public\Hoteldeliveries\responsive`

### General styling
- Font: Poppins
- Background: `#FFF9F0`
- Palette: `#0E4A68`, `#888888`, `#555555`, `#0E4764`, `#000000`
- lines border: `0.8px solid #BBBBBB`

### Hero
- Background: `#0E2A47`
- Title: white, bold
- Subtitle: white, regular
- Match the desktop and mobile reference images.
- Preserve the existing Hero text and styling.

**Desktop animation:**
- Display 3 adjacent vertical image strips on the right, tilted approximately `-25.12deg`.
- Left and right strips move downward; the middle strip moves upward.
- Use the existing Framer Motion library with linear easing, `duration: 10`, and seamless infinite looping.
- Prevent gaps or jumps between loops.

**Mobile animation:**
- Follow `Hoteldeliveriesresponsive.png` and use the images from the `responsive` assets folder.
- Display only **one horizontal image strip below the Hero text**, with no diagonal tilt.
- Animate continuously using Framer Motion with linear easing, `duration: 10`, `repeat: Infinity`, and `delay: 0.001` (1ms).
- Do not add a second strip.

Keep images undistorted and respect `prefers-reduced-motion`.

### Other page elements
- **Sort by button:** white background, `0.5px solid #888888` border, `5px` radius.
- **Search group:** transparent background, `#888888` text, `1px solid #0000004D` border.
- **Image containers:** `#FFFFF2` background, `0.5px solid #888888` border, `5px` radius.

### Constraints
- Reuse existing components, images, and animation setup.
- Make only the necessary changes within the existing Hotel Deliveries section folder.
- Do not modify shared components, global styles, Navbar, Footer, other pages, or unrelated files.
- Do not create duplicate components or introduce CSS keyframe animations.
- Match the references as closely as possible without unnecessary refactoring.

Implement the changes directly, then briefly report the modified files.