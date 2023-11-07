import speakeasy from 'speakeasy';
import  QRCode  from 'qrcode';
import jwt, { decode } from 'jsonwebtoken';

const decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ2Y2ExNzVkZGQ4MjljOTJiNzUzYzIiLCJpYXQiOjE2OTkxMzk2NTQsImV4cCI6MTY5OTM5ODg1NH0.oBXB9admsSObR1e8OnvPGThLpEVmQom6ALoymgs-cl8', 'ldhceojdlkbcdicvapedjjncyfuyso');
console.log(decoded);

