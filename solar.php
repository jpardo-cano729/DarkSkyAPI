<?php
$WeatherSource = "https://api.forecast.io/forecast/d2c9f07acecef8ad3f86fec4404ee362/" . $_GET["lat"] . "," . $_GET["lng"];
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WeatherSource);
?>