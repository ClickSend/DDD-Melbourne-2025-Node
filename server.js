<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ClickSend SMS Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f4f4f4;
        }
        h1 {
            color: #333;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 300px;
        }
        .logo {
            width: 150px;
            margin-bottom: 20px;
        }
        input {
            width: 90%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        button {
            background-color: #28a745;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
        }
        button:hover {
            background-color: #218838;
        }
        #response {
            margin-top: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <img src="https://www.clicksend.com/assets/img/logo/clicksend-logo-dark.png" alt="ClickSend Logo" class="logo">
    <h1>Send an SMS using ClickSend</h1>
    <div class="container">
        <input type="text" id="phone" placeholder="Enter phone number" />
        <input type="text" id="message" placeholder="Enter your message" />
        <button onclick="sendSMS()">Send SMS</button>
        <p id="response"></p>
    </div>
    
    <script>
        async function sendSMS() {
            const phone = document.getElementById("phone").value;
            const message = document.getElementById("message").value;
            const responseElement = document.getElementById("response");

            try {
                const response = await fetch("http://localhost:3000/send-sms", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phone, message })
                });
                const data = await response.json();
                responseElement.textContent = JSON.stringify(data);
            } catch (error) {
                responseElement.textContent = "Failed to send SMS";
            }
        }
    </script>
</body>
</html>