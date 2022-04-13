create database SolinalEtiquetas;

use solinaletiquetas;

create table Users(
	userId int not null auto_increment,
    nombre varchar(50) not null,
    mail nvarchar(255) not null,
    passwordHash binary(64) not null,
    primary key (userId)
);

create table Etiquetas(
	projectId int not null auto_increment primary key,
    foreign key (userId) references Users(userId),
    dimensiones varchar(13),
    dimensionesUn varchar(255),
    nombreProducto varchar(255),
    marcaProducto varchar(255),
    pesoNeto decimal(5,2),
    pesoNetoLabel varchar(255),
    pesoNetoUn varchar(10),
    pesoDrenadoDisabled boolean,
    pesoDrenado decimal(5,2),
    pesoDrenadoLabel varchar(255),
    pesoDrenadoUn varchar(10),
    alcohol decimal(5,2),
    alcoholUn varchar(255),
    
);