# Time Capsule Frontend

This project is a frontend application for the Time Capsule, which allows users to create, manage, and view time capsules on the Ethereum blockchain.

## Project Structure

- **public/**: Contains static files.
  - **index.html**: The main HTML file for the application.
  - **favicon.ico**: The favicon for the application.

- **src/**: Contains the source code for the React application.
  - **components/**: Contains React components.
    - **CapsuleForm.jsx**: A form for creating new capsules.
    - **CapsuleList.jsx**: Displays a list of user capsules.
    - **CapsuleDetails.jsx**: Shows detailed information about a specific capsule.
  - **services/**: Contains service files for interacting with the blockchain.
    - **web3Service.js**: Functions for blockchain interactions.
  - **App.jsx**: The main application component that sets up routing.
  - **index.js**: The entry point for the React application.
  - **styles/**: Contains CSS styles.
    - **App.css**: Styles for the application.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd time-capsule-frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your Ethereum node URL:
   ```
   GANACHE_URL=http://localhost:8545
   ```

4. **Run the application**:
   ```
   npm start
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Usage

- Use the CapsuleForm to create new time capsules by providing an IPFS hash and unlock timestamp.
- View your created capsules in the CapsuleList.
- Click on a capsule to see its details, including content and unlock status.

## License

This project is licensed under the MIT License.