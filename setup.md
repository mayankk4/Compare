This is a General Comparision Framework. A host of websites will be build upon it.

ToDo -
	1. logging
	2. vote-ups and down
	3. vote A or B
	4. Integration with adsf.ly
	5. db




Setting up the server =


install node 
install npm(globally)
install nvm

install forever => npm install forever -g

Checkout the codebase
cd into the codebase

npm install

Running the server => forever -o ./logs/output.log -e ./logs/error.log start app.js
	
Following are logged into files -	
	error
	access
	console.log() outputs


Useful commands -
	forver list
	forever stopall


Hashing the filenames -

	Bash script -
		for file in `/bin/ls *.jpg`; do
		    hashedFileName=`echo -n ${file%.*} | openssl dgst -sha1 -hmac "myKey123"`;
		    mv $file ${hashedFileName##* }.jpg;
		done

		Go to images directory and - 
			bash script.sh

	NodeJs -
		using crypto library
		var crypto = require('crypto');
	    var firstImageHash = crypto.createHmac('sha1', hashkey).update(firstImage.toString()).digest('hex');




	 Normally we show scaled down images and on cdn there are larger ones
	 	So we show the users the scaled down model.
	 	Also, we show the users a link to view the larger images, which are kept on cdn.

	 	For scaling down the images, We have used automator for mac.


July 20 2012-

Todo 
	- cdn
	- git support
	- url shortening service
	- code cleanup and stucturing
	- UI ??
	- ec2 machine | nginx
	- features to be added today -
		= routes
		= login / auth
		= admin panel


























