# Test Plan: Student Account Management System

**Application:** COBOL Account Management System  
**Version:** 1.0  
**Created:** March 18, 2026  
**Purpose:** Validate business logic and implementation for migration to Node.js

---

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | Application Startup | None | 1. Execute the account system | Menu is displayed with options 1-4 and a prompt for user choice | | | |
| TC-002 | Menu Display Correctness | System is running | 1. Observe the menu output | Menu shows: "1. View Balance", "2. Credit Account", "3. Debit Account", "4. Exit" | | | |
| TC-003 | Initial Balance Verification | System is running and user selects option 1 | 1. Select option 1 (View Balance) | Display: "Current balance: 1000.00" | | | Default initial balance should be 1000.00 |
| TC-004 | View Balance - Valid Operation | System is running with initial balance of 1000.00 | 1. Select option 1 (View Balance) | Program displays current balance and returns to menu | | | |
| TC-005 | Credit Account - Display Prompt | System is running and user selects option 2 | 1. Select option 2 (Credit Account) | System displays "Enter credit amount:" prompt | | | |
| TC-006 | Credit Account - Add Single Amount | System is running with balance 1000.00 | 1. Select option 2 (Credit Account) 2. Enter amount 500.00 | Display: "Amount credited. New balance: 1500.00" | | | Balance should be updated to 1500.00 |
| TC-007 | Credit Account - Add Multiple Transactions | System has balance 1500.00 | 1. Select option 2 (Credit Account) 2. Enter amount 250.00 3. Select option 2 again 4. Enter amount 100.00 | First credit: "New balance: 1750.00", Second credit: "New balance: 1850.00" | | | Each credit transaction should accumulate |
| TC-008 | Credit Account - Large Amount | System is running with balance 1000.00 | 1. Select option 2 (Credit Account) 2. Enter amount 999999.00 | Display: "Amount credited. New balance: 1000999.00" or appropriate max value | | | System should handle large credit amounts without errors |
| TC-009 | Credit Account - Zero Amount | System is running with balance 1000.00 | 1. Select option 2 (Credit Account) 2. Enter amount 0.00 | Display: "Amount credited. New balance: 1000.00" | | | Zero credit should not change balance |
| TC-010 | Credit Account - Decimal Precision | System is running with balance 1000.00 | 1. Select option 2 (Credit Account) 2. Enter amount 123.45 | Display: "Amount credited. New balance: 1123.45" | | | System should maintain two decimal places |
| TC-011 | Debit Account - Display Prompt | System is running and user selects option 3 | 1. Select option 3 (Debit Account) | System displays "Enter debit amount:" prompt | | | |
| TC-012 | Debit Account - Sufficient Funds | System has balance 1000.00 | 1. Select option 3 (Debit Account) 2. Enter amount 500.00 | Display: "Amount debited. New balance: 500.00" | | | Debit should subtract from balance when funds are sufficient |
| TC-013 | Debit Account - Exact Balance | System has balance 500.00 | 1. Select option 3 (Debit Account) 2. Enter amount 500.00 | Display: "Amount debited. New balance: 0.00" | | | System should allow debit of entire balance |
| TC-014 | Debit Account - Insufficient Funds | System has balance 500.00 | 1. Select option 3 (Debit Account) 2. Enter amount 600.00 | Display: "Insufficient funds for this debit." Balance remains 500.00 | | | Debit should be rejected when amount exceeds balance |
| TC-015 | Debit Account - Zero Amount | System has balance 1000.00 | 1. Select option 3 (Debit Account) 2. Enter amount 0.00 | Display: "Amount debited. New balance: 1000.00" | | | Zero debit should not change balance |
| TC-016 | Debit Account - Multiple Transactions | System has balance 1000.00 | 1. Select option 3 (Debit Account) 2. Enter 300.00 3. Select option 3 again 4. Enter 200.00 | First debit: "New balance: 700.00", Second debit: "New balance: 500.00" | | | Each debit should reduce balance sequentially |
| TC-017 | Debit Validation - One Cent Short | System has balance 100.00 | 1. Select option 3 (Debit Account) 2. Enter amount 100.01 | Display: "Insufficient funds for this debit." Balance remains 100.00 | | | Debit validation should be precise with decimal values |
| TC-018 | Debit Account - Large Amount Request | System has balance 1000.00 | 1. Select option 3 (Debit Account) 2. Enter amount 999999.00 | Display: "Insufficient funds for this debit." Balance remains 1000.00 | | | Large debit requests should be rejected if balance is insufficient |
| TC-019 | Menu Option 1 Input | System is running | 1. Enter "1" at the menu prompt | View Balance operation executes | | | Valid menu input should trigger correct operation |
| TC-020 | Menu Option 2 Input | System is running | 1. Enter "2" at the menu prompt | Credit Account operation executes | | | Valid menu input should trigger correct operation |
| TC-021 | Menu Option 3 Input | System is running | 1. Enter "3" at the menu prompt | Debit Account operation executes | | | Valid menu input should trigger correct operation |
| TC-022 | Menu Option 4 Input (Exit) | System is running | 1. Enter "4" at the menu prompt | Display: "Exiting the program. Goodbye!" and program terminates | | | Exit option should terminate program cleanly |
| TC-023 | Invalid Menu Input - Letter | System is running | 1. Enter "A" at the menu prompt | Display: "Invalid choice, please select 1-4." and menu reappears | | | Non-numeric input should be rejected |
| TC-024 | Invalid Menu Input - Out of Range | System is running | 1. Enter "5" at the menu prompt | Display: "Invalid choice, please select 1-4." and menu reappears | | | Out-of-range numeric input should be rejected |
| TC-025 | Invalid Menu Input - Out of Range Low | System is running | 1. Enter "0" at the menu prompt | Display: "Invalid choice, please select 1-4." and menu reappears | | | Zero should be treated as invalid input |
| TC-026 | Menu Loop - Multiple Valid Selections | System is running | 1. Select option 1 2. Select option 2 3. Enter credit amount 4. Select option 1 5. Select option 4 | Each selection executes correctly and menu reappears until exit is selected | | | System should continue looping until user selects exit |
| TC-027 | Balance Persistence - Credit then View | System has balance 1000.00 | 1. Select option 2 (Credit) 2. Enter 200.00 3. Select option 1 (View) | Credit shows new balance 1200.00, View Balance confirms 1200.00 | | | Balance changes should persist for next operation |
| TC-028 | Balance Persistence - Debit then View | System has balance 1200.00 | 1. Select option 3 (Debit) 2. Enter 300.00 3. Select option 1 (View) | Debit shows new balance 900.00, View Balance confirms 900.00 | | | Balance changes should persist for next operation |
| TC-029 | Balance Persistence - Failed Debit then View | System has balance 900.00 | 1. Select option 3 (Debit) 2. Enter 1000.00 (insufficient) 3. Select option 1 (View) | Debit displays error, View Balance confirms balance still 900.00 | | | Failed transactions should not affect balance |
| TC-030 | Credit and Debit Sequence | System has initial balance 1000.00 | 1. Credit 500.00 → balance should be 1500.00 2. Debit 300.00 → balance should be 1200.00 3. Credit 100.00 → balance should be 1300.00 4. Debit 200.00 → balance should be 1100.00 | After each transaction, balance should reflect cumulative changes | | | Complex transaction sequences should calculate correctly |
| TC-031 | Data Consistency - Multi-Operation Session | System is running | 1. Credit 100.00 (1100.00) 2. View balance (confirm 1100.00) 3. Debit 50.00 (1050.00) 4. View balance (confirm 1050.00) 5. Credit 200.00 (1250.00) 6. View balance (confirm 1250.00) | All balance views should match the cumulative transaction results | | | Data layer should maintain consistent state across all operations |
| TC-032 | Decimal Precision - Credit | System has balance 1000.00 | 1. Select option 2 (Credit) 2. Enter 0.99 | Display: "Amount credited. New balance: 1000.99" | | | System should preserve decimal precision for credit operations |
| TC-033 | Decimal Precision - Debit | System has balance 1000.99 | 1. Select option 3 (Debit) 2. Enter 0.99 | Display: "Amount debited. New balance: 1000.00" | | | System should preserve decimal precision for debit operations |
| TC-034 | Maximum Balance Limit | System is running | 1. Repeatedly credit maximum amounts until balance reaches system limit | System should handle the maximum representable balance (999999.99) without error or overflow | | | System should gracefully handle maximum balance constraints |
| TC-035 | Minimum Balance Limit | System has balance 0.00 | 1. Select option 1 (View Balance) | Display: "Current balance: 0.00" | | | System should handle zero balance correctly |
| TC-036 | Application Recovery - After Invalid Input | System is running with invalid input received | 1. Select option 3 (Debit) 2. Enter invalid amount (non-numeric) 3. Select option 1 (View Balance) | System should either reject invalid amount or handle gracefully, and continue to accept subsequent menu selections | | | Application should recover from invalid inputs |
| TC-037 | Menu Redisplay After Operation | System has completed any operation | After completing any transaction (View/Credit/Debit) | Menu should be redisplayed with all options available | | | System should return to menu state after each operation |
| TC-038 | Exit Does Not Persist Changes | System has balance 1000.00 and user selects exit | 1. Credit 500.00 (shows balance 1500.00) 2. Exit program | Program terminates. On next run, balance returns to 1000.00 (session-based, not persistent across runs) | | | Balance changes should only persist within a single session |
| TC-039 | Operation Type Codes - TOTAL | System is running user views balance | 1. Select option 1 (View Balance) | Operations program should receive 'TOTAL ' operation code (6 characters, padded) | | | Correct operation code should be passed to operations layer |
| TC-040 | Operation Type Codes - CREDIT | System is running user credits account | 1. Select option 2 (Credit Account) 2. Enter amount | Operations program should receive 'CREDIT' operation code | | | Correct operation code should be passed to operations layer |
| TC-041 | Operation Type Codes - DEBIT | System is running user debits account | 1. Select option 3 (Debit Account) 2. Enter amount | Operations program should receive 'DEBIT ' operation code (6 characters, padded) | | | Correct operation code should be passed to operations layer |
| TC-042 | Data Department Read Operation | System is running | 1. Select option 1 (View Balance) | Data program READ operation should be called and return current balance from storage | | | Data layer READ should correctly retrieve stored balance |
| TC-043 | Data Department Write Operation | System is running with balance 1000.00 | 1. Select option 2 (Credit) 2. Enter 500.00 | Data program WRITE operation should be called with new balance 1500.00 and update storage | | | Data layer WRITE should correctly persist new balance |
| TC-044 | No Write on Failed Debit | System has balance 500.00 | 1. Select option 3 (Debit) 2. Enter 600.00 (insufficient) | Data program WRITE operation should NOT be called. STORAGE-BALANCE should remain 500.00 | | | Failed transactions should not trigger WRITE operation |
| TC-045 | Inter-program Communication - Linkage | All operations execute | Verify that parameters are correctly passed via LINKAGE SECTION between MainProgram → Operations → DataProgram | All parameters should be received and returned correctly by each program | | | Parameter passing should be reliable across all transactions |

---

## Test Execution Notes

### Pre-Test Requirements
- COBOL compiler (cobc) installed and configured
- Compiled executable: `accountsystem`
- Test environment should be isolated

### Test Execution Strategy
1. Execute tests sequentially, maintaining balance state between related tests
2. For independent tests, reset the application between test runs
3. Document any system-level issues or unexpected behaviors
4. Verify all edge cases and boundary conditions

### Known Constraints
- **Session-Based Only:** Balance does not persist between application restarts
- **Single-User:** No multi-user concurrency testing required
- **Platform:** COBOL runtime on Linux/Unix environment
- **Numeric Limits:** Balance is limited to PIC 9(6)V99 (999,999.99 maximum)

### Test Coverage Summary
- **Menu/UI Testing:** TC-001 through TC-025 (25 tests)
- **Business Logic - View Balance:** TC-003, TC-004, TC-027, TC-032, TC-035, TC-042 (6 tests)
- **Business Logic - Credit:** TC-005 through TC-010, TC-027, TC-032 (8 tests)
- **Business Logic - Debit:** TC-011 through TC-019, TC-028, TC-029, TC-033, TC-044 (14 tests)
- **Data Persistence:** TC-027 through TC-031, TC-038 (6 tests)
- **Integration/End-to-End:** TC-030, TC-031, TC-036, TC-037, TC-045 (5 tests)
- **Edge Cases & Boundary:** TC-033, TC-034, TC-035, TC-043 (4 tests)

**Total Test Cases:** 45

---

## Migration Notes for Node.js Implementation

When converting to Node.js, the following business logic must be replicated:

1. **Session State Management:** Implement in-memory balance storage (similar to COBOL SESSION-BALANCE)
2. **Menu Loop:** Create interactive CLI or web interface with same menu options
3. **Input Validation:** Validate menu choices (1-4) and numeric amounts
4. **Debit Validation:** Enforce balance check before allowing debit operations
5. **Credit Logic:** Allow unlimited credits
6. **Inter-module Communication:** Replace COBOL CALL/LINKAGE with function calls or service layer
7. **Decimal Precision:** Maintain 2 decimal places for monetary values (consider using Decimal library)
8. **Error Handling:** Replicate error messages and flow control

### Recommended Node.js Architecture
```
├── index.js                 (Main entry - equivalent to MainProgram)
├── src/
│   ├── operations.js        (Business logic - equivalent to Operations)
│   ├── data.js              (Data layer - equivalent to DataProgram)
│   └── cli.js               (User interface - menu handling)
├── tests/
│   ├── unit/
│   │   ├── operations.test.js
│   │   ├── data.test.js
│   │   └── cli.test.js
│   └── integration/
│       └── e2e.test.js
```
