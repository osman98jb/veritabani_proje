const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'os.0864579',
  database: 'metroStation',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Use body-parser middleware for handling POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle GET request to the main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/addTren', (req, res) => {
    res.sendFile(__dirname + '/public/tren.html');
  });

// Handle POST request from the form
// Update your INSERT query to match the new column names
app.post('/addPersonel', (req, res) => {
    const { Ad, Soyad, Pozisyon, Maas } = req.body;
  
    // Insert data into the Personeler table
    pool.query(
      'INSERT INTO personal (Ad, Soyad, Pozisyon, Mass) VALUES (?, ?, ?, ?)',
      [Ad, Soyad, Pozisyon, Maas],
      (err, results) => {
        if (err) {
          console.error('Error inserting data into the database:', err);
          return res.status(500).json({ success: false, message: 'Error inserting data into the database. See server logs for details.' });
        }
  
        console.log('Data inserted successfully:', results);
        res.status(200).json({ success: true, message: 'Data inserted successfully.' });
      }
    );
  });
  
  // Add this POST route to handle inserting data into the Tren table
// Add this POST route to handle inserting data into the Tren table
app.post('/addTren', (req, res) => {
  const { Marka, Model, Kapasite, TriggerField1, TriggerField2 } = req.body;

  // Insert data into the Tren table
  pool.query(
    'INSERT INTO Trenler (Marka, Model, Kapasite) VALUES (?, ?, ?)',
    [Marka, Model, Kapasite],
    (err, results) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        return res.status(500).json({ success: false, message: 'Error inserting data into the database. See server logs for details.' });
      }

      // Execute the trigger logic
      pool.query(
        'INSERT INTO YourTriggerTable (TriggerField1, TriggerField2) VALUES (?, ?)',
        [TriggerField1, TriggerField2],
        (triggerErr, triggerResults) => {
          if (triggerErr) {
            console.error('Error executing trigger:', triggerErr);
            // You might want to handle trigger errors differently
          }

          console.log('Trigger executed successfully:', triggerResults);
        }
      );

      console.log('Data inserted successfully:', results);
      res.status(200).json({ success: true, message: 'Data inserted successfully.' });
    }
  );
});





// Serve the Guzergah form page for GET requests to /addGuzergah
app.get('/addGuzergah', (req, res) => {
    res.sendFile(__dirname + '/public/guzergah.html');
  });
  
  // Add the POST route for adding data to the Guzergah table
  app.post('/addGuzergah', (req, res) => {
    const { Baslangic_istasiyon, Bitis_istasiyon, Mesafe, Sure } = req.body;
  
    // Insert data into the Guzergah table
    pool.query(
      'INSERT INTO Guzergah (Baslangic_istasiyon, Bitis_istasiyon, Mesafe, Sure) VALUES (?, ?, ?, ?)',
      [Baslangic_istasiyon, Bitis_istasiyon, Mesafe, Sure],
      (err, results) => {
        if (err) {
          console.error('Error inserting data into the database:', err);
          return res.status(500).json({ success: false, message: 'Error inserting data into the database. See server logs for details.' });
        }
  
        console.log('Data inserted successfully:', results);
        res.status(200).json({ success: true, message: 'Data inserted successfully.' });
      }
    );
  });
  

  // Serve the Bilet form page for GET requests to /addBilet
app.get('/addBilet', (req, res) => {
    res.sendFile(__dirname + '/public/bilet.html');
  });
  
  // Add the POST route for adding data to the Biletler table
// Add the POST route for adding data to the Biletler table
// Add the POST route for adding data to the Biletler table
app.post('/addBilet', (req, res) => {
  const { Yolcu_adi, Kalkis_istasyon, Varis_istasyon, Ucret, Tarih } = req.body;

  // Insert data into the Biletler table
  pool.query(
    'INSERT INTO Bilet (Yolcu_adi, Kalkis_istasyon, Varis_istasyon, Ucret, Tarih) VALUES (?, ?, ?, ?, ?)',
    [Yolcu_adi, Kalkis_istasyon, Varis_istasyon, Ucret, Tarih],
    (err, results) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        return res.status(500).json({ success: false, message: 'Error inserting data into the database. See server logs for details.' });
      }

      console.log('Data inserted successfully:', results);
      res.status(200).json({ success: true, message: 'Data inserted successfully.' });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
