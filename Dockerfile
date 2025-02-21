# Build stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy website files
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY profile-photo.jpeg /usr/share/nginx/html/
COPY SoftwareEngineer_HuynhTanThinh.pdf /usr/share/nginx/html/
COPY site.webmanifest /usr/share/nginx/html/
COPY favicon.svg /usr/share/nginx/html/
# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
