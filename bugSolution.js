The solution involves explicitly checking for errors within the transaction and handling them appropriately:

```javascript
firebase.firestore().runTransaction(transaction => {
  return transaction.get(someDocRef).then(doc => {
    if (!doc.exists) {
      return transaction.set(someDocRef, { someField: 'someValue' });
    } else {
      // Handle the case where the document already exists
      // Options:
      // 1. Throw an error to explicitly signal failure:
      throw new Error('Document already exists');
      // 2. Update the document instead of creating a new one:
      // return transaction.update(someDocRef, { someField: 'newValue' });
      // 3. Do nothing and resolve the transaction successfully
      return null;
    }
  }).catch(error => {
    console.error('Transaction failed:', error);
    // Handle the error appropriately, such as displaying a message to the user
    return Promise.reject(error); // Re-throw the error to stop execution
  });
});
```
This improved code explicitly handles the case where the document already exists.  The try-catch block ensures that any errors during the transaction are caught and handled, making debugging and error management considerably easier.