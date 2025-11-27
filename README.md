video link: https://www.youtube.com/watch?v=s1RAyjW83Uw


Medicine Finder

Medicine Finder is a clean and simple web application that enables users to search for accurate medicine information using the openFDA public API.
It utilizes the openFDA API to fetch real-time drug labeling information, and it provides a user-friendly interface for viewing medicine details, including brand name, generic name, purpose, usage, and indications.

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

This is a static web application built with HTML, CSS, and vanilla JavaScript. 

Option 1: Direct Open
Just double-click the index.html file to open it in your default web browser.

Option 2: Local Server (optional)
For the best experience (and to avoid potential CORS issues with some browsers), it is recommended to run the project using a simple local HTTP server.

If you have Python installed, run this:

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
   
using: ssh -i ~/.ssh/school ubuntu@"Ip address"
   
2. Inside BOTH servers run:

sudo apt update

sudo apt install git nginx -y

3. cd /var/www/

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

4. Configure the Load Balancer (LB-01)

SSH to LB-01:

ssh -i ~/.ssh/school ubuntu@52.87.247.223


Install Nginx:

sudo apt update
sudo apt install nginx -y


Edit LB config to change upstream and my root to point to my app 

sudo nano /etc/nginx/sites-available/default


Restart LB Nginx:

sudo service nginx restart

5. Test the Load Balancer

Open  LB-01 IP in a browser:

http://52.87.247.223

Configure HAProxy on Load Balancer

First disable nginx to avoid conflict between nginx and laodbalancer because they cannot  both listen on port 80/443

1. Install HAProxy:

sudo apt update

sudo apt install haproxy -y

2. Enable HAProxy service:

sudo systemctl enable haproxy

sudo systemctl start haproxy

3. Check HAProxy status:

sudo systemctl status haproxy

4.  Configure HAProxy

Edit HAProxy configuration file:

sudo nano /etc/haproxy/haproxy.cfg

Add Self-Signed Certificate (Optional HTTPS)

sudo mkdir -p /etc/haproxy/certs
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/haproxy/certs/selfsigned.pem \
    -out /etc/haproxy/certs/selfsigned.pem

Then, in generating this certificate, I added my IP address for the load balancer on CN because I don't have a domain name

N.B: 
HTTPS will work with a self-signed certificate; browsers will show warning when accessing HTTPS via IP.

5. Test Backend Servers

Make sure the backend servers are reachable from the load balancer:

curl http://3.83.9.218

curl http://54.161.96.54

You should see the Medicine Finder HTML page.

6. Restart HAProxy
 
sudo systemctl restart haproxy

sudo systemctl status haproxy

7. Test the Load Balancer

Open your browser and visit:

http://52.87.247.223

You should see the Medicine Finder login page

Requests are automatically load-balanced between backend servers

HTTP is fully functional and load-balanced.

8. The last step was to enable HTTPS, but because I don't have a domain name to get a valid certificate, it didn't work


