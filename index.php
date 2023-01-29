<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Weather App</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/4d99d8783f.js" crossorigin="anonymous"></script>
</head>
<body>
<div class="weather-app">
    <div class="container">
        <h3 class="logo">Weather App</h3>
        <div>
            <h1 class="temp">16&#176;</h1>
            <div class="city-time">
                <h1 class="name">Haarlem</h1>
                <small>
                    <span class="time">08:30</span>
                    -
                    <span class="date">
                Monday, 20 April
            </span>
                </small>
            </div>
            <div class="weather">
                <img
                        src=""
                        class="icon"
                        alt="icon"
                        width="50"
                        height="50"
                />
                <span class="condition">Cloudy</span>
            </div>
        </div>
    </div>
    <div class="panel">
        <form id="locationInput">
            <input
                    type="text"
                    class="search"
                    placeholder="Search for a city"
                    autocomplete="off"
            />
            <button type="submit" class="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>

        <ul class="cities">
            <li class="city">Haarlem</li>
            <li class="city">Amsterdam</li>
            <li class="city">London</li>
            <li class="city">New York</li>
        </ul>

        <ul class="details">
            <h4>Weather Details</h4>
            <li>
                <span>Cloudy</span>
                <span class="cloud">89%</span>
            </li>
            <li>
                <span>Humidity</span>
                <span class="humidity">45%</span>
            </li>
            <li>
                <span>Wind</span>
                <span class="wind">10km/h</span>
            </li>
        </ul>
        <ul class="history">
            <h4>Search History</h4>
            <?php
            include 'db_connection.php';
            $sql = "SELECT * FROM zoekgeschiedenis ORDER BY invoegdatum DESC LIMIT 5";

            $result = $conn -> query($sql);

            if($result->num_rows > 0 ){
                while($row = $result->fetch_assoc()){
                    $date = date('H:i d/m/Y',strtotime($row['invoegdatum']));
                    echo "<li><span>".$date."</span><span>".$row['zoekterm']."</span></li>";
                }
            }

            ?>

        </ul>
    </div>
</div>
<script src="script.js"></script>
</body>
</html>