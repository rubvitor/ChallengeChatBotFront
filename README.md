# ChatBot

To run this project is necessary first run the backend project. Be aware about the configurations into the files environment

Users and passwords are into the project backend (read the informations in readme of backend)

Please install Docker in your machine. Some commands and links below:

docker pull rabbitmq:3-management
docker run -d -p 15672:15672 -p 5672:5672 --name rabbit-test-for-medium rabbitmq:3-management

Source: https://code.imaginesoftware.it/rabbitmq-with-docker-on-windows-in-30-minutes-172e88bb0808

Obs.: the stock (actor) are being saved on database only to recover the historic of the conversations with the bot.
I'm not returning error messages or non reconized messages only to keep the conversation with the "customer".
