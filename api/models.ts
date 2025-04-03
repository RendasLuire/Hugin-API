import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  pass: String,
});

const CardSchema = new Schema({
  bank: String,
  deb: Number,
  free: Number,
  total: Number,
  cutday: Number,
  payday: Number,
  interes: Number,
});

export const User = models.User || model('User', UserSchema);
export const Card = models.Card || model('Card', CardSchema);