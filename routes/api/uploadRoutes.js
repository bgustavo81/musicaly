const express = require("express");
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid/v1')
const auth = require("../../middleware/auth");
const keys = require('../../config/keys');


const s3 = new AWS.S3({
    accessKeyId: keys.AWS_S3_ACCESS_KEY,
    secretAccessKey: keys.AWS_S3_ACCESS_SECRET_KEY,
    endpoint: 's3-us-east-2.amazonaws.com',
    signatureVersion: 'v4',
    region: 'us-east-2'
})

router.get('/', auth, (req, res, next) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl('putObject', {
        Bucket: 'foto-bucket-12345',
        ContentType: 'image/jpeg',
        Key: key
    }, (err, url) => res.send({ key, url }));
})

module.exports = router;
