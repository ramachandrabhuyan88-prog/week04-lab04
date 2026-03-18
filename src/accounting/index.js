#!/usr/bin/env node

/**
 * Student Account Management System
 * Node.js port from COBOL (main.cob, operations.cob, data.cob)
 * 
 * Architecture:
 * - Data Layer: Manages account balance persistence (equivalent to data.cob)
 * - Operations Layer: Implements business logic (equivalent to operations.cob)
 * - UI Layer: Menu-driven interface (equivalent to main.cob)
 */

const readline = require('readline-sync');

// ============================================================================
// DATA LAYER (equivalent to data.cob - DataProgram)
// ============================================================================

class DataProgram {
  constructor() {
    // Equivalent to STORAGE-BALANCE PIC 9(6)V99 VALUE 1000.00
    this.storageBalance = 1000.00;
  }

  /**
   * READ Operation - Retrieves current account balance
   * Equivalent to: DataProgram READ operation in COBOL
   */
  read() {
    return this.storageBalance;
  }

  /**
   * WRITE Operation - Updates the account balance
   * Equivalent to: DataProgram WRITE operation in COBOL
   * 
   * @param {number} newBalance - The new balance to store
   */
  write(newBalance) {
    this.storageBalance = newBalance;
  }

  /**
   * Reset balance to initial value (for testing/sessions)
   */
  reset() {
    this.storageBalance = 1000.00;
  }
}

// ============================================================================
// OPERATIONS LAYER (equivalent to operations.cob - Operations)
// ============================================================================

class Operations {
  constructor(dataProgram) {
    this.dataProgram = dataProgram;
  }

  /**
   * TOTAL Operation - View current account balance
   * Equivalent to: Operations TOTAL case in COBOL
   */
  viewBalance() {
    const balance = this.dataProgram.read();
    console.log(`Current balance: $${balance.toFixed(2)}`);
    return balance;
  }

  /**
   * CREDIT Operation - Add funds to account
   * Equivalent to: Operations CREDIT case in COBOL
   * Business Rules:
   * - Credits have no limit
   * - Credits are always accepted
   * - Amount is added to current balance
   * 
   * @param {number} amount - The amount to credit
   */
  creditAccount(amount) {
    // Read current balance
    const currentBalance = this.dataProgram.read();

    // Add amount to balance
    const newBalance = currentBalance + amount;

    // Write new balance to storage
    this.dataProgram.write(newBalance);

    // Display confirmation
    console.log(`Amount credited. New balance: $${newBalance.toFixed(2)}`);
    return newBalance;
  }

  /**
   * DEBIT Operation - Withdraw funds from account
   * Equivalent to: Operations DEBIT case in COBOL
   * Business Rules:
   * - Must validate sufficient funds
   * - Only process debit if balance >= amount
   * - If insufficient funds, reject and do not update storage
   * 
   * @param {number} amount - The amount to debit
   * @returns {object} - { success: boolean, newBalance: number, message: string }
   */
  debitAccount(amount) {
    // Read current balance
    const currentBalance = this.dataProgram.read();

    // Validate sufficient funds
    if (currentBalance < amount) {
      console.log(`Insufficient funds for this debit.`);
      return {
        success: false,
        newBalance: currentBalance,
        message: `Insufficient funds for this debit.`,
      };
    }

    // Subtract amount from balance
    const newBalance = currentBalance - amount;

    // Write new balance to storage
    this.dataProgram.write(newBalance);

    // Display confirmation
    console.log(`Amount debited. New balance: $${newBalance.toFixed(2)}`);
    return {
      success: true,
      newBalance: newBalance,
      message: `Amount debited. New balance: $${newBalance.toFixed(2)}`,
    };
  }
}

// ============================================================================
// UI LAYER (equivalent to main.cob - MainProgram)
// ============================================================================

class MainProgram {
  constructor(operations) {
    this.operations = operations;
    this.continueFlag = true;
  }

  /**
   * Display the main menu
   * Equivalent to: MainProgram menu display in COBOL
   */
  displayMenu() {
    console.log("--------------------------------");
    console.log("Account Management System");
    console.log("1. View Balance");
    console.log("2. Credit Account");
    console.log("3. Debit Account");
    console.log("4. Exit");
    console.log("--------------------------------");
  }

  /**
   * Get user choice from menu
   * Equivalent to: MainProgram ACCEPT in COBOL
   */
  getUserChoice() {
    const choice = readline.question("Enter your choice (1-4): ");
    return parseInt(choice, 10);
  }

  /**
   * Process user menu selection
   * Equivalent to: MainProgram EVALUATE in COBOL
   */
  processChoice(userChoice) {
    switch (userChoice) {
      case 1:
        // Call Operations with TOTAL
        this.operations.viewBalance();
        break;

      case 2:
        // Call Operations with CREDIT
        const creditAmount = parseFloat(
          readline.question("Enter credit amount: ")
        );
        if (isNaN(creditAmount) || creditAmount < 0) {
          console.log("Invalid amount. Please enter a valid number.");
          break;
        }
        this.operations.creditAccount(creditAmount);
        break;

      case 3:
        // Call Operations with DEBIT
        const debitAmount = parseFloat(
          readline.question("Enter debit amount: ")
        );
        if (isNaN(debitAmount) || debitAmount < 0) {
          console.log("Invalid amount. Please enter a valid number.");
          break;
        }
        this.operations.debitAccount(debitAmount);
        break;

      case 4:
        // Exit
        this.continueFlag = false;
        console.log("Exiting the program. Goodbye!");
        break;

      default:
        // Invalid choice
        console.log("Invalid choice, please select 1-4.");
    }
  }

  /**
   * Main execution loop
   * Equivalent to: MainProgram MAIN-LOGIC in COBOL
   * Performs UNTIL CONTINUE-FLAG = 'NO'
   */
  run() {
    while (this.continueFlag) {
      this.displayMenu();
      const choice = this.getUserChoice();
      this.processChoice(choice);
      console.log(); // Empty line for readability
    }
  }
}

// ============================================================================
// APPLICATION ENTRY POINT
// ============================================================================

function main() {
  // Initialize the data layer
  const dataProgram = new DataProgram();

  // Initialize the operations layer with data layer
  const operations = new Operations(dataProgram);

  // Initialize the UI layer with operations layer
  const mainProgram = new MainProgram(operations);

  // Execute the main program loop
  mainProgram.run();
}

// Start the application
if (require.main === module) {
  main();
}

// Export for potential testing
module.exports = {
  DataProgram,
  Operations,
  MainProgram,
};
