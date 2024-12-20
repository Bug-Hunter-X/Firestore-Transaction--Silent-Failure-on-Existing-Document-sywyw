The following code attempts to add a new document to Firestore using a transaction, but it fails silently if the document already exists:

```javascript
firebase.firestore().runTransaction(transaction => {
  return transaction.get(someDocRef).then(doc => {
    if (!doc.exists) {
      return transaction.set(someDocRef, { someField: 'someValue' });
    }
    return null; //This doesn't handle the error correctly
  });
});
```

The problem is that if the document already exists, the transaction doesn't explicitly reject or throw an error.  This makes debugging difficult, as the code appears to run without issue, but the document isn't created (or updated if you intend to update).