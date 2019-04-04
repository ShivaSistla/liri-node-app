require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

   let var1= process.argv[2].toUpperCase();
   let var2= process.argv[3] ? process.argv[3].toUpperCase() :null;

   switch (var1) {
      case 'CONCERT-THIS': 

      const queryUrl2 = `https://rest.bandsintown.com/artists/${var2}/events?app_id=codingbootcamp`
      axios.get(queryUrl2).then(function(response) {

        // If the request is successful (i.e. if the response status code is 200)
        if (response.status === 200) {
           for (i=0;i<response.data.length;i++){
          console.log(response.data[i].venue);
           }
        }
      })
        break;
        case 'SPOTIFY-THIS-SONG': 
         var Spotify = require('node-spotify-api');
        var spotify = new Spotify({
          id: process.env.SPOTIFY_ID,
          secret: process.env.SPOTIFY_SECRET
        });
         
        spotify.search({ type: 'track', query: var2 }, function(err, data) {
         if (err) {
           return console.log('Error occurred: ' + err);
         }
        for (i=0;i<data.tracks.items.length;i++) {
       console.log(data.tracks.items[i].artists[0].name); 
       console.log(data.tracks.items[i].name); 
       console.log(data.tracks.items[i].external_urls.spotify); 
       console.log(data.tracks.items[i].album.name); 
        }
       });
          break;
          case 'MOVIE-THIS': 
          let key = process.env.OMDB_KEY;
          const queryUrl = `http://www.omdbapi.com/?apikey=${key}&s=${var2}`
          axios.get(queryUrl).then(function(response) {

            // If the request is successful (i.e. if the response status code is 200)
            if (response.status === 200) {
               for (i=0;i<response.data.Search.length;i++){
              console.log(response.data.Search[i]);
               }
            }
          })
        break;
        case 'DO-WHAT-IT-SAYS': 
        fs.readFile('random.txt', 'utf8', function (error, data) {

         // If the code experiences any errors it will log the error to the console.
         if (error) {
             return console.log(error);
         }
     
         // We will then print the contents of data
         // console.log(data);
     
         // Then split it by commas (to make it more readable)
         const dataList = data.split(',');
     
         // We will then re-display the content as an array for later use.
         console.log(dataList[1]);

         var Spotify = require('node-spotify-api');
         var spotify = new Spotify({
           id: process.env.SPOTIFY_ID,
           secret: process.env.SPOTIFY_SECRET
         });
          
         spotify.search({ type: 'track', query: dataList[1] }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
         for (i=0;i<data.tracks.items.length;i++) {
        console.log(data.tracks.items[i].artists[0].name); 
        console.log(data.tracks.items[i].name); 
        console.log(data.tracks.items[i].external_urls.spotify); 
        console.log(data.tracks.items[i].album.name); 
         }
        });

     })  
        break;
  }
