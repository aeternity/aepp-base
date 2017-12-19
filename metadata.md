# Metadata Ideas

## how does Uport do it?
https://medium.com/uport/adventures-in-decentralized-push-notifications-3c64e700ec18
https://github.com/uport-project/uport-connect#-default-qr-flow
https://github.com/uport-project/uport-js#requesting-information-from-your-users
https://github.com/combient/uport-deploy#chasqui-messaging-server

Super simple:
Metadata is stored on device directly (localstorage)

Simple IPFS Solution:
Metadata Stored on IPFS
Have Controller Contract with a mapping address => IPFS Hash
Everytime the data changes the IPFS Hash changes, only the owner of the address can change the Hash in the Controller contract
Negative: Data is public, everybody can lookup the IPFS Hash in the contract
Negative: Every change of metadata costs gas

More complex:
Only a public key is stored on IPFS

Open a channel between dapp and id-manager
* on same device via postMessage
* on different devices via messaging server
** by scanning a QR code? (needs app)
** by code?
