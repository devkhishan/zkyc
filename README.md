# Web3 KYC Authentication App

A simple, modern Web3 application that allows users to submit KYC (Know Your Customer) data to generate simulated Zero-Knowledge proofs, while designated "Admin" wallets can approve or revoke these requests.

## 🏗️ Architecture Diagram

```mermaid
flowchart TD
    %% Initial Login Flow
    A[Landing Page] --> B{Click 'Connect Wallet'}
    B -->|MetaMask Prompt| C{Is Wallet Address in ADMIN_ADDRESSES?}

    %% Admin Routing & Functionalities
    C -->|Yes| D[Admin UI Dashboard]
    D --> E{Navigation Menu}
    
    E --> F[Requests Pending]
    E --> G[Approved KYC]
    E --> H[Revoked KYC]

    F -->|Displays PENDING users| F1[Review User Data & Photo]
    F1 -->|Action| F2[Click 'Approve KYC']
    F2 -->|Sets Status to APPROVED & Adds validUntil| G

    G -->|Displays APPROVED users| G1[View Valid KYC Records]
    G1 -->|Action| G2[Click 'Revoke Access']
    G2 -->|Sets Status to REVOKED| H
    G1 -.->|Auto-Revoke if past validUntil date| H

    %% Persons Routing & Functionalities
    C -->|No| I[Persons UI Dashboard]
    I --> J{Check LocalStorage KYC Status}

    %% State 1: No KYC
    J -->|Status: NULL / No Record| K[Show 'Complete KYC' Button]
    K --> L[Render KYC Form: Photo, Name, DOB, etc.]
    L -->|Submit Data| M[Save to LocalStorage as PENDING]
    
    %% State 2: Pending
    J -->|Status: PENDING| N[Read-Only UI + 'KYC Pending' Badge]
    M -.-> N

    %% State 3: Approved
    J -->|Status: APPROVED| O[Read-Only UI + 'Approved' Badge]
    O --> P[Show 'Generate Proof' Button]
    P -->|Click| Q[Display Simulated ZK Proof Hash/JSON]

    %% State 4: Revoked
    J -->|Status: REVOKED| R[Read-Only UI + 'Access Revoked' Badge]
    R --> S[Hide/Disable 'Generate Proof' Button]

    classDef admin fill:#f9d0c4,stroke:#333,stroke-width:2px;
    classDef person fill:#c4e1f9,stroke:#333,stroke-width:2px;
    classDef action fill:#d4f9c4,stroke:#333,stroke-width:2px;

    class D,E,F,G,H,F1,F2,G1,G2 admin;
    class I,J,K,L,M,N,O,P,Q,R,S person;
    class B,F2,G2,L,P action;
```

## 🚀 Getting Started

To get this application running locally on your machine, follow these instructions.

### Prerequisites

You must have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- A browser with the [MetaMask extension](https://metamask.io/) installed.

### Installation & Run Steps

**1. Install Dependencies**
Navigate to the root directory of this project in your terminal and run:
```bash
npm install
```
*Wait for this command to finish. It reads the `package.json` file and downloads necessary libraries (like React and Ethers.js) into a `node_modules` folder.*

**2. Start the Development Server**
Once the installation is complete, start the application by running:
```bash
npm run dev
```
*This command uses Vite to launch a local development server. It will output a URL in your terminal (usually `http://localhost:5173/`).*

**3. Open the App**
Open your web browser and go to the URL provided in the terminal.

**4. Connect Wallet**
Click the **"Connect MetaMask"** button. Your MetaMask extension will pop up asking which account you want to connect. Select your account to sign in.

### Admin Configuration
To test the "Admin Dashboard", you need to add your MetaMask wallet's public address to the `ADMIN_ADDRESSES` list in `src/context/AppContext.jsx`.

```javascript
export const ADMIN_ADDRESSES = [
  '0xYourWalletAddressHere'.toLowerCase(),
];
```
Once your address is in this list, connecting with that specific wallet will automatically route you to the Admin Dashboard. Any other wallet connected will be treated as a standard "Person".
