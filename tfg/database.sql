CREATE DATABASE IF NOT EXISTS tfg_automovilesRodal;
USE tfg_automovilesRodal;

--------------------      TABLE USERS      --------------------  
CREATE TABLE Users(

    id_user             int auto_increment NOT NULL,
    user                varchar(50)  NOT NULL,
    userName            varchar(50)  NOT NULL,
    lastName            varchar(100) NOT NULL,
    email               varchar(255) NOT NULL,
    rol                 varchar(20)  NOT NULL, 
    phoneNumber         int NOT NULL,
    pass                varchar(255) NOT NULL,
    dni                 varchar(20)  NOT NULL,

    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,
    remember_token      varchar(255),

    CONSTRAINT pk_user PRIMARY KEY(id_user)

)ENGINE=InnoDb;

--INSERT EN LA TABLA USERS
INSERT INTO `users` (`id_user`, `user`, `userName`, `lastName`, `email`, `rol`, `phoneNumber`, `pass`, `dni`, `created_at`, `updated_at`, `remember_token`) 
            VALUES (NULL, 'admin', 'admin', 'admin', 'admin@test.com', 'admin', '000000000', 'admin', '000000000Z', NULL, NULL, NULL);



--------------------      TABLE EMPLOYEES      -------------------- 
CREATE TABLE Employees(

    id_employee         int auto_increment NOT NULL,
    id_user             int NOT NULL,
    nss                 varchar(255) NOT NULL,
    employeeType        varchar(20)  NOT NULL,

    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_employee PRIMARY KEY(id_employee),
    CONSTRAINT pk_employee_user FOREIGN KEY(id_user) REFERENCES Users(id_user)

)ENGINE=InnoDb;

--INSERT EN LA TABLA EMPLOYEES
INSERT INTO `employees` (`id_employee`, `id_user`, `nss`, `employeeType`, `created_at`, `updated_at`) 
                VALUES (NULL, '1', '000000000000Z', 'Admin', NULL, NULL);




--------------------      TABLE PAYSHEETS      -------------------- 
CREATE TABLE Paysheets(

    id_paysheet         int auto_increment NOT NULL,
    id_employee         int NOT NULL,
    salaryBase          decimal(10,2) NOT NULL,
    contractedHours     int NOT NULL,
    salaryExtra         decimal(10,2) NOT NULL,
    extraHours          int NOT NULL,
    salaryTotal         decimal(10,2) NOT NULL,
    deductions          decimal(10,2),
    salaryNet           decimal(10,2) NOT NULL,
    payDate             date,
    state               varchar(20) DEFAULT 'unpaid' NOT NULL,

    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_paysheet PRIMARY KEY(id_paysheet),
    CONSTRAINT pk_paysheet_employee FOREIGN KEY(id_employee) REFERENCES Employees(id_employee)

)ENGINE=InnoDb;

--INSERT EN LA TABLA PAYSHEETS
INSERT INTO `paysheets` (`id_paysheet`, `id_employee`, `salaryBase`, `contractedHours`, `salaryExtra`, `extraHours`, `salaryTotal`, `deductions`, `salaryNet`, `payDate`, `state`, `created_at`, `updated_at`) 
                    VALUES (NULL, '1', '1300,00', '40', '200,0', '20', '1500.00', '50', '1450,00', '2023-05-05', 'paid', NULL, NULL);



--------------------      TABLE VEHICLES      -------------------- 
CREATE TABLE Vehicles(

    id_vehicle          int auto_increment NOT NULL,
    id_user             int NOT NULL,
    trademark           varchar(50) NOT NULL,
    model               varchar(50) NOT NULL,
    registration        varchar(50) NOT NULL,
    mileage             varchar(50) NOT NULL,
    
    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_vehicle PRIMARY KEY(id_vehicle),
    CONSTRAINT pk_vehicle_user FOREIGN KEY(id_user) REFERENCES Users(id_user)

)ENGINE=InnoDb;

--INSERT EN LA TABLA VEHICLES
INSERT INTO `vehicles` (`id_vehicle`, `id_user`, `trademark`, `model`, `registration`, `mileage`, `created_at`, `updated_at`) 
                VALUES (NULL, '1', 'nisan', 'Kascai 2000', '2054 ABC', '200000', NULL, NULL);
    
UPDATE `vehicles` SET `mileage` = '2000000.0' WHERE `vehicles`.`id_vehicle` = 1;
ALTER TABLE `vehicles` CHANGE `mileage` `mileage` DECIMAL(10,2) NOT NULL;



--------------------      TABLE USEDVEHICLES      -------------------- 
CREATE TABLE UsedVehicles(

    id_vehicle_used     int auto_increment NOT NULL,
    id_vehicle          int NOT NULL,
    color               varchar(50) NOT NULL,
    img                 longblob NOT NULL,
    opinion             varchar(50) NOT NULL,
    price               decimal(10,2) NOT NULL,
    year                int NOT NULL,

    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_vehicle_used PRIMARY KEY(id_vehicle_used),
    CONSTRAINT pk_vehicleUsed_vehicle FOREIGN KEY(id_vehicle) REFERENCES Vehicles(id_vehicle)

)ENGINE=InnoDb;

--INSERT EN LA TABLA USEDVEHICLES
INSERT INTO `usedvehicles` (`id_vehicle_used`, `id_vehicle`, `color`, `img`, `opinion`, `price`, `year`, `created_at`, `updated_at`) 
        VALUES (NULL, '1', 'rojo','imagen hexadecimal' ,'bueno', '15000', '2005', NULL, NULL);


--------------------      TABLE BOOKINGS      -------------------- 
CREATE TABLE Bookings(

    id_booking          int auto_increment NOT NULL,
    id_vehicle          int NOT NULL,
    id_user             int NOT NULL,
    date_booking        datetime NOT NULL,
    
    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_booking PRIMARY KEY(id_booking),
    CONSTRAINT pk_booking_vehicle FOREIGN KEY(id_vehicle) REFERENCES Vehicles(id_vehicle),
    CONSTRAINT pk_booking_user FOREIGN KEY(id_user) REFERENCES Users(id_user)

)ENGINE=InnoDb;

--INSERT EN LA TABLA BOOKINGS
INSERT INTO `bookings` (`id_booking`, `id_vehicle`, `id_user`, `date_booking`, `created_at`, `updated_at`) 
            VALUES (NULL, '1', '1', '2023-05-10 16:02:44', NULL, NULL);



--------------------      TABLE REPARATIONS      --------------------
CREATE TABLE Reparations(

    id_reparation       int auto_increment NOT NULL,
    id_vehicle          int NOT NULL,
    date_start          datetime NOT NULL,
    date_end            datetime,
    problemDescription  varchar(255) NOT NULL,
    solutionDescription varchar(255),
    state               varchar(20) DEFAULT 'Standby' NOT NULL,
    
    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,


    CONSTRAINT pk_reparation PRIMARY KEY(id_reparation),
    CONSTRAINT pk_reparation_vehicle  FOREIGN KEY(id_vehicle) REFERENCES Vehicles(id_vehicle),

)ENGINE=InnoDb;

--INSERT EN LA TABLA REPARATIONS
INSERT INTO `reparations` (`id_reparation`, `id_vehicle`, `id_employee`, `date_start`, `date_end`, `problemDescription`, `solutionDescription`, `state`, `created_at`, `updated_at`) 
                    VALUES (NULL, '1', '1', '2023-05-05 14:04:35.000000', '2023-05-10 16:04:35', 'CAMBIO DE ACEITE', 'CAMBIO DE ACEITE', 'COMPLETADO', NULL, NULL);


--------------------      TABLE EMPLOYEEREPARATION      --------------------
CREATE TABLE employeeReparation(

    id_employeeReparation       int auto_increment NOT NULL,
    id_employee                 int NOT NULL,
    id_reparation               int NOT NULL,

    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_employeeReparation PRIMARY KEY(id_employeeReparation),
    CONSTRAINT pk_employeeReparation_employee  FOREIGN KEY(id_employee) REFERENCES Employees(id_employee),
    CONSTRAINT pk_employeeReparation_reparation  FOREIGN KEY(id_reparation) REFERENCES Reparations(id_reparation)

)ENGINE=InnoDb;


--INSERT EN LA TABLA SERVICEREPARATION
INSERT INTO `employeeReparation` (`id_employeeReparation`,  `id_employee`, `id_reparation`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', NULL, NULL);


--------------------      TABLE SERVICES      -------------------- 
CREATE TABLE Services(

    id_service          int auto_increment NOT NULL,
    serviceName         varchar(255) NOT NULL,
    description         varchar(255) NOT NULL,
    price               DECIMAL(10,2) NOT NULL,
    serviceType         varchar(255) NOT NULL,
    
    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_service PRIMARY KEY(id_service)

)ENGINE=InnoDb;

--INSERT EN LA TABLA SERVICIOS
INSERT INTO `services` (`id_service`, `serviceName`, `description`, `price`, `serviceType`, `created_at`, `updated_at`) VALUES 
            (NULL, 'SERVICIO DE PRUEBA', 'SERVICIO DE PRUEBA PARA REALIZAR PRUEBAS', '100,0', 'CAMBIO DE ACEITE', NULL, NULL);



--------------------      TABLE SERVICEREPARATION      -------------------- 
CREATE TABLE ServiceReparation(

    id_serviceReparation    int auto_increment NOT NULL,
    id_reparation           int NOT NULL,
    id_service              int NOT NULL,

    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_serviceReparation PRIMARY KEY(id_serviceReparation),
    CONSTRAINT pk_serviceReparation_reparation  FOREIGN KEY(id_reparation) REFERENCES Reparations(id_reparation),
    CONSTRAINT pk_serviceReparation_service     FOREIGN KEY(id_service) REFERENCES Services(id_service)

)ENGINE=InnoDb;

--INSERT EN LA TABLA SERVICEREPARATION
INSERT INTO `servicereparation` (`id_serviceReparation`, `id_reparation`, `id_service`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', NULL, NULL);
INSERT INTO `servicereparation` (`id_serviceReparation`, `id_reparation`, `id_service`, `created_at`, `updated_at`) VALUES (NULL, '1', '2', NULL, NULL);



--------------------      TABLE SUPPLIERS      -------------------- 
CREATE TABLE Suppliers(

    id_supplier         int auto_increment NOT NULL,
    supplierName        varchar(50)  NOT NULL,
    lastName            varchar(100) NOT NULL,
    email               varchar(255) NOT NULL,
    phoneNumber         int  NOT NULL,
    address             varchar(255) NOT NULL,
    dni                 varchar(20)  NOT NULL,

    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_supplier PRIMARY KEY(id_supplier)

)ENGINE=InnoDb;

--INSERT TABLA SUPPLIERS
INSERT INTO `suppliers` (`id_supplier`, `supplierName`, `lastName`, `email`, `phoneNumber`, `address`, `dni`, `created_at`, `updated_at`) 
            VALUES (NULL, 'ECOFRIENDLY', 'SL', 'ECOFRIENDLY@TEST.COM', '000000000', 'AVENIDAD DE LA MALVAROSA 64', '000000000Z', NULL, NULL);



--------------------      TABLE CATEGORIES      -------------------- 
CREATE TABLE Categories(

    id_category         int auto_increment NOT NULL,
    categoryName        varchar(50)  NOT NULL,
    description         varchar(255) NOT NULL,

    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_category PRIMARY KEY(id_category)

)ENGINE=InnoDb;

--INSERT EN LA TABLA CATEGORIES
INSERT INTO `categories` (`id_category`, `categoryName`, `description`, `created_at`, `updated_at`) VALUES (NULL, 'CATEGORIA PRUEBA', 'CATEGORIA PARA PRUEBAS', NULL, NULL);



--------------------      TABLE PRODUCTS      -------------------- 
CREATE TABLE Products(

    id_product          int auto_increment NOT NULL,
    id_supplier         int NOT NULL,
    id_category         int NOT NULL,
    productName         varchar(255) NOT NULL,
    description         varchar(255) NOT NULL,
    price               DECIMAL(10,2) NOT NULL,
    Stock               int NOT NULL,
    admisionDate        datetime DEFAULT NULL,
    expiryDate          datetime DEFAULT NULL,
    location            varchar(255) NOT NULL,
    img                 varchar(255) NOT NULL,
    
    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_product PRIMARY KEY(id_product),
    CONSTRAINT pk_product_supplier  FOREIGN KEY(id_supplier) REFERENCES Suppliers(id_supplier),
    CONSTRAINT pk_product_category  FOREIGN KEY(id_category) REFERENCES Categories(id_category)

)ENGINE=InnoDb;

--INSERT EN LA TABLA PRODUCTS
INSERT INTO `products` (`id_product`, `id_supplier`, `id_category`, `productName`, `description`, `price`, `Stock`, `admisionDate`, `expiryDate`, `location`, `img`, `created_at`, `updated_at`) 
                    VALUES (NULL, '1', '1', 'PRODUCTO DE PRUEBA', 'PRODUCTO PARA USAR EN PRUEBAS', '150', '2', NULL, NULL, '', '', NULL, NULL);



--------------------      TABLE SERVICEPRODUCT      -------------------- 
CREATE TABLE ServiceProduct(

    id_serviceProduct       int auto_increment NOT NULL,
    id_service              int NOT NULL,
    id_product              int NOT NULL,

    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_serviceProduct PRIMARY KEY(id_serviceProduct),
    CONSTRAINT pk_serviceProduct_product  FOREIGN KEY(id_product) REFERENCES Products(id_product),
    CONSTRAINT pk_serviceProduct_service  FOREIGN KEY(id_service) REFERENCES Services(id_service)

)ENGINE=InnoDb;

--INSERT EN LA TABLA SERVICEPRODUCT
INSERT INTO `serviceproduct` (`id_serviceProduct`, `id_service`, `id_product`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', NULL, NULL);
INSERT INTO `serviceproduct` (`id_serviceProduct`, `id_service`, `id_product`, `created_at`, `updated_at`) VALUES (NULL, '2', '1', NULL, NULL);



--------------------      TABLE PAYMENTMETHODS      -------------------- 
CREATE TABLE PaymentMethods(

    id_card          int auto_increment NOT NULL,
    id_user          int NOT NULL,
    cardNumber       varchar(20) NOT NULL,
    cardName         varchar(255) NOT NULL,
    CardSecurity     varchar(3) NOT NULL,
    cardExpiryDate   datetime DEFAULT NULL,
 
    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_paymentMethods PRIMARY KEY(id_card),
    CONSTRAINT pk_paymentMethods_user  FOREIGN KEY(id_user) REFERENCES Users(id_user)

)ENGINE=InnoDb;

--INSERT EN LA TABLA PAYMENTMETHODS
INSERT INTO `paymentmethods` (`id_card`, `id_user`, `cardNumber`, `cardName`, `CardSecurity`, `cardExpiryDate`, `created_at`, `updated_at`) 
                VALUES (NULL, '1', '205846852241', 'ADMIN ADMIN ADMIN', '811', '2023-05-31 16:14:08', NULL, NULL);



--------------------      TABLE INVOICES      -------------------- 
CREATE TABLE Invoices(

    id_invoice          int auto_increment NOT NULL,
    id_reparation       int NOT NULL,
    invoiceDate         datetime DEFAULT NULL,
    aditionalPrice      DECIMAL(10,2) NOT NULL,
    totalPrice          DECIMAL(10,2) NOT NULL,
    state               varchar(20) DEFAULT 'Unpaid' NOT NULL,

    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_invoice PRIMARY KEY(id_invoice),
    CONSTRAINT pk_invoice_reparation  FOREIGN KEY(id_reparation) REFERENCES Reparations(id_reparation)

)ENGINE=InnoDb;

--INSERT EN LA TABLA INVOICES
INSERT INTO `invoices` (`id_invoice`, `id_reparation`, `invoiceDate`, `aditionalPrice`, `totalPrice`, `state`, `created_at`, `updated_at`) 
            VALUES (NULL, '1', '2023-05-05 16:15:12', '150', '400', 'paid', NULL, NULL);



--------------------      TABLE PAYS      -------------------- 
CREATE TABLE Pays(

    id_pay           int auto_increment NOT NULL,
    id_card          int NOT NULL,
    id_invoice       int NOT NULL,
 
    created_at          datetime DEFAULT NULL,
    updated_at          datetime DEFAULT NULL,

    CONSTRAINT pk_pay PRIMARY KEY(id_pay),
    CONSTRAINT pk_pay_paymentMethods  FOREIGN KEY(id_card) REFERENCES PaymentMethods(id_card),
    CONSTRAINT pk_pay_invoices  FOREIGN KEY(id_invoice) REFERENCES Invoices(id_invoice)
    
)ENGINE=InnoDb;

--INSERT EN LA TABLA PAYS
INSERT INTO `pays` (`id_pay`, `id_card`, `id_invoice`, `created_at`, `updated_at`) 
            VALUES (NULL, '1', '1', NULL, NULL);