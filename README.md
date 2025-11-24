video link: https://www.loom.com/share/c5412fdfdb984158ac4db94b8e730c2f
Medicine Finder

Medicine Finder is a clean and simple web application that allows users to search for real medicine information using the openFDA public API.
It utilizes the openFDA API to fetch real-time drug labeling information and provides a user-friendly interface for viewing medicine details such as brand name, generic name, purpose, usage and indications.

 Features
A. Medicine Search

Users can enter any medicine name (e.g., Ibuprofen, aspirin, Antacid).
The app fetches real-time information from the openFDA Drug Labeling API and displays:

_Brand Name

_Generic Name

_Purpose

_Indications & Usage

If a medicine is not found, the app shows a clean “medicine not found” message.

B. User Login & Registration

The app includes a simple authentication interface:

Create Account → Full Name, Email, Gender, Password

Login → Email & Password

Data stored securely on localStorage (no backend required)

The login system is for simulation purposes only 

C. Responsive Design: Works on desktop and mobile devices.

How to Activate

This is a static web application built with HTML, CSS, and JavaScript. No complex build process or backend server is required.

Option 1: Direct Open
Simply double-click the index.html file to open it in your default web browser.

Option 2: Local Server (optional)
For the best experience (and to avoid potential CORS issues with some browsers), it is recommended to run the project using a simple local HTTP server.

If you have Python installed run this:

python -m http.server 8000

Then open http://localhost:8000 in your browser.

API Used
This project uses the openFDA API to retrieve drug labeling information.

Provider: openFDA

Base URL: https://api.fda.gov

Endpoint: /drug/label.json

Query Method: the app searches for the medicine details

Example:

https://api.fda.gov/drug/label.json?
search=openfda.brand_name:Ibuprofen+openfda.generic_name:Ibuprofen&limit=1

Implementation Details

The project is structured as follows:

File Structure

index.html: The main structure of the application, containing the login/register forms

dashboard.html: it contains Medicine search interface.

script.js: Contains the core application logic: Login logic and search medicine logic.

style.css: Handles the visual styling, layout, and responsiveness of the application.

Deployment steps 
1. ssh into my web-01 and web 02 servers
   
Inside BOTH servers run:

sudo apt update

sudo apt install git nginx -y

cd /var/www/

I cloned my github repo

4. Configure Nginx on Both Web Servers

Open the default Nginx config:

sudo nano /etc/nginx/sites-available/default

Save and exit.

Restart Nginx:

sudo service nginx restart


Test Web-01:

http://3.83.9.218


Test Web-02:

http://54.161.96.54


Both should show my Medicine Finder app.

 3. Configure the Load Balancer (LB-01)

SSH to LB-01:

ssh ubuntu@52.87.247.223


Install Nginx:

sudo apt update
sudo apt install nginx -y


Edit LB config to change upstream and my root to point to my app 

sudo nano /etc/nginx/sites-available/default


Restart LB Nginx:

sudo service nginx restart

 4. Test the Load Balancer

Open  LB-01 IP in a browser:

http://52.87.247.223

upstream medicine_app {
    server 3.83.9.218;    
    server 54.161.96.54;  
}

Configure HAProxy on Load Balancer

1. Install HAProxy:

sudo apt-get update
sudo apt-get install haproxy

3. Edit HAProxy configuration:

sudo nano /etc/haproxy/haproxy.cfg

Test the HAProxy configuration and start the service:

http://52.87.247.223

sudo haproxy -f /etc/haproxy/haproxy.cfg -c

sudo systemctl restart haproxy

4. The last step was to enable HTTPS, but because I don't have a domain name to get a valid certificate, it didn't work


