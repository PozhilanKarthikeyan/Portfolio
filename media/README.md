# Media Directory

Portfolio media assets organized by purpose.

## 📁 Structure

### `/profile/`
Personal and professional photos:
- `profile-picture.jpg` - Hero section profile image
- `about-picture.jpg` - About section professional photo

### `/projects/`
Project showcase images (1200x675px recommended):

#### Active Projects:
- `can-bus-system/main-image.jpg` - CAN Bus communication system
- `ground-station-protocol/main-image.jpg` - Serial protocol for rovers
- `fpga-line-following/main-image.png` - FPGA-based line following bot
- `iot-monitoring/main-image.jpg` - IoT server room monitoring
- `lora-network/main-image.jpg` - LoRa wireless network with ROS
- `smartwatch-pcb/main-image.png` - Award-winning smartwatch PCB design

## 📏 Image Guidelines

**Optimal Dimensions**: 1200x675px (16:9 aspect ratio)
**File Size**: Under 500KB each
**Formats**: JPG for photos, PNG for graphics/diagrams
**Quality**: 85-90% for JPG, maximum for PNG

## 🖼️ Adding New Images

1. Create project folder: `/projects/new-project-name/`
2. Add main image: `main-image.jpg` or `main-image.png`
3. Update project in `index.html`
4. Ensure proper alt text for accessibility
- Add: protocol diagrams, GUI screenshots, communication flow charts

#### `/projects/fpga-line-following/`

**FPGA-Based Line Following Bot**

- `main-image.png` - Main project showcase image ✅ **Already correctly named**
- Add: FPGA board photos, bot images, circuit schematics

#### `/projects/iot-monitoring/`

**IoT System for Real-Time Server Room Monitoring**

- `main-image.jpg` - Main project showcase image ✅ **Already correctly named**
- Add: sensor photos, dashboard screenshots, system setup images

#### `/projects/lora-network/`

**LoRa Wireless Network with ROS Integration**

- `main-image.jpg` - Main project showcase image ✅ **Renamed from main.jpg**
- Add: LoRa module photos, network diagrams, range test results

#### `/projects/smartwatch-pcb/`

**Smart Watch PCB Design**

- `main-image.png` - Main project showcase image ✅ **Renamed from main.png**
- `smartwatch-pcb-layout.pdf` - Technical documentation
- Add: PCB layouts, 3D renderings, finished watch photos

### `/general/`

**General purpose images**

- Add: logos, icons, background images, or any other general assets

### `/competitions/`

**Competition and achievement photos**

- Add: team photos from competitions
- Award ceremony pictures
- Competition setup images
- Achievement certificates/photos

## 📝 Image Guidelines

### **Recommended Formats:**

- **Photos**: JPG/JPEG for photographs
- **Graphics/Diagrams**: PNG for graphics with transparency
- **Screenshots**: PNG for crisp UI elements

### **Recommended Sizes:**

- **Profile pictures**: 500x500px (square, high quality)
- **Project main images**: 1200x675px (16:9 aspect ratio) for best display consistency
- **Additional project images**: 600x400px minimum

### **Naming Convention:**

- Use descriptive names: `main-image.jpg` or `main-image.png` for primary project images
- Use hyphens for spaces: `circuit-diagram.jpg`
- Keep names lowercase for consistency
- Follow format: `main-image.jpg` (JPEG for photos) or `main-image.png` (PNG for graphics)

## 🚀 Next Steps

1. **Replace placeholder images** by adding your actual photos to the appropriate directories
2. **Update file names** in the HTML if needed (currently set to `main-image.jpg` for each project)
3. **Add multiple images per project** for detailed showcase galleries
4. **Compress images** for web optimization while maintaining quality

## 📋 Current File Mapping

| Portfolio Section | File Location                                      | Current Status                          |
| ----------------- | -------------------------------------------------- | --------------------------------------- |
| Hero Profile      | `/profile/profile-picture.jpg`                     | ✅ **Moved from placeholder**           |
| About Photo       | `/profile/about-picture.jpg`                       | ✅ **Moved from placeholder**           |
| CAN Bus Project   | `/projects/can-bus-system/main-image.jpg`          | ✅ **Renamed from Mr. Heisenberg.jpeg** |
| Ground Station    | `/projects/ground-station-protocol/main-image.jpg` | ✅ **Already correctly named**          |
| FPGA Bot          | `/projects/fpga-line-following/main-image.png`     | ✅ **Already correctly named**          |
| IoT Monitoring    | `/projects/iot-monitoring/main-image.jpg`          | ✅ **Already correctly named**          |
| LoRa Network      | `/projects/lora-network/main-image.jpg`            | ✅ **Renamed from main.jpg**            |
| Smartwatch PCB    | `/projects/smartwatch-pcb/main-image.png`          | ✅ **Renamed from main.png**            |

## ✅ File Naming Complete!

All project images have been renamed to follow the consistent naming convention (`main-image.jpg` or `main-image.png`). Your portfolio structure is now fully organized and ready for the next step.

## 🎯 Next Recommended Steps:

1. **Resize all project images** to 1200x675px (16:9 aspect ratio) for optimal display consistency and minimal white space
2. **Replace placeholder/test images** with your actual high-quality project photos
3. **Optimize file sizes** for web performance while maintaining visual quality
4. **Add additional project images** for detailed showcase galleries
5. **Consider adding video demos** for interactive projects
