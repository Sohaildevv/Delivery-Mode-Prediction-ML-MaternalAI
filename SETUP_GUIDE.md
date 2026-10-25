# 🏥 MaternalAI: Setup Guide for Beginners

Welcome! This guide will help you get the **MaternalAI** project running on your computer. Don't worry if you're not a "tech person"—just follow these steps one by one!

---

## 🛠️ Phase 1: Preparation (One-Time Setup)

Before we start the project, you need one tool called **Node.js**. This is what runs the website on your computer.

1. **Download Node.js**: Go to [nodejs.org](https://nodejs.org/)
2. **Choose Version**: Click the button that says **"LTS"** (it's the most stable one).
3. **Install**: Run the downloaded file and click "Next" until it's finished.
4. **Verify**: 
   - Open your **Command Prompt** (search for "cmd" in your Start menu).
   - Type `node -v` and press Enter.
   - If you see a number (like `v20.11.0`), you're ready!

---

## 🚀 Phase 2: Running the Project

Follow these 4 simple steps:

### Step 1: Open the Project Folder
- Locate your project folder (usually named `ml_model`).
- **Shortcut**: In Windows, open the folder, click on the **Address Bar** at the top, type `cmd`, and press **Enter**. This opens a command window right in that folder!

### Step 2: Install Dependencies (First time only)
In that command window, type this and press Enter:
```bash
npm install
```
*Wait for it to finish. This downloads the "brains" of the app (libraries like the AI model and icons).*

### Step 3: Start the Application
Type this and press Enter:
```bash
npm run dev
```
*You should see a message saying: `Ready in ...` and `url: http://localhost:3000`.*

### Step 4: Open in Your Browser
- Open Google Chrome or any browser.
- Type `http://localhost:3000` in the address bar.
- **Success!** You should see the MaternalAI homepage.

---

## 📖 How to Use the App

1. **Authentication**:
   - Go to the **Access/Login** page.
   - If it's your first time, click **Register** to create an account.
   - Login with your new credentials.

2. **Making a Prediction**:
   - Click on **Start Prediction** or **Predict** in the menu.
   - Fill in the patient's clinical data (Age, Blood Pressure, etc.).
   - Click **Execute Assessment**.
   - The AI will analyze the data and give you a risk report!

3. **Dashboard**:
   - Visit the **Analytics/Dashboard** to see overall trends and how the AI thinks (Feature Importance).

---

## ❓ Troubleshooting (Common Issues)

*   **Error: "npm is not recognized"**: You need to install Node.js (see Phase 1).
*   **Port 3000 is already in use**: Close any other command windows you have open and try again.
*   **White Screen/Error on Page**: Refresh the browser (press F5).

---

## 🎓 About the Project
This project was developed by **Azhar Nawaz** and team (Final Year Pharmacy Students) to bridge the gap between clinical pharmacy and modern Artificial Intelligence.

**Need help?** Contact the research team via the "About" page!