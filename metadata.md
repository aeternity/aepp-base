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
Only a public key is stored on IPFS and then metadata is requested from the device with this key (see uport solution)

Open a channel between dapp and id-manager
* on same device via postMessage
* on different devices via messaging server (like uport, whatsapp)
  * by scanning a QR code? (needs native app)
  * by displaying a code?

# What I did until now:
* Basically 3 functions
  * readMetadata(namespace, key)
  * storeMetadata(namespace, key, value)
  * requestPermissions(requestedPermissions)

* Metadata is stored in localstorage in one serialized JSON Object
example data
```js
{
	"v0.1": {
		"identity.aepps.com": {
			"userName": "max",
			"birthday": "517363200",
			"email": "max@apeunit.com"
		},
		"wall.aepps.com": {
			"entries": [
				//...
			],
			"likes": [
				//...
			]
		}
	}
}
```
* first level is a version string to allow changes in the metadata scheme
* second level is the namespace of the app
* third level is the key (string)
* fourth level is the stored value (string, number, object, array)

Dapps need permission to access a namespace which is not their own namespace or else they'll get a *MissingPermissionError*.

Permissions are requested by sending a permission object.
```js
let examplePermissionJson: {
  'identity.aepps.com': {
    'userName': {
      read: true,
      write: true
    },
    'userPic': {
      read: false,
      write: true
    },
    'email': {
      write: true
    }
  },
  'wall.aepps.com': ['entries', 'likes']
}
idManager.requestPermissions(examplePermissionJson)
```
The ID-Manager will show a screen to accept or deny the requested permissions. If the permissions are accepted it will be stored in localStorage in a serialized JSON which looks like this:
```js
{
	"mydapp.aepps.com":{
		"identity.aepps.com":{
			"userName":{
				"read":true,
				"write":true
			},
			"email":{
				"read":true,
				"write":true
			},
			"address":{
				"read":true,
				"write":true
			}
		},
		"wall.aepps.com":{
			"entries":{
				"read":true
			},
			"likes":{
				"read":true
			}
		}
	}
}
```
This would mean *mydapp.aepps.com* would have access to some keys of *identity.aepps.com* and *wall.aepps.com*
