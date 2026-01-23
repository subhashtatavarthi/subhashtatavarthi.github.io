// Profile Picture Management - Upload and persist profile image
document.addEventListener('DOMContentLoaded', () => {
    initProfilePicture();
});

function initProfilePicture() {
    const profileAvatar = document.getElementById('profileAvatar');
    if (!profileAvatar) return;

    // Load saved profile picture from localStorage
    const savedImage = localStorage.getItem('profilePicture_v2');
    if (savedImage) {
        profileAvatar.src = savedImage;
    }

    // Make profile picture clickable to upload new image
    profileAvatar.style.cursor = 'pointer';
    profileAvatar.title = 'Click to upload profile picture';

    profileAvatar.addEventListener('click', () => {
        triggerImageUpload();
    });
}

function createDefaultAvatar() {
    // Create a canvas with a gradient background and initials
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 300, 300);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(0.5, '#764ba2');
    gradient.addColorStop(1, '#f093fb');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 300);

    // Add initials
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 120px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ST', 150, 150);

    return canvas.toDataURL('image/png');
}

function triggerImageUpload() {
    // Create a hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

function handleImageUpload(file) {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // Resize and optimize image
            const resizedImage = resizeImage(img, 300, 300);

            // Save to localStorage
            localStorage.setItem('profilePicture_v2', resizedImage);

            // Update profile picture
            const profileAvatar = document.getElementById('profileAvatar');
            if (profileAvatar) {
                profileAvatar.src = resizedImage;
            }

            showNotification('Profile picture updated successfully! ✨');
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

function resizeImage(img, maxWidth, maxHeight) {
    const canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;

    // Calculate new dimensions while maintaining aspect ratio
    if (width > height) {
        if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }
    }

    canvas.width = maxWidth;
    canvas.height = maxHeight;
    const ctx = canvas.getContext('2d');

    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, maxWidth, maxHeight);

    // Draw image centered
    const x = (maxWidth - width) / 2;
    const y = (maxHeight - height) / 2;
    ctx.drawImage(img, x, y, width, height);

    return canvas.toDataURL('image/jpeg', 0.9);
}

function showNotification(message) {
    // Create a toast notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
