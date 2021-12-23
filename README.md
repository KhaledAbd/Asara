
# GO TO Branch AsaraV2 

# Asara

## _Juice Shop Management Web Application_

![Build Status](https://res.cloudinary.com/dbbaq55id/image/upload/v1639722740/photo_2021-12-17_08-30-15_iixu7f.jpg)


# Developed By:

-[ Khaled Mohamed -Front-End Developer-](https://github.com/khaledmohamed138) responsible for HTML, css, Bootstrap.

-[ Khaled Mohammed Elshoky -Full-Stack-](https://github.com/KhaledAbd/) -full-stack Developer- Angular & Dot Net Core FrameWork.

Asara is shop management Web Application: 
- can run in all operating system is cross-platform.

## Features
- use for selling and buying and record all opertion made it
- has Authorization & authentication
- ✨has inventory & record expenses and  extra expenses  and installments✨

> Recording data from the purchase and sale invoice, 
> and the invoices can be retrieved, and 
> you can use the installment system and record warehouse outputs and their 
> movement
## Tech

Asara uses a number of open source projects to work properly:

- [AngularJS] - HTML & CSS enhanced for web apps!
- [vsCode Editor] - awesome web-based text editor.
- [Twitter Bootstrap] - great UI boilerplate for modern web apps.
- [npm] - install modules.
- [Dot Net core FrameWork] - In Back-end  
- [MYSQL] - DataBase Management System.
- [WorkBanch] - Data Base Management tool.
## Installation

Asara requires [npm](https://www.npmjs.com) 6+ to run.

Install the dependencies and devDependencies and start the Angular.


```sh
cd Asara-App
npm install #for install angular module
ng serve ## http:localhost:4200\item
##### run Asara.API web Restful Sevice
cd ../Asara.Api
dotnet restore   ####  for restore library files
dotnet ef database drop ### if you want remove data 
dotnet ef database migrations add m12m
dotnet watch run ## the data will seed automaticaly

### http:localhost:5000/item
```

For production environments...

```sh
ng build --prod ----optimization=fasle  
####for build default path ../Asara.Api/wwwroot you can change from angular.js
cd ../Asara.Api
dotnet deploy ### you can deploy it in IIs for windows & Apache for Linux
```
```

#### Link for assum you run correctly
```sh
127.0.0.1:5000 
```

## License

MIT

**Free Software, Hey Yeah!**
=======
# Asara
AsaraApp


Asara Shop Program

