for file in `/bin/ls *.jpg`; do
    hashedFileName=`echo -n ${file%.*} | openssl dgst -sha1 -hmac "cycL0Sp!rIt"`;
    mv $file ${hashedFileName##* }.jpg;
done
