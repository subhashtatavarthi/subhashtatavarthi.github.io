# Subhash Tatavarthi - Personal Blog

A modern, eye-catching personal blog showcasing AI/ML expertise, publications, and professional journey.

## 🚀 Features

- **Eye-catching Design**: Modern glassmorphism effects, vibrant gradients, and smooth animations
- **Dark/Light Theme**: Toggle between dark and light modes with smooth transitions
- **QR Code**: Automatically generated QR code for easy mobile access
- **Profile Picture Upload**: Click on the profile picture to upload your own image
- **Responsive**: Fully responsive design that works on all devices
- **Dynamic Content**: Articles, publications, and media features loaded from JSON
- **Smooth Animations**: Scroll-triggered animations and micro-interactions

## 🎨 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern design with CSS custom properties, gradients, and animations
- **JavaScript**: Vanilla JS for interactivity
- **QRCode.js**: QR code generation
- **Google Fonts**: Inter font family

## 📁 Project Structure

```
MyBlog/
├── index.html              # Main landing page
├── css/
│   ├── main.css           # Core design system
│   └── components.css     # Component styles
├── js/
│   ├── main.js            # Theme, navigation, QR code
│   ├── content.js         # Content rendering
│   └── profile.js         # Profile picture management
├── assets/
│   ├── images/            # Images and profile pictures
│   └── data/
│       └── content.json   # Content data
└── README.md
```

## 🖥️ Local Development

1. **Open the project**:
   ```bash
   cd "/Users/subhasht/Desktop/VSCode Programs/MyBlog"
   ```

2. **Start a local server**:
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser**:
   Navigate to `http://localhost:8000`

## 🌐 GitHub Pages Deployment

1. **Initialize Git repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Personal blog"
   ```

2. **Create GitHub repository**:
   - Go to GitHub and create a new repository named `subhashtatavarthi.github.io`

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/subhashtatavarthi/subhashtatavarthi.github.io.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to repository settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Save

5. **Access your site**:
   Your blog will be live at `https://subhashtatavarthi.github.io`

## ✨ Features Guide

### Profile Picture
Click on the profile picture in the hero section to upload your own image. The image will be:
- Automatically resized and optimized
- Saved in your browser's localStorage
- Persisted across page loads

### Theme Switcher
Click the moon/sun icon in the navigation to toggle between dark and light themes.

### Content Management
Update your content by editing `assets/data/content.json`:
- Add/remove Medium articles
- Update publications
- Add media features
- Modify your skills

### QR Code
The QR code is automatically generated and points to `https://subhashtatavarthi.github.io`. 
Users can scan it with their phone to easily access your blog.

## 🎯 Customization

### Colors
Edit CSS custom properties in `css/main.css` to change the color scheme:
```css
:root {
  --color-primary: #6366f1;
  --color-accent: #ec4899;
  /* ... more variables */
}
```

### Content
Update `assets/data/content.json` with your own:
- Profile information
- Skills
- Articles
- Publications
- Media features

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

© 2026 Subhash Tatavarthi. All rights reserved.
