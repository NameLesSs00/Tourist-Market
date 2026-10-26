Implement **only the private Excursion Details page** to match the provided reference image exactly.

Not allowed to change anything outside of this section folder.

Its folders are already created, so inspect them first, then work only on the private Excursion Details page and don't touch anything else.

**Reference:**
- `C:\Users\DELL\Desktop\Tourist-Market\AGENTS.md`
- `C:\Users\DELL\Desktop\Tourist-Market\PromptsUi\Privatedetails\Privatedetails.png`

**Assets:**
- `C:\Users\DELL\Desktop\Tourist-Market\public\PrivateExcursions\Privatedetails`

Match the screenshot exactly:

- `poppins` font 
- bg color #FFF8ED
- main title color: #DE7423 bold  58px
-lines-border: 0.8px solid #BBBBBB
-cards-bg: #FFFFFF
 
**Hero:**
-text colors: #155F98 , #0E4A68 , #666666 , #DE7423
- Use the appropriate existing  hero background image from `C:\Users\DELL\Desktop\Tourist-Market\public\PrivateExcursions\Privatedetails\Hero-pic.png `.
- Match the reference image exactly, including the text placement and background positioning. 

**Gallery:**
- Reproduce the large main image and vertical thumbnails exactly as shown.
- Include the image navigation arrows and image counter.

main image: 
radius:20px
border: 4px solid #FFFFFF
box-shadow: 0px 4px 25px 0px #00000040;

thubnails: 
radius:10px
border: 3px solid #FFFFFF
box-shadow: 0px 1px 10px 2px #0000004D;
background-color : #FFFFFF

arrow and counter: background: #F5F5F5;
border: 0.39px solid #00000066
radius: 15.65px

**Booking card:**
- Background: #FFFFFF
- Text color: #000000, #0E4A68,  #0B374D, #DE7423;
- border: 0.5px solid #888888
- Border-radius: 10px
- Book Now button:
  - Background: #DE7423;
  - Color: #FFFFFF
  - border: 0.25px solid #888888CC
  - Border-radius: 10 px
- **car icon based on the number of passengers** :
 - choose the car icon based on the number of passengers:

 - >= 1 and <= 3 => VehicleType.Car,`C:\Users\DELL\Desktop\Tourist-Market\public\PrivateExcursions\Privatedetails\Car.svg`
 - >= 4 and <= 9 => VehicleType.Microbus,`C:\Users\DELL\Desktop\Tourist-Market\public\PrivateExcursions\Privatedetails\Microbus.svg`
 - >= 10 and <= 16 => VehicleType.Minibus,`C:\Users\DELL\Desktop\Tourist-Market\public\PrivateExcursions\Privatedetails\Minibus.svg`
 - >= 17 and <= 35 => VehicleType.Bus`C:\Users\DELL\Desktop\Tourist-Market\public\PrivateExcursions\Privatedetails\Bus.svg`

  
**About Section** the next setion(description):it will be scrolling horizontally in responsive

**Select Attractions**
the cards should be like this :
border: 0.6px solid #DE7423 radius: 5px
box-shadow: 0px 1px 10px 1px #00000040;
 
main image: 
radius:10px

thubnails: 
radius:5px

arrow: 
`C:\Users\DELL\Desktop\Tourist-Market\public\PrivateExcursions\Privatedetails\left.svg`

`C:\Users\DELL\Desktop\Tourist-Market\public\PrivateExcursions\Privatedetails\right.svg`


**Price Includes section:**
textcolor: #000000;

**Need Help section:**

maintitle : #124885
subtitle : #083043
buttons-bg:
#17DB55, #0E4A68 , #F4F4F4

**Data:**
- Use dummy data and keep it ready to be connected to the backend.

Use the existing assets and project structure. Do not add anything that is not shown in the reference. Do not redesign or modify anything outside the Group Excursions section folder.