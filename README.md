# Embedded Systems Engineer Portfolio

A responsive portfolio website for embedded systems engineers, built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Smooth scrolling navigation
- Project filtering by embedded systems categories (IoT, Microcontrollers, Hardware)
- Skills section showcasing embedded systems expertise
- Contact form for potential clients/employers
- Animated typing effect with embedded systems roles
- Scroll animations
- Mobile-friendly navigation

## Embedded Systems Focus

This portfolio is specifically designed for embedded systems engineers and includes:

### Project Categories:
- **IoT Systems**: Internet of Things projects and connected devices
- **Microcontrollers**: ARM Cortex-M, ESP32, Arduino-based projects  
- **Hardware Design**: PCB design, circuit design, and hardware integration

### Skills Sections:
- **Programming Languages**: C/C++, Python, Assembly
- **Microcontrollers & Hardware**: ARM Cortex-M, ESP32/Arduino, PCB Design
- **Protocols & Communication**: I2C/SPI/UART, CAN Bus, WiFi/Bluetooth
- **Development Tools**: JTAG/SWD Debugging, FreeRTOS, Git/Version Control

## File Structure

```
portfolio/
│
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
└── images/             # Images for the portfolio
    ├── profile-placeholder.jpg
    ├── about-placeholder.jpg
    ├── project1-placeholder.jpg
    ├── project2-placeholder.jpg
    └── project3-placeholder.jpg
```

## Customization Instructions

### 1. Personal Information

Edit the `index.html` file to update:

- Your name (replace "Your Name" in the hero section)
- Job titles (embedded systems roles are already configured in `script.js`)
- About Me section with your embedded systems background
- Contact information (email, phone, location)
- Social media links (LinkedIn, GitHub for code repositories)

### 2. Projects

For each embedded systems project:

1. Update the project title and technical description
2. Replace placeholder images with project photos/schematics
3. Update the category (iot, microcontroller, or hardware)
4. Add links to GitHub repositories, demo videos, or documentation
5. Include technical specifications and components used

To add more projects, duplicate the project card structure and update the data-category attribute.

### 3. Skills

Customize the embedded systems skills:

1. Update programming language proficiencies
2. Add or modify microcontroller platforms you work with
3. Update communication protocols and tools
4. Adjust skill progress percentages based on your expertise

### 4. Technical Focus Areas

The portfolio highlights these embedded systems areas:
- Firmware development and bare-metal programming
- Real-time operating systems (RTOS)
- IoT connectivity and wireless protocols
- Hardware-software integration
- PCB design and circuit analysis
- Debugging and testing methodologies

### 4. Styling

Customize colors and styles by editing the CSS variables in `style.css`:

```css
:root {
    --primary-color: #007bff;  /* Change this to your preferred color */
    --secondary-color: #6c757d;
    --dark-color: #343a40;
    --light-color: #f8f9fa;
    /* ...other variables... */
}
```

### 5. Images

Replace the placeholder images in the `images` folder with your actual images:

- `profile-placeholder.jpg`: Your profile photo
- `about-placeholder.jpg`: Image for About section
- `project1-placeholder.jpg`, `project2-placeholder.jpg`, etc.: Screenshots of your projects

## Contact Form Setup

The contact form in this template doesn't actually send emails by default. To make it functional, you'll need to:

1. Set up a backend service (like PHP, Node.js, or a form submission service)
2. Update the form action and method in `index.html`
3. Modify the form submission code in `script.js`

## Browser Compatibility

This portfolio is designed to work on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

Feel free to use this template for your personal portfolio.

## Credits

- Font Awesome for icons
- Google Fonts for typography
