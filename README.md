This is simple API app, which checks availability of free tickets to https://skygarden.london/

The app is deployed on heroku server and to check the availability of the tickets you need to specify "start_date" and "end_date" as parameters. For example, to check available free tickets from 2 Oct 2018 to 10 Oct 2018, you would need to send GET request to https://skygarden.herokuapp.com/?start_date=2018-10-02&end_date=2018-10-10

In the respond you receive set of objects where there is number of ticket left for each date.