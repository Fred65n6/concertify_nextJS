
// cron.js
const cron = require('node-cron');
const { MongoClient } = require('mongodb');
const path = require('path');
const Concert = require('src/models/concertModel.ts');
const User = require('src/models/userModel.ts');

const mongoURI = process.env.MONGO_URI;

cron.schedule('0 14 * * *', async () => {
    console.log('Running CRON job to delete concerts one day after today');
  
    try {
      const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db('ConcertifyDB');
      const concertCollection = db.collection('concerts');
      const userCollection = db.collection('users');
  
      const currentDate = new Date();
  
      // Calculate the date for one day in the future
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + 1);
  
      // Find concerts with dates one day after today
      const futureConcerts = await concertCollection.find({ date: { $eq: futureDate } }).toArray();
  
      for (const concert of futureConcerts) {
        const { concert_id, artistEmail } = concert;
  
        console.log(artistEmail);
  
        const user = await userCollection.findOne({ email: artistEmail });
  
        console.log("this is user", user);
  
        if (user) {
          await userCollection.updateOne(
            { email: artistEmail },
            { $pull: { concerts: { concert_id: concert_id } } }
          );
        }
  
        // Delete the concert
        await concertCollection.deleteOne({ concert_id: concert_id });
      }
  
      console.log('CRON job completed successfully');
    } catch (error) {
      console.error('Error running CRON job:', error);
    } finally {
      client.close();
    }
  });
