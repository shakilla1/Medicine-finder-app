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

